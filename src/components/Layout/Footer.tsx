'use client';
import React from 'react';
import Link from 'next/link';
import SocialIcons from '../Common/SocialIcons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 sm:py-12 bg-neutral-900 text-neutral-200 font-sans">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between gap-y-8 gap-x-10 md:gap-x-16">

          <div className="w-full sm:w-2/5 md:w-1/3 lg:w-2/5">
            <h3 className="text-lg font-semibold text-primary mb-2">
              TheoForge
            </h3>
            <p className="text-sm text-neutral-300 mb-4">
              Guiding organizations through the complexities of AI adoption with strategic insight and technical expertise.
            </p>
          </div>

          <div className="w-1/2 sm:w-auto md:w-auto lg:w-auto">
            <h3 className="text-base font-semibold text-primary mb-2">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              {[ 
                { href: '/#about', label: 'About Us' },
                { href: '/#services', label: 'Services' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className={`text-sm text-neutral-300 hover:text-primary-light transition-colors duration-150`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="w-1/2 sm:w-auto md:w-auto lg:w-auto">
            <h3 className="text-base font-semibold text-primary mb-2">
              Connect
            </h3>
            <div className="flex space-x-4"> 
              <SocialIcons />
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-neutral-700 text-center text-neutral-400">
          <p className="text-xs">
            &copy; {currentYear} TheoForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
