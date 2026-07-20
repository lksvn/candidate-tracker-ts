import Link from 'next/link';

export default function CompanyNotFound() {
    return (
        <main>
            <h1>Company not found</h1>
            <p>
                The requested company does not exist or is no longer available.
            </p>
            <Link href="/companies">
                Back to companies
            </Link>
        </main>
    );
}