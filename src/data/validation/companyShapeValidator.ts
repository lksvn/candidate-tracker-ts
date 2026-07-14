import type { Company } from "../../domain/company";

// Checks whether input has the expected runtime shape, not whether its values satisfy business rules.
export function isCompany(input: unknown): input is Company {
    if (typeof input !== 'object' || input === null) {
        return false;
    }

    const item = input as Record<string, unknown>;

    if (typeof item.id !== 'string') {
        return false;
    }

    if (typeof item.name !== 'string') {
        return false;
    }

    if (item.website !== undefined && typeof item.website !== 'string') {
        return false;
    }

    return true;
}
