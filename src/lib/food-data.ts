import { FoodItem } from '@/types';

export const foodItems: FoodItem[] = [
  // Vegetarian Dishes
  { id: 'v1', name: 'Paneer Butter Masala', price: 120, category: 'veg', payment_modes: ['GPay', 'PhonePe', 'Paytm', 'Cash on Delivery'] },
  { id: 'v2', name: 'Veg Biryani', price: 100, category: 'veg', payment_modes: ['GPay', 'UPI', 'Card'] },
  { id: 'v3', name: 'Veg Fried Rice', price: 90, category: 'veg', payment_modes: ['GPay', 'Paytm'] },
  { id: 'v4', name: 'Chapati & Curry', price: 70, category: 'veg', payment_modes: ['Cash on Delivery'] },
  { id: 'v5', name: 'Dal Tadka', price: 85, category: 'veg', payment_modes: ['GPay', 'Card'] },
  { id: 'v6', name: 'Aloo Gobi', price: 80, category: 'veg', payment_modes: ['UPI', 'PhonePe'] },
  { id: 'v7', name: 'Veg Thali', price: 150, category: 'veg', payment_modes: ['GPay', 'Paytm', 'Card'] },
  { id: 'v8', name: 'Masala Dosa', price: 60, category: 'veg', payment_modes: ['GPay', 'Cash on Delivery'] },
  { id: 'v9', name: 'Idli Sambar', price: 50, category: 'veg', payment_modes: ['GPay', 'Paytm'] },
  { id: 'v10', name: 'Veg Pulao', price: 95, category: 'veg', payment_modes: ['UPI', 'Card'] },
  { id: 'v11', name: 'Chole Bhature', price: 110, category: 'veg', payment_modes: ['PhonePe', 'Cash on Delivery'] },
  { id: 'v12', name: 'Pav Bhaji', price: 90, category: 'veg', payment_modes: ['GPay', 'Paytm'] },
  { id: 'v13', name: 'Veg Burger', price: 80, category: 'veg', payment_modes: ['GPay', 'PhonePe'] },
  { id: 'v14', name: 'Veg Pizza', price: 150, category: 'veg', payment_modes: ['GPay', 'Card'] },
  { id: 'v15', name: 'Vegetable Sandwich', price: 70, category: 'veg', payment_modes: ['Paytm', 'Cash on Delivery'] },
  { id: 'v16', name: 'Curd Rice', price: 60, category: 'veg', payment_modes: ['UPI', 'PhonePe'] },
  { id: 'v17', name: 'Veg Noodles', price: 90, category: 'veg', payment_modes: ['GPay', 'Card'] },
  { id: 'v18', name: 'Gobi Manchurian', price: 100, category: 'veg', payment_modes: ['GPay', 'Paytm'] },
  { id: 'v19', name: 'Paneer Tikka', price: 130, category: 'veg', payment_modes: ['GPay', 'PhonePe'] },
  { id: 'v20', name: 'Mixed Veg Curry', price: 95, category: 'veg', payment_modes: ['UPI', 'Cash on Delivery'] },

  // Non-Vegetarian Dishes
  { id: 'nv1', name: 'Chicken Biryani', price: 160, category: 'non-veg', payment_modes: ['GPay', 'UPI', 'Card'] },
  { id: 'nv2', name: 'Mutton Biryani', price: 190, category: 'non-veg', payment_modes: ['GPay', 'PhonePe'] },
  { id: 'nv3', name: 'Egg Curry', price: 100, category: 'non-veg', payment_modes: ['GPay', 'Cash on Delivery'] },
  { id: 'nv4', name: 'Fish Curry', price: 150, category: 'non-veg', payment_modes: ['GPay', 'Paytm'] },
  { id: 'nv5', name: 'Chicken Curry', price: 140, category: 'non-veg', payment_modes: ['UPI', 'PhonePe'] },
  { id: 'nv6', name: 'Butter Chicken', price: 180, category: 'non-veg', payment_modes: ['GPay', 'Card'] },
  { id: 'nv7', name: 'Chicken Fried Rice', price: 120, category: 'non-veg', payment_modes: ['Paytm', 'Cash on Delivery'] },
  { id: 'nv8', name: 'Chicken Noodles', price: 110, category: 'non-veg', payment_modes: ['GPay', 'PhonePe'] },
  { id: 'nv9', name: 'Grilled Chicken', price: 200, category: 'non-veg', payment_modes: ['GPay', 'Card'] },
  { id: 'nv10', name: 'Chicken Burger', price: 130, category: 'non-veg', payment_modes: ['GPay', 'UPI'] },
  { id: 'nv11', name: 'Chicken Pizza', price: 160, category: 'non-veg', payment_modes: ['Paytm', 'Card'] },
  { id: 'nv12', name: 'Chicken Shawarma', price: 100, category: 'non-veg', payment_modes: ['GPay', 'PhonePe'] },
  { id: 'nv13', name: 'Fish Fry', price: 140, category: 'non-veg', payment_modes: ['GPay', 'Paytm'] },
  { id: 'nv14', name: 'Egg Fried Rice', price: 100, category: 'non-veg', payment_modes: ['UPI', 'PhonePe'] },
  { id: 'nv15', name: 'Mutton Curry', price: 190, category: 'non-veg', payment_modes: ['GPay', 'Card'] },
  { id: 'nv16', name: 'Chicken Kebab', price: 150, category: 'non-veg', payment_modes: ['GPay', 'Cash on Delivery'] },
  { id: 'nv17', name: 'Prawn Masala', price: 180, category: 'non-veg', payment_modes: ['Paytm', 'Card'] },
  { id: 'nv18', name: 'Egg Biryani', price: 120, category: 'non-veg', payment_modes: ['GPay', 'UPI'] },
  { id: 'nv19', name: 'Chicken 65', price: 130, category: 'non-veg', payment_modes: ['GPay', 'PhonePe'] },
  { id: 'nv20', name: 'Fish Biryani', price: 170, category: 'non-veg', payment_modes: ['GPay', 'Paytm'] },
];

