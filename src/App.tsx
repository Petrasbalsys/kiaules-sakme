import React, { lazy, Suspense } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './i18n';
import './tailwind.css';

// Lazy load presentations for code splitting
const LandingPresentation = lazy(() => import('./presentations/Landing'));

// Loading component
const LoadingScreen = () => (
  <div className="w-screen h-screen flex items-center justify-center bg-black">
    <div className="text-white text-2xl">Loading...</div>
  </div>
);

// Subdomain router component

function App() {
  return (
      <LanguageProvider>
        <ErrorBoundary>
          <Suspense fallback={<LoadingScreen />}>
              <LandingPresentation />
          </Suspense>
        </ErrorBoundary>
      </LanguageProvider>
  );
}

export default App;