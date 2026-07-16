import type { Company, CreateCompanyInput, UpdateCompanyInput } from '../domain/company';
import type { Result } from '../shared/result';
import type { RepositoryError } from './repositoryError';

export interface CompanyRepository {
    findAll(): Promise<Result<Company[], RepositoryError>>;

    findById(
        id: string
    ): Promise<Result<Company | undefined, RepositoryError>>;

    create(
        input: CreateCompanyInput
    ): Promise<Result<Company, RepositoryError>>;

    update(
        id: string,
        input: UpdateCompanyInput
    ): Promise<Result<Company | undefined, RepositoryError>>;
}