export const comboOffers: FoodItem[] = [
  { id: 'c1', name: 'Veg Combo 1', items: ['Veg Biryani', 'Paneer Butter Masala', 'Drink'], price: 200, offer: 'Save ₹30', category: 'combo', payment_modes: ['GPay', 'UPI', 'Card', 'Paytm'] },
  { id: 'c2', name: 'Veg Combo 2', items: ['Veg Fried Rice', 'Veg Burger', 'Juice'], price: 180, offer: 'Buy 1 Get 1 Half Off', category: 'combo', payment_modes: ['GPay', 'UPI', 'Card', 'Paytm'] },
  { id: 'c3', name: 'Non-Veg Combo 1', items: ['Chicken Biryani', 'Chicken Curry', 'Drink'], price: 250, offer: '20% Off', category: 'combo', payment_modes: ['GPay', 'UPI', 'Card', 'Paytm'] },
  { id: 'c4', name: 'Non-Veg Combo 2', items: ['Fish Curry', 'Fried Rice', 'Dessert'], price: 270, offer: 'Free Soft Drink', category: 'combo', payment_modes: ['GPay', 'UPI', 'Card', 'Paytm'] },
  { id: 'c5', name: 'Weekend Special Veg Combo', items: ['Veg Thali', 'Pav Bhaji', 'Sweet'], price: 220, offer: 'Save ₹40', category: 'combo', payment_modes: ['GPay', 'UPI', 'Card', 'Paytm'] },
  { id: 'c6', name: 'Weekend Special Non-Veg Combo', items: ['Mutton Biryani', 'Chicken Kebab', 'Juice'], price: 300, offer: 'Save ₹50', category: 'combo', payment_modes: ['GPay', 'UPI', 'Card', 'Paytm'] },
  { id: 'c7', name: 'Lunch Veg Combo', items: ['Dal Tadka', 'Rice', 'Curd'], price: 160, offer: 'Free Papad', category: 'combo', payment_modes: ['GPay', 'UPI', 'Card', 'Paytm'] },
  { id: 'c8', name: 'Lunch Non-Veg Combo', items: ['Egg Curry', 'Rice', 'Drink'], price: 190, offer: '10% Off', category: 'combo', payment_modes: ['GPay', 'UPI', 'Card', 'Paytm'] },
];

export const GST_RATE = 0.05; // 5%