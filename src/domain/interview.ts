export type InterviewStatus = 'scheduled' | 'completed' | 'cancelled';

export interface Interview {
    id: string;
    jobOpportunityId: string;
    date: string;
    status: InterviewStatus;
    location?: string;
    notes?: string;
}