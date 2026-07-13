import { Project } from '../domain/project';
import { FreelanceOpportunity } from '../domain/freelance';

// With omit i can provide any of the project properties except for the clientId and opportunityId,
// which will be derived from the FreelanceOpportunity
type CreateProjectInput = Omit<Project, 'id' | 'clientId' | 'opportunityId'>;
type UpdateProjectInput = Partial<Omit<Project, 'clientId' | 'opportunityId'>>;

export function getOverdueProjectsToStart(projects: Project[], today: string): Project[] {
    return projects.filter((p) => p.mustStartBy < today);
}

// Only contract-signed opportunities can become projects, so we check for that status before creating a new project
export function createProjectFromOpportunity(id: string, opportunity: FreelanceOpportunity, input: CreateProjectInput): Project {
    if (opportunity.status !== 'contract-signed') {
        throw new Error('Only contract-signed opportunities can become projects.');
    }

    return {
        ...input,
        id,
        clientId: opportunity.clientId,
        opportunityId: opportunity.id
    };
}

export function updateProject(project: Project, input: UpdateProjectInput): Project {
    return {
        ...project,
        ...input
    }
}