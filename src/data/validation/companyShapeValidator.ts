import type { Company, CreateCompanyInput } from "../../domain/company";

// Checks whether input has the expected runtime shape, not whether its values satisfy business rules.
export function isCompany(input: unknown): input is Company {
    if (typeof input !== 'object' || input === null || Array.isArray(input)) {
        return false;
    }

    const item = input as Record<string, unknown>;

    if (typeof item.id !== 'string') {
        return false;
    }

    if (typeof item.name !== 'string') {
        return false;
    }

    if (item.website !== null && typeof item.website !== 'string') {
        return false;
    }

    return true;
}

export function isCreateCompanyInput(input: unknown): input is CreateCompanyInput {
    if (typeof input !== 'object' || input === null || Array.isArray(input)) {
        return false;
    }

    const item = input as Record<string, unknown>;

    if (typeof item.name !== 'string') {
        return false;
    }

    if (
        item.website !== undefined &&
        item.website !== null && 
        typeof item.website !== 'string'
    ) {
        return false;
    }

    return true;
}