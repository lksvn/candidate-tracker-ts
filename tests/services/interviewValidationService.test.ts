import { describe, expect, it } from "vitest";
import { validateInterviews } from "../../src/services/interviewValidationService";
import { Interview } from '../../src/domain/interview';
import { JobOpportunity } from '../../src/domain/jobOpportunity';

describe('validateInterviews', () => {
    const opportunities: JobOpportunity[] = [{
        id: '2',
        title: 'Backend Engineer',
        companyId: '2',
        model: 'hybrid',
        status: 'applied'
    },{
        id: '5',
        title: 'Data Analyst',
        companyId: '2',
        description: 'Analyze business data and build dashboards.',
        model: 'hybrid',
        status: 'rejected'
    }];

    it('returns an issue when the opportunity does not exist', () => {
        const interviews: Interview[] = [{
            id: '1',
            jobOpportunityId: '99',
            date: '2026-07-15',
            status: 'scheduled'
        }];

        expect(validateInterviews(interviews, opportunities, '2026-07-13')).toEqual([ { interviewId: '1', reason: 'job-not-found'} ]);
    });

    it('returns an issue when the opportunity status is rejected', () => {
        const interviews: Interview[] = [{
            id: '6',
            jobOpportunityId: '5',
            date: '2026-07-15',
            status: 'scheduled'
        }];

        expect(validateInterviews(interviews, opportunities, '2026-07-13')).toEqual([ { interviewId: '6', reason: 'job-rejected'} ]);
    });

    it('returns an issue when the interview is scheduled in the past', () => {
        const interviews: Interview[] = [{
            id: '6',
            jobOpportunityId: '2',
            date: '2026-07-02',
            status: 'scheduled'
        }];

        expect(validateInterviews(interviews, opportunities, '2026-07-13')).toEqual([ { interviewId: '6', reason: 'scheduled-in-past'} ]);
    });

    it('returns an issue when the interview date is completed in the future', () => {
        const interviews: Interview[] = [{
            id: '6',
            jobOpportunityId: '2',
            date: '2026-07-20',
            status: 'completed'
        }];

        expect(validateInterviews(interviews, opportunities, '2026-07-13')).toEqual([ { interviewId: '6', reason: 'completed-in-future'} ]);
    });

    it('returns no issues when all opportunities are valid', () => {
        const interviews: Interview[] = [{
            id: '6',
            jobOpportunityId: '2',
            date: '2026-07-15',
            status: 'scheduled'
        }];

        expect(validateInterviews(interviews, opportunities, '2026-07-13')).toEqual([]);        
    });
});