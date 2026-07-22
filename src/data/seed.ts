import { Company } from '../domain/company';
import { Client } from '../domain/client';
import { JobOpportunity } from '../domain/jobOpportunity';
import { Interview } from '../domain/interview';
import { FreelanceOpportunity } from '../domain/freelance';
import { Project } from '../domain/project';

export const companies: Company[] = [
    {
        id: '1',
        name: 'TechFlow Solutions',
        website: 'https://techflow.example.com'
    },
    {
        id: '2',
        name: 'Nexus Digital',
        website: 'https://nexusdigital.example.com'
    },
    {
        id: '3',
        name: 'Stellar Labs',
        website: 'https://stellarlabs.example.com'
    }
];

export const clients: Client[] = [
    {
        id: '1',
        name: 'Ana Costa',
        email: 'ana.costa@example.com',
        phone: '(11) 99999-0001',
        notes: 'Prefers communication via email. Works with fintech startups.'
    },
    {
        id: '2',
        name: 'Rafael Oliveira',
        email: 'rafael.oliveira@example.com',
        phone: '(21) 98888-0002',
        notes: 'Usually has tight deadlines. Responsive on WhatsApp.'
    },
    {
        id: '3',
        name: 'Juliana Mendes',
        email: 'juliana.mendes@example.com',
        notes: 'Prefers in-person meetings for project kickoffs.'
    }
];

export const jobs: JobOpportunity[] = [
    {
        id: '1',
        title: 'Frontend Developer',
        companyId: '1',
        description: 'Build modern UIs with React and TypeScript.',
        model: 'remote',
        status: 'saved'
    },
    {
        id: '2',
        title: 'Backend Engineer',
        companyId: '2',
        description: 'Design and maintain RESTful APIs in Node.js.',
        model: 'hybrid',
        status: 'applied'
    },
    {
        id: '3',
        title: 'DevOps Specialist',
        companyId: '1',
        description: 'Manage CI/CD pipelines and cloud infrastructure.',
        model: 'remote',
        status: 'interviewing'
    },
    {
        id: '4',
        title: 'UX Designer',
        companyId: '3',
        description: 'Create wireframes and prototypes for web applications.',
        model: 'onSite',
        status: 'interviewing'
    },
    {
        id: '5',
        title: 'Data Analyst',
        companyId: '2',
        description: 'Analyze business data and build dashboards.',
        model: 'hybrid',
        status: 'rejected'
    }
];

export const interviews: Interview[] = [
    {
        id: '1',
        jobOpportunityId: '3',
        date: '2026-07-10',
        status: 'scheduled',
        location: 'Google Meet',
        notes: 'Technical interview - system design.'
    },
    {
        id: '2',
        jobOpportunityId: '4',
        date: '2026-07-08',
        status: 'scheduled',
        location: 'Rua Augusta, 1500',
        notes: 'On-site interview with the design team.'
    },
    {
        id: '3',
        jobOpportunityId: '2',
        date: '2026-07-07',
        status: 'completed',
        location: 'Zoom',
        notes: 'HR screening call.'
    },
    {
        id: '4',
        jobOpportunityId: '1',
        date: '2026-07-12',
        status: 'scheduled',
        notes: 'Technical challenge presentation.'
    },
    {
        id: '5',
        jobOpportunityId: '3',
        date: '2026-07-14',
        status: 'cancelled',
        location: 'Google Meet',
        notes: 'Second round canceled after offer from another company.'
    },
    {
        id: '6',
        jobOpportunityId: '99',
        date: '2026-07-15',
        status: 'scheduled',
        location: 'Zoom',
        notes: 'Interview for a nonexistent job — job-not-found.'
    },
    {
        id: '7',
        jobOpportunityId: '5',
        date: '2026-07-16',
        status: 'scheduled',
        location: 'Microsoft Teams',
        notes: 'Data Analyst was already rejected — job-rejected.'
    },
    {
        id: '8',
        jobOpportunityId: '1',
        date: '2026-07-05',
        status: 'scheduled',
        location: 'Zoom',
        notes: 'Scheduled for a past date — scheduled-in-past.'
    },
    {
        id: '9',
        jobOpportunityId: '2',
        date: '2026-07-20',
        status: 'completed',
        location: 'Google Meet',
        notes: 'Completed marked in the future — completed-in-future.'
    },
    {
        id: '10',
        jobOpportunityId: '5',
        date: '2026-07-17',
        status: 'cancelled',
        location: 'Zoom',
        notes: 'Cancelled but job was rejected — still fails as job-rejected.'
    }
];

export const freelanceOpportunities: FreelanceOpportunity[] = [
    {
        id: '1',
        clientId: '3',
        projectBrief: {
            id: 'pb1',
            name: 'E-commerce Landing Page',
            description: 'Single-page storefront for a local brand.'
        },
        status: 'contract-signed'
    },
    {
        id: '2',
        clientId: '1',
        projectBrief: {
            id: 'pb2',
            name: 'Internal Dashboard',
            description: 'Admin panel with charts and user management.'
        },
        status: 'contract-signed'
    },
    {
        id: '3',
        clientId: '2',
        projectBrief: {
            id: 'pb3',
            name: 'Mobile App API',
            description: 'REST API for a fitness tracking app.'
        },
        status: 'contract-signed'
    },
    {
        id: '4',
        clientId: '3',
        projectBrief: {
            id: 'pb4',
            name: 'Blog Migration',
            description: 'Migrate from WordPress to a headless CMS.'
        },
        status: 'contract-signed'
    },
    {
        id: '5',
        clientId: '1',
        projectBrief: {
            id: 'pb5',
            name: 'Portfolio Redesign',
            description: 'Modern portfolio with dark mode.'
        },
        status: 'new'
    },
    {
        id: '6',
        clientId: '2',
        projectBrief: {
            id: 'pb6',
            name: 'SaaS Dashboard MVP',
            description: 'Minimal viable product for a subscription analytics platform.'
        },
        status: 'contacted'
    },
    {
        id: '7',
        clientId: '3',
        projectBrief: {
            id: 'pb7',
            name: 'Company Wiki Revamp',
            description: 'Redesign internal knowledge base with search and categories.'
        },
        status: 'lost'
    },
    {
        id: '8',
        clientId: '1',
        projectBrief: {
            id: 'pb8',
            name: 'REST API Documentation Site',
            description: 'Generate interactive API docs from OpenAPI specs.'
        },
        status: 'contract-signed'
    },
    {
        id: '9',
        clientId: '2',
        projectBrief: {
            id: 'pb9',
            name: 'Email Template Builder',
            description: 'Drag-and-drop editor for transactional email templates.'
        },
        status: 'new'
    },
    {
        id: '10',
        clientId: '3',
        projectBrief: {
            id: 'pb10',
            name: 'Social Media Scheduler',
            description: 'Schedule and publish posts across multiple platforms.'
        },
        status: 'contacted'
    },
    {
        id: '11',
        clientId: '99',
        projectBrief: {
            id: 'pb11',
            name: 'Nonexistent Client Project',
            description: 'Samples for testing invalid projects.'
        },
        status: 'new'
    }
];

export const projects: Project[] = [
    {
        id: '1',
        clientId: '3',
        opportunityId: '1',
        name: 'E-commerce Landing Page',
        description: 'Single-page storefront with product showcase and checkout.',
        mustStartBy: '2026-08-01',
        endDate: '2026-08-15'
    },
    {
        id: '2',
        clientId: '1',
        opportunityId: '2',
        name: 'Internal Dashboard',
        description: 'Admin panel with charts and user management.',
        mustStartBy: '2026-07-14',
        endDate: '2026-08-30'
    },
    {
        id: '3',
        clientId: '2',
        opportunityId: '3',
        name: 'Mobile App API',
        description: 'REST API with authentication and data endpoints.',
        mustStartBy: '2026-07-21',
        endDate: '2026-09-15'
    },
    {
        id: '4',
        clientId: '3',
        opportunityId: '4',
        name: 'Blog Migration',
        description: 'Migrate from WordPress to a headless CMS with existing content.',
        mustStartBy: '2026-07-28',
        endDate: '2026-08-20'
    },
    {
        id: '5',
        clientId: '1',
        opportunityId: '8',
        name: 'REST API Documentation Site',
        description: 'Generate interactive API docs from OpenAPI specs using Next.js.',
        mustStartBy: '2026-08-05',
        endDate: '2026-08-25'
    },
    {
        id: '6',
        clientId: '23',
        opportunityId: '92',
        name: 'Nonexistent Opportunity Project',
        description: 'Samples for testing invalid projects.',
        mustStartBy: '2026-09-01',
        endDate: '2026-09-30'
    },
    {
        id: '7',
        clientId: '23',
        opportunityId: '10',
        name: 'Nonexistent Opportunity Project',
        description: 'Samples for testing invalid projects.',
        mustStartBy: '2026-09-01',
        endDate: '2026-09-30'
    },
    {
        id: '8',
        clientId: '23',
        opportunityId: '8',
        name: 'Nonexistent Opportunity Project',
        description: 'Samples for testing invalid projects.',
        mustStartBy: '2026-09-01',
        endDate: '2026-09-30'
    }
];
