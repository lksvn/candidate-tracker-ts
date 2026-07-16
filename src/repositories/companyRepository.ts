import type { Company } from '../domain/company';
import type { Result } from '../shared/result';
import type { RepositoryError } from './repositoryError';

export interface CompanyRepository {
    findAll(): Promise<Result<Company[], RepositoryError>>;

    findById(
        id: string
    ): Promise<Result<Company | undefined, RepositoryError>>;
}
