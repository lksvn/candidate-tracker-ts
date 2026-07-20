import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '../../../data/database/prismaClient';
import { PrismaCompanyRepository } from '../../../data/repositories/prismaCompanyRepository';

const companyRepository = new PrismaCompanyRepository(prisma);

type CompanyPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function CompanyPage({
    params
}: CompanyPageProps) {
    const { id } = await params;
    const result = await companyRepository.findById(id);

    if (!result.success) {
        return (
            <main>
                <h1>Company</h1>
                <p>Could not load the company.</p>
                <Link href="/companies">{'<'} Back to companies</Link>
            </main>
        );
    }

    if (result.data === undefined) {
        notFound();
    }

    const company = result.data;

    return (
        <main>
            <Link href="/companies">{'<'} Back to companies</Link>

            <h1>{company.name}</h1>
            <Link href={`/companies/${company.id}/edit`}>
                Edit company
            </Link>
            {company.website ? (
                <p>
                    <a href={company.website}>
                        {company.website}
                    </a>
                </p>
            ) : (
                <p>No website registered.</p>
            )}
        </main>
    );
}