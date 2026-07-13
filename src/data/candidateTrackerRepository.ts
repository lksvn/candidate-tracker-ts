import { Company } from '../domain/company';
import { Client } from '../domain/client';
import { FreelanceOpportunity } from '../domain/freelance';
import { Interview } from '../domain/interview';
import { JobOpportunity } from '../domain/jobOpportunity';
import { Project } from '../domain/project';
import * as Seed from './seed';
import { AsyncResult, failureResult, successResult } from '../shared/result';

export async function fetchCompanies(): Promise<AsyncResult<Company[]>> {
    return successResult(Seed.companies);
}

export async function fetchClients(): Promise<AsyncResult<Client[]>> {
    return successResult(Seed.clients);
}

export async function fetchJobOpportunities(): Promise<AsyncResult<JobOpportunity[]>> {
    if (Seed.jobs.length === 0) {
        return failureResult('No job opportunities found');
    }
    return successResult(Seed.jobs);
}

export async function fetchInterviews(): Promise<AsyncResult<Interview[]>> {
    return successResult(Seed.interviews);
}

export async function fetchInterviewsForJobOpportunities(jobIds: string[]): Promise<AsyncResult<Interview[]>> {
    const interviews = Seed.interviews.filter((interview) => jobIds.includes(interview.jobOpportunityId));

    return successResult(interviews);
}

export async function fetchFreelanceOpportunities(): Promise<AsyncResult<FreelanceOpportunity[]>> {
    return successResult(Seed.freelanceOpportunities);
}

export async function fetchProjects(): Promise<AsyncResult<Project[]>> {
    return successResult(Seed.projects);
}
