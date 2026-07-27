import { describe, expect, it, vi } from "vitest";
import { InMemoryCompanyRepository } from "../../src/data/repositories/inMemoryCompanyRepository";
import type { CreateJobOpportunityInput, UpdateJobOpportunityInput } from "../../src/domain/jobOpportunity";
import type { JobOpportunityRepository } from "../../src/repositories/jobOpportunityRepository";
import { JobOpportunityApplicationService } from "../../src/services/jobOpportunityApplicationService";
import { successResult } from "../../src/shared/result";

describe('JobOpportunityApplicationService', () => {

    describe('create', () => {
        it('normalizes and creates a valid job opportunity', async () => {
            const companyRepository = new InMemoryCompanyRepository([
                {
                    id: 'company-1',
                    name: 'Acme',
                    website: null
                }
            ]);

            const create = vi.fn(
                async (input: CreateJobOpportunityInput) =>
                    successResult({
                        id: 'job-1',
                        ...input,
                        description: input.description ?? null
                    })
            );

            const jobRepository: JobOpportunityRepository = {
                findAllWithCompany: async () => successResult([]),
                findById: async () => successResult(undefined),
                update: async () => successResult(undefined),
                create
            };

            const service = new JobOpportunityApplicationService(jobRepository, companyRepository);

            const result = await service.create({
                title: '  Developer',
                companyId: '  company-1  ',
                description: '    job description  ',
                model: 'remote',
                status: 'saved'
            });

            expect(create).toHaveBeenCalledWith({
                title: 'Developer',
                companyId: 'company-1',
                description: 'job description',
                model: 'remote',
                status: 'saved'
            });

            expect(result).toEqual({
                success: true,
                data: {
                    id: 'job-1',
                    title: 'Developer',
                    companyId: 'company-1',
                    description: 'job description',
                    model: 'remote',
                    status: 'saved'
                }
            });
        });

        it('returns validation issues without calling repositories', async () => {
            const companyRepository = new InMemoryCompanyRepository([
                {
                    id: 'company-1',
                    name: 'Acme',
                    website: null
                }
            ]);

            const companyFindBySpy = vi.spyOn(companyRepository, 'findById');

            const create = vi.fn(
                async (input: CreateJobOpportunityInput) =>
                    successResult({
                        id: 'job-1',
                        ...input,
                        description: input.description ?? null
                    })
            );

            const jobRepository: JobOpportunityRepository = {
                findAllWithCompany: async () => successResult([]),
                findById: async () => successResult(undefined),
                update: async () => successResult(undefined),
                create
            };

            const service = new JobOpportunityApplicationService(jobRepository, companyRepository);

            const result = await service.create({
                title: '  ',
                companyId: '    ',
                description: '    ',
                model: 'remote',
                status: 'saved'
            });

            expect(result).toEqual({
                success: false,
                error: {
                    type: 'validation',
                    issues: [
                        { field: 'title', reason: 'blank-title' },
                        { field: 'companyId', reason: 'blank-company-id' }
                    ]
                }
            });

            expect(companyFindBySpy).not.toHaveBeenCalled();
            expect(create).not.toHaveBeenCalled();
        });

        it('returns not-found without creating when the company does not exist', async () => {
            const companyRepository = new InMemoryCompanyRepository([]);

            const create = vi.fn(
                async (input: CreateJobOpportunityInput) =>
                    successResult({
                        id: 'job-1',
                        ...input,
                        description: input.description ?? null
                    })
            );

            const jobRepository: JobOpportunityRepository = {
                findAllWithCompany: async () => successResult([]),
                findById: async () => successResult(undefined),
                update: async () => successResult(undefined),
                create
            };

            const companyFindBySpy = vi.spyOn(companyRepository, 'findById');

            const service = new JobOpportunityApplicationService(jobRepository, companyRepository);

            const result = await service.create({
                title: ' job title',
                companyId: ' missing-company ',
                description: '    ',
                model: 'remote',
                status: 'saved'
            });

            expect(result).toEqual({
                success: false,
                error: {
                    type: 'not-found',
                    entity: 'company',
                    id: 'missing-company'
                }
            });

            expect(companyFindBySpy).toHaveBeenCalledWith('missing-company');
            expect(create).not.toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it('normalizes and updates a valid job opportunity', async () => {
            const companyRepository = new InMemoryCompanyRepository([]);
            const update = vi.fn(
                async (
                    id: string,
                    input: UpdateJobOpportunityInput
                ) => successResult({
                    id,
                    title: input.title ?? 'Original title',
                    companyId: 'company-1',
                    description: input.description ?? null,
                    model: input.model ?? 'remote',
                    status: input.status ?? 'saved'
                })
            );

            const jobRepository: JobOpportunityRepository = {
                findAllWithCompany: async () => successResult([]),
                findById: async () => successResult(undefined),
                create: async () => {
                    throw new Error('create should not be called');
                },
                update
            };

            const service = new JobOpportunityApplicationService(
                jobRepository,
                companyRepository
            );

            const result = await service.update('job-1', {
                title: '  Updated title  ',
                description: '   ',
                status: 'applied'
            });

            expect(update).toHaveBeenCalledWith('job-1', {
                title: 'Updated title',
                description: null,
                status: 'applied'
            });

            expect(result).toEqual({
                success: true,
                data: {
                    id: 'job-1',
                    title: 'Updated title',
                    companyId: 'company-1',
                    description: null,
                    model: 'remote',
                    status: 'applied'
                }
            });
        });

        it('returns validation issues without updating', async () => {
            const companyRepository = new InMemoryCompanyRepository([]);
            const update = vi.fn(
                async () => successResult(undefined)
            );

            const jobRepository: JobOpportunityRepository = {
                findAllWithCompany: async () => successResult([]),
                findById: async () => successResult(undefined),
                create: async () => {
                    throw new Error('create should not be called');
                },
                update
            };

            const service = new JobOpportunityApplicationService(
                jobRepository,
                companyRepository
            );

            const result = await service.update('job-1', {
                title: '   '
            });

            expect(result).toEqual({
                success: false,
                error: {
                    type: 'validation',
                    issues: [
                        { field: 'title', reason: 'blank-title' }
                    ]
                }
            });
            expect(update).not.toHaveBeenCalled();
        });

        it('returns not-found when the opportunity does not exist', async () => {
            const companyRepository = new InMemoryCompanyRepository([]);
            const update = vi.fn(
                async () => successResult(undefined)
            );

            const jobRepository: JobOpportunityRepository = {
                findAllWithCompany: async () => successResult([]),
                findById: async () => successResult(undefined),
                create: async () => {
                    throw new Error('create should not be called');
                },
                update
            };

            const service = new JobOpportunityApplicationService(
                jobRepository,
                companyRepository
            );

            const result = await service.update('missing-job', {
                status: 'rejected'
            });

            expect(update).toHaveBeenCalledWith('missing-job', {
                status: 'rejected',
                title: undefined,
                description: undefined
            });
            expect(result).toEqual({
                success: false,
                error: {
                    type: 'not-found',
                    entity: 'job-opportunity',
                    id: 'missing-job'
                }
            });
        });
    });
});
