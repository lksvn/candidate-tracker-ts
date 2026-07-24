import type { CreateJobOpportunityInput, JobModel, JobStatus } from "../../domain/jobOpportunity";

function isJobModel(value: unknown): value is JobModel {
    return (
        value === 'hybrid' ||
        value === 'remote' ||
        value === 'onSite'
    );
}

function isJobStatus(value: unknown): value is JobStatus {
    return (
        value === 'saved' ||
        value === 'applied' ||
        value === 'interviewing' ||
        value === 'rejected'
    );
}

export function isCreateJobOpportunityInput(input: unknown): input is CreateJobOpportunityInput {
    if (typeof input !== 'object' || input === null || Array.isArray(input)) {
        return false;
    }

    const item = input as Record<string, unknown>;

    if (typeof item.title !== 'string') {
        return false;
    }

    if (typeof item.companyId !== 'string') {
        return false;
    }

    if (
        item.description !== undefined &&
        typeof item.description !== 'string'
    ) {
        return false;
    }

    if (!isJobModel(item.model)) {
        return false;
    }

    if (!isJobStatus(item.status)) {
        return false;
    }

    return true;
}
