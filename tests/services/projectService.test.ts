import { describe, expect, it } from "vitest";
import { createProjectFromOpportunity, getOverdueProjectsToStart, updateProject } from "../../src/services/projectService";
import { FreelanceOpportunity } from "../../src/domain/freelance";
import { Project } from "../../src/domain/project";

const input = {
    name: 'E-commerce Landing Page',
    description: 'Single-page storefront for a local brand.',
    mustStartBy: '2026-08-01'
};

function makeOpportunity(status: FreelanceOpportunity['status']): FreelanceOpportunity {
    return {
        id: '1',
        clientId: '3',
        projectBrief: {
            id: 'pb1',
            name: 'E-commerce Landing Page',
            description: 'Single-page storefront for a local brand.'
        },
        status
    };
}

function makeProjects(mustStartBy: Project['mustStartBy']): Project[] {
    return [{
        id: '1',
        clientId: '3',
        opportunityId: '1',
        name: 'E-commerce Landing Page',
        description: 'Single-page storefront with product showcase and checkout.',
        mustStartBy
    },
    {
        id: '2',
        clientId: '1',
        opportunityId: '2',
        name: 'Internal Dashboard',
        description: 'Admin panel with charts and user management.',
        mustStartBy
    }];
}

describe('getOverdueProjectsToStart', () => {
    it('returns projects that must start before today', () => {
        const projects: Project[] = makeProjects('2026-07-05');

        expect(getOverdueProjectsToStart(projects, '2026-07-13')).toEqual([
            {
                id: '1',
                clientId: '3',
                opportunityId: '1',
                name: 'E-commerce Landing Page',
                description: 'Single-page storefront with product showcase and checkout.',
                mustStartBy: '2026-07-05'
            },
            {
                id: '2',
                clientId: '1',
                opportunityId: '2',
                name: 'Internal Dashboard',
                description: 'Admin panel with charts and user management.',
                mustStartBy: '2026-07-05'
            }
        ]);
    });

    it('returns an empty array when projects can start after today', () => {
        const projects: Project[] = makeProjects('2026-07-22');

        expect(getOverdueProjectsToStart(projects, '2026-07-13')).toEqual([]);
    });
});

describe('createProjectFromOpportunity', () => {
    it('throws when the opportunity is not contract-signed', () => {
        const opportunity = makeOpportunity('new');
        
        //When testing returned values, call the function inside expect -> expect(fn()).toEqual(...)
        //When testing thrown errors, pass a function into expect. -> expect(() => fn()).toThrow(...)
        expect(() => {
            createProjectFromOpportunity('invalid-project-1', opportunity, input);
        }).toThrow('Only contract-signed opportunities can become projects.');
    });

    it('creates a project from a contract-signed opportunity', () => {
        const opportunity = makeOpportunity('contract-signed');
  
        expect(createProjectFromOpportunity('new-project-1', opportunity, input)).toEqual({
            name: 'E-commerce Landing Page',
            description: 'Single-page storefront for a local brand.',
            mustStartBy: '2026-08-01',
            id: 'new-project-1',
            clientId: '3',
            opportunityId: '1'
        });
    });
});

describe('updateProject', () => {
    it('updates only the provided project fields', () => {
        const project: Project = {
            id: '1',
            clientId: '3',
            opportunityId: '1',
            name: 'E-commerce Landing Page',
            description: 'Single-page storefront with product showcase and checkout.',
            mustStartBy: '2026-08-01',
            endDate: '2026-08-15'
        };

        const input = {
            description: 'Updating the project description'
        };

        expect(updateProject(project, input)).toEqual({
            id: '1',
            clientId: '3',
            opportunityId: '1',
            name: 'E-commerce Landing Page',
            description: 'Updating the project description',
            mustStartBy: '2026-08-01',
            endDate: '2026-08-15'
        });
    });
});