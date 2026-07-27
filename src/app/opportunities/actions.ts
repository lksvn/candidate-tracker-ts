'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '../../data/database/prismaClient';
import { PrismaCompanyRepository } from '../../data/repositories/prismaCompanyRepository';
import { PrismaJobOpportunityRepository } from '../../data/repositories/prismaJobOpportunityRepository';
import { isCreateJobOpportunityInput, isUpdateJobOpportunityInput } from '../../data/validation/jobOpportunityShapeValidator';
import { JobOpportunityApplicationService } from '../../services/jobOpportunityApplicationService';

export type JobOpportunityActionState = {
    status: 'idle' | 'error' | 'success';
    message: string;
};

const jobRepository = new PrismaJobOpportunityRepository(prisma);
const companyRepository = new PrismaCompanyRepository(prisma);
const service = new JobOpportunityApplicationService(jobRepository, companyRepository);

export async function createJobOpportunityAction(
    _previousState: JobOpportunityActionState,
    formData: FormData
): Promise<JobOpportunityActionState> {

    const description = formData.get('description');
    const input: unknown = {
        title: formData.get('title'),
        companyId: formData.get('companyId'),
        description: description === '' ? null : description,
        model: formData.get('model'),
        status: formData.get('status')
    };

    if (!isCreateJobOpportunityInput(input)) {
        return {
            status: 'error',
            message: 'Invalid job opportunity form data.'
        };
    }

    const result = await service.create(input);

    if (!result.success) {
        if (result.error.type === 'validation') {
            return {
                status: 'error',
                message: 'Check the job opportunity details.'
            };
        }

        if (result.error.type === 'not-found') {
            return {
                status: 'error',
                message: 'The selected company no longer exists.'
            };
        }

        return {
            status: 'error',
            message: 'Could not create the job opportunity.'
        };
    }

    revalidatePath('/opportunities');

    return {
        status: 'success',
        message: 'Job opportunity created.'
    };
}

export async function updateJobOpportunityAction(
    id: string,
    _previousState: JobOpportunityActionState,
    formData: FormData
): Promise<JobOpportunityActionState> {
    const description = formData.get('description');

    const input: unknown = {
        title: formData.get('title'),
        description: description === '' ? null : description,
        model: formData.get('model'),
        status: formData.get('status')
    };

    if (!isUpdateJobOpportunityInput(input)) {
        return {
            status: 'error',
            message: 'Invalid job opportunity form data.'
        };
    }

    const result = await service.update(id, input);

    if (!result.success) {
        if (result.error.type === 'validation') {
            return {
                status: 'error',
                message: 'Check the job opportunity details.'
            };
        }

        if (result.error.type === 'not-found') {
            return {
                status: 'error',
                message: 'The job opportunity no longer exists.'
            };
        }

        return {
            status: 'error',
            message: 'Could not update the job opportunity.'
        };
    }

    revalidatePath('/opportunities');
    revalidatePath(`/opportunities/${id}`);

    redirect(`/opportunities/${id}`);
}
