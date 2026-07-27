'use client';

import { useActionState } from 'react';
import type { JobOpportunity } from '../../../../domain/jobOpportunity';
import {
    updateJobOpportunityAction,
    type JobOpportunityActionState
} from '../../actions';

const initialState: JobOpportunityActionState = {
    status: 'idle',
    message: ''
};

type OpportunityEditFormProps = {
    opportunity: JobOpportunity;
};

export function OpportunityEditForm({
    opportunity
}: OpportunityEditFormProps) {
    const updateOpportunityWithId =
        updateJobOpportunityAction.bind(null, opportunity.id);

    const [state, formAction, pending] = useActionState(
        updateOpportunityWithId,
        initialState
    );

    return (
        <form action={formAction}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={opportunity.title}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows={20}
                    defaultValue={opportunity.description ?? ''}
                />
            </div>

            <div className="form-group">
                <label htmlFor="model">Model</label>
                <select
                    id="model"
                    name="model"
                    defaultValue={opportunity.model}
                    required
                >
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onSite">On-site</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    name="status"
                    defaultValue={opportunity.status}
                    required
                >
                    <option value="saved">Saved</option>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <button type="submit" disabled={pending}>
                {pending ? 'Saving...' : 'Save changes'}
            </button>

            {state.message && (
                <p role={state.status === 'error' ? 'alert' : 'status'}>
                    {state.message}
                </p>
            )}
        </form>
    );
}