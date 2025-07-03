import { NextResponse } from 'next/server';
import Book from '@/app/models/Book';
import dbConnect from '@/lib/mongoose';
import { BOOK_TYPES } from '@/lib/utils';

// Constants for validation
const DEFAULT_PAGE_NUM = 1;
const DEFAULT_PAGE_SIZE = 8;
const SORT_TYPES = ['price', 'createdAt', 'rating'];
const SORT_ORDERS = ['asc', 'desc'];

// Type definitions
interface BookFilter {
  category?: string;
}

interface BookQueryOptions {
  sort: {
    createdAt?: 1 | -1;
    price?: 1 | -1;
    rating?: 1 | -1;
  };
  limit: number;
  skip: number;
}

// Parse and validate query parameters
function parseBookListQuery(searchParams: URLSearchParams): { filter: BookFilter; options: BookQueryOptions } {
  const filter: BookFilter = {};
  const options: BookQueryOptions = {
    sort: { createdAt: -1 }, // default sort
    limit: DEFAULT_PAGE_SIZE,
    skip: 0
  };

  // Filtering by category
  const category = searchParams.get('category');
  if (category && category.trim() !== '') {
    if (!BOOK_TYPES.includes(category)) {
      throw new Error(`Parameter 'category' must be one of [${BOOK_TYPES.join(', ')}].`);
    }
    filter.category = category;
  }

  // Sorting
  const sort = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';
  
  if (sort && SORT_TYPES.includes(sort)) {
    if (!SORT_ORDERS.includes(order)) {
      throw new Error(`Parameter 'order' must be one of [${SORT_ORDERS.join(', ')}].`);
    }
    
    const sortOrder = order === 'asc' ? 1 : -1;
    
    if (sort === 'price') {
      options.sort = { price: sortOrder };
    } else if (sort === 'createdAt') {
      options.sort = { createdAt: sortOrder };
    } else if (sort === 'rating') {
      options.sort = { rating: sortOrder };
    }
  }

  // Pagination
  const pageParam = searchParams.get('page');
  const sizeParam = searchParams.get('size');
  
  let page = DEFAULT_PAGE_NUM;
  let size = DEFAULT_PAGE_SIZE;
  
  if (pageParam) {
    page = parseInt(pageParam);
    if (isNaN(page) || page < 1) {
      throw new Error('Parameter "page" must be a positive integer.');
    }
  }
  
  if (sizeParam) {
    size = parseInt(sizeParam);
    if (isNaN(size) || size < 0 || size > 100) {
      throw new Error('Parameter "size" must be between 0 and 100.');
    }
  }
  
  options.limit = size;
  options.skip = (page - 1) * size;

  return { filter, options };
}

// GET /api/books - Get books with filtering, sorting, and pagination
export async function GET(request: Request) {
    try {
        await dbConnect();
        
        const { searchParams } = new URL(request.url);
        const { filter, options } = parseBookListQuery(searchParams);
        
        // Get books with filtering, sorting, and pagination
        const books = await Book.find(filter)
            .sort(options.sort)
            .limit(options.limit)
            .skip(options.skip)
            .lean(); // Use lean() for better performance
        
        // Get total count for pagination info
        const total = await Book.countDocuments(filter);
        
        // Calculate pagination metadata
        const page = Math.floor(options.skip / options.limit) + 1;
        const pageSize = options.limit;
        const totalPages = Math.ceil(total / pageSize);
        
        return NextResponse.json({ 
            success: true, 
            data: {
                content: books,
                total,
                page,
                pageSize,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json(
            { 
                success: false, 
                error: error instanceof Error ? error.message : 'Failed to fetch books' 
            },
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