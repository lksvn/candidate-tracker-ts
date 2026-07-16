import type { Company, CreateCompanyInput, UpdateCompanyInput } from "../domain/company";
import { findById } from "../shared/collectionUtils";

export function getCompanies(companies: Company[]): Company[] {
    return companies;
}

export function getCompanyById(companies: Company[], id: string): Company | undefined {
    return findById(companies, id);
}

export function createCompany(id: string, input: CreateCompanyInput): Company {
    return {
        id,
        name: input.name,
        website: input.website ?? null
    };
}

export function updateCompany(company: Company, input: UpdateCompanyInput): Company {
    return {
        id: company.id,
        name: input.name ?? company.name,
        website: input.website === undefined ? company.website : input.website
    };
}
