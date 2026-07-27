import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '../../../../data/database/prismaClient';
import { PrismaJobOpportunityRepository } from '../../../../data/repositories/prismaJobOpportunityRepository';
import { OpportunityEditForm } from './opportunity-edit-form';

const jobOpportunityRepository = new PrismaJobOpportunityRepository(prisma);

type EditJobOpportunityPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditJobOpportunityPage({
    params
}: EditJobOpportunityPageProps) {
    const { id } = await params;
    const result = await jobOpportunityRepository.findById(id);

    if (!result.success) {
        return (
            <main>
                <h1>Opportunity</h1>
                <p>Could not load the opportunity.</p>
                <Link href="/opportunities">{'<'} Back to opportunities</Link>
            </main>
        );
    }

    if (result.data === undefined) {
        notFound();
    }

    const opportunity = result.data;

    return (
        <main>
            <Link href={`/opportunities/${id}`}>{'<'} Back</Link>

            <h1>Editing: {opportunity.title}</h1>
            <OpportunityEditForm opportunity={opportunity} />
        </main>
    );
}