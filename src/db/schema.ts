import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// Users table
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  phone: text('phone').notNull(),
  createdAt: text('created_at').notNull(),
});

// Food items table
export const foodItems = sqliteTable('food_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  itemId: text('item_id').notNull().unique(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  category: text('category').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  paymentModes: text('payment_modes', { mode: 'json' }),
  items: text('items', { mode: 'json' }),
  offer: text('offer'),
  createdAt: text('created_at').notNull(),
});

// Orders table
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  customerName: text('customer_name').notNull(),
  phone: text('phone').notNull(),
  deliveryAddress: text('delivery_address').notNull(),
  paymentMode: text('payment_mode').notNull(),
  subtotal: integer('subtotal').notNull(),
  gst: integer('gst').notNull(),
  total: integer('total').notNull(),
  status: text('status').notNull().default('pending'),
  orderTime: text('order_time').notNull(),
  estimatedDelivery: text('estimated_delivery').notNull(),
  createdAt: text('created_at').notNull(),
});

// Order items table
export const orderItems = sqliteTable('order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: integer('order_id').notNull().references(() => orders.id),
  foodItemId: integer('food_item_id').notNull().references(() => foodItems.id),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
  createdAt: text('created_at').notNull(),
});