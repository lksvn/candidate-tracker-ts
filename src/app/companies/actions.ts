'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../../data/database/prismaClient';
import { PrismaCompanyRepository } from '../../data/repositories/prismaCompanyRepository';
import { isCreateCompanyInput } from '../../data/validation/companyShapeValidator';
import { CompanyApplicationService } from '../../services/companyApplicationService';
import { redirect } from 'next/navigation';

export type CompanyActionState = {
    status: 'idle' | 'error' | 'success';
    message: string;
};

// Reuse the server-side dependency chain across action calls instead of
// constructing a repository and service for every form submission.
const repository = new PrismaCompanyRepository(prisma);
const service = new CompanyApplicationService(repository);

export async function createCompanyAction(
    _previousState: CompanyActionState,
    formData: FormData
): Promise<CompanyActionState> {
    const website = formData.get('website');

    // FormData is an external runtime boundary: values may be strings, files,
    // or null. Keep the payload unknown until the shape guard verifies it.
    // An empty optional website means "no website", represented by null.
    const input: unknown = {
        name: formData.get('name'),
        website: website === '' ? null : website
    };

    if (!isCreateCompanyInput(input)) {
        return {
            status: 'error',
            message: 'Invalid company form data.'
        };
    }

    const result = await service.create(input);

    if (!result.success) {
        // Return browser-safe messages instead of exposing repository details
        // or the original infrastructure error cause to the client.
        return {
            status: 'error',
            message: result.error.type === 'validation'
                ? 'Check the company details.'
                : 'Could not create the company.'
        };
    }

    // Invalidate the previously rendered list so the new row appears after
    // the successful mutation.
    revalidatePath('/companies');

    return {
        status: 'success',
        message: 'Company created.'
    };
}

export async function updateCompanyAction(
    id: string,
    _previousState: CompanyActionState,
    formData: FormData
): Promise<CompanyActionState> {
    const website = formData.get('website');

    const input: unknown = {
        name: formData.get('name'),
        website: website === '' ? null : website
    };

    // This UI submits the complete editable Company shape, so it shares the
    // same runtime structure as the create form.
    if (!isCreateCompanyInput(input)) {
        return {
            status: 'error',
            message: 'Invalid company form data.'
        };
    }

    const result = await service.update(id, input);

    if (!result.success) {
        if (result.error.type === 'validation') {
            return {
                status: 'error',
                message: 'Check the company details.'
            };
        }

        if (result.error.type === 'not-found') {
            return {
                status: 'error',
                message: 'The company no longer exists.'
            };
        }

        return {
            status: 'error',
            message: 'Could not update the company.'
        };
    }

    revalidatePath('/companies');
    revalidatePath(`/companies/${id}`);

    redirect(`/companies/${id}`);
}
