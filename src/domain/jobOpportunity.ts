export type JobStatus = 'saved' | 'applied' | 'interviewing' | 'rejected';
export type JobModel = 'hybrid' | 'remote' | 'onSite';

// Defines the input types with restrictions using Omit and Partial
export type CreateJobOpportunityInput =
    Omit<JobOpportunity, 'id' | 'description'> & {
        description?: string | null;
    };
export type UpdateJobOpportunityInput =
    Partial<Omit<JobOpportunity, 'id' | 'companyId'>>;

export interface JobOpportunity {
    id: string;
    title: string;
    companyId: string;
    description: string | null;
    model: JobModel;
    status: JobStatus;
}

export interface JobOpportunityWithCompany extends JobOpportunity {
    company: {
        id: string;
        name: string;
    }
}
