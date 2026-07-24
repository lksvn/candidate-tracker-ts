import { describe, expect, it, vi } from "vitest";
import { InMemoryCompanyRepository } from "../../src/data/repositories/inMemoryCompanyRepository";
import type { CreateJobOpportunityInput } from "../../src/domain/jobOpportunity";
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
                        ...input
                    })
            );

            const jobRepository: JobOpportunityRepository = {
                findAllWithCompany: async () => successResult([]),
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
                        ...input
                    })
            );

            const jobRepository: JobOpportunityRepository = {
                findAllWithCompany: async () => successResult([]),
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
                        ...input
                    })
            );

            const jobRepository: JobOpportunityRepository = {
                findAllWithCompany: async () => successResult([]),
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
});
