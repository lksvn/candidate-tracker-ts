import { describe, expect, it } from "vitest";
import { FreelanceOpportunity } from "../../src/domain/freelance";
import { createFreelanceOpportunity, getOpportunitiesByStatus, getSignedOpportunities, updateFreelanceOpportunity } from "../../src/services/freelanceService";

const freelances: FreelanceOpportunity[] = [
    { id: '4', clientId: '3', projectBrief: { id: 'pb4', name: 'Blog Migration' }, status: 'contract-signed' },
    { id: '5', clientId: '1', projectBrief: { id: 'pb5', name: 'Portfolio Redesign' }, status: 'new' },
    { id: '6', clientId: '2', projectBrief: { id: 'pb6', name: 'SaaS Dashboard MVP' }, status: 'contacted' },
    { id: '7', clientId: '3', projectBrief: { id: 'pb7', name: 'Blog Migration' }, status: 'contract-signed' }  
];

describe("getOpportunitiesByStatus", () => {
    it("returns freelances with the selected status", () => {
        expect(getOpportunitiesByStatus(freelances, "new")).toEqual([
            { id: '5', clientId: '1', projectBrief: { id: 'pb5', name: 'Portfolio Redesign' }, status: 'new' }
        ]);         
    });
});

describe("getSignedOpportunities", () => {
    it("returns freelances with the contract-signed status", () => {
        expect(getSignedOpportunities(freelances)).toEqual([
            { id: '4', clientId: '3', projectBrief: { id: 'pb4', name: 'Blog Migration' }, status: 'contract-signed' },
            { id: '7', clientId: '3', projectBrief: { id: 'pb7', name: 'Blog Migration' }, status: 'contract-signed' }
        ]);         
    });
});

describe("createFreelanceOpportunity", () => {
    it("creates a freelance opportunity with the provided id", () => {
        const input: Omit<FreelanceOpportunity, 'id'> = {
            clientId: '1',
            projectBrief: {
                id: 'pb5',
                name: 'Portfolio Redesign',
                description: 'Modern portfolio with dark mode.'
            },
            status: 'new'
        };

        expect(createFreelanceOpportunity('new-freelance-1', input)).toEqual({
            id: 'new-freelance-1',
            clientId: '1',
            projectBrief: {
                id: 'pb5',
                name: 'Portfolio Redesign',
                description: 'Modern portfolio with dark mode.'
            },
            status: 'new'
        });
    });
});

describe("updateFreelanceOpportunity", () => {
    it("updates only the provided freelance opportunity fields", () => {
        const input: Partial<Omit<FreelanceOpportunity, 'id' | 'clientId'>> = {
            status: 'lost'
        };

        expect(updateFreelanceOpportunity(freelances[0], input)).toEqual({
            id: '4', 
            clientId: '3', 
            projectBrief: { id: 'pb4', name: 'Blog Migration' }, 
            status: 'lost'
        }); 
    });
});