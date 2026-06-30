import dynamic from 'next/dynamic';
import Hero from '@/modules/landing/Hero';
import Products from '@/modules/landing/Products';
import DemoCTA from '@/modules/landing/DemoCTA';

const Scene = dynamic(() => import('@/modules/landing/Scene').catch(() => ({ default: () => null })), {
  ssr: false
});

export default function Page() {
  return (
    <main>
      <Hero>
        <Scene />
      </Hero>
      <Products />
      <DemoCTA />
    </main>
  );
}
