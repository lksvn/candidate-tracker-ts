import type { Company as PrismaCompany, PrismaClient } from '../../../generated/prisma/client';
import type { Company } from '../../domain/company';
import type { CompanyRepository } from '../../repositories/companyRepository';
import type { Result } from '../../shared/result';
import { failureResult, successResult } from '../../shared/result';
import type { RepositoryError } from '../../repositories/repositoryError';

function toDomainCompany(company: PrismaCompany): Company {
    return {
        id: company.id,
        name: company.name,
        website: company.website
    };
}

export class PrismaCompanyRepository implements CompanyRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async findAll(): Promise<Result<Company[], RepositoryError>> {
        try {
            const companies = await this.prisma.company.findMany();

            return successResult(
                companies.map(toDomainCompany)
            );
        } catch (cause: unknown) {
            return failureResult({
                type: 'repository',
                code: 'QUERY_FAILED',
                message: 'Could not fetch companies',
                cause
            });
        }
    }

    async findById(
        id: string
    ): Promise<Result<Company | undefined, RepositoryError>> {
        try {
            const company = await this.prisma.company.findUnique({
                where: { id }
            });

            return successResult(
                company === null
                    ? undefined
                    : toDomainCompany(company)
            );
        } catch (cause: unknown) {
            return failureResult({
                type: 'repository',
                code: 'QUERY_FAILED',
                message: 'Could not fetch company',
                cause
            });
        }
    }
}
