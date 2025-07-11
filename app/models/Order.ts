import mongoose from 'mongoose';

export interface IOrder {
    _id: string;
    userId?: string;
    bookId: string;
    quantity: number;
    cost: number;
}

const orderSchema = new mongoose.Schema<IOrder>({
    userId: {
        type: String,
        required: true,
    },
    bookId: {
        type: String,
        required: [true, "Please provide a book ID for this order"],
    },
    quantity: {
        type: Number,
        required: [true, "Please provide a quantity for this order"],
        min: [1, "Quantity must be at least 1"],
    },
    cost: {
        type: Number,
        required: [true, "Please provide a cost for this order"],
        min: [0, "Cost must be at least 0"],
    },
}, {
    timestamps: true,
});

// Check if the model exists before creating it
const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema, 'orders');

export default Order; 