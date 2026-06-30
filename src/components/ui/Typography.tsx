import React from 'react';
import clsx from 'clsx';

export function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={clsx('text-5xl md:text-7xl font-semibold tracking-tight', className)} {...props} />;
}

export function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={clsx('text-3xl md:text-5xl font-semibold tracking-tight', className)} {...props} />;
}

export function Muted({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={clsx('text-neutral-400', className)} {...props} />;
}
