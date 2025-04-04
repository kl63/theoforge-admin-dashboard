import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import { services } from '@/data/services'; 

const service = services.find(s => s.link === '/services/ai-integration');

export default function ServiceDetailPage() {
  if (!service) {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h5" color="error">Service details not found.</Typography>
        </Container>
    );
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link href="/">
            Home
          </Link>
          <Link href="/#services"> 
            Services
          </Link>
          <Typography color="text.primary">{service.title}</Typography>
        </Breadcrumbs>

        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          {service.title}
        </Typography>

        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          {service.excerpt}
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          [Placeholder for more detailed description of the Enterprise AI Integration & Modernization service. Elaborate on integration challenges, modernization approaches, specific technologies (e.g., API gateways, data pipelines), and ensuring scalability/security.]
        </Typography>
        <ul>
          <li><Typography variant="body1" sx={{ lineHeight: 1.7, mb: 1 }}>Key Deliverables: Integration blueprints, modernization roadmaps, pilot implementations.</Typography></li>
          <li><Typography variant="body1" sx={{ lineHeight: 1.7, mb: 1 }}>Target Outcomes: Seamless AI integration, reduced technical debt, enhanced system performance.</Typography></li>
          <li><Typography variant="body1" sx={{ lineHeight: 1.7, mb: 1 }}>Keith's Relevant Experience: 30 years in enterprise systems, specific integration project examples.</Typography></li>
        </ul>

        <Box sx={{ mt: 4, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>Related Success Story</Typography>
            <Typography variant="body2">
                [Placeholder for a brief related case study snippet or link.]
            </Typography>
        </Box>
        
         <Box sx={{ mt: 5, textAlign: 'center' }}>
             <Typography variant="h5" component="p" gutterBottom>
                 Modernize Your AI Infrastructure?
             </Typography>
             <Link href="/contact" passHref>
                 <button className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeLarge MuiButton-containedSizeLarge css-eikrap-MuiButtonBase-root-MuiButton-root" tabIndex={0} type="button">
                     Schedule a Consultation
                     <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                 </button>
             </Link>
         </Box>
      </Container>
    </Box>
  );
}
