import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'
import Book from "@/app/models/Book";
import Order from "@/app/models/Order";

export async function POST(request: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const { searchParams } = request.nextUrl;
        console.log('🔍 Search params:', Object.fromEntries(searchParams.entries()));
        
        const result = await buyBook(id, searchParams);
        return NextResponse.json({ success: true, data: result.data, message: result.message }, { status: result.status });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Failed to buy book' },
            { status: 500 }
        );
    }
}

async function buyBook(id: string, params: URLSearchParams) {
    const bookId = id;

    const quantityParam = params.get('quantity');
    if (!quantityParam) {
        throw new Error('Parameter `quantity` is required.');
    }
    const quantity = Math.floor(Number(quantityParam));
    if (isNaN(quantity) || quantity <= 0) {
        throw new Error('Parameter `quantity` must be a positive integer.');
    }

    const userIdParam = params.get('userId');
    if (!userIdParam) {
        throw new Error('Parameter `userId` is required.');
    }
    const userId = Number(userIdParam);
    if (isNaN(userId)) {
        throw new Error('Parameter `userId` must be a valid number.');
    }
    
    try {
        // Find the book that the user wants to purchase
        const book = await Book.findById(bookId);

        console.log("Find book", book);

        if (!book) {
            throw new Error(`Cannot find the book <${bookId}> that you want to buy.`);
        }

        // Check if there are enough books for the user purchase
        const stock = book.stock;
        if (quantity > stock) {
            throw new Error(`Don't have enough stock of book <${bookId}> for your purchase. Available: ${stock}, Requested: ${quantity}`);
        }

        // Calculate the cost
        const cost = book.price * quantity;

        // Atomically update the book stock with a condition to ensure we don't oversell
        const updatedBook = await Book.findOneAndUpdate(
            { 
                _id: bookId, 
                stock: { $gte: quantity } // Only update if stock is sufficient
            },
            { $inc: { stock: -quantity } },
            { new: true }
        );

        console.log("Updated book", updatedBook);

        if (!updatedBook) {
            throw new Error(`Not enough stock available. Someone else may have purchased this book.`);
        }

        // Generate a new order to record
        const order = await Order.create({
            bookId,
            quantity,
            cost,
            userId
        });

        console.log("Created order", order);

        const result = {
            userId,
            bookId,
            bookTitle: book.title,
            cost: cost,
            quantity: quantity,
            remainingStock: updatedBook.stock,
            orderId: order._id
        };

        return {
            status: 200,
            message: `Successfully bought ${quantity} book(s) <${bookId}>, cost: $${result.cost}, remaining stock: ${result.remainingStock}`,
            data: result
        };
    } catch (err: any) {
        console.error('Buy book error:', err);
        return {
            status: 500,
            message: `Failed to buy book ${bookId}: ${err.message}`,
            data: null
        };
    }
}
