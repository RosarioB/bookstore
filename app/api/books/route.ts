import { NextResponse } from 'next/server';
import Book from '@/app/models/Book';
import dbConnect from '@/lib/mongoose';

// GET /api/books - Get all books
export async function GET() {
    try {
        await dbConnect();
        const books = await Book.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: books }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Failed to fetch books' },
            { status: 500 }
        );
    }
}

// POST /api/books - Create a new book
export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { category, title, author, rating, price, imageSrc } = body;

        const book = await Book.create({
            category,
            title,
            author,
            rating,
            price,
            imageSrc,
        });

        return NextResponse.json({ success: true, data: book }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Failed to create book' },
            { status: 500 }
        );
    }
}