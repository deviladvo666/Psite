import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export default function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-5 text-base',
    lg: 'h-12 px-6 text-lg'
  } as const;
  const variants = {
    primary: 'bg-white text-black hover:bg-neutral-200',
    secondary: 'bg-neutral-800 text-white hover:bg-neutral-700',
    ghost: 'bg-transparent text-white hover:bg-neutral-800/40'
  } as const;
  return <button className={clsx(base, sizes[size], variants[variant], className)} {...props} />;
}
