import { connection } from "next/server";
import { prisma } from "../../data/database/prismaClient";
import { PrismaJobOpportunityRepository } from "../../data/repositories/prismaJobOpportunityRepository";
import { PrismaCompanyRepository } from "../../data/repositories/prismaCompanyRepository";
import Link from "next/link";
import { JobOpportunityForm } from "./opportunity-form";

const companyRepository = new PrismaCompanyRepository(prisma);
const opportunityRepository = new PrismaJobOpportunityRepository(prisma);

export default async function JobOpportunitiesPage() {
    await connection();

    const [opportunitiesResult, companiesResult] = await Promise.all([
        opportunityRepository.findAllWithCompany(),
        companyRepository.findAll()
    ]);

    if (!companiesResult.success) {
        console.error(companiesResult.error.cause);
    }

    if (!opportunitiesResult.success) {
        console.error(opportunitiesResult.error.cause);
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
            {companiesResult.success ? (
                <>
                    <JobOpportunityForm companies={ companiesResult.data.map(
                            (company) => ({ id: company.id, name: company.name })
                        )}
                    />
                    <hr />
                </>
            ) : (
                <p>Could not load companies for the creation form</p>
            )}
            <h2>Available Opportunities</h2>
            {opportunitiesResult.data.length === 0 ? (
                <p>No opportunities registered yet.</p>
            ) : (
                <>
                    {opportunitiesResult.data.map((opportunity) => (
                        <div key={opportunity.id}>
                            <h3><strong>{opportunity.title}</strong> ({opportunity.status})</h3>
                            <ul>
                                <li>Company: <Link href={`/companies/${opportunity.company.id}`}>{opportunity.company.name}</Link></li>
                                <li>Model: {opportunity.model}</li>
                            </ul>
                            {opportunity.description && (
                                <p>{opportunity.description}</p>
                            )}
                        </div>
                    ))}
                </>
            )}
        </main>
    );
}