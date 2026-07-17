import type { Company, CreateCompanyInput, UpdateCompanyInput } from '../domain/company';
import type { CompanyRepository } from '../repositories/companyRepository';
import type { RepositoryError } from '../repositories/repositoryError';
import type { Result } from '../shared/result';
import { failureResult, successResult } from '../shared/result';
import { validateCreateCompanyInput, validateUpdateCompanyInput, type CompanyValidationIssue } from './companyValidationService';

export type CreateCompanyError = {
        type: 'validation';
        issues: CompanyValidationIssue[];
    } | RepositoryError;

export type UpdateCompanyError = {
        type: 'validation';
        issues: CompanyValidationIssue[];
    } | {
        type: 'not-found';
        entity: 'company';
        id: string;
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

    async update(
        id: string,
        input: UpdateCompanyInput
    ): Promise<Result<Company, UpdateCompanyError>> {
        const normalizedInput: UpdateCompanyInput = {
            name: typeof input.name === 'string'
                ? input.name.trim()
                : input.name,
            website: typeof input.website === 'string'
                ? input.website.trim()
                : input.website
        };

        const issues = validateUpdateCompanyInput(normalizedInput);
    
        if (issues.length > 0) {
            return failureResult({
                type: 'validation',
                issues
            });
        }

        const result =  await this.repository.update(id, normalizedInput);

        if (!result.success) {
            return result;
        }

        if (result.data === undefined) {
            return failureResult({
                type: 'not-found',
                entity: 'company',
                id
            });
        }

        return successResult(result.data);
    }
}