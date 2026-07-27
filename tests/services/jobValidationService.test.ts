import { describe, expect, it } from "vitest";
import { validateCreateJobOpportunityInput, validateJobOpportunities } from "../../src/services/jobValidationService";
import type { Company } from "../../src/domain/company";
import type { JobOpportunity } from "../../src/domain/jobOpportunity";

describe('validateJobOpportunity', () => {
    const companies: Company[] = [{
        id: '1',
        name: 'TechFlow Solutions',
        website: 'https://techflow.example.com'
    },
    {
        id: '2',
        name: 'Nexus Digital',
        website: 'https://nexusdigital.example.com'
    }];

    it('returns an issue when the opportunity company does not exist', () => {
        const opportunity: JobOpportunity[] = [{
            id: '1',
            title: 'Company does not exist',
            companyId: '333',
            description: null,
            model: "hybrid",
            status: "applied"
        }];

        expect(validateJobOpportunities(opportunity, companies)).toEqual([ { jobOpportunityId: '1', reason: 'company-not-found'} ]);
    });

    it('returns an issue when the opportunity title is missing or empty', () => {
        const opportunity: JobOpportunity[] = [{
            id: '1',
            title: '',
            companyId: '2',
            description: null,
            model: "hybrid",
            status: "applied"
        }];

        expect(validateJobOpportunities(opportunity, companies)).toEqual([ { jobOpportunityId: '1', reason: 'missing-title'} ]);
    });

    it('returns no issues when all opportunities are valid', () => {
        const opportunity: JobOpportunity[] = [{
            id: '1',
            title: 'No issues found',
            companyId: '1',
            description: null,
            model: "hybrid",
            status: "applied"
        }];

        expect(validateJobOpportunities(opportunity, companies)).toEqual([]);        
    });
});

describe('validateCreateJobOpportunityInput', () => {
    const validInput = {
        title: 'Developer',
        companyId: 'company-id',
        description: 'testing creation',
        model: 'remote',
        status: 'saved',
    } as const;

    it('returns no issues when the input is valid', () => {
        expect(validateCreateJobOpportunityInput(validInput)).toEqual([]);
    });

    it('returns an issue when the input title is missing or empty', () => {
        expect(validateCreateJobOpportunityInput({
            ...validInput,
            title: ''
        })).toEqual([ { field: 'title', reason: 'blank-title' } ]);
    });

    it('returns an issue when the input title is space only', () => {
        expect(validateCreateJobOpportunityInput({
            ...validInput,
            title: '    '
        })).toEqual([ { field: 'title', reason: 'blank-title' } ]);
    });

    it('returns an issue when the input companyId is missing or empty', () => {
        expect(validateCreateJobOpportunityInput({
            ...validInput,
            companyId: ''
        })).toEqual([ { field: 'companyId', reason: 'blank-company-id' } ]);
    });

    it('returns an issue when the input companyId is space only', () => {
        expect(validateCreateJobOpportunityInput({
            ...validInput,
            companyId: '    '
        })).toEqual([ { field: 'companyId', reason: 'blank-company-id' } ]);
    });

    it('returns an issue when the input companyId and title are missing or empty', () => {
        expect(validateCreateJobOpportunityInput({
            ...validInput,
            title: '',
            companyId: '    '
        })).toEqual([
            { field: 'title', reason: 'blank-title' },
            { field: 'companyId', reason: 'blank-company-id' }
        ]);
    });
});
