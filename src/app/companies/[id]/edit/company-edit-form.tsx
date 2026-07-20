'use client';

import { useActionState } from 'react';
import type { Company } from '../../../../domain/company';
import { updateCompanyAction, type CompanyActionState } from '../../actions';

const initialState: CompanyActionState = {
    status: 'idle',
    message: ''
};

type CompanyEditFormProps = {
    company: Company;
};

export function CompanyEditForm({
    company
}: CompanyEditFormProps) {
    const updateCompanyWithId = updateCompanyAction.bind(
        null,
        company.id
    );

    const [state, formAction, pending] = useActionState(
        updateCompanyWithId,
        initialState
    );

    return (
        <form action={formAction}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={company.name}
                    required
                />
            </div>

            <div>
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    name="website"
                    type="url"
                    defaultValue={company.website ?? ''}
                    placeholder="https://example.com"
                />
            </div>

            <button type="submit" disabled={pending}>
                {pending ? 'Saving...' : 'Save changes'}
            </button>

            {state.message && (
                <p
                    role={state.status === 'error' ? 'alert' : 'status'}
                    style={{ color: state.status === 'error' ? 'red' : 'green' }}
                >
                    {state.message}
                </p>
            )}
        </form>
    );
}