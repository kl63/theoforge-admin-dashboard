import React from 'react';
import { getSortedServicesData } from '@/lib/services'; // Assuming this path is correct
import { ServiceData } from '@/types/service'; // Assuming this path is correct
import InfoCard from '@/components/Common/InfoCard'; // Use InfoCard from Common components
import { Metadata } from 'next';
import PageContainer from '@/components/Layout/PageContainer'; // Import PageContainer

export const metadata: Metadata = {
  title: 'TheoForge Services | AI Strategy, Implementation & Enablement',
  description: "Discover how Theoforge's integrated AI services transform complexity into confident action through expert strategy, pragmatic implementation, and workforce enablement.",
};

export default async function ServicesPage() {
  const allServicesData: ServiceData[] = await getSortedServicesData();

  const pageTitle = "Our Services";
  const pageSubtitle = "Integrated services designed to transform AI complexity into confident action and strategic advantage.";

  return (
    <main>
      <PageContainer 
        title={pageTitle} 
        subtitle={pageSubtitle} 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 py-8 md:py-12"
      >
        {/* Services CSS Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {allServicesData.map((service) => (
            <InfoCard 
              key={service.slug} // Key moves to the mapped element
              title={service.title}
              excerpt={service.excerpt}
              image={service.image} // Pass image if available
              link={service.link} // InfoCard expects a link prop
            />
          ))}
        </div>
      </PageContainer>
    </main>
  );
};
