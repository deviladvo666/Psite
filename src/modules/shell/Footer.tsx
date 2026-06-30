import Container from '@/components/ui/Container';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800/60 py-10 text-sm text-neutral-400">
      <Container>
        © {new Date().getFullYear()} Premium Personal Site. All rights reserved.
      </Container>
    </footer>
  );
}
