import type { JobOpportunity, JobOpportunityListItem, CreateJobOpportunityInput } from "../domain/jobOpportunity"
import type { Result } from "../shared/result"
import type { RepositoryError } from "./repositoryError"

export interface JobOpportunityRepository {
    findAllWithCompany(): Promise<Result<JobOpportunityListItem[], RepositoryError>>;

    create(input: CreateJobOpportunityInput): Promise<Result<JobOpportunity, RepositoryError>>;
}