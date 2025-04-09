import React from 'react';
import SectionContainer from '@/components/Layout/SectionContainer';
import Heading from '@/components/Common/Heading';
import Paragraph from '@/components/Common/Paragraph';
import Button from '@/components/Common/Button'; // Assuming Button component exists and is styled
import { DiscordLogoIcon } from '@radix-ui/react-icons'; // Example icon, replace if needed
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Insights | TheoForge',
    description: 'Challenging insights and pragmatic strategies for enterprise leaders mastering the AI transformation. Explore AI vision, implementation, literacy, and ethics.',
    // Add other relevant metadata tags
};

// Placeholder data for insight cards - replace with actual data fetching later
const placeholderInsights = [
    {
        slug: 'navigating-ai-strategy',
        title: 'Beyond the Buzzwords: Forging Your Real-World AI Strategy (Sage/Hero)',
        excerpt: 'Cut through the hype. Define a clear, actionable AI roadmap aligned with your specific business goals and overcome implementation hurdles.',
        category: 'Strategic Vision',
        date: '2024-04-08',
        author: 'Keith Williams',
    },
    {
        slug: 'disrupting-legacy-thinking',
        title: "Is Your 'Digital Transformation' Already Obsolete? (Outlaw)", // Use double quotes to wrap string with single quotes
        excerpt: 'Challenge the slow pace of traditional change. Explore how targeted AI disruption can create immediate competitive advantages.',
        category: 'Implementation & Modernization',
        date: '2024-04-01',
        author: 'Keith Williams',
    },
    {
        slug: 'building-ai-literacy',
        title: "Empower Your Workforce: Building AI Capability from Within (Sage/Hero)",
        excerpt: "AI mastery isn't just for data scientists. Learn practical strategies to upskill your entire team for the AI era.",
        category: 'AI Literacy',
        date: '2024-03-25',
        author: 'Keith Williams',
    },
     {
        slug: 'responsible-ai-imperative',
        title: 'The Ethical Compass: Navigating Responsible AI Deployment (Sage)',
        excerpt: 'Move beyond compliance. Build trust and long-term value by embedding ethical considerations into your AI framework from day one.',
        category: 'Responsible AI',
        date: '2024-03-18',
        author: 'Keith Williams',
    },
];

// Re-insert InsightCardProps interface
interface InsightCardProps {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    slug: string;
    author: string;
}

// Re-insert Insight Card Component
const InsightCard: React.FC<InsightCardProps> = ({ title, excerpt, category, date, slug, author }) => {
    return (
        <div className="border border-border rounded-lg p-6 bg-card dark:bg-card-dark shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
            <span className="text-xs font-medium uppercase text-primary dark:text-primary-light mb-2">{category}</span>
            <Heading level={3} className="text-xl font-semibold mb-3 font-poppins text-neutral-900 dark:text-neutral-100">
                 <a href={`/insights/${slug}`} className="hover:text-primary dark:hover:text-primary-light transition-colors duration-200">{title}</a>
            </Heading>
            <Paragraph className="text-neutral-700 dark:text-neutral-300 mb-4 flex-grow">
                {excerpt}
            </Paragraph>
            <div className="text-sm text-muted-foreground dark:text-muted-foreground-dark mt-auto pt-4 border-t border-border">
                <span>{author}</span> | <span>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
        </div>
    );
};

const InsightsPage = () => {
    return (
        <>
            {/* --- Insights Hero Section --- */}
            <SectionContainer className="pt-24 pb-16 md:pt-32 md:pb-24 text-center bg-gradient-to-b from-background to-muted/30 dark:from-background-dark dark:to-muted-dark/10">
                 <Heading
                    level={1}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins mb-4 text-neutral-900 dark:text-neutral-100"
                 >
                     Forge Your AI Edge
                 </Heading>
                 <Paragraph className="text-xl max-w-3xl mx-auto text-neutral-700 dark:text-neutral-300 mb-8">
                     Challenging insights and pragmatic strategies for enterprise leaders mastering the AI transformation. Move beyond theory to confident action.
                 </Paragraph>
                 {/* --- Discord CTA --- */}
                 <div className="bg-card dark:bg-card-dark border border-border rounded-lg p-6 max-w-2xl mx-auto shadow-lg">
                     <Heading level={2} className="text-2xl font-semibold mb-3 font-poppins text-neutral-900 dark:text-neutral-100 flex items-center justify-center">
                         <DiscordLogoIcon className="w-6 h-6 mr-2 text-primary dark:text-primary-light" /> Join The Forge
                     </Heading>
                     <Paragraph className="text-neutral-700 dark:text-neutral-300 mb-5">
                         Connect with fellow leaders, share challenges, explore disruptive ideas, and access expert guidance in our exclusive Discord community.
                     </Paragraph>
                     <Button
                         href="#" // <-- IMPORTANT: Replace with your actual Discord invite link later
                         variant="primary"
                         size="lg"
                         target="_blank" // Open in new tab
                         rel="noopener noreferrer" // Security best practice for target="_blank"
                         className="inline-flex items-center"
                     >
                         Enter the Community
                         <DiscordLogoIcon className="w-5 h-5 ml-2" />
                     </Button>
                 </div>
            </SectionContainer>

            {/* --- Insights Listing Section --- */}
            <SectionContainer className="py-16 md:py-24">
                <Heading level={2} className="text-3xl font-semibold font-poppins mb-12 text-center text-neutral-900 dark:text-neutral-100">
                    Latest Insights
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {placeholderInsights.map((insight) => (
                        <InsightCard
                            key={insight.slug}
                            slug={insight.slug}
                            title={insight.title}
                            excerpt={insight.excerpt}
                            category={insight.category}
                            date={insight.date}
                            author={insight.author}
                        />
                    ))}
                    {/* Add pagination controls here later if needed */}
                </div>
            </SectionContainer>
        </>
    );
};

export default InsightsPage;
