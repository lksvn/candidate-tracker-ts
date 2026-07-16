import { describe, expect, it } from "vitest";
import type { Company, CreateCompanyInput, UpdateCompanyInput } from "../../src/domain/company";
import { createCompany, getCompanyById, updateCompany } from "../../src/services/companyService";

const companies: Company[] = [
    { id: '1', name: 'TechFlow Solutions', website: null },
    { id: '2', name: 'Nexus Digital', website: null },
    { id: '3', name: 'Stellar Labs', website: null }
];

describe('getCompanyById', () => {
    it('returns the selected company', () => {
        expect(getCompanyById(companies, '1')).toEqual(
            { id: '1', name: 'TechFlow Solutions', website: null }
        );
    });

    it('returns undefined when no company matches', () => {
        expect(getCompanyById(companies, '55')).toBeUndefined();
    });
});

describe('createCompany', () => {
    it('creates a company with the provided id', () => {
        const input: CreateCompanyInput = {
            name: 'New Company',
            website: 'https://google.com'
        };

        expect(createCompany('new-company-1', input)).toEqual({
            id: 'new-company-1',
            name: 'New Company',
            website: 'https://google.com'
        });
    });

    it('normalizes an omitted website to null', () => {
        expect(createCompany('new-company-2', {
            name: 'Company Without Website'
        })).toEqual({
            id: 'new-company-2',
            name: 'Company Without Website',
            website: null
        });
    });
});

describe('updateCompany', () => {
    it('updates only the provided company fields', () => {
        const input: UpdateCompanyInput = {
            website: 'https://yahoo.com'
        };

        expect(updateCompany(companies[0], input)).toEqual({
            id: '1',
            name: 'TechFlow Solutions',
            website: 'https://yahoo.com'
        });
    });

    it('clears the website when null is provided', () => {
        const company: Company = {
            id: '1',
            name: 'TechFlow Solutions',
            website: 'https://techflow.example.com'
        };

        expect(updateCompany(company, { website: null })).toEqual({
            id: '1',
            name: 'TechFlow Solutions',
            website: null
        });
    });
});
