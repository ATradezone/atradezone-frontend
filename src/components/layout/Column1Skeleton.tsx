'use client';

import React from 'react';

const Column1Skeleton = () => {
  return (
    <div 
      className="w-16 bg-[#E9EEF6] border-r-[3px] border-[#F8FAFD] flex flex-col justify-between sticky top-0 h-screen animate-pulse"
      style={{ backgroundColor: '#E9EEF6', borderRight: '3px solid #F8FAFD' }}
    >
      <div className="p-2 mx-1">
        {/* Hamburger Icon Skeleton */}
        <div className="h-8 w-8 bg-gray-300 rounded-[0.45rem] mb-4 mx-auto"></div>
        {/* Message Icon Skeleton */}
        <div className="h-8 w-8 bg-gray-300 rounded-[0.45rem] mb-4 mx-auto"></div>
        {/* Plus Circle Icon Skeleton */}
        <div className="h-8 w-8 bg-gray-300 rounded-[0.45rem] mb-4 mx-auto"></div>
      </div>
      <div className="p-2 mx-1 mt-auto">
        {/* Divider Line Skeleton */}
        <div className="h-px bg-gray-300 mb-4 mx-1"></div>
        {/* API Icon Skeleton */}
        <div className="h-8 w-8 bg-gray-300 rounded-[0.45rem] mb-4 mx-auto"></div>
        {/* Setting Icon Skeleton */}
        <div className="h-8 w-8 bg-gray-300 rounded-[0.45rem] mb-4 mx-auto"></div>
      </div>
    </div>
  );
};

export default Column1Skeleton;