import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Candidate Tracker',
    description: 'Track companies and job opportunities'
};

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({
    children
}: RootLayoutProps) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}