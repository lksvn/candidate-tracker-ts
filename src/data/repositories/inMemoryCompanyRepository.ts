import { randomUUID } from 'node:crypto';
import type { Company, CreateCompanyInput, UpdateCompanyInput } from '../../domain/company';
import type { CompanyRepository } from '../../repositories/companyRepository';
import { successResult } from '../../shared/result';

export class InMemoryCompanyRepository implements CompanyRepository {
    private readonly companies: Company[];

    constructor(
        companies: Company[],
        private readonly generateId: () => string = randomUUID
    ) {
        this.companies = [...companies];
    }

    async findAll() {
        return successResult([...this.companies]);
    }

    async findById(id: string) {
        const company = this.companies.find(
            (candidate) => candidate.id === id
        );

        return successResult(company);
    }

    async create(input: CreateCompanyInput) {
        const company: Company = {
            id: this.generateId(),
            name: input.name,
            website: input.website ?? null
        };

        this.companies.push(company);

        return successResult(company);
    }

    async update(
        id: string,
        input: UpdateCompanyInput
    ) {
        const companyIndex = this.companies.findIndex(
            (company) => company.id === id
        );
        if (companyIndex === -1) {
            return successResult(undefined);
        }

        const currentCompany = this.companies[companyIndex];

        const updatedCompany: Company = {
            id: currentCompany.id,
            name: input.name ?? currentCompany.name,
            website: input.website === undefined
                ? currentCompany.website
                : input.website
        };

        this.companies[companyIndex] = updatedCompany;

        return successResult(updatedCompany);
    }
}
