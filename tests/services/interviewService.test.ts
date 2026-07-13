import { describe, expect, it } from "vitest";
import { Interview } from "../../src/domain/interview";
import { createInterview, getInterviewsByJobOpportunityId, updateInterview } from "../../src/services/interviewService";

const interviews: Interview[] = [
    { id: '1', jobOpportunityId: '3', date: '2026-07-10', status: 'scheduled' },
    { id: '2', jobOpportunityId: '4', date: '2026-07-08', status: 'scheduled' },
    { id: '3', jobOpportunityId: '2', date: '2026-07-07', status: 'completed' }
];

describe('getInterviewsByJobOpportunityId', () => {
    it('returns interviews for the selected job opportunity', () => {
        expect(getInterviewsByJobOpportunityId(interviews, '4')).toEqual([
            { id: '2', jobOpportunityId: '4', date: '2026-07-08', status: 'scheduled' }
        ]);
    });

    it('returns an empty array when no interviews match', () => {
        expect(getInterviewsByJobOpportunityId(interviews, '7')).toEqual([]);
    });
});

describe('createInterview', () => {
    it('creates an interview with the provided id', () => {
        const input: Omit<Interview, 'id'> = {
            jobOpportunityId: '5', 
            date: '2026-07-14', 
            status: 'scheduled'
        };

        expect(createInterview('new-interview-1', input)).toEqual({
            id: 'new-interview-1',
            jobOpportunityId: '5', 
            date: '2026-07-14', 
            status: 'scheduled'
        });
    });
});

describe('updateInterview', () => {
    it('updates only the provided interview fields', () => {
        const input: Partial<Omit<Interview, 'id' | 'jobOpportunityId'>> = {
            status: 'cancelled',
            date: '2026-07-15'
        };

        expect(updateInterview(interviews[0], input)).toEqual({
            id: '1',
            jobOpportunityId: '3', 
            date: '2026-07-15', 
            status: 'cancelled'
        });
    });
});