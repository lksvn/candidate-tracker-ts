import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createPrismaClient } from '../../src/data/database/prismaClient';
import { PrismaCompanyRepository } from '../../src/data/repositories/prismaCompanyRepository';

const prisma = createPrismaClient();
const repository = new PrismaCompanyRepository(prisma);

describe('PrismaCompanyRepository', () => {
    let companyId: string | undefined;

    beforeAll(async () => {
        const company = await prisma.company.create({
            data: {
                name: 'Integration Test Company',
                website: null
            }
        });

        companyId = company.id;
    });

    afterAll(async () => {
        if (companyId) {
            await prisma.company.deleteMany({
                where: { id: companyId }
            });
        }

        await prisma.$disconnect();
    });

    it('finds a company by ID', async () => {
        if (!companyId) {
            throw new Error('Integration test company was not created');
        }

        const result = await repository.findById(companyId);

        expect(result).toEqual({
            success: true,
            data: {
                id: companyId,
                name: 'Integration Test Company',
                website: null
            }
        });
    });

    it('includes persisted companies when finding all', async () => {
        if (!companyId) {
            throw new Error('Integration test company was not created');
        }

        const result = await repository.findAll();

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toContainEqual({
                id: companyId,
                name: 'Integration Test Company',
                website: null
            });
        }
    });
});
