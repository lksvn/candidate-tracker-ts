import Link from 'next/link';

export default function OpportunityNotFound() {
    return (
        <main>
            <h1>Opportunity not found</h1>
            <p>
                The requested opportunity does not exist or is no longer available.
            </p>
            <Link href="/opportunities">
                Back to opportunities
            </Link>
        </main>
    );
}