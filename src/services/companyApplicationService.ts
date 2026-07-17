import type { Company, CreateCompanyInput } from '../domain/company';
import type { CompanyRepository } from '../repositories/companyRepository';
import type { RepositoryError } from '../repositories/repositoryError';
import type { Result } from '../shared/result';
import { failureResult } from '../shared/result';
import { validateCreateCompanyInput, type CompanyValidationIssue } from './companyValidationService';

export type CreateCompanyError = {
        type: 'validation';
        issues: CompanyValidationIssue[];
    } | RepositoryError;

export class CompanyApplicationService {
    constructor(
        private readonly repository: CompanyRepository
    ) {}

    async create(
        input: CreateCompanyInput
    ): Promise<Result<Company, CreateCompanyError>> {
        const normalizedInput: CreateCompanyInput = {
            name: input.name.trim(),
            website: typeof input.website === 'string'
                ? input.website.trim()
                : input.website
        };

        const issues = validateCreateCompanyInput(normalizedInput);

        if (issues.length > 0) {
            return failureResult({
                type: 'validation',
                issues
            });
        }

        return this.repository.create(normalizedInput);
    }
}    