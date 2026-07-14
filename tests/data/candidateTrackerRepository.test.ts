import { describe, expect, it } from 'vitest';
import { fetchInterviewsForJobOpportunities } from '../../src/data/candidateTrackerRepository';

describe('fetchInterviewsForJobOpportunities', () => {
    it('returns interviews belonging to the provided job IDs', async () => {
        const jobIds = ['1','2','3'];
        const result = await fetchInterviewsForJobOpportunities(jobIds);

        expect(result.success).toBe(true);

        if (result.success) {
            expect(result.data.map((interview) => interview.id)).toEqual(['1', '3', '4', '5', '8', '9']);
        }
    });

    it('returns an empty array of interviews from a list of job opportunities when no matches', async () => {
        const jobIds = ['11'];
        const result = await fetchInterviewsForJobOpportunities(jobIds);

        expect(result).toEqual({
            success: true,
            data: []
        });
    });

    it('returns an empty array when no job IDs are provided', async () => {
        const result = await fetchInterviewsForJobOpportunities([]);

        expect(result).toEqual({
            success: true,
            data: []
        })
    });
});
