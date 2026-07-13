import { describe, expect, it } from "vitest";
import { validateFreelanceOpportunities } from "../../src/services/freelanceValidationService";
import { FreelanceOpportunity } from '../../src/domain/freelance';
import { Client } from '../../src/domain/client';

describe('validateFreelanceOpportunities', () => {
    const clients: Client[] = [
        {
            id: '1',
            name: 'Ana Costa'
        },
        {
            id: '2',
            name: 'Rafael Oliveira'
        }
    ];

    it('returns an issue when the opportunity client does not exist', () => {
        const freelance: FreelanceOpportunity[] = [{
            id: '11',
            clientId: '99',
            projectBrief: {
                id: 'pb11',
                name: 'Nonexistent Client Project'
            },
            status: 'new'
        }];

        expect(validateFreelanceOpportunities(freelance, clients)).toEqual([ { freelanceOpportunityId: '11', reason: 'client-not-found' } ]);
    });

    it('returns no issues when all opportunities are valid', () => {
        const freelance: FreelanceOpportunity[] = [{
            id: '11',
            clientId: '2',
            projectBrief: {
                id: 'pb11',
                name: 'Valid freelance'
            },
            status: 'new'
        }];

        expect(validateFreelanceOpportunities(freelance, clients)).toEqual([]);        
    });
});