import type { Company } from '../domain/company';
import type { AsyncResult } from '../shared/result';

export interface CompanyRepository {
    findAll(): Promise<AsyncResult<Company[]>>;

    findById(id: string): Promise<AsyncResult<Company | undefined>>;
}
