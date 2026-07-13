import { FreelanceOpportunity, FreelanceOpportunityStatus } from '../domain/freelance';
import { filterByProperty } from '../shared/collectionUtils';

type CreateFreelanceOpportunityInput = Omit<FreelanceOpportunity, 'id'>;
type UpdateFreelanceOpportunityInput = Partial<Omit<FreelanceOpportunity, 'id' | 'clientId'>>;

export function getOpportunitiesByStatus(opportunities: FreelanceOpportunity[], status: FreelanceOpportunityStatus): FreelanceOpportunity[] {
    return filterByProperty(opportunities, 'status', status);
}

export function getSignedOpportunities(opportunities: FreelanceOpportunity[]): FreelanceOpportunity[] {
    return getOpportunitiesByStatus(opportunities, 'contract-signed');
}

export function createFreelanceOpportunity(id: string, input: CreateFreelanceOpportunityInput): FreelanceOpportunity {
    return {
        id,
        ...input
    };
}

export function updateFreelanceOpportunity(opportunity: FreelanceOpportunity, input: UpdateFreelanceOpportunityInput): FreelanceOpportunity {
    return {
        ...opportunity,
        ...input
    };
}
