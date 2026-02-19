'use client';

import { useGeolocation } from '@/hooks/useGeolocation';
import { Hero } from '@/components/Hero';
import { EmergencyInput } from '@/components/EmergencyInput';
import { ResultsPanel } from '@/components/ResultsPanel';
import { ScenarioGrid } from '@/components/ScenarioGrid';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';
import { FloatingFab } from '@/components/FloatingFab';
import { EmergencyContactsPopup } from '@/components/EmergencyContactsPopup';
import { Providers } from './providers';

export default function Home() {
  useGeolocation();

  return (
    <Providers>
      <main>
        <EmergencyContactsPopup />
        <Hero />
        <EmergencyInput />
        <ResultsPanel />
        <ScenarioGrid />
        <HowItWorks />
        <Footer />
        <FloatingFab />
      </main>
    </Providers>
  );
}
