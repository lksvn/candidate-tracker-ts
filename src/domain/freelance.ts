import { ProjectBrief } from './project';

export type FreelanceOpportunityStatus = 'new' | 'contacted' | 'proposal-sent' | 'accepted' | 'contract-signed' | 'lost';

export interface FreelanceOpportunity {
    id: string;
    clientId: string;
    projectBrief: ProjectBrief;
    status: FreelanceOpportunityStatus;
}
