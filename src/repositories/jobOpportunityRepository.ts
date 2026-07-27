import type { JobOpportunity, JobOpportunityWithCompany, CreateJobOpportunityInput, UpdateJobOpportunityInput } from "../domain/jobOpportunity"
import type { Result } from "../shared/result"
import type { RepositoryError } from "./repositoryError"

export interface JobOpportunityRepository {
    findAllWithCompany(): Promise<Result<JobOpportunityWithCompany[], RepositoryError>>;

    findById(id: string): Promise<Result<JobOpportunityWithCompany | undefined, RepositoryError>>;

    create(input: CreateJobOpportunityInput): Promise<Result<JobOpportunity, RepositoryError>>;

    update(id: string, input: UpdateJobOpportunityInput): Promise<Result<JobOpportunity | undefined, RepositoryError>>;
}