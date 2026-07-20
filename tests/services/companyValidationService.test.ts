import { describe, expect, it } from "vitest";
import { validateCreateCompanyInput, validateUpdateCompanyInput } from "../../src/services/companyValidationService";
import type { CreateCompanyInput, UpdateCompanyInput } from "../../src/domain/company";

describe('validateCreateCompanyInput', () => {
    it('returns an issue when the company name is empty', () => {
        const company: CreateCompanyInput = {
            name: '',
            website: null
        };
        
        expect(validateCreateCompanyInput(company)).toEqual([ 
            {
                field: 'name',
                reason: 'blank-name'
            } 
        ]);
    });

    it('returns an issue when the company name is only spaces', () => {
        const company: CreateCompanyInput = {
            name: '    ',
            website: null
        };
        
        expect(validateCreateCompanyInput(company)).toEqual([ 
            {
                field: 'name',
                reason: 'blank-name'
            } 
        ]);
    });

    it('returns an issue when the company website is invalid', () => {
        const company: CreateCompanyInput = {
            name: 'Company Test',
            website: 'nonvalid-url.com'
        };
        
        expect(validateCreateCompanyInput(company)).toEqual([ 
            {
                field: 'website',
                reason: 'invalid-url'
            }
        ]);
    });

    it('returns an issue when the company website is empty', () => {
        const company: CreateCompanyInput = {
            name: 'Company Test',
            website: ''
        };
        
        expect(validateCreateCompanyInput(company)).toEqual([
            {
                field: 'website',
                reason: 'invalid-url'
            }
        ]);
    });

    it('returns an issue when the company website is a unsupported protocol', () => {
        const company: CreateCompanyInput = {
            name: 'Company Test',
            website: 'ftp://invalid.com'
        };
        
        expect(validateCreateCompanyInput(company)).toEqual([
            {
                field: 'website',
                reason: 'invalid-url'
            }
        ]);
    });

    it('returns an issue when the company website dont start with a explicit http prefix', () => {
        const company: CreateCompanyInput = {
            name: 'Company Test',
            website: 'http:invalid.com'
        };
        
        expect(validateCreateCompanyInput(company)).toEqual([
            {
                field: 'website',
                reason: 'invalid-url'
            }
        ]);
    });

    it('returns no issue when the company website is omitted', () => {
        const company: CreateCompanyInput = {
            name: 'Company Test'
        };
        
        expect(validateCreateCompanyInput(company)).toEqual([]);
    });

    it('returns no issue when the company website is undefined', () => {
        const company: CreateCompanyInput = {
            name: 'Company Test',
            website: undefined
        };
        
        expect(validateCreateCompanyInput(company)).toEqual([]);
    });

    it('returns no issue when the company website is null', () => {
        const company: CreateCompanyInput = {
            name: 'Company Test',
            website: null
        };
        
        expect(validateCreateCompanyInput(company)).toEqual([]);
    });

    it('returns no issue when the company website is https', () => {
        const company: CreateCompanyInput = {
            name: 'Company Test',
            website: 'https://valid-url.com'
        };
        
        expect(validateCreateCompanyInput(company)).toEqual([]);
    });

    it('returns no issues when all fields are valid', () => {
        const company: CreateCompanyInput = {
            name: 'Company Test',
            website: 'http://valid-url.com'
        };
        
        expect(validateCreateCompanyInput(company)).toEqual([]);
    });

    it('returns all validation issues', () => {
        const company: CreateCompanyInput = {
            name: '    ',
            website: 'ftp://invalid.com'
        };
        
        expect(validateCreateCompanyInput(company)).toEqual([
            {
                field: 'name',
                reason: 'blank-name'
            },
            {
                field: 'website',
                reason: 'invalid-url'
            }
        ]);
    });

    it('returns an issue when the company website is not a valid domain', () => {
        const company: CreateCompanyInput = {
            name: 'Company Test',
            website: 'http://invalidcom'
        };
        
        expect(validateCreateCompanyInput(company)).toEqual([
            {
                field: 'website',
                reason: 'invalid-url'
            }
        ]);
    });
});

describe('validateUpdateCompanyInput', () => {
    it('returns no issues when no fields are sent', () => {
        expect(validateUpdateCompanyInput({})).toEqual([]);
    });

    it('returns an issue when the company name is empty', () => {
        const company: UpdateCompanyInput = {
            name: ''
        };
        
        expect(validateUpdateCompanyInput(company)).toEqual([ 
            {
                field: 'name',
                reason: 'blank-name'
            } 
        ]);
    });

    it('returns an issue when the company name is only spaces', () => {
        const company: UpdateCompanyInput = {
            name: '    '
        };
        
        expect(validateUpdateCompanyInput(company)).toEqual([ 
            {
                field: 'name',
                reason: 'blank-name'
            } 
        ]);
    });

    it('returns no issues when the company name is valid', () => {
        const company: UpdateCompanyInput = {
            name: 'Acme'
        };
        
        expect(validateUpdateCompanyInput(company)).toEqual([]);
    });

    it('returns an issue when the company website is a unsupported protocol', () => {
        const company: UpdateCompanyInput = {
            website: 'ftp://invalid.com'
        };
        
        expect(validateUpdateCompanyInput(company)).toEqual([
            {
                field: 'website',
                reason: 'invalid-url'
            }
        ]);
    });

    it('returns an issue when the company website dont start with a explicit http prefix', () => {
        const company: UpdateCompanyInput = {
            website: 'http:invalid.com'
        };
        
        expect(validateUpdateCompanyInput(company)).toEqual([
            {
                field: 'website',
                reason: 'invalid-url'
            }
        ]);
    });

    it('returns an issue when the company website is empty', () => {
        const company: UpdateCompanyInput = {
            website: ''
        };
        
        expect(validateUpdateCompanyInput(company)).toEqual([
            {
                field: 'website',
                reason: 'invalid-url'
            }
        ]);
    });

    it('returns no issue when the company website is undefined', () => {
        const company: UpdateCompanyInput = {
            name: 'Company Test',
            website: undefined
        };
        
        expect(validateUpdateCompanyInput(company)).toEqual([]);
    });

    it('returns no issue when the company website is null', () => {
        const company: UpdateCompanyInput = {
            name: 'Company Test',
            website: null
        };
        
        expect(validateUpdateCompanyInput(company)).toEqual([]);
    });

    it('returns no issues when the company website is valid', () => {
        const company: UpdateCompanyInput = {
            website: 'http://website.com'
        };
        
        expect(validateUpdateCompanyInput(company)).toEqual([]);
    });

    it('returns no issues when all fields are valid', () => {
        const company: UpdateCompanyInput = {
            name: 'Company Test',
            website: 'http://valid-url.com'
        };
        
        expect(validateUpdateCompanyInput(company)).toEqual([]);
    });

    it('returns an issue when the company website is not a valid domain', () => {
        const company: UpdateCompanyInput = {
            website: 'http://invalidcom'
        };
        
        expect(validateUpdateCompanyInput(company)).toEqual([
            {
                field: 'website',
                reason: 'invalid-url'
            }
        ]);
    });
});
