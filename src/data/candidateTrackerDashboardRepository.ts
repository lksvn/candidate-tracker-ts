import { Company } from '../domain/company';
import { Client } from '../domain/client';
import { FreelanceOpportunity } from '../domain/freelance';
import { Interview } from '../domain/interview';
import { JobOpportunity } from '../domain/jobOpportunity';
import { Project } from '../domain/project';
import { AsyncResult, failureResult, successResult } from '../shared/result';
import {
    fetchClients,
    fetchCompanies,
    fetchFreelanceOpportunities,
    fetchInterviewsForJobOpportunities,
    fetchJobOpportunities,
    fetchProjects
} from './candidateTrackerRepository';

type CandidateTrackerDashboardData = {
    companies: Company[];
    clients: Client[];
    jobs: JobOpportunity[];
    interviews: Interview[];
    freelanceOpportunities: FreelanceOpportunity[];
    projects: Project[];
};

export async function fetchCandidateTrackerDashboardData(): Promise<AsyncResult<CandidateTrackerDashboardData>> {
    const [
        companiesResult,
        clientsResult,
        jobsResult,
        freelanceOpportunitiesResult,
        projectsResult
    ] = await Promise.all([
        fetchCompanies(),
        fetchClients(),
        fetchJobOpportunities(),
        fetchFreelanceOpportunities(),
        fetchProjects()
    ]);

    if (!companiesResult.success) {
        return failureResult(companiesResult.error);
    }

    if (!clientsResult.success) {
        return failureResult(clientsResult.error);
    }

    if (!jobsResult.success) {
        return failureResult(jobsResult.error);
    }

    if (!freelanceOpportunitiesResult.success) {
        return failureResult(freelanceOpportunitiesResult.error);
    }

    if (!projectsResult.success) {
        return failureResult(projectsResult.error);
    }

    const jobIds = jobsResult.data.map((job) => job.id);
    const interviewsResult = await fetchInterviewsForJobOpportunities(jobIds);

    if (!interviewsResult.success) {
        return failureResult(interviewsResult.error);
    }

    return successResult({
        companies: companiesResult.data,
        clients: clientsResult.data,
        jobs: jobsResult.data,
        interviews: interviewsResult.data,
        freelanceOpportunities: freelanceOpportunitiesResult.data,
        projects: projectsResult.data
    });
}
