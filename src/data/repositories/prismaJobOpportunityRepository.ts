import { Prisma, type JobOpportunity as PrismaJobOpportunity, type PrismaClient } from '../../../generated/prisma/client';
import { JobOpportunityRepository } from "../../repositories/jobOpportunityRepository";
import { CreateJobOpportunityInput, JobOpportunity, JobOpportunityWithCompany, UpdateJobOpportunityInput } from "../../domain/jobOpportunity";
import { RepositoryError } from "../../repositories/repositoryError";
import { failureResult, Result, successResult } from "../../shared/result";

function toDomainJobOpportunity(opportunity: PrismaJobOpportunity): JobOpportunity {
    return {
        id: opportunity.id ,
        title: opportunity.title ,
        companyId: opportunity.companyId,
        description: opportunity.description,
        model: opportunity.model ,
        status: opportunity.status
    }
}

// Keep the database projection in one value so the query and its TypeScript
// result type cannot drift apart when selected fields change.
const jobOpportunityListSelect = {
    id: true,
    title: true,
    companyId: true,
    description: true,
    model: true,
    status: true,
    company: {
        select: { id: true, name: true }
    }
} satisfies Prisma.JobOpportunitySelect;

// Prisma derives the exact nested result shape from the selection above.
// This includes `company`, which is not part of the generated base model type.
type PrismaJobOpportunityWithCompany = Prisma.JobOpportunityGetPayload<{
    select: typeof jobOpportunityListSelect;
}>;

function toDomainJobOpportunityWithCompany(opportunity: PrismaJobOpportunityWithCompany): JobOpportunityWithCompany {
    return {
        ...toDomainJobOpportunity(opportunity),
        company: opportunity.company
    };
}

export class PrismaJobOpportunityRepository implements JobOpportunityRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async findAllWithCompany(): Promise<Result<JobOpportunityWithCompany[], RepositoryError>> {
        try {
            const opportunities = await this.prisma.jobOpportunity.findMany({
                select: jobOpportunityListSelect
            });

            return successResult(
                opportunities.map(toDomainJobOpportunityWithCompany)
            );
        } catch (cause: unknown) {
            return failureResult({
                type: 'repository',
                code: 'QUERY_FAILED',
                message: 'Could not fetch job opportunities',
                cause
            });
        }
    }

    async create(input: CreateJobOpportunityInput): Promise<Result<JobOpportunity, RepositoryError>> {
        try {
            const opportunity = await this.prisma.jobOpportunity.create({
                data: {
                    title: input.title,
                    description: input.description ?? null,
                    model: input.model,
                    status: input.status,
                    company: {
                        // require an existing company for this relationship
                        connect: { id: input.companyId } 
                    }
                }
            });

            return successResult(toDomainJobOpportunity(opportunity));
        } catch (cause: unknown) {
            return failureResult({
                type: 'repository',
                code: 'QUERY_FAILED',
                message: 'Could not create job opportunity',
                cause
            });
        }
    }

    async findById(id: string): Promise<Result<JobOpportunityWithCompany | undefined, RepositoryError>> {
        try {
            const opportunity = await this.prisma.jobOpportunity.findUnique({
                select: jobOpportunityListSelect,
                where: { id }
            });

            return successResult(
                opportunity === null ? undefined : toDomainJobOpportunityWithCompany(opportunity)
            );
        } catch (cause: unknown) {
            return failureResult({
                type: 'repository',
                code: 'QUERY_FAILED',
                message: 'Could not fetch job opportunity',
                cause
            });
        }
    }

    async update(id: string, input: UpdateJobOpportunityInput): Promise<Result<JobOpportunity | undefined, RepositoryError>> {
        try {
            const data = {
                ...(input.title !== undefined
                    ? { title: input.title }
                    : {}),
                ...(input.description !== undefined
                    ? { description: input.description }
                    : {}),
                ...(input.model !== undefined
                    ? { model: input.model }
                    : {}),
                ...(input.status !== undefined
                    ? { status: input.status }
                    : {}),
            };

            const opportunity = await this.prisma.jobOpportunity.update({
                where: { id },
                data
            })

            return successResult(toDomainJobOpportunity(opportunity));
        } catch (cause: unknown) {
            if (
                cause instanceof Prisma.PrismaClientKnownRequestError &&
                cause.code === 'P2025'
            ) {
                return successResult(undefined);
            }

            return failureResult({
                type: 'repository',
                code: 'QUERY_FAILED',
                message: 'Could not update opportunity',
                cause
            });
        }
    }
}
