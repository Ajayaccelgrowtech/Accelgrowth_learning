import React from 'react';
import MultiStepForm from './components/multi-step-form/MultiStepForm';

function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Onboarding <span className="text-primary-600">Process</span>
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Complete these three simple steps to get started with our platform.
        </p>
      </header>

      <main className="w-full">
        <MultiStepForm />
      </main>

      <footer className="mt-auto py-8 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} TechFlow Inc. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
