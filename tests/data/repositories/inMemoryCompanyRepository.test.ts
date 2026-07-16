import { describe, expect, it } from 'vitest';
import type { Company } from '../../../src/domain/company';
import { InMemoryCompanyRepository } from '../../../src/data/repositories/inMemoryCompanyRepository';

const companies: Company[] = [
    {
        id: 'company-1',
        name: 'TechFlow Solutions',
        website: null
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
        const newItem: Company = {
            id: 'company-3',
            name: 'Company Test',
            website: null
        };

        if (firstResult.success) {
            firstResult.data.push(newItem);
        }

        const secondResult = await repository.findAll();
        expect(secondResult.success).toBe(true);

        if (secondResult.success) {
            expect(secondResult.data).not.toContainEqual(newItem);
        }
    });

    it('creates and stores a company using the generated ID', async () => {
        const generateId = () => 'company-3';
        const repository = new InMemoryCompanyRepository(
            companies,
            generateId
        );

        const result = await repository.create({
            name: 'New Company'
        });

        expect(result).toEqual({
            success: true,
            data: {
                id: 'company-3',
                name: 'New Company',
                website: null
            }
        });

        const persistedResult = await repository.findById('company-3');

        expect(persistedResult).toEqual(result);
    });

    it('creates and stores a company using the generated ID and website', async () => {
        const generateId = () => 'company-3';
        const repository = new InMemoryCompanyRepository(
            companies,
            generateId
        );

        const result = await repository.create({
            name: 'New Company',
            website: 'http://website.com'
        });

        expect(result).toEqual({
            success: true,
            data: {
                id: 'company-3',
                name: 'New Company',
                website: 'http://website.com'
            }
        });

        const persistedResult = await repository.findById('company-3');

        expect(persistedResult).toEqual(result);
    });

    it('updates a company name and website', async () => {
        const repository = new InMemoryCompanyRepository(companies);

        const result = await repository.update('company-2', {
            name: 'New Company Name',
            website: 'https://company.site'
        });

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual({
                id: 'company-2',
                name: 'New Company Name',
                website: 'https://company.site'
            });
        }

        const persistedResult = await repository.findById('company-2');
        expect(persistedResult).toEqual(result);
    });

    it('clear the company website', async () => {
        const repository = new InMemoryCompanyRepository(companies);

        const result = await repository.update('company-2', {
            website: null
        });

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual({
                id: 'company-2',
                name: 'Nexus Digital',
                website: null
            });
        }
    });

    it('updates only the company name', async () => {
        const repository = new InMemoryCompanyRepository(companies);

        const result = await repository.update('company-2', {
            name: 'New Company Name'
        });

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual({
                id: 'company-2',
                name: 'New Company Name',
                website: 'https://nexus.example.com'
            });
        }
    });

    it('returns undefined when company not found', async () => {
        const repository = new InMemoryCompanyRepository(companies);

        const result = await repository.update('company-4', {
            name: 'New Company Name'
        });

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toBe(undefined);
        }
    });
});
