import { describe, expect, it } from "vitest";
import { createJobOpportunity, getJobsByModel, getJobsByStatus, getSavedJobs, updateJobOpportunity } from "../../src/services/jobService";
import { JobOpportunity } from "../../src/domain/jobOpportunity";

const jobs: JobOpportunity[] = [
    { id: '1', title: 'Frontend Developer', companyId: '1', model: 'remote', status: 'saved' },
    { id: '2', title: 'Backend Engineer', companyId: '2', model: 'hybrid', status: 'applied' },
    { id: '3', title: 'DevOps Specialist', companyId: '1', model: 'remote', status: 'interviewing' },
    { id: '5', title: 'Data Analyst', companyId: '2', model: 'hybrid', status: 'rejected' }
];

describe("getSavedJobs", () => {
    it("returns only saved jobs", () => {
        expect(getSavedJobs(jobs)).toEqual([
            { id: '1', title: 'Frontend Developer', companyId: '1', model: 'remote', status: 'saved' }
        ]); 
    });
});

describe("getJobsByModel", () => {
    it("returns jobs with the selected model", () => {
        expect(getJobsByModel(jobs, "hybrid")).toEqual([
            { id: '2', title: 'Backend Engineer', companyId: '2', model: 'hybrid', status: 'applied' },
            { id: '5', title: 'Data Analyst', companyId: '2', model: 'hybrid', status: 'rejected' }
        ]); 
    });
});

describe("getJobsByStatus", () => {
    it("returns jobs with the selected status", () => {
        expect(getJobsByStatus(jobs, "applied")).toEqual([
            { id: '2', title: 'Backend Engineer', companyId: '2', model: 'hybrid', status: 'applied' }
        ]);         
    });
});

describe("createJobOpportunity", () => {
    it("creates a job opportunity with the provided id", () => {
        const input: Omit<JobOpportunity, 'id'> = {
            title: 'Full Stack Developer',
            companyId: '1',
            description: 'Build product features with TypeScript and React.',
            model: 'remote',
            status: 'saved'
        };

        expect(createJobOpportunity('new-job-1', input)).toEqual({
            id: 'new-job-1',
            title: 'Full Stack Developer',
            companyId: '1',
            description: 'Build product features with TypeScript and React.',
            model: 'remote',
            status: 'saved'
        });
    });
});

describe("updateJobOpportunity", () => {
    it("updates only the provided job opportunity fields", () => {
        const input = {
            description: 'Updating the job description'
        };

        expect(updateJobOpportunity(jobs[0], input)).toEqual({ 
            id: '1',
            title: 'Frontend Developer', 
            companyId: '1', 
            model: 'remote', 
            status: 'saved',
            description: 'Updating the job description'
        }); 
    });
});