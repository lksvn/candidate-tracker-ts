import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '../../../../data/database/prismaClient';
import { PrismaCompanyRepository } from '../../../../data/repositories/prismaCompanyRepository';
import { CompanyEditForm } from './company-edit-form';

const companyRepository = new PrismaCompanyRepository(prisma);

type EditCompanyPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditCompanyPage({
    params
}: EditCompanyPageProps) {
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
            <Link href={`/companies/${id}`}>{'<'} Back</Link>

            <h1>Editing: {company.name}</h1>
            <CompanyEditForm company={company} />
        </main>
    );
}