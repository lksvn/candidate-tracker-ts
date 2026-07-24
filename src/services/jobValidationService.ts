import type { CreateJobOpportunityInput, JobOpportunity } from '../domain/jobOpportunity';
import type { Company } from '../domain/company';

type JobOpportunityValidationIssue = {
    jobOpportunityId: string;
    reason: 'missing-title' | 'company-not-found';
};

export type CreateJobOpportunityValidationIssue = {
    field: 'title' | 'companyId';
    reason: 'blank-title' | 'blank-company-id';
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

export function validateCreateJobOpportunityInput(input: CreateJobOpportunityInput): CreateJobOpportunityValidationIssue[] {
    const issues: CreateJobOpportunityValidationIssue[] = [];

    if (input.title.trim() === '') {
        issues.push({ field: 'title', reason: 'blank-title' });
    }

    if (input.companyId.trim() === '') {
        issues.push({ field: 'companyId', reason: 'blank-company-id' });
    }

    return issues;
}
