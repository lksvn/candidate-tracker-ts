import { describe, expect, it } from "vitest";
import { validateJobOpportunities } from "../../src/services/jobValidationService";
import { Company } from "../../src/domain/company";
import { JobOpportunity } from "../../src/domain/jobOpportunity";

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
            model: "hybrid",
            status: "applied"
        }];

        expect(validateJobOpportunities(opportunity, companies)).toEqual([]);        
    });
});