import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ConditionalFooter from '@/components/ConditionalFooter';
import StudyMaterials from '@/components/StudyMaterials';

const StudyMaterialsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <StudyMaterials />
      </main>
      <ConditionalFooter />
    </div>
  );
};

export default StudyMaterialsPage;