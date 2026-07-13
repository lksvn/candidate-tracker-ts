import * as Seed from './data/seed';
import {
    fetchCompanies,
    fetchClients,
    fetchFreelanceOpportunities,
    fetchInterviews,
    fetchJobOpportunities,
    fetchProjects
} from './data/candidateTrackerRepository';
import { fetchCandidateTrackerDashboardData } from './data/candidateTrackerDashboardRepository';
import { createJobOpportunity, getSavedJobs, updateJobOpportunity } from './services/jobService';
import { getSignedOpportunities } from './services/freelanceService';
import { createProjectFromOpportunity, getOverdueProjectsToStart } from './services/projectService';
import { validateProjects } from './services/projectValidationService';
import { getInterviews, getInterviewsByJobOpportunityId } from './services/interviewService';
import { validateInterviews } from './services/interviewValidationService';
import { validateFreelanceOpportunities } from './services/freelanceValidationService';
import { validateJobOpportunities } from './services/jobValidationService';
import { handleResult } from './shared/result';

console.log('--------------------------------------');
console.log('GETTING DATA');
console.log('--------------------------------------');
console.log('Open jobs:', getSavedJobs(Seed.jobs));
console.log('Interviews:', getInterviews(Seed.interviews));
console.log('Interviews for job opportunity 3:', getInterviewsByJobOpportunityId(Seed.interviews, '3'));
console.log('Signed freelance opportunities:', getSignedOpportunities(Seed.freelanceOpportunities));
console.log('Overdue projects to start:', getOverdueProjectsToStart(Seed.projects, '2026-07-01'));
console.log('--------------------------------------');
console.log('VALIDATIONS');
console.log('--------------------------------------');
console.log('Invalid jobs:', validateJobOpportunities(Seed.jobs, Seed.companies));
console.log('Invalid interviews:', validateInterviews(Seed.interviews, Seed.jobs, '2026-07-09'));
console.log('Invalid freelances:', validateFreelanceOpportunities(Seed.freelanceOpportunities, Seed.clients));
console.log('Invalid projects:', validateProjects(Seed.projects, Seed.freelanceOpportunities));
console.log('--------------------------------------');
console.log('VALID PROJECT CREATION TEST');
console.log('--------------------------------------');
const validOpportunity = getSignedOpportunities(Seed.freelanceOpportunities)[0];
if (validOpportunity) {
    const project = createProjectFromOpportunity('new-project-1', validOpportunity, {
        name: validOpportunity.projectBrief.name,
        description: validOpportunity.projectBrief.description,
        mustStartBy: '2026-08-01'
    });

    console.log('Created project:', project);
}
console.log('--------------------------------------');
console.log('INVALID PROJECT CREATION TEST');
console.log('--------------------------------------');
const invalidOpportunity = {
    ...Seed.freelanceOpportunities[0],
    status: 'new' as const
};

try {
    createProjectFromOpportunity('invalid-project-1', invalidOpportunity, {
        name: invalidOpportunity.projectBrief.name,
        description: invalidOpportunity.projectBrief.description,
        mustStartBy: '2026-08-01'
    });
} catch (error) {
    console.log('Project creation blocked:', error instanceof Error ? error.message : error);
}
console.log('--------------------------------------');
console.log('JOB CREATE/UPDATE TEST');
console.log('--------------------------------------');
const createdJob = createJobOpportunity('new-job-1', {
    title: 'Full Stack Developer',
    companyId: '1',
    description: 'Build product features with TypeScript and React.',
    model: 'remote',
    status: 'saved'
});

const updatedJob = updateJobOpportunity(createdJob, {
    status: 'applied'
});

console.log('Created job:', createdJob);
console.log('Updated job:', updatedJob);

console.log('--------------------------------------');
console.log('ASYNC DATA TEST');
console.log('--------------------------------------');
const asyncCompanies = await fetchCompanies();
const asyncClients = await fetchClients();
const asyncJobs = await fetchJobOpportunities();
const asyncInterviews = await fetchInterviews();
const asyncFreelanceOpportunities = await fetchFreelanceOpportunities();
const asyncProjects = await fetchProjects();

handleResult(
    asyncCompanies,
    (companies) => console.log('Async company count:', companies.length),
    (error) => console.log(error)
);
handleResult(
    asyncClients,
    (clients) => console.log('Async client count:', clients.length),
    (error) => console.log(error)
);
handleResult(
    asyncJobs,
    (jobs) => console.log('Async open jobs:', getSavedJobs(jobs)),
    (error) => console.log(error)
);

if(asyncInterviews.success && asyncJobs.success) {
    console.log('Async invalid interviews:', validateInterviews(asyncInterviews.data, asyncJobs.data, '2026-07-09'));
}
if(asyncFreelanceOpportunities.success && asyncClients.success) {
    console.log('Async invalid freelances:', validateFreelanceOpportunities(asyncFreelanceOpportunities.data, asyncClients.data));
}
if(asyncProjects.success && asyncFreelanceOpportunities.success) {
    console.log('Async invalid projects:', validateProjects(asyncProjects.data, asyncFreelanceOpportunities.data));
}

console.log('--------------------------------------');
console.log('DASHBOARD DATA TEST');
console.log('--------------------------------------');
const dashboardResult = await fetchCandidateTrackerDashboardData();

handleResult(
    dashboardResult,
    (dashboard) => {
        console.log('Dashboard open jobs:', getSavedJobs(dashboard.jobs).length);
        console.log('Dashboard invalid interviews:', validateInterviews(dashboard.interviews, dashboard.jobs, '2026-07-09'));
        console.log('Dashboard invalid projects:', validateProjects(dashboard.projects, dashboard.freelanceOpportunities));
    },
    (error) => console.log('Could not load dashboard:', error)
);
