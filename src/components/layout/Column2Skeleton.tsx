'use client';

import React from 'react';

const Column2Skeleton = () => {
  return (
    <div 
      className="w-64 bg-[#F8FAFD] border-r border-[#EAECF0] sticky top-0 h-screen flex flex-col animate-pulse"
      style={{ backgroundColor: '#F8FAFD', borderRight: '1px solid #EAECF0' }}
    >
      {/* Sticky logo area skeleton */}
      <div 
        className="flex-shrink-0"
        style={{ backgroundColor: '#F8FAFD', minHeight: '4rem', paddingLeft: '1rem', paddingRight: '0rem', paddingTop: '0rem', paddingBottom: '0rem' }}
      >
        <div className="flex items-center h-full">
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
      
      {/* Scrollable menu area skeleton */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* General section skeleton */}
        <div>
          <div className="h-4 bg-gray-300 rounded w-24 mb-4"></div>
          <div className="space-y-3">
            {/* Menu items skeletons */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-10 bg-gray-300 rounded-full"></div>
            ))}
          </div>
        </div>
        
        {/* E-Pharmacy section skeleton */}
        <div className="mt-6">
          <div className="h-4 bg-gray-300 rounded w-32 mb-4"></div>
          <div className="space-y-3">
            {/* Menu items skeletons */}
            {[1, 2].map((item) => (
              <div key={item} className="h-10 bg-gray-300 rounded-full"></div>
            ))}
          </div>
        </div>
        
        {/* D-Supply Chain section skeleton */}
        <div className="mt-6">
          <div className="h-4 bg-gray-300 rounded w-40 mb-4"></div>
          <div className="space-y-3">
            {/* Menu items skeletons */}
            {[1].map((item) => (
              <div key={item} className="h-10 bg-gray-300 rounded-full"></div>
            ))}
          </div>
        </div>
        
        {/* Manufacturing section skeleton */}
        <div className="mt-6">
          <div className="h-4 bg-gray-300 rounded w-36 mb-4"></div>
          <div className="space-y-3">
            {/* Menu items skeletons */}
            {[1].map((item) => (
              <div key={item} className="h-10 bg-gray-300 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Renewal & Billing Section skeleton */}
      <div className="bg-gray-200 p-4 rounded-lg flex-shrink-0 ml-10 mb-4" style={{ borderRadius: '10px', marginLeft: '10px', marginRight: '15px' }}> 
        <div className="h-10 bg-gray-300 rounded-full mb-4"></div>
        <div className="h-3 bg-gray-300 rounded w-32 mx-auto"></div>
      </div>
    </div>
  );
};

export default Column2Skeleton;