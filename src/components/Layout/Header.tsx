'use client';

import React, { useState, useEffect } from 'react'; 
import { usePathname } from 'next/navigation'; 
import Image from 'next/image'; 
import Link from 'next/link'; 
import { Dialog, Transition } from '@headlessui/react'; 
import { Fragment } from 'react'; 

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Insights', path: '/blog' },
  { label: 'The Forge', path: '/forge' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false); 
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') { 
        setIsScrolled(window.scrollY > 10);
      }
    };
    if (typeof window !== 'undefined') { 
      window.addEventListener('scroll', handleScroll);
      handleScroll(); 
      return () => window.removeEventListener('scroll', handleScroll);
    }
    return undefined; 
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`
          sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-300 
          font-sans 
          ${isScrolled 
            ? 'bg-background/80 border-b border-neutral-300 dark:border-neutral-700 shadow-sm' 
            : 'bg-transparent border-b border-transparent'}
        `}
      >
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center text-neutral-900 dark:text-neutral-100 no-underline">
              <Image
                src="/logo.png" 
                alt="Theoforge Logo"
                width={40}
                height={40}
                className="mr-2"
                priority 
              />
              <span className="text-xl font-bold font-sans">TheoForge</span>
            </Link>

            <nav className="hidden sm:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${pathname === item.path
                      ? 'text-primary dark:text-primary-dark font-semibold' 
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary-dark hover:bg-neutral-100 dark:hover:bg-neutral-800'} 
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="sm:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)} 
                className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:focus:ring-primary-dark" 
                aria-label="Open main menu"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 sm:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-900/40 dark:bg-black/60 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative w-full max-w-xs bg-background dark:bg-neutral-900 shadow-lg">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title className="text-lg font-semibold font-sans text-neutral-900 dark:text-neutral-100">TheoForge</Dialog.Title>
                    <button
                      type="button"
                      onClick={closeMobileMenu}
                      className="-m-2 p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark" 
                      aria-label="Close menu"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <hr className="border-neutral-200 dark:border-neutral-700 my-2" /> 
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.path}
                          onClick={closeMobileMenu} 
                          className={`
                            block px-4 py-2 rounded-md text-base font-medium transition-colors
                            ${pathname === item.path
                              ? 'bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark font-semibold' 
                              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100'} 
                          `}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
