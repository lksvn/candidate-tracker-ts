export type JobStatus = 'saved' | 'applied' | 'interviewing' | 'rejected';
export type JobModel = 'hybrid' | 'remote' | 'onSite';

// Defines the input types with restrictions using Omit and Partial
export type CreateJobOpportunityInput = Omit<JobOpportunity, 'id'>; // use the JobOpportunity interface and omit the 'id' property for creation input
export type UpdateJobOpportunityInput = Partial<Omit<JobOpportunity, 'id' | 'companyId'>>; // may update any property except 'id' and 'companyId', every other field is optional
export interface JobOpportunity {
    id: string;
    title: string;
    companyId: string;
    description?: string;
    model: JobModel;
    status: JobStatus;
}

export interface JobOpportunityListItem extends JobOpportunity {
    company: {
        id: string;
        name: string;
    }
}