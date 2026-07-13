import { JobOpportunity, JobModel, JobStatus } from '../domain/jobOpportunity';
import { filterByProperty } from '../shared/collectionUtils';

// Defines the input types with restrictions using Omit and Partial
type CreateJobOpportunityInput = Omit<JobOpportunity, 'id'>; // use the JobOpportunity interface and omit the 'id' property for creation input
type UpdateJobOpportunityInput = Partial<Omit<JobOpportunity, 'id' | 'companyId'>>; // may update any property except 'id' and 'companyId', every other field is optional

export function getSavedJobs(jobs: JobOpportunity[]): JobOpportunity[] {
    return jobs.filter((job) => job.status === 'saved');
}

export function getJobsByModel(jobs: JobOpportunity[], model: JobModel): JobOpportunity[] {
    return filterByProperty(jobs, 'model', model);
}

export function getJobsByStatus(jobs: JobOpportunity[], status: JobStatus): JobOpportunity[] {
    return filterByProperty(jobs, 'status', status);
}

export function createJobOpportunity(id: string, input: CreateJobOpportunityInput): JobOpportunity {
    return {
        id,
        ...input
    };
}

export function updateJobOpportunity(job: JobOpportunity, input: UpdateJobOpportunityInput): JobOpportunity {
    return {
        ...job,
        ...input
    };
}
