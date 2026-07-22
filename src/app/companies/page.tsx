import { connection } from 'next/server';
import { prisma } from '../../data/database/prismaClient';
import { PrismaCompanyRepository } from '../../data/repositories/prismaCompanyRepository';
import { CompanyForm } from './company-form';
import Link from 'next/link';

const companyRepository = new PrismaCompanyRepository(prisma);

export default async function CompaniesPage() {
    await connection();

    const result = await companyRepository.findAll();

    if (!result.success) {
        return (
            <main>
                <h1>Companies</h1>
                <p>Could not load companies.</p>
            </main>
        );
    }

    return (
        <main>
            <Link href="/">{'<'} Home</Link>
            <h1>Companies</h1>
            <CompanyForm />
            <hr />
            {result.data.length === 0 ? (
                <p>No companies registered yet.</p>
            ) : (
                <ul>
                    {result.data.map((company) => (
                        <li key={company.id}>
                            <Link href={`/companies/${company.id}`}>
                                <strong>{company.name}</strong>
                            </Link>

                            {company.website && (
                                <>
                                    {' \u2014 '}
                                    <a href={company.website}>
                                        {company.website}
                                    </a>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}