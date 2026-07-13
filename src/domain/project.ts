export interface ProjectBrief {
    id: string;
    name: string;
    description?: string;
}

export interface Project {
    id: string;
    clientId: string;
    opportunityId: string;
    name: string;
    description?: string;
    mustStartBy: string;
    endDate?: string;
}