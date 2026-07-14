import { describe, expect, it } from 'vitest';
import { fetchCandidateTrackerDashboardData } from '../../src/data/candidateTrackerDashboardRepository';

describe('fetchCandidateTrackerDashboardData', () => {
    it('returns the aggregated dashboard data', async () => {
        const result = await fetchCandidateTrackerDashboardData();

        expect(result.success).toBe(true);

        if (result.success) {
            expect(result.data.companies.length).toBeGreaterThan(0);
            expect(result.data.jobs.length).toBeGreaterThan(0);
            expect(result.data.interviews.length).toBeGreaterThan(0);

            const jobIds = result.data.jobs.map((job) => job.id);

            expect(result.data.interviews.every(
                (interview) => jobIds.includes(interview.jobOpportunityId)
            )).toBe(true);
        }
    });
});