'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import Link from 'next/link';
import useScrollTrigger from '@mui/material/useScrollTrigger';

// Updated nav items based on the design - linking to homepage sections
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/#about' }, // Ensure full path for hash link
  { label: 'Services', path: '/services' }, // Updated path
  { label: 'Blog', path: '/blog' }, 
  { label: 'Contact', path: '/contact' },
];

const drawerWidth = 240; // Width of the mobile drawer

export default function Header() { 
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname(); // Get current pathname

  // Trigger for scroll effect
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0, // Trigger as soon as scrolling starts
  });

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TheoForge
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton 
              component={Link} 
              href={item.path} 
              sx={{ 
                textAlign: 'center',
                fontWeight: pathname === item.path ? 'bold' : 'normal' // Active style for mobile
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" // Keep sticky positioning
      color="transparent" // Start transparent
      elevation={trigger ? 4 : 0} // Add elevation on scroll
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        // Apply background color only when triggered
        backgroundColor: trigger ? 'background.paper' : 'transparent',
        // Transition for smooth effect
        transition: (theme) => theme.transitions.create(['background-color', 'box-shadow'], {
          duration: theme.transitions.duration.short,
        }),
        zIndex: (theme) => theme.zIndex.drawer + 1, // Keep zIndex 
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}> 
          {/* Logo and Company Name */}
          <Link href="/" passHref style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Image
              src="/logo.png"
              alt="Theoforge Logo"
              width={40} 
              height={40} 
              style={{ marginRight: '8px' }}
            />
            {/* Always display company name */}
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', display: 'block' }}> 
              TheoForge
            </Typography>
          </Link>

          {/* Desktop Navigation Links */}
          {/* Changed breakpoint to sm */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}> 
            {navItems.map((item) => (
              <Link key={item.label} href={item.path} passHref>
                <Button 
                  color="inherit" 
                  sx={{ 
                    ml: 1,
                    fontWeight: pathname === item.path ? 'bold' : 'normal' // Active style for desktop
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Mobile Menu Icon Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end" 
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }} 
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </Container>
      {/* Mobile Navigation Drawer */}
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          anchor="right" 
          sx={{
            display: { xs: 'block', sm: 'none' }, 
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </AppBar>
  );
}
