import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Public_Sans } from "next/font/google";
import Box from '@mui/material/Box';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ThemeRegistry from "../components/ThemeRegistry/ThemeRegistry";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Script from 'next/script';
import ZapierChatbotEmbed from '../components/Common/ZapierChatbotEmbed';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ['400', '500', '600', '700'], 
  subsets: ["latin"],
  display: 'swap', 
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  weight: ['400', '500', '700'], 
  subsets: ["latin"],
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "TheoForge | Transform AI Complexity into Strategic Confidence",
  description: "Partner with Theoforge for expert AI strategy, pragmatic implementation, and tailored workforce enablement. We help you navigate complexity and build lasting AI capability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${publicSans.variable}`}>
      <head>
        {/* Preload Hero Background Image */}
        <link rel="preload" href="/hero_bg.png" as="image" />
        {/* Favicon Links - Added */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeRegistry>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
              </Box>
              <Footer />
              <ZapierChatbotEmbed 
                isPopup="true" 
                chatbotId="cm91mcgc2002yc41mrfhan884" 
              />
            </Box>
          </ThemeRegistry>
        </AppRouterCacheProvider>
        <Script 
          id="zapier-interfaces-script" 
          strategy="lazyOnload" 
          src="https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js" 
          async 
          type="module"
        />
      </body>
    </html>
  );
}
