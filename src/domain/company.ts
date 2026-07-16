export interface Company {
    id: string;
    name: string;
    website: string | null;
}

export type CreateCompanyInput = {
    name: string;
    website?: string | null;
};

export type UpdateCompanyInput = {
    name?: string;
    website?: string | null;
};