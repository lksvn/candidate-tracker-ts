import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createPrismaClient } from "../../src/data/database/prismaClient";
import { PrismaJobOpportunityRepository } from "../../src/data/repositories/prismaJobOpportunityRepository";

const prisma = createPrismaClient();
const repository = new PrismaJobOpportunityRepository(prisma);

describe('PrismaJobOpportunityRepository', () => {
    let companyId: string | undefined;
    const opportunityIdsToDelete: string[] = [];

    beforeAll(async () => {
        const company = await prisma.company.create({
            data: {
                name: 'Integration Test Company 1',
                website: null
            }
        });

        companyId = company.id;
    });

    afterAll(async () => {
        if (opportunityIdsToDelete.length > 0) {
            await prisma.jobOpportunity.deleteMany({
                where: { id: { in: opportunityIdsToDelete } }
            });
        }

        if (companyId) {
            await prisma.company.delete({
                where: { id: companyId }
            });
        }
        
        await prisma.$disconnect();
    });

    it('creates and persists a job opportunity', async () => {
        if (!companyId) {
            throw new Error('Integration test company was not created');
        }

        const result = await repository.create({
            title: 'Senior Web Developer',
            companyId,
            description: undefined,
            model: 'remote',
            status: 'saved'
        });

        expect(result.success).toBe(true);
        if(!result.success) {
            return;
        }

        opportunityIdsToDelete.push(result.data.id);

        expect(result.data).toEqual({
            id: expect.any(String),
            title: 'Senior Web Developer',
            companyId,
            description: undefined,
            model: 'remote',
            status: 'saved'
        });

        const persistedOpportunity = await prisma.jobOpportunity.findUnique({
            where: { id: result.data.id }
        });

        expect(persistedOpportunity).toEqual({
            id: result.data.id,
            title: 'Senior Web Developer',
            companyId,
            description: null,
            model: 'remote',
            status: 'saved'
        });
    });

    it('finds all opportunities with a company', async () => {
        if (!companyId) {
            throw new Error('Integration test company was not created');
        }

        const opportunity = await prisma.jobOpportunity.create({
            data: {
                title: 'Joined Opportunity',
                description: 'Tests the joined read model.',
                model: 'hybrid',
                status: 'applied',
                company: {
                    connect: { id: companyId }
                }
            }
        });

        opportunityIdsToDelete.push(opportunity.id);

        const result = await repository.findAllWithCompany();
        if (!result.success) {
            throw new Error(`Expected opportunity query to succeed: ${result.error.message}`);
        }

        expect(result.data).toContainEqual({
            id: opportunity.id,
            title: 'Joined Opportunity',
            companyId,
            description: 'Tests the joined read model.',
            model: 'hybrid',
            status: 'applied',
            company: {
                id: companyId,
                name: 'Integration Test Company 1'
            }
        });
    });

    it('fails when creating for a nonexistent company', async () => {
        const result = await repository.create({
            title: 'Invalid Opportunity',
            companyId: randomUUID(),
            description: undefined,
            model: 'remote',
            status: 'saved'
        });

        expect(result).toMatchObject({
            success: false,
            error: {
                type: 'repository',
                code: 'QUERY_FAILED',
                message: 'Could not create job opportunity'
            }
        });
    });
});