import { AppLayout } from '@/components/layout/AppLayout';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { CTA } from '@/components/landing/CTA';

export default function Home() {
  return (
    <AppLayout>
      <Hero />
      <Features />
      <CTA />
    </AppLayout>
  );
}
