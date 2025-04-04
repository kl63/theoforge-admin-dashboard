import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import { services } from '@/data/services'; // Assuming services data is correctly typed and exported

// Find the specific service data
const service = services.find(s => s.link === '/services/ai-strategy-enablement');

export default function ServiceDetailPage() {
  if (!service) {
    // Handle case where service data isn't found (optional)
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h5" color="error">Service details not found.</Typography>
        </Container>
    );
  }

  return (
    <Box sx={{ py: 6 }}> {/* Add padding top and bottom */}
      <Container maxWidth="lg">
        {/* Breadcrumbs for navigation */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link href="/">
            Home
          </Link>
          <Link href="/#services"> {/* Link back to services section on home */}
            Services
          </Link>
          <Typography color="text.primary">{service.title}</Typography>
        </Breadcrumbs>

        {/* Service Title */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          {service.title}
        </Typography>
        
        {/* Optional: Service Image */}
        {/* 
        <Box sx={{ my: 4, maxHeight: '400px', overflow: 'hidden', borderRadius: 1 }}>
           <img 
             src={service.imagePlaceholder} 
             alt={`${service.title} visual representation`} 
             style={{ width: '100%', height: 'auto', display: 'block' }} 
           />
        </Box> 
        */}

        {/* Placeholder for Detailed Content */}
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          {service.excerpt} {/* Start with the excerpt */}
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          [Placeholder for more detailed description of the Strategic AI Leadership & Enablement service. This section should elaborate on:]
        </Typography>
        <ul>
          <li><Typography variant="body1" sx={{ lineHeight: 1.7, mb: 1 }}>Specific methodologies used (e.g., workshops, audits, roadmap development).</Typography></li>
          <li><Typography variant="body1" sx={{ lineHeight: 1.7, mb: 1 }}>Key deliverables (e.g., strategic plan, capability assessment, training modules).</Typography></li>
          <li><Typography variant="body1" sx={{ lineHeight: 1.7, mb: 1 }}>Target outcomes for the client (e.g., clear AI vision, upskilled team, identified opportunities).</Typography></li>
          <li><Typography variant="body1" sx={{ lineHeight: 1.7, mb: 1 }}>How Keith's unique background (tech leadership, teaching) applies to this service.</Typography></li>
          <li><Typography variant="body1" sx={{ lineHeight: 1.7, mb: 1 }}>Ideal client profile for this service.</Typography></li>
        </ul>

        {/* Placeholder for Case Study Snippet / Link */}
        <Box sx={{ mt: 4, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>Related Success Story</Typography>
            <Typography variant="body2">
                [Placeholder for a brief related case study snippet or link to a full case study page.]
            </Typography>
        </Box>
         {/* Call to Action */}
         <Box sx={{ mt: 5, textAlign: 'center' }}>
             <Typography variant="h5" component="p" gutterBottom>
                 Ready to Define Your AI Strategy?
             </Typography>
             <Link href="/contact" passHref>
                <button className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeLarge MuiButton-containedSizeLarge css-eikrap-MuiButtonBase-root-MuiButton-root" tabIndex={0} type="button"> {/* Reuse button styling from CTA */}
                    Schedule a Consultation
                    <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                </button>
             </Link>
         </Box>
      </Container>
    </Box>
  );
}

// Optional: Add metadata for SEO
// export const metadata = {
//   title: `${service?.title || 'Service Detail'} - TheoForge`,
//   description: service?.excerpt || 'Learn more about our AI consulting services.',
// };

