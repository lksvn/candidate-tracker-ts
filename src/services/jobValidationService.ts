import { JobOpportunity } from '../domain/jobOpportunity';
import { Company } from '../domain/company';

type JobOpportunityValidationIssue = {
    jobOpportunityId: string;
    reason: 'missing-title' | 'company-not-found';
};

export function validateJobOpportunities(jobOpportunities: JobOpportunity[], companies: Company[]): JobOpportunityValidationIssue[] {
    const issues: JobOpportunityValidationIssue[] = [];

    for (const job of jobOpportunities) {

        const companyExists = companies.some(company => company.id === job.companyId); //some = there's any company with this job?

        if (!companyExists) {
            issues.push({ jobOpportunityId: job.id, reason: 'company-not-found' });
            continue;
        }

        if (!job.title || job.title.trim() === '') {
            issues.push({ jobOpportunityId: job.id, reason: 'missing-title' });
            continue;
        }
    }

    return issues;
}