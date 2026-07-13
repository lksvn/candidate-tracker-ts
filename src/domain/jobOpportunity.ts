export type JobStatus = 'saved' | 'applied' | 'interviewing' | 'rejected';
export type JobModel = 'hybrid' | 'remote' | 'on-site';
export interface JobOpportunity {
    id: string;
    title: string;
    companyId: string;
    description?: string;
    model: JobModel;
    status: JobStatus;
}