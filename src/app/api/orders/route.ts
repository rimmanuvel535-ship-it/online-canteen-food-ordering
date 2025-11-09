import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      customerName,
      phone,
      deliveryAddress,
      paymentMode,
      subtotal,
      gst,
      total,
      items
    } = body;

    // Validate required fields
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    if (!customerName || !customerName.trim()) {
      return NextResponse.json(
        { error: 'Customer name is required', code: 'MISSING_CUSTOMER_NAME' },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { error: 'Phone number is required', code: 'MISSING_PHONE' },
        { status: 400 }
      );
    }

    if (!deliveryAddress || !deliveryAddress.trim()) {
      return NextResponse.json(
        { error: 'Delivery address is required', code: 'MISSING_DELIVERY_ADDRESS' },
        { status: 400 }
      );
    }

    if (!paymentMode || !paymentMode.trim()) {
      return NextResponse.json(
        { error: 'Payment mode is required', code: 'MISSING_PAYMENT_MODE' },
        { status: 400 }
      );
    }

    if (subtotal === undefined || subtotal === null) {
      return NextResponse.json(
        { error: 'Subtotal is required', code: 'MISSING_SUBTOTAL' },
        { status: 400 }
      );
    }

    if (gst === undefined || gst === null) {
      return NextResponse.json(
        { error: 'GST is required', code: 'MISSING_GST' },
        { status: 400 }
      );
    }

    if (total === undefined || total === null) {
      return NextResponse.json(
        { error: 'Total is required', code: 'MISSING_TOTAL' },
        { status: 400 }
      );
    }

    // Validate items array
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items array is required and must contain at least one item', code: 'INVALID_ITEMS' },
        { status: 400 }
      );
    }

    // Validate each item in items array
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.foodItemId) {
        return NextResponse.json(
          { error: `Item at index ${i} is missing foodItemId`, code: 'MISSING_FOOD_ITEM_ID' },
          { status: 400 }
        );
      }
      if (!item.quantity || item.quantity < 1) {
        return NextResponse.json(
          { error: `Item at index ${i} has invalid quantity`, code: 'INVALID_QUANTITY' },
          { status: 400 }
        );
      }
      if (item.price === undefined || item.price === null) {
        return NextResponse.json(
          { error: `Item at index ${i} is missing price`, code: 'MISSING_PRICE' },
          { status: 400 }
        );
      }
    }

    // Generate timestamps
    const now = new Date();
    const orderTime = now.toISOString();
    const estimatedDeliveryDate = new Date(now.getTime() + 30 * 60 * 1000);
    const estimatedDelivery = estimatedDeliveryDate.toISOString();
    const createdAt = now.toISOString();

    // Sanitize inputs
    const sanitizedCustomerName = customerName.trim();
    const sanitizedPhone = phone.trim();
    const sanitizedDeliveryAddress = deliveryAddress.trim();
    const sanitizedPaymentMode = paymentMode.trim();

    // Create order
    const [newOrder] = await db.insert(orders).values({
      userId: parseInt(userId),
      customerName: sanitizedCustomerName,
      phone: sanitizedPhone,
      deliveryAddress: sanitizedDeliveryAddress,
      paymentMode: sanitizedPaymentMode,
      subtotal: parseInt(subtotal),
      gst: parseInt(gst),
      total: parseInt(total),
      status: 'pending',
      orderTime,
      estimatedDelivery,
      createdAt
    }).returning();

    // Create order items
    const itemsToInsert = items.map(item => ({
      orderId: newOrder.id,
      foodItemId: parseInt(item.foodItemId),
      quantity: parseInt(item.quantity),
      price: parseInt(item.price),
      createdAt
    }));

    const createdItems = await db.insert(orderItems).values(itemsToInsert).returning();

    // Return order with items
    return NextResponse.json(
      {
        ...newOrder,
        items: createdItems
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 50);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Validate userId is provided
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    // Validate userId is valid integer
    const userIdInt = parseInt(userId);
    if (isNaN(userIdInt)) {
      return NextResponse.json(
        { error: 'Valid User ID is required', code: 'INVALID_USER_ID' },
        { status: 400 }
      );
    }

    // Get orders for the user with pagination
    const userOrders = await db.select()
      .from(orders)
      .where(eq(orders.userId, userIdInt))
      .orderBy(desc(orders.orderTime))
      .limit(limit)
      .offset(offset);

    // If no orders found, return empty array
    if (userOrders.length === 0) {
      return NextResponse.json([]);
    }

    // Get order items for all orders
    const orderIds = userOrders.map(order => order.id);
    const allOrderItems = await db.select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderIds[0]));

    // If there are multiple orders, fetch items for remaining orders
    const itemsMap: { [orderId: number]: typeof allOrderItems } = {};
    
    for (const orderId of orderIds) {
      const items = await db.select()
        .from(orderItems)
        .where(eq(orderItems.orderId, orderId));
      itemsMap[orderId] = items;
    }

    // Combine orders with their items
    const ordersWithItems = userOrders.map(order => ({
      ...order,
      items: itemsMap[order.id] || []
    }));

    return NextResponse.json(ordersWithItems);

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}