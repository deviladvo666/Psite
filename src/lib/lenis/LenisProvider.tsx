'use client';
import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      // @ts-ignore
      lenis?.destroy?.();
    };
  }, []);

  return <>{children}</>;
}
