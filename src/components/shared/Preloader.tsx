'use client';

import { useEffect, useState } from 'react';

export default function Preloader({ children }: { children?: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#ffffff]">
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
                  className={`absolute w-3 h-3 rounded-full transition-all duration-1000 ${
                    index >= 8 ? 'bg-[#01363C]' : 'bg-gray-300'
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    animation: `pulse-${index} 2s ease-in-out infinite`,
                    animationDelay: `${index * 0.1}s`
                  }}
                />
              );
            })}
          </div>
          
          {/* Animation keyframes */}
          <style jsx>{`
            ${[...Array(16)].map((_, index) => {
              const angleRad = index * 22.5 * Math.PI / 180;
              const x = 40 * Math.cos(angleRad);
              const y = 40 * Math.sin(angleRad);
              return `
                @keyframes pulse-${index} { 
                  0% { transform: translate(${x}px, ${y}px) scale(1); } 
                  50% { transform: translate(${x}px, ${y}px) scale(1.5); } 
                  100% { transform: translate(${x}px, ${y}px) scale(1); } 
                }
              `;
            }).join('')}
          `}</style>
          
          {/* Loading text */}
          <div className="mt-0 text-center text-bg-[#000000] font-bold mr-20">Loading...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}