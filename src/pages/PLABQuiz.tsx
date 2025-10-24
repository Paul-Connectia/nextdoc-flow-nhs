import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ConditionalFooter from '@/components/ConditionalFooter';
import PLABQuiz from '@/components/PLABQuiz';

const PLABQuizPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <PLABQuiz />
      </main>
      <ConditionalFooter />
    </div>
  );
};

export default PLABQuizPage;