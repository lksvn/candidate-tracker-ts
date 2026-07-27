import type { CreateJobOpportunityInput, JobOpportunity, UpdateJobOpportunityInput } from "../domain/jobOpportunity";
import type { CompanyRepository } from "../repositories/companyRepository";
import type { JobOpportunityRepository } from "../repositories/jobOpportunityRepository";
import type { RepositoryError } from "../repositories/repositoryError";
import { failureResult, successResult, type Result } from "../shared/result";
import { validateCreateJobOpportunityInput, validateUpdateJobOpportunityInput, type CreateJobOpportunityValidationIssue, type UpdateJobOpportunityValidationIssue } from "./jobValidationService";

export type CreateJobOpportunityError = {
      type: 'validation';
      issues: CreateJobOpportunityValidationIssue[];
    } | {
      type: 'not-found';
      entity: 'company';
      id: string;
    } | RepositoryError;

export type UpdateJobOpportunityError = {
    type: 'validation';
    issues: UpdateJobOpportunityValidationIssue[];
} | {
    type: 'not-found';
    entity: 'job-opportunity';
    id: string;
} | RepositoryError;

export class JobOpportunityApplicationService {
    constructor(
        private readonly jobRepository: JobOpportunityRepository,
        private readonly companyRepository: CompanyRepository
    ) {}

    async create(
        input: CreateJobOpportunityInput
    ): Promise<Result<JobOpportunity, CreateJobOpportunityError>> {
        const normalizedInput: CreateJobOpportunityInput = {
            ...input,
            title: input.title.trim(),
            companyId: input.companyId.trim(),
            description: input.description?.trim() || null
        };

        const issues = validateCreateJobOpportunityInput(normalizedInput);

        if (issues.length > 0) {
            return failureResult({
                type: 'validation',
                issues
            });
        }

        const resultCompany = await this.companyRepository.findById(normalizedInput.companyId);

        if (!resultCompany.success) {
            return resultCompany;
        }

        if (resultCompany.data === undefined) {
            return failureResult({
                type: 'not-found',
                entity: 'company',
                id: normalizedInput.companyId
            });
        }

        return this.jobRepository.create(normalizedInput);
    }

    async update(
        id: string,
        input: UpdateJobOpportunityInput
    ): Promise<Result<JobOpportunity, UpdateJobOpportunityError>> {
        const normalizedInput: UpdateJobOpportunityInput = {
            ...input,
            title: typeof input.title === 'string'
                ? input.title.trim()
                : input.title,
            description: typeof input.description === 'string'
                ? input.description.trim() || null
                : input.description
        };

        const issues = validateUpdateJobOpportunityInput(normalizedInput);

        if (issues.length > 0) {
            return failureResult({
                type: 'validation',
                issues
            });
        }

        const result = await this.jobRepository.update(
            id,
            normalizedInput
        );

        if (!result.success) {
            return result;
        }

        if (result.data === undefined) {
            return failureResult({
                type: 'not-found',
                entity: 'job-opportunity',
                id
            });
        }

        return successResult(result.data);
    }
}
