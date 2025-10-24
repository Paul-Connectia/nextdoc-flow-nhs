import React from 'react';
import Navigation from '@/components/Navigation';
import ConditionalFooter from '@/components/ConditionalFooter';
import { CalendlyIntegration } from '@/components/CalendlyIntegration';

const Consultation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <CalendlyIntegration />
      </main>
      <ConditionalFooter />
    </div>
  );
};

export default Consultation;