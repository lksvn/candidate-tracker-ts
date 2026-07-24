'use client';

import { useActionState } from 'react';
import { createCompanyAction, type CompanyActionState } from './actions';

const initialState: CompanyActionState = {
    status: 'idle',
    message: ''
};

export function CompanyForm() {
    const [state, formAction, pending] = useActionState(
        createCompanyAction,
        initialState
    );

    return (
        <form action={formAction}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://example.com"
                />
            </div>

            <button type="submit" disabled={pending}>
                {pending ? 'Creating...' : 'Create company'}
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