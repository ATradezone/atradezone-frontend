'use client';

import React from 'react';

const OnboardingSkeleton = () => {
  return (
    <div 
      className="p-4 sm:p-6 rounded-[15px] sm:rounded-[20px] border border-[#e1e1e1] animate-pulse"
      style={{
        boxShadow: '-5px 5px 50px -5px #e1e1e1'
      }}
    >
      {/* Header skeleton */}
      <div className="flex items-center justify-center lg:justify-start mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
        <div className="ml-3">
          <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-48"></div>
        </div>
      </div>
      
      {/* Welcome message skeleton */}
      <div className="mb-6">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      
      {/* Categories grid skeleton */}
      <div className="flex-grow overflow-y-auto max-h-96 py-2 px-2">
        <div className="grid grid-cols-2 gap-4">
          {[...Array(7)].map((_, index) => (
            <div 
              key={index}
              className="rounded-xl border-2 flex flex-col items-center justify-center p-4"
              style={{ 
                minHeight: '120px',
                border: '1px solid #e5e7eb'
              }}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 bg-gray-300 rounded-full mb-3"></div>
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Custom category input skeleton */}
        <div className="mt-4">
          <div className="h-4 bg-gray-300 rounded w-2/3 mb-3"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      
      {/* Continue button skeleton */}
      <div className="sticky bottom-0 bg-white pt-4">
        <div className="h-12 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
};

export default OnboardingSkeleton;