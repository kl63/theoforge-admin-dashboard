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
        // Removed className override to use default PageContainer styles (theme bg, py-16)
      >
        {/* Services CSS Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {allServicesData.map((service) => (
            <InfoCard 
              key={service.slug}
              title={service.title}
              excerpt={service.excerpt}
              image={service.image}
              link={service.link}
            />
          ))}
        </div>
      </PageContainer>
    </main>
  );
};
