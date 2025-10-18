'use client';

import React from 'react';

interface Step {
  id: string;
  title: string;
}

interface PurchaseFormProps {
  steps: Step[];
  activeStep: number;
  className?: string;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ 
  steps, 
  activeStep,
  className = ''
}) => {
  return (
    <div className={`mb-6 mt-4 ${className}`} style={{ backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity, 1))', borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem', marginBottom: '1.5rem', padding: '10px'}}>
      {/* Stepper */}
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
        <div 
          className="absolute top-4 left-0 h-0.5 bg-[rgb(133,237,104)] z-10 transition-all duration-300"
          style={{ width: `${steps.length > 1 ? (activeStep / (steps.length - 1)) * 100 : 0}%` }}
        ></div>
        
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center z-20">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                index <= activeStep 
                  ? 'bg-[rgb(133,237,104)] text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index < activeStep ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div 
              className={`mt-2 text-sm font-medium ${
                index <= activeStep ? 'text-gray-800' : 'text-gray-500'
              }`}
            >
              {step.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseForm;