import { describe, expect, it } from "vitest";
import { Company } from "../../src/domain/company";
import { createCompany, getCompanyById, updateCompany } from "../../src/services/companyService";

const companies: Company[] = [
    { id: '1', name: 'TechFlow Solutions' },
    { id: '2', name: 'Nexus Digital' },
    { id: '3', name: 'Stellar Labs' }
];

describe('getCompanyById', () => {
    it('returns the selected company', () => {
        expect(getCompanyById(companies, '1')).toEqual(
            { id: '1', name: 'TechFlow Solutions' }
        );
    });

    it('returns undefined when no company matches', () => {
        expect(getCompanyById(companies, '55')).toBeUndefined();
    });
});

describe('createCompany', () => {
    it('creates a company with the provided id', () => {
        const input: Omit<Company, 'id'> = {
            name: 'New Company',
            website: 'https://google.com'
        };

        expect(createCompany('new-company-1', input)).toEqual({
            id: 'new-company-1',
            name: 'New Company',
            website: 'https://google.com'
        });
    });
});

describe('updateCompany', () => {
    it('updates only the provided company fields', () => {
        const input: Partial<Omit<Company, 'id'>> = {
            website: 'https://yahoo.com'
        };

        expect(updateCompany(companies[0], input)).toEqual({
            id: '1',
            name: 'TechFlow Solutions',
            website: 'https://yahoo.com'
        });
    });
});