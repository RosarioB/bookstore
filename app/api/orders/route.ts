import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Order from "@/app/models/Order";


// GET /api/orders - Get all orders
export async function GET() {
    try {
        await dbConnect();
        const orders = await Order.find();
        return NextResponse.json({ success: true, data: orders });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to fetch orders" },
            { status: 500 }
        );
    }
}