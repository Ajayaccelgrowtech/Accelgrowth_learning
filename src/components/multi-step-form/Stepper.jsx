import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

const Stepper = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-between w-full mb-8 relative">
      {/* Progress Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-primary-600 -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isActive = currentStep === stepNumber;

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                isCompleted 
                  ? "bg-primary-600 border-primary-600 text-white" 
                  : isActive 
                    ? "bg-white border-primary-600 text-primary-600 shadow-[0_0_15px_rgba(14,165,233,0.3)]" 
                    : "bg-white border-gray-300 text-gray-400"
              )}
            >
              {isCompleted ? (
                <Check className="w-5 h-5" strokeWidth={3} />
              ) : (
                <span className="text-sm font-bold">{stepNumber}</span>
              )}
            </div>
            <span 
              className={cn(
                "absolute -bottom-7 text-xs font-semibold whitespace-nowrap transition-colors duration-300",
                isActive || isCompleted ? "text-primary-700" : "text-gray-400"
              )}
            >
              {step.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
