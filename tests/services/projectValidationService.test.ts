import { describe, expect, it } from "vitest";
import { validateProjects } from "../../src/services/projectValidationService";
import { FreelanceOpportunity } from "../../src/domain/freelance";
import { Project } from "../../src/domain/project";

describe('validateProjects', () => {
    const freelances: FreelanceOpportunity[] = [{
        id: '1',
        clientId: '3',
        projectBrief: {
            id: 'pb1',
            name: 'E-commerce Landing Page'
        },
        status: 'contract-signed'
    },{
        id: '2',
        clientId: '1',
        projectBrief: {
            id: 'pb2',
            name: 'Internal Dashboard'
        },
        status: 'contacted'
    }];
    
    it('returns an issue when the opportunity does not exist', () => {
        const projects: Project[] = [{
            id: '1',
            clientId: '3',
            opportunityId: '111',
            name: 'Opportunity not found',
            mustStartBy: '2026-08-01'
        }];
        expect(validateProjects(projects, freelances)).toEqual([ { projectId: '1', reason: 'opportunity-not-found'} ]);
    });

    it('returns an issue when the opportunity is not signed', () => {
        const projects: Project[] = [{
            id: '2',
            clientId: '1',
            opportunityId: '2',
            name: 'Opportunity not signed',
            mustStartBy: '2026-07-14',
        }]; 

        expect(validateProjects(projects, freelances)).toEqual([ { projectId: '2', reason: 'opportunity-not-signed'} ]);
    });

    it('returns an issue when the project client does not match the opportunity client', () => {
        const projects: Project[] = [{
            id: '3',
            clientId: '444',
            opportunityId: '1',
            name: 'Wrong client id',
            mustStartBy: '2026-07-14',
        }]; 

        expect(validateProjects(projects, freelances)).toEqual([ { projectId: '3', reason: 'client-mismatch'} ]);
    });

    it('returns no issues when all projects are valid', () => {
        const projects: Project[] = [{
            id: '1',
            clientId: '3',
            opportunityId: '1',
            name: 'No issues found',
            mustStartBy: '2026-08-01'
        }];

        expect(validateProjects(projects, freelances)).toEqual([]);
    });
});