import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createPrismaClient } from '../../src/data/database/prismaClient';
import { PrismaCompanyRepository } from '../../src/data/repositories/prismaCompanyRepository';

const prisma = createPrismaClient();
const repository = new PrismaCompanyRepository(prisma);

describe('PrismaCompanyRepository', () => {
    let companyId: string | undefined;
    const companyIdsToDelete: string[] = [];

    beforeAll(async () => {
        const company = await prisma.company.create({
            data: {
                name: 'Integration Test Company 1',
                website: null
            }
        });

        companyId = company.id;
        companyIdsToDelete.push(company.id);
    });

    afterAll(async () => {
        if (companyIdsToDelete.length > 0) {
            await prisma.company.deleteMany({
                where: { id: { in: companyIdsToDelete } }
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
                name: 'Integration Test Company 1',
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
                name: 'Integration Test Company 1',
                website: null
            });
        }
    });

    it('creates and persists a company', async () => {
        const result = await repository.create({
            name: 'Company Created Through Repository'
        });

        expect(result.success).toBe(true);
        if (!result.success) {
            return;
        }

        companyIdsToDelete.push(result.data.id);

        expect(result.data).toEqual({
            id: expect.any(String),
            name: 'Company Created Through Repository',
            website: null
        });

        const persistedCompany = await prisma.company.findUnique({
            where: { id: result.data.id }
        });

        expect(persistedCompany).toEqual(result.data);
    });

    it('updates and persists a company', async () => {
        const company = await prisma.company.create({
            data: {
                name: 'Company Before Update',
                website: 'https://before.example.com'
            }
        });

        companyIdsToDelete.push(company.id);

        const result = await repository.update(company.id, {
            name: 'Company After Update'
        });

        expect(result).toEqual({
            success: true,
            data: {
                id: company.id,
                name: 'Company After Update',
                website: 'https://before.example.com'
            }
        });

        const persistedCompany = await prisma.company.findUnique({
            where: { id: company.id }
        });

        expect(persistedCompany).toEqual(result.success
            ? result.data
            : undefined
        );
    });

    it('clear the company website', async () => {
        const company = await prisma.company.create({
            data: {
                name: 'Company Before Update',
                website: 'https://before.example.com'
            }
        });

        companyIdsToDelete.push(company.id);

        const result = await repository.update(company.id, {
            name: 'Company After Update',
            website: null
        });

        expect(result).toEqual({
            success: true,
            data: {
                id: company.id,
                name: 'Company After Update',
                website: null
            }
        });

        const persistedCompany = await prisma.company.findUnique({
            where: { id: company.id }
        });

        expect(persistedCompany).toEqual(result.success
            ? result.data
            : undefined
        );
    });

    it('returns undefined when the company does not exist', async () => {
        const missingId = randomUUID();
        
        const result = await repository.update(missingId, {
            name: 'Company After Update',
            website: null
        });

        expect(result).toEqual({
            success: true,
            data: undefined
        });
    });
});
