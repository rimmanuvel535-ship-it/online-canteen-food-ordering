export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: 'veg' | 'non-veg' | 'combo';
  description?: string;
  image?: string;
  payment_modes: string[];
  items?: string[];
  offer?: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  gst: number;
  total: number;
  paymentMode: string;
  deliveryAddress: string;
  customerName: string;
  phone: string;
  status: 'pending' | 'preparing' | 'out-for-delivery' | 'delivered';
  orderTime: string;
  estimatedDelivery: string;
}