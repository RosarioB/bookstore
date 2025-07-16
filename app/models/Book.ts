import mongoose from 'mongoose';
export interface IReview {
    name: string;
    rating: number;
    date: string;
}
export interface IBook {
    _id: string
    category: string
    title: string
    author: string
    avgRating: number
    price: number
    imageSrc: string
    stock: number
    reviews: IReview[]
}

const reviewSchema = new mongoose.Schema<IReview>({
    name: {
        type: String,
        required: [true, "Please provide a reviewer name"],
        maxLength: [100, "Reviewer name cannot be more than 100 characters"],
    },
    rating: {
        type: Number,
        required: [true, "Please provide a rating for this review"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot be more than 5"],
    },
    date: {
        type: String,
        required: [true, "Please provide a review date"],
    }
}, { _id: false });

const bookSchema = new mongoose.Schema<IBook>({
    category: {
        type: String,
        required: [true, "Please provide a category for this book"],
        maxLength: [100, "Category cannot be more than 100 characters"],
    },
    title: {
        type: String,
        required: [true, "Please provide a title for this book"],
        maxLength: [100, "Title cannot be more than 100 characters"],
    },
    author: {
        type: String,
        required: [true, "Please provide an author for this book"],
        maxLength: [100, "Author cannot be more than 100 characters"],
    },
    avgRating: {
        type: Number,
        required: [true, "Please provide a rating for this book"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot be more than 5"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a price for this book"],
        min: [0, "Price must be at least 0"],
    },
    imageSrc: {
        type: String,
        required: [true, "Please provide an image URL for this book"],
    },
    stock: {
        type: Number,
        required: [true, "Please provide a stock for this book"],
        min: [0, "Stock must be at least 0"],
    },
    reviews: {
        type: [reviewSchema],
        default: [],
    },
}, {
    timestamps: true,
});

const Book = mongoose.models.Book || mongoose.model<IBook>('Book', bookSchema, 'books');

export default Book; 