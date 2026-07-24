import type { CreateJobOpportunityInput, JobOpportunity } from "../domain/jobOpportunity";
import type { CompanyRepository } from "../repositories/companyRepository";
import type { JobOpportunityRepository } from "../repositories/jobOpportunityRepository";
import type { RepositoryError } from "../repositories/repositoryError";
import { failureResult, type Result } from "../shared/result";
import { validateCreateJobOpportunityInput, type CreateJobOpportunityValidationIssue } from "./jobValidationService";

export type CreateJobOpportunityError = {
      type: 'validation';
      issues: CreateJobOpportunityValidationIssue[];
    } | {
      type: 'not-found';
      entity: 'company';
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
            description: input.description?.trim() || undefined
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
}
