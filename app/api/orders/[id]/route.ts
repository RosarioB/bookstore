import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Order from "@/app/models/Order";

// GET /api/orders/[id] - Get an order by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const order = await Order.findById(id);

        if (!order) {
            return NextResponse.json(
                { success: false, error: "Order not found" },
                { status: 404 }
            );
        }
        
        return NextResponse.json({ success: true, data: order });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to fetch order" },
            { status: 500 }
        );
    }
}