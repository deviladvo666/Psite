import Section from '@/components/ui/Section';
import { H2, Muted } from '@/components/ui/Typography';

export default function Products() {
  return (
    <Section id="products">
      <div className="grid gap-10 md:grid-cols-3">
        <div className="col-span-3 text-center">
          <H2>Products</H2>
          <Muted className="mt-3">A curated selection of digital products.</Muted>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
            <div className="h-36 rounded-md bg-neutral-800" />
            <h3 className="mt-4 text-lg font-semibold">Product {i}</h3>
            <p className="mt-2 text-sm text-neutral-400">Short description of product {i}.</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
