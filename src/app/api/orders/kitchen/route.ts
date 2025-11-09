import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems } from '@/db/schema';
import { desc, inArray, or, eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Get orders that are not delivered or cancelled (active orders for kitchen)
    const activeOrders = await db.select()
      .from(orders)
      .where(
        or(
          eq(orders.status, 'pending'),
          eq(orders.status, 'preparing'),
          eq(orders.status, 'ready')
        )
      )
      .orderBy(desc(orders.orderTime));

    // If no orders found, return empty array
    if (activeOrders.length === 0) {
      return NextResponse.json([]);
    }

    // Get order items for all orders
    const orderIds = activeOrders.map(order => order.id);
    const itemsMap: { [orderId: number]: any[] } = {};
    
    for (const orderId of orderIds) {
      const items = await db.select()
        .from(orderItems)
        .where(eq(orderItems.orderId, orderId));
      itemsMap[orderId] = items;
    }

    // Combine orders with their items
    const ordersWithItems = activeOrders.map(order => ({
      ...order,
      items: itemsMap[order.id] || []
    }));

    return NextResponse.json(ordersWithItems);

  } catch (error) {
    console.error('Kitchen GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}
