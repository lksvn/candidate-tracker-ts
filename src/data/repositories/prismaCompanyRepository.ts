import { Prisma, type Company as PrismaCompany, type PrismaClient } from '../../../generated/prisma/client';
import type { Company, CreateCompanyInput, UpdateCompanyInput } from '../../domain/company';
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

    async create(
        input: CreateCompanyInput
    ): Promise<Result<Company, RepositoryError>> {
        try {
            const company = await this.prisma.company.create({
                data: {
                    name: input.name,
                    website: input.website ?? null
                }
            });

            return successResult(toDomainCompany(company));
        } catch (cause: unknown) {
            return failureResult({
                type: 'repository',
                code: 'QUERY_FAILED',
                message: 'Could not create company',
                cause
            });
        }
    }

    async update(
        id: string,
        input: UpdateCompanyInput
    ): Promise<Result<Company | undefined, RepositoryError>> {
        try {
            const data = {
                ...(input.name !== undefined
                    ? { name: input.name }
                    : {}),
                ...(input.website !== undefined
                    ? { website: input.website }
                    : {}),
            };

            const company = await this.prisma.company.update({
                where: { id },
                data
            });

            return successResult(toDomainCompany(company));
        } catch (cause: unknown) {
            // Why p2025?
            // Prisma throws known error code P2025 when an operation requires a record that does not exist. 
            if (
                cause instanceof Prisma.PrismaClientKnownRequestError &&
                cause.code === 'P2025'
            ) {
                return successResult(undefined);
            }

            return failureResult({
                type: 'repository',
                code: 'QUERY_FAILED',
                message: 'Could not update company',
                cause
            });
        }
    }
}
