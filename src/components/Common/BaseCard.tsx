import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  // Add other potential variant props later if needed (e.g., hoverEffect?)
}

const BaseCard: React.FC<BaseCardProps> = ({ children, className }) => {
  // Combine base styles with any additional classes passed via props using clsx and twMerge
  const cardClasses = twMerge(
    clsx(
      'flex flex-col h-full', // Ensure flex column and full height
      'rounded-lg',
      'bg-white dark:bg-gray-800',
      'border border-gray-200 dark:border-gray-700',
      'shadow-sm',
      'overflow-hidden', // Prevent content overflow issues
      'transition-shadow duration-200 ease-in-out', // Optional: subtle hover effect
      className // Append additional classes
    )
  );

  return (
    // No need for trim/replace now
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default BaseCard;
