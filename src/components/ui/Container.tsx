import React from 'react';
import clsx from 'clsx';

export default function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('mx-auto w-full max-w-6xl px-8', className)} {...props} />;
}
