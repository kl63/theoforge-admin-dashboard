import React from 'react';
import SectionContainer from '../Layout/SectionContainer';
import Button from '../Common/Button'; // Corrected import path

const CallToActionSection = () => (
  // Use SectionContainer with specific background/text colors
  <SectionContainer className="bg-blue-600 text-white">
    {/* Center content within the container */}
    <div className="max-w-3xl mx-auto text-center"> {/* Kept max-w-3xl for narrower focus */}
      {/* Heading - Use standard text/font utilities */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Transform AI Complexity into Strategic Advantage?
      </h2>
      {/* Paragraph */}
      <p className="text-lg mb-8">
        Schedule a strategic consultation to explore how our integrated expertise can transform AI complexity into confident action, accelerating your initiatives and delivering measurable value.
      </p>
      {/* Button - Use Button component */}
      {/* Inferring a contrasting style - secondary or custom? Let's try secondary with overrides */}
      <Button 
        href="/contact" 
        variant="secondary" 
        size="lg" 
        className="bg-white text-blue-700 hover:bg-gray-100 focus:ring-offset-blue-600 focus:ring-white"
      >
        Schedule Your Strategy Session
      </Button>
    </div>
  </SectionContainer>
);

export default CallToActionSection;
