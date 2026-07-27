import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '../../../data/database/prismaClient';
import { PrismaJobOpportunityRepository } from '../../../data/repositories/prismaJobOpportunityRepository';
import sanitizeHtml from 'sanitize-html';

const opportunityRepository = new PrismaJobOpportunityRepository(prisma);

type OpportunityPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function OpportunityPage({
    params
}: OpportunityPageProps) {
    const { id } = await params;
    const result = await opportunityRepository.findById(id);

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
    const sanitizedDescription = sanitizeHtml(opportunity.description ?? '', {
        allowedTags: ['p', 'br', 'strong', 'em', 'b', 'i', 'u', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote', 'a'],
        allowedAttributes: {
            a: ['href']
        },
        allowedSchemes: ['http', 'https', 'mailto']
    });

    return (
        <main>
            <Link href="/opportunities">{'<'} Back to opportunities</Link>
            <h1>{opportunity.title}</h1>
            <Link href={`/opportunities/${opportunity.id}/edit`}>Edit opportunity</Link>
            <ul>
                <li>Company: <Link href={`/companies/${opportunity.company.id}`}>{opportunity.company.name}</Link></li>
                <li>Model: {opportunity.model}</li>
                <li>Status: {opportunity.status}</li>
            </ul>
            <hr />
            {sanitizedDescription && (
                <div 
                    className='description'
                    dangerouslySetInnerHTML={{
                        __html: sanitizedDescription
                    }}
                />
            )}
        </main>
    );
}