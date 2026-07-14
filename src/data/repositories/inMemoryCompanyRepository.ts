import type { Company } from '../../domain/company';
import type { CompanyRepository } from '../../repositories/companyRepository';
import { successResult } from '../../shared/result';

export class InMemoryCompanyRepository implements CompanyRepository {
    constructor(private readonly companies: Company[]) {}

    async findAll() {
        return successResult([...this.companies]);
    }

    async findById(id: string) {
        const company = this.companies.find(
            (candidate) => candidate.id === id
        );

        return successResult(company);
    }
}
