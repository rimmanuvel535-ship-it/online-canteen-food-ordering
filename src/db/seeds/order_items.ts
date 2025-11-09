import { db } from '@/db';
import { orderItems } from '@/db/schema';

async function main() {
    const sampleOrderItems = [
        {
            orderId: 1,
            foodItemId: 1,
            quantity: 2,
            price: 149,
            createdAt: new Date('2024-01-15T10:30:00').toISOString(),
        },
        {
            orderId: 2,
            foodItemId: 21,
            quantity: 1,
            price: 179,
            createdAt: new Date('2024-01-15T11:45:00').toISOString(),
        },
        {
            orderId: 3,
            foodItemId: 49,
            quantity: 1,
            price: 249,
            createdAt: new Date('2024-01-15T13:20:00').toISOString(),
        },
        {
            orderId: 4,
            foodItemId: 22,
            quantity: 1,
            price: 199,
            createdAt: new Date('2024-01-15T14:10:00').toISOString(),
        },
        {
            orderId: 4,
            foodItemId: 18,
            quantity: 1,
            price: 159,
            createdAt: new Date('2024-01-15T14:10:00').toISOString(),
        },
        {
            orderId: 5,
            foodItemId: 2,
            quantity: 1,
            price: 129,
            createdAt: new Date('2024-01-15T15:30:00').toISOString(),
        },
    ];

    await db.insert(orderItems).values(sampleOrderItems);
    
    console.log('✅ Order items seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});