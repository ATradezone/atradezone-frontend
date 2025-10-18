'use client';

import React from 'react';

const SkeletonLoader = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#ffffff] animate-pulse">
      <div className="flex flex-col items-center justify-center">
        {/* Custom circular loader */}
        <div className="w-24 h-24 relative">
          {[...Array(16)].map((_, index) => {
            const angle = (index * 22.5) * Math.PI / 180; // 22.5 degrees between each dot
            const radius = 40;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            
            return (
              <div
                key={index}
                className="absolute w-3 h-3 rounded-full bg-gray-300"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              />
            );
          })}
        </div>
        
        {/* Loading text */}
        <div className="mt-4 h-4 bg-gray-300 rounded w-32"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;