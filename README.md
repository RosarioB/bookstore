# Bookstore

A modern bookstore application built with Next.js 15, featuring a complete book catalog, shopping cart functionality, and book reviews.

## Tech Stack

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[Jotai](https://jotai.org)** - Primitive and flexible state management
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful and accessible UI components
- **[MongoDB](https://mongodb.com)** - NoSQL database for storing books and reviews
- **[Mongoose](https://mongoosejs.com)** - MongoDB object modeling for Node.js
- **[TypeScript](https://typescriptlang.org)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework

## Features

- 📚 Book catalog with search, filtering, and sorting
- 🛒 Shopping cart functionality
- ⭐ Book reviews and ratings
- 📱 Responsive design
- 🔍 Category-based browsing
- 💰 Real-time inventory management

## API Routes

The project uses Next.js API routes to create a RESTful API:

### Books
- `GET /api/books` - Fetch books with pagination, filtering, and sorting
- `POST /api/books` - Create a new book
- `GET /api/books/[id]` - Get a specific book by ID
- `PUT /api/books/[id]` - Update book details (stock, etc.)
- `DELETE /api/books/[id]` - Delete a book
- `POST /api/books/[id]/buy` - Purchase a book (requires quantity and userId query params)

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/[id]` - Get a specific order by ID

## Getting Started

First, make sure you have MongoDB running locally or set up a MongoDB Atlas connection.

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Set up your environment variables by creating a `.env.local` file:

```bash
MONGODB_URI=your_mongodb_connection_string
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the bookstore.

## Project Structure

```
bookstore/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   ├── book/[id]/         # Dynamic book detail pages
│   ├── models/            # MongoDB/Mongoose models
│   └── page.tsx           # Home page
├── atoms/                 # Jotai state management
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── BookDetails/      # Book-specific components
│   ├── Cards/            # Card components
│   └── Layout/           # Layout components
├── lib/                  # Utility functions and HTTP client
└── const/               # Constants and type definitions
```

## State Management

This project uses [Jotai](https://jotai.org) for state management, providing:

- Shopping cart state
- Book catalog data
- Query states with loadable patterns
- Atomic updates for better performance

## Learn More

To learn more about the technologies used:

- [Next.js 15 Documentation](https://nextjs.org/docs) - App Router and API routes
- [Jotai Documentation](https://jotai.org/docs/introduction) - State management
- [shadcn/ui Documentation](https://ui.shadcn.com) - UI components
- [MongoDB Documentation](https://docs.mongodb.com) - Database

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Make sure to add your environment variables in the Vercel dashboard before deploying.
