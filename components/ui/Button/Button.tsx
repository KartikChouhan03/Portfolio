import { ReactNode, ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary';
  href?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  href,
  children,
  className,
  type = 'button',
  disabled,
  ...props
}: ButtonProps) {
  const buttonClassName = cn(
    styles.button,
    variant === 'primary' ? styles.primary : styles.secondary,
    disabled && styles.disabled,
    className
  );

  // If a link, render an anchor or Next.js Link
  if (href) {
    const isExternal = href.startsWith('http') || href.endsWith('.pdf');
    
    if (isExternal) {
      return (
        <a
          href={href}
          className={buttonClassName}
          target="_blank"
          rel="noopener noreferrer"
          role="button"
          aria-disabled={disabled}
          {...(props as ComponentPropsWithoutRef<'a'>)}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={buttonClassName}
        role="button"
        aria-disabled={disabled}
        {...(props as ComponentPropsWithoutRef<'a'>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
