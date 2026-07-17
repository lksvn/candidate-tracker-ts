import { describe, expect, it, vi } from "vitest";
import { InMemoryCompanyRepository } from "../../src/data/repositories/inMemoryCompanyRepository";
import { CompanyRepository } from "../../src/repositories/companyRepository";
import { CompanyApplicationService } from "../../src/services/companyApplicationService";
import { failureResult } from "../../src/shared/result";
import type { RepositoryError } from "../../src/repositories/repositoryError";

describe('CompanyApplicationService', () => {
    describe('create', () => {
        it('normalizes, creates, and persists a valid company', async () => {
            const repository = new InMemoryCompanyRepository(
                [],
                () => 'company-1'
            );
    
            const service = new CompanyApplicationService(repository);
    
            const result = await service.create({
                name: '  Acme   ',
                website: '   https://acme.example.com   '
            });
    
            expect(result).toEqual({
                success: true,
                data: {
                    id: 'company-1',
                    name: 'Acme',
                    website: 'https://acme.example.com'
                }
            });
    
            expect(await repository.findById('company-1')).toEqual(result);
        });
    
        it('returns a list of issue when the input is invalid', async () => {
            const repository = new InMemoryCompanyRepository(
                [],
                () => 'company-00'
            );
    
            const service = new CompanyApplicationService(repository);
    
            const result = await service.create({
                name: '  ',
                website: '   ftp://acme.example.com   '
            });
    
            expect(result).toEqual({
                success: false,
                error: {
                    type: 'validation',
                    issues: [
                        { field: 'name', reason: 'blank-name' },
                        { field: 'website', reason: 'invalid-url' }
                    ]
                }
            });
    
            expect(await repository.findAll()).toEqual({
                success: true,
                data: []
            });
        });
    
        it('propagates repository failures', async () => {
            const repository: CompanyRepository = new InMemoryCompanyRepository(
                [],
                () => 'company-1'
            );
    
            const repositoryError: RepositoryError = {
                type: 'repository',
                code: 'QUERY_FAILED',
                message: 'Could not create company',
                cause: new Error('Database unavailable')
            };
    
            const createSpy = vi
                .spyOn(repository, 'create')
                .mockResolvedValue(
                    failureResult(repositoryError)
                );
    
            const service = new CompanyApplicationService(repository);
    
            const result = await service.create({
                name: 'Acme',
                website: null
            });
    
            expect(createSpy).toHaveBeenCalledWith({
                name: 'Acme',
                website: null
            });
    
            expect(result).toEqual({
                success: false,
                error: repositoryError
            });
        });
    });

    describe('update', () => {
        it('updates and returns a company when the input is valid', async () => {
            const generatedId = () => 'company-1';
            const repository = new InMemoryCompanyRepository([
                {
                    id: 'company-1',
                    name: 'Company Name',
                    website: null
                }
            ], generatedId);
    
            const service = new CompanyApplicationService(repository);
    
            const result = await service.update('company-1', {
                name: '  New company name',
                website: '  https://company.site  '
            });
    
            expect(result).toEqual({
                success: true,
                data: {
                    id: 'company-1',
                    name: 'New company name',
                    website: 'https://company.site'
                }
            });
    
            expect(await repository.findById('company-1')).toEqual({
                success: true,
                data: {
                    id: 'company-1',
                    name: 'New company name',
                    website: 'https://company.site'
                }
            });
        });

        it('returns validation issues without updating the repository', async () => {
            const generatedId = () => 'company-1';
            const repository = new InMemoryCompanyRepository([
                {
                    id: 'company-1',
                    name: 'Company Name',
                    website: null
                }
            ], generatedId);

            const service = new CompanyApplicationService(repository);

            const updateSpy = vi.spyOn(repository, 'update');

            const result = await service.update('company-1', {
                name: '   '
            });

            expect(result).toEqual({
                success: false,
                error: {
                    type: 'validation',
                    issues: [
                        {
                            field: 'name',
                            reason: 'blank-name'
                        }
                    ]
                }
            });

            expect(updateSpy).not.toHaveBeenCalled();
        });

        it('returns not-found when the company does not exist', async () => {
            const repository = new InMemoryCompanyRepository(
                [],
                () => 'company-1'
            );

            const service = new CompanyApplicationService(repository);

            const result = await service.update('missing-company', {
                name: 'Updated Company'
            });

            expect(result).toEqual({
                success: false,
                error: {
                    type: 'not-found',
                    entity: 'company',
                    id: 'missing-company'
                }
            });
        });

        it('propagates repository failures', async () => {
            const repository: CompanyRepository = new InMemoryCompanyRepository([], () => 'company-1');

            const repositoryError: RepositoryError = {
                type: 'repository',
                code: 'QUERY_FAILED',
                message: 'Could not update company',
                cause: new Error('Database unavailable')
            };

            const updateSpy = vi
                .spyOn(repository, 'update')
                .mockResolvedValue(failureResult(repositoryError));
    
            const service = new CompanyApplicationService(repository);
    
            const result = await service.update('company-1', {
                name: 'Updated Company'
            });
    
            expect(updateSpy).toHaveBeenCalledWith('company-1', {
                name: 'Updated Company',
                website: undefined
            });

            expect(result).toEqual({
                success: false,
                error: repositoryError
            });
        });
    });
});
