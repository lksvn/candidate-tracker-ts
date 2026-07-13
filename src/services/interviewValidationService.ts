import { Interview } from '../domain/interview';
import { JobOpportunity } from '../domain/jobOpportunity';
import { findById } from '../shared/collectionUtils';

type InterviewValidationIssue = {
    interviewId: string;
    reason: 'job-not-found' | 'job-rejected' | 'scheduled-in-past' | 'completed-in-future';
};

export function validateInterviews(interviews: Interview[], jobOpportunities: JobOpportunity[], today: string): InterviewValidationIssue[] {
    const issues: InterviewValidationIssue[] = [];

    for (const interview of interviews) {
        const jobOpportunity = findById(jobOpportunities, interview.jobOpportunityId);

        if (!jobOpportunity) {
            issues.push({ interviewId: interview.id, reason: 'job-not-found' });
            continue;
        }

        if (jobOpportunity.status === 'rejected') {
            issues.push({ interviewId: interview.id, reason: 'job-rejected' });
            continue;
        }

        if (interview.status === 'scheduled' && interview.date < today) {
            issues.push({ interviewId: interview.id, reason: 'scheduled-in-past' });
            continue;
        }

        if (interview.status === 'completed' && interview.date > today) {
            issues.push({ interviewId: interview.id, reason: 'completed-in-future' });
            continue;
        }
    }

    return issues;
}