import { describe, expect, it } from 'vitest';
import type { Company } from '../../../src/domain/company';
import { InMemoryCompanyRepository } from '../../../src/data/repositories/inMemoryCompanyRepository';

const companies: Company[] = [
    {
        id: 'company-1',
        name: 'TechFlow Solutions'
    },
    {
        id: 'company-2',
        name: 'Nexus Digital',
        website: 'https://nexus.example.com'
    }
];

describe('InMemoryCompanyRepository', () => {
    it('returns all companies', async () => {
        const repository = new InMemoryCompanyRepository(companies);

        const result = await repository.findAll();

        expect(result).toEqual({
            success: true,
            data: companies
        });
    });

    it('returns undefined when no company matches', async () => {
        const repository = new InMemoryCompanyRepository(companies);

        const result = await repository.findById('missing-company');

        expect(result).toEqual({
            success: true,
            data: undefined
        });
    });

    it('returns the company matching the provided ID', async () => {
        const repository = new InMemoryCompanyRepository(companies);

        const result = await repository.findById('company-2');

        expect(result).toEqual({
            success: true,
            data: {
                id: 'company-2',
                name: 'Nexus Digital',
                website: 'https://nexus.example.com'
            }
        });
    });

    it('does not expose its internal company array', async () => {
        const repository = new InMemoryCompanyRepository(companies);

        const firstResult = await repository.findAll();
        const newItem: Company = { id: 'company-3', name: 'Company Test' };

        if (firstResult.success) {
            firstResult.data.push(newItem);
        }

        const secondResult = await repository.findAll();
        expect(secondResult.success).toBe(true);

        if (secondResult.success) {
            expect(secondResult.data).not.toContainEqual(newItem);
        }
    });
});
