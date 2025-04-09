import React from 'react';
import "./globals.css";
import { Inter, Public_Sans } from 'next/font/google'; 

// Configure Inter for headings
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', 
  weight: ['500', '600', '700', '800'] 
});

// Configure Public Sans for body/UI
const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-public-sans', 
  weight: ['400', '500', '600', '700'] 
});

import Header from '../components/Layout/Header'; 
import Footer from '../components/Layout/Footer'; 

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | TheoForge - AI Strategy & Implementation',
    default: 'TheoForge - AI Strategy & Implementation Specialists',
  },
  description: 'TheoForge specializes in AI strategy, Model Context Protocol (MCP) implementation, and AI agent development to transform your business with reliable, high-impact AI solutions.',
  keywords: [
    'AI Strategy', 'AI Consulting', 'AI Implementation', 'Model Context Protocol', 'MCP', 
    'AI Agent Development', 'Multi-Agent Systems', 'Enterprise AI', 'Workforce Training',
    'Generative AI', 'AI Solutions', 'TheoForge'
  ],
  authors: [{ name: 'TheoForge Team' }],
  openGraph: {
    title: 'TheoForge - AI Strategy & Implementation | Model Context Protocol (MCP) Compatible',
    description: 'Strategic advisory for AI implementation featuring Model Context Protocol (MCP) and multi-agent systems to build reliable, enterprise-ready AI solutions.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${publicSans.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground dark:bg-background dark:text-foreground">
        <Header />
        {/* Remove top padding to eliminate the white space */}
        <main>{children}</main> 
        <Footer />
      </body>
    </html>
  );
}
