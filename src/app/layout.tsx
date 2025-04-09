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

/* import type { Metadata } from "next"; */

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${publicSans.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground dark:bg-background dark:text-foreground">
        <Header />
        <main>{children}</main> 
        <Footer />
        <script async type='module' src='https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js'></script>
        <zapier-interfaces-chatbot-embed is-popup='true' chatbot-id='cm91mcgc2002yc41mrfhan884'></zapier-interfaces-chatbot-embed>
      </body>
    </html>
  );
}
