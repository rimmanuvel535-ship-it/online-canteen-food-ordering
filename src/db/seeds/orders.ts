import { db } from '@/db';
import { orders } from '@/db/schema';

async function main() {
    const now = new Date();
    
    // Helper function to subtract minutes from current time
    const minutesAgo = (minutes: number) => {
        const date = new Date(now);
        date.setMinutes(date.getMinutes() - minutes);
        return date.toISOString();
    };
    
    // Helper function to add minutes to a timestamp
    const addMinutes = (timestamp: string, minutes: number) => {
        const date = new Date(timestamp);
        date.setMinutes(date.getMinutes() + minutes);
        return date.toISOString();
    };
    
    // Helper function to subtract hours
    const hoursAgo = (hours: number) => {
        const date = new Date(now);
        date.setHours(date.getHours() - hours);
        return date.toISOString();
    };
    
    // Helper function to subtract days
    const daysAgo = (days: number) => {
        const date = new Date(now);
        date.setDate(date.getDate() - days);
        return date.toISOString();
    };

    const sampleOrders = [
        {
            userId: 1,
            customerName: 'John Doe',
            phone: '9876543210',
            deliveryAddress: '123 Main Street, Apartment 4B, Mumbai',
            paymentMode: 'upi',
            subtotal: 298,
            gst: 30,
            total: 328,
            status: 'pending',
            orderTime: minutesAgo(5),
            estimatedDelivery: addMinutes(minutesAgo(5), 30),
            createdAt: minutesAgo(5),
        },
        {
            userId: 2,
            customerName: 'Sarah Smith',
            phone: '9876543211',
            deliveryAddress: '456 Park Avenue, Floor 2, Delhi',
            paymentMode: 'cash',
            subtotal: 179,
            gst: 18,
            total: 197,
            status: 'preparing',
            orderTime: minutesAgo(15),
            estimatedDelivery: addMinutes(minutesAgo(15), 30),
            createdAt: minutesAgo(15),
        },
        {
            userId: 1,
            customerName: 'John Doe',
            phone: '9876543210',
            deliveryAddress: '123 Main Street, Apartment 4B, Mumbai',
            paymentMode: 'card',
            subtotal: 249,
            gst: 25,
            total: 274,
            status: 'out-for-delivery',
            orderTime: minutesAgo(25),
            estimatedDelivery: addMinutes(minutesAgo(25), 30),
            createdAt: minutesAgo(25),
        },
        {
            userId: 3,
            customerName: 'Mike Johnson',
            phone: '9876543212',
            deliveryAddress: '789 Beach Road, Villa 12, Bangalore',
            paymentMode: 'upi',
            subtotal: 358,
            gst: 36,
            total: 394,
            status: 'delivered',
            orderTime: hoursAgo(2),
            estimatedDelivery: addMinutes(hoursAgo(2), 30),
            createdAt: hoursAgo(2),
        },
        {
            userId: 2,
            customerName: 'Sarah Smith',
            phone: '9876543211',
            deliveryAddress: '456 Park Avenue, Floor 2, Delhi',
            paymentMode: 'cash',
            subtotal: 129,
            gst: 13,
            total: 142,
            status: 'delivered',
            orderTime: daysAgo(1),
            estimatedDelivery: addMinutes(daysAgo(1), 30),
            createdAt: daysAgo(1),
        },
    ];

    await db.insert(orders).values(sampleOrders);
    
    console.log('✅ Orders seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});