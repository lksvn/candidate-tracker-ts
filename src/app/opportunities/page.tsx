import { connection } from "next/server";
import { prisma } from "../../data/database/prismaClient";
import { PrismaJobOpportunityRepository } from "../../data/repositories/prismaJobOpportunityRepository";
import Link from "next/link";

const opportunityRepository = new PrismaJobOpportunityRepository(prisma);

export default async function JobOpportunitiesPage() {
    await connection();

    const result = await opportunityRepository.findAllWithCompany();
    if (!result.success) {
        console.error(result.error.cause);
        return (
            <main>
                <h1>Job Opportunities</h1>
                <p>Could not load opportunities.</p>
            </main>
        );
    }

    return (
        <main>
            <Link href="/">{'<'} Home</Link>
            <h1>Job Opportunities</h1>
            <hr />
            {result.data.length === 0 ? (
                <p>No opportunities registered yet.</p>
            ) : (
                <ul>
                    {result.data.map((opportunity) => (
                        <li key={opportunity.id}>
                            <strong>{opportunity.title}</strong> ({opportunity.status}) <br/>
                            Company: <Link href={`/companies/${opportunity.company.id}`}>{opportunity.company.name}</Link> <br/>
                            Model: {opportunity.model} <br/>
                            {opportunity.description && (
                                <p>{opportunity.description}</p>
                            )}
                        </li>    
                    ))}
                </ul>
            )}
        </main>
    );
}