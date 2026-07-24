'use client';

import { useActionState } from 'react';
import { createJobOpportunityAction, type JobOpportunityActionState } from './actions';

const initialState: JobOpportunityActionState = {
    status: 'idle',
    message: ''
};

type JobOpportunityFormProps = {
    companies: Array<{
        id: string;
        name: string;
    }>;
};

export function JobOpportunityForm({ companies }: JobOpportunityFormProps) {
    const [state, formAction, pending] = useActionState(
        createJobOpportunityAction,
        initialState
    );

    if (companies.length === 0) {
        return (<p>Create a company before adding an opportunity.</p>);
    }

    return (
        <form action={formAction}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required />
            </div>

            <div className="form-group">
                <label htmlFor="companyId">Company</label>
                <select
                    id="companyId"
                    name="companyId"
                    defaultValue=""
                    required >
                    <option value="" disabled>Select a company</option>

                    {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                            {company.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description" />
            </div>

            <div className="form-group">
                <label htmlFor="model">Model</label>
                <select id="model" name="model" defaultValue="" required>
                    <option value="" disabled>Select a work model</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onSite">On-site</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" defaultValue="saved" required>
                    <option value="saved">Saved</option>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <button type="submit" disabled={pending}>
              {pending ? 'Creating...' : 'Create opportunity'}
            </button>

            {state.message && (
                <p
                    role={state.status === 'error' ? 'alert' : 'status'}
                    style={{ color: state.status === 'error' ? 'red' : 'green' }} >
                    {state.message}
                </p>
            )}
        </form>
    );
}