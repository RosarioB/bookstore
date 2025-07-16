import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Book, { IBook } from "@/app/models/Book";

// GET /api/books/[id] - Get a book by id
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const book = await Book.findById({ _id: id });

        if (!book) {
            return NextResponse.json(
                { success: false, error: "Book not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: book
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to fetch book" },
            { status: 500 }
        );
    }
}

const UPDATABLE_FIELDS: (keyof IBook)[] = [
    'title', 'author', 'category', 'price', 'stock', 'imageSrc', 'reviews'
];

// PUT /api/books/[id] - Update a book by id
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const { name, description, imageUrl, price, stock, category, author, reviews } = body;

        // Define which fields can be updated (more secure and explicit)
        const updateFields: Partial<IBook> = {};
        UPDATABLE_FIELDS.forEach(field => {
            if (body[field] !== undefined) {
                updateFields[field] = body[field];
            }
        });

        const book = await Book.findByIdAndUpdate({ _id: id },
            { $set: updateFields },
            { new: true }
        );

        if (!book) {
            return NextResponse.json({ success: false, error: "Book not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: book }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to update book" },
            { status: 500 }
        );
    }
}

// DELETE /api/books/[id] - Delete a book
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const book = await Book.deleteOne({ _id: id });

        if (!book) {
            return NextResponse.json(
                { success: false, error: "Book not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to delete book" },
            { status: 500 }
        );
    }
}