import { FreelanceOpportunity } from '../domain/freelance';
import { Client } from '../domain/client';

type FreelanceOpportunityValidationIssue = {
    freelanceOpportunityId: string;
    reason: 'client-not-found';
};

export function validateFreelanceOpportunities(freelanceOpportunities: FreelanceOpportunity[], clients: Client[]): FreelanceOpportunityValidationIssue[] {
    const issues: FreelanceOpportunityValidationIssue[] = [];

    for (const freelance of freelanceOpportunities) {

        const clientExists = clients.some(client => client.id === freelance.clientId); //some = there's any freelance with this client?

        if (!clientExists) {
            issues.push({ freelanceOpportunityId: freelance.id, reason: 'client-not-found' });
            continue;
        }
    }

    return issues;
}