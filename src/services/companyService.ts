import { Company } from "../domain/company";
import { findById } from "../shared/collectionUtils";

type CreateCompanyInput = Omit<Company, 'id'>;
type UpdateCompanyInput = Partial<Omit<Company, 'id'>>;

export function getCompanies(companies: Company[]): Company[] {
    return companies;
}

export function getCompanyById(companies: Company[], id: string): Company | undefined {
    return findById(companies, id);
}

export function createCompany(id: string, input: CreateCompanyInput): Company {
    return {
        id,
        ...input
    };
}

export function updateCompany(company: Company, input: UpdateCompanyInput): Company {
    return {
        ...company,
        ...input
    };
}