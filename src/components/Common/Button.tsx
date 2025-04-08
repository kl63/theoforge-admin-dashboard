import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

// Base props common to both button and anchor
interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

// Props specific to anchor element (when href is present)
type LinkButtonProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps | 'href'> & {
  href: string; // href is required for LinkButtonProps
  type?: never; // Cannot have button type
};

// Props specific to button element (when href is NOT present)
type NativeButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
  href?: never; // href is disallowed for NativeButtonProps
  type?: 'button' | 'submit' | 'reset';
};

// Combined type using discriminated union based on href
type ButtonProps = LinkButtonProps | NativeButtonProps;

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  as: ComponentProp, // Rename to avoid conflict with component variable
  disabled, // Destructure disabled here
  ...props // All other props (specific to button or anchor)
}) => {

  // Determine the component type based on whether href is passed
  const Component = ComponentProp || (props.href ? 'a' : 'button');

  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border border-transparent',
    secondary:
      'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500 border border-transparent dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900',
    outline:
      'border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 focus:ring-blue-500 dark:border-blue-500 dark:text-blue-400 dark:bg-gray-800 dark:hover:bg-gray-700',
    ghost:
      'text-blue-600 hover:bg-blue-100 focus:ring-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/50 border border-transparent',
    link:
      'text-blue-600 hover:text-blue-800 focus:outline-none focus:underline dark:text-blue-400 dark:hover:text-blue-300 border border-transparent shadow-none px-0 py-0',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const buttonClasses = twMerge(
    clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    )
  );

  const content = (
    <>
      {leftIcon && React.cloneElement(leftIcon, { className: twMerge(clsx(iconSize[size], rightIcon ? 'mr-2' : '')) })}
      {children}
      {rightIcon && React.cloneElement(rightIcon, { className: twMerge(clsx(iconSize[size], leftIcon ? 'ml-2' : '')) })}
    </>
  );

  if (Component === 'a' && props.href) {
    // Type assertion needed because TS can't perfectly infer from the union here
    const anchorProps = props as Omit<LinkButtonProps, keyof BaseButtonProps>; 
    return (
      <Link href={props.href} passHref legacyBehavior>
        <a className={buttonClasses} {...anchorProps}>
          {content}
        </a>
      </Link>
    );
  }

  // Type assertion needed for button props
  const buttonSpecificProps = props as Omit<NativeButtonProps, keyof BaseButtonProps>;
  return (
    <Component className={buttonClasses} disabled={disabled} {...buttonSpecificProps}>
      {content}
    </Component>
  );
};

export default Button;
