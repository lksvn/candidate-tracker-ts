import { Project } from '../domain/project';
import { FreelanceOpportunity } from '../domain/freelance';
import { findById } from '../shared/collectionUtils';

type ProjectValidationIssue = {
    projectId: string;
    reason: 'opportunity-not-signed' | 'opportunity-not-found' | 'client-mismatch';
};

export function validateProjects(projects: Project[], opportunities: FreelanceOpportunity[]): ProjectValidationIssue[] {
    // assign the type to the issues array 
    // normally i use "foo = []", with TS i can set the type explicitly to avoid any type inference issues
    const issues: ProjectValidationIssue[] = []; 

    for (const project of projects) {

        const opportunity = findById(opportunities, project.opportunityId);

        if(!opportunity) {
            issues.push({ projectId: project.id, reason: 'opportunity-not-found' });
            continue;
        }

        if(opportunity.status !== 'contract-signed') {
            issues.push({ projectId: project.id, reason: 'opportunity-not-signed' });
            continue;
        }

        if(opportunity.clientId !== project.clientId) {
            issues.push({ projectId: project.id, reason: 'client-mismatch' });
            continue;
        }
    }

    return issues;
}