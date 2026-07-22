import Link from "next/link";

export default function HomePage() {
    return (
        <main>
            <p>Candidate Tracker</p>
            <h1>Manage your job search in one place</h1>
            <p>
                Track companies, opportunities, interviews, and projects.
            </p>
            <ul>
                <li><Link href="/companies">List the companies</Link></li>
                <li><Link href="/opportunities">List the opportunities</Link></li>
            </ul>
        </main>
    );
}