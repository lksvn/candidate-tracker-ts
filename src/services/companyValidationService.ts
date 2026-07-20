import type { CreateCompanyInput, UpdateCompanyInput } from "../domain/company";

export type CompanyValidationIssue = {
    field: 'name' | 'website';
    reason: 'blank-name' | 'invalid-url';
};

function isHttpUrl(value: string): boolean {
    const normalizedValue = value.toLowerCase();
    if(
        !normalizedValue.startsWith('http://') &&
        !normalizedValue.startsWith('https://')
    ) {
        return false;
    }

    try {
        const url = new URL(value);
        const hostnameParts = url.hostname.split('.');

        return (
            hostnameParts.length >= 2 &&
            hostnameParts.every((part) => part.length > 0)
        );
    } catch {
        return false;
    }
}

export function validateCreateCompanyInput(
    input: CreateCompanyInput
): CompanyValidationIssue[] {
    const issues: CompanyValidationIssue[] = [];

    if (!input.name || input.name.trim() === '') {
        issues.push({ field: 'name', reason: 'blank-name' });
    }
    
    if (
        input.website !== undefined && 
        input.website !== null &&
        !isHttpUrl(input.website)
    ) {
        issues.push({ field: 'website', reason: 'invalid-url' });
    }

    return issues;
}

export function validateUpdateCompanyInput(
    input: UpdateCompanyInput
): CompanyValidationIssue[] {
    const issues: CompanyValidationIssue[] = [];

    if (
        input.name !== undefined && 
        input.name.trim() === ''
    ) {
        issues.push({ field: 'name', reason: 'blank-name' });
    }

    if (
        input.website !== undefined && 
        input.website !== null &&
        !isHttpUrl(input.website)
    ) {
        issues.push({ field: 'website', reason: 'invalid-url' });
    }

    return issues;
}