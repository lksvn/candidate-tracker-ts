import { JobOpportunity, JobModel, JobStatus, CreateJobOpportunityInput, UpdateJobOpportunityInput } from '../domain/jobOpportunity';
import { filterByProperty } from '../shared/collectionUtils';

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
