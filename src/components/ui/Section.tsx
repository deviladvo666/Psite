import React from 'react';
import Container from './Container';
import clsx from 'clsx';

export default function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={clsx('py-28 md:py-32', className)} {...props}>
      <Container>{props.children}</Container>
    </section>
  );
}
