import { Prisma, type JobOpportunity as PrismaJobOpportunity, type PrismaClient } from '../../../generated/prisma/client';
import { JobOpportunityRepository } from "../../repositories/jobOpportunityRepository";
import { CreateJobOpportunityInput, JobOpportunity, JobOpportunityListItem } from "../../domain/jobOpportunity";
import { RepositoryError } from "../../repositories/repositoryError";
import { failureResult, Result, successResult } from "../../shared/result";

function toDomainJobOpportunity(opportunity: PrismaJobOpportunity): JobOpportunity {
    return {
        id: opportunity.id ,
        title: opportunity.title ,
        companyId: opportunity.companyId,
        description: opportunity.description ?? undefined,
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
type PrismaJobOpportunityListItem = Prisma.JobOpportunityGetPayload<{
    select: typeof jobOpportunityListSelect;
}>;

function toDomainJobOpportunityListItem(opportunity: PrismaJobOpportunityListItem): JobOpportunityListItem {
    return {
        ...toDomainJobOpportunity(opportunity),
        company: opportunity.company
    };
}

export class PrismaJobOpportunityRepository implements JobOpportunityRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async findAllWithCompany(): Promise<Result<JobOpportunityListItem[], RepositoryError>> {
        try {
            const opportunities = await this.prisma.jobOpportunity.findMany({
                select: jobOpportunityListSelect
            });

            return successResult(
                opportunities.map(toDomainJobOpportunityListItem)
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
}
