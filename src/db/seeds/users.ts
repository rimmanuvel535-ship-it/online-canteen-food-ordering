import { db } from '@/db';
import { users } from '@/db/schema';
import bcrypt from 'bcrypt';

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const sampleUsers = [
        {
            name: 'John Doe',
            email: 'john@example.com',
            password: hashedPassword,
            phone: '9876543210',
            createdAt: new Date('2024-01-15T09:00:00Z').toISOString(),
        },
        {
            name: 'Sarah Smith',
            email: 'sarah@example.com',
            password: hashedPassword,
            phone: '9876543211',
            createdAt: new Date('2024-01-20T10:30:00Z').toISOString(),
        },
        {
            name: 'Mike Johnson',
            email: 'mike@example.com',
            password: hashedPassword,
            phone: '9876543212',
            createdAt: new Date('2024-02-01T14:15:00Z').toISOString(),
        }
    ];

    await db.insert(users).values(sampleUsers);
    
    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});