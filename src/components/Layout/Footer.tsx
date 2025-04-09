'use client';
import React from 'react';
import Link from 'next/link';
import SocialIcons from '../Common/SocialIcons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 bg-muted dark:bg-muted-dark text-muted-foreground dark:text-muted-foreground-dark font-sans"> {/* Use standard padding, theme colors */}
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between gap-y-8 gap-x-8 md:gap-x-16">

          <div className="w-full sm:w-2/5 md:w-1/3 lg:w-2/5">
            <h3 className="font-heading font-medium text-lg mb-2 text-foreground dark:text-foreground-dark"> {/* Use theme color */}
              TheoForge
            </h3>
            <p className="text-sm mb-4"> {/* Inherit theme color */}
              Guiding organizations through the complexities of AI adoption with strategic insight and technical expertise.
            </p>
          </div>

          <div className="w-1/2 sm:w-auto md:w-auto lg:w-auto">
            <h3 className="font-heading font-medium text-base mb-2 text-foreground dark:text-foreground-dark"> {/* Use theme color */}
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
                  className={`text-sm text-muted-foreground dark:text-muted-foreground-dark hover:text-primary dark:hover:text-primary-dark transition-colors duration-150`} // Use theme color
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="w-1/2 sm:w-auto md:w-auto lg:w-auto">
            <h3 className="font-heading font-medium text-base mb-2 text-foreground dark:text-foreground-dark"> {/* Use theme color */}
              Connect
            </h3>
            <div className="flex space-x-4"> 
              <SocialIcons />
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border dark:border-border-dark text-center"> {/* Use theme border color */}
          <p className="text-xs text-muted-foreground dark:text-muted-foreground-dark"> {/* Use theme color */}
            &copy; {currentYear} TheoForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
