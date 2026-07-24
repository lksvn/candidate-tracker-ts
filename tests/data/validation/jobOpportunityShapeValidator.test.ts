import { describe, expect, it } from "vitest";
import { isCreateJobOpportunityInput } from "../../../src/data/validation/jobOpportunityShapeValidator";

const validInput = {
    title: 'Developer',
    companyId: 'company-id',
    description: 'testing creation',
    model: 'remote',
    status: 'saved',
} as const;

describe('isCreateJobOpportunityInput', () => {
    it('accepts valid creation input', () => {
        expect(isCreateJobOpportunityInput(validInput)).toBe(true);
    });

    it('accepts an omitted description', () => {
        expect(isCreateJobOpportunityInput({
            title: 'Developer',
            companyId: 'company-id',
            model: 'remote',
            status: 'saved',
        })).toBe(true);
    });

    it('rejects null and arrays', () => {
        expect(isCreateJobOpportunityInput(null)).toBe(false);
        expect(isCreateJobOpportunityInput([])).toBe(false);
    });

    it('rejects non-string description', () => {
        expect(isCreateJobOpportunityInput({
            ...validInput,
            description: 123
        })).toBe(false);
    });

    it('rejects non-string title', () => {
        expect(isCreateJobOpportunityInput({
            ...validInput,
            title: 123
        })).toBe(false);
    });

    it('rejects non-string companyId', () => {
        expect(isCreateJobOpportunityInput({
            ...validInput,
            companyId: 123
        })).toBe(false);
    });

    it('rejects an unsupported model', () => {
        expect(isCreateJobOpportunityInput({
            ...validInput,
            model: 'freelance'
        })).toBe(false);
    });

    it('rejects an unsupported old model', () => {
        expect(isCreateJobOpportunityInput({
            ...validInput,
            model: 'on-site'
        })).toBe(false);
    });

    it('rejects an unsupported status', () => {
        expect(isCreateJobOpportunityInput({
            ...validInput,
            status: 'interviewed',
        })).toBe(false);
    });

});