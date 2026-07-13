import { Interview } from '../domain/interview';
import { filterByProperty } from '../shared/collectionUtils';

type CreateInterviewInput = Omit<Interview, 'id'>;
type UpdateInterviewInput = Partial<Omit<Interview, 'id' | 'jobOpportunityId'>>;

export function getInterviews(interviews: Interview[]): Interview[] {
    return interviews;
}

export function getInterviewsByJobOpportunityId(interviews: Interview[], jobOpportunityId: string): Interview[] {
    return filterByProperty(interviews, 'jobOpportunityId', jobOpportunityId);
}

export function createInterview(id: string, input: CreateInterviewInput): Interview {
    return {
        id,
        ...input
    };
}

export function updateInterview(interview: Interview, input: UpdateInterviewInput): Interview {
    return {
        ...interview,
        ...input
    };
}
