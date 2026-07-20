import { describe, expect, it } from "vitest";
import { isCompany, isCreateCompanyInput } from "../../../src/data/validation/companyShapeValidator";

describe('isCompany', () => {
    it('valid company with website', () => {
        const item = { id: '1', name: 'TechFlow Solutions', website: 'https://techflow.example.com' };

        expect(isCompany(item)).toBe(true);
    });

    it('invalid company without website', () => {
        const item = { id: '1', name: 'TechFlow Solutions' };

        expect(isCompany(item)).toBe(false);
    });

    it('valid company with empty fields', () => {
        const item = { id: '', name: '', website: '' };

        expect(isCompany(item)).toBe(true);
    });

    it('valid company with null website', () => {
        const item = { id: '1', name: 'TechFlow Solutions', website: null };

        expect(isCompany(item)).toBe(true);
    });

    it('invalid company with number ID', () => {
        const item = { id: 1, name: 'TechFlow Solutions', website: 'https://techflow.example.com' };

        expect(isCompany(item)).toBe(false);
    });

    it('invalid company with boolean name', () => {
        const item = { id: '1', name: false, website: 'https://techflow.example.com' };

        expect(isCompany(item)).toBe(false);
    });

    it('invalid company with boolean website', () => {
        const item = { id: '1', name: 'TechFlow Solutions', website: false };

        expect(isCompany(item)).toBe(false);
    });

    it('invalid company with empty object', () => {
        const item = {};

        expect(isCompany(item)).toBe(false);
    });

    it('rejects an array input', () => {
        const item: unknown = [];

        expect(isCompany(item)).toBe(false);
    });

    it.each([null, 'company', 123, true])('rejects non-object input: %p', (input) => {
        expect(isCompany(input)).toBe(false);
    });
});

describe('isCreateCompanyInput', () => {
    it('valid company with null website', () => {
        const item = { name: 'TechFlow Solutions', website: null };

        expect(isCreateCompanyInput(item)).toBe(true);
    });

    it('valid company with all fields', () => {
        const item = { name: 'TechFlow Solutions', website: 'https://techflow.example.com' };

        expect(isCreateCompanyInput(item)).toBe(true);
    });

    it('valid company with only name', () => {
        const item = { name: 'TechFlow Solutions' };

        expect(isCreateCompanyInput(item)).toBe(true);
    });

    it('valid company with empty fields', () => {
        const item = { name: '', website: '' };

        expect(isCreateCompanyInput(item)).toBe(true);
    });

    it('invalid company without name', () => {
        const item = { website: 'https://techflow.example.com' };

        expect(isCreateCompanyInput(item)).toBe(false);
    });
    
    it('invalid company with non-string website', () => {
        const item = { name: 'TechFlow Solutions', website: true };

        expect(isCreateCompanyInput(item)).toBe(false);
    });
    
    it('rejects an array input', () => {
        const item: unknown = [];

        expect(isCreateCompanyInput(item)).toBe(false);
    });

    it.each([null, 'company', 123, true])('rejects non-object input: %p', (input) => {
        expect(isCreateCompanyInput(input)).toBe(false);
    });
});
