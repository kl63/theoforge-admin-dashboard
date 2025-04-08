import React from 'react';
import "./globals.css";
import { Poppins, Public_Sans } from 'next/font/google'; 

// Configure Poppins for headings
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins', 
  weight: ['400', '500', '600', '700'] 
});

// Configure Public Sans for body/UI
const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-public-sans', 
  weight: ['400', '500', '700'] 
});

import Header from '../components/Layout/Header'; 
import Footer from '../components/Layout/Footer'; 

/* import type { Metadata } from "next"; */

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${publicSans.variable}`}> 
      <body> 
        <Header />
        <main>{children}</main> 
        <Footer />
      </body>
    </html>
  );
}
