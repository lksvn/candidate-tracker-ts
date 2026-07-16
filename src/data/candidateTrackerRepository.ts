import { Company } from '../domain/company';
import { Client } from '../domain/client';
import { FreelanceOpportunity } from '../domain/freelance';
import { Interview } from '../domain/interview';
import { JobOpportunity } from '../domain/jobOpportunity';
import { Project } from '../domain/project';
import * as Seed from './seed';
import type { Result } from '../shared/result';
import { successResult } from '../shared/result';

export async function fetchCompanies(): Promise<Result<Company[], never>> {
    return successResult(Seed.companies);
}

export async function fetchClients(): Promise<Result<Client[], never>> {
    return successResult(Seed.clients);
}

export async function fetchJobOpportunities(): Promise<Result<JobOpportunity[], never>> {
    return successResult(Seed.jobs);
}

export async function fetchInterviews(): Promise<Result<Interview[], never>> {
    return successResult(Seed.interviews);
}

export async function fetchInterviewsForJobOpportunities(jobIds: string[]): Promise<Result<Interview[], never>> {
    const interviews = Seed.interviews.filter((interview) => jobIds.includes(interview.jobOpportunityId));

    return successResult(interviews);
}

export async function fetchFreelanceOpportunities(): Promise<Result<FreelanceOpportunity[], never>> {
    return successResult(Seed.freelanceOpportunities);
}

export async function fetchProjects(): Promise<Result<Project[], never>> {
    return successResult(Seed.projects);
}
