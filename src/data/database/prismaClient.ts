import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../generated/prisma/client';

// Next.js reloads modules during development. Store the shared client on
// globalThis so hot reloads reuse the same PostgreSQL connection pool.
const globalForPrisma = globalThis as typeof globalThis & {
    prisma?: PrismaClient;
}

// Application code should reuse this client instead of creating one per request.
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Production modules are loaded normally, so the global hot-reload cache is
// only necessary during development.
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

// Tests and standalone scripts can create and manage an independent client.
export function createPrismaClient(): PrismaClient {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error('DATABASE_URL is not configured');
    }

    const adapter = new PrismaPg({ connectionString });

    return new PrismaClient({ adapter });
}
