import { NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        },
        { status: 400 }
      );
    }

    const orderId = parseInt(id);

    // Query for the order
    const orderResult = await db.select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    if (orderResult.length === 0) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const order = orderResult[0];

    // Query for order items
    const items = await db.select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId));

    // Return order with items
    return NextResponse.json({
      id: order.id,
      userId: order.userId,
      customerName: order.customerName,
      phone: order.phone,
      deliveryAddress: order.deliveryAddress,
      paymentMode: order.paymentMode,
      subtotal: order.subtotal,
      gst: order.gst,
      total: order.total,
      status: order.status,
      orderTime: order.orderTime,
      estimatedDelivery: order.estimatedDelivery,
      createdAt: order.createdAt,
      items: items.map(item => ({
        id: item.id,
        orderId: item.orderId,
        foodItemId: item.foodItemId,
        quantity: item.quantity,
        price: item.price,
        createdAt: item.createdAt
      }))
    });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}