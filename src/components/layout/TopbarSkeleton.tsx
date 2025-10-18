'use client';

import React from 'react';

const TopbarSkeleton = () => {
  return (
    <div 
      className="bg-white border border-gray-200 flex items-center justify-between sticky top-0 z-10 shadow-sm animate-pulse"
      style={{ borderColor: '#EAECF0', paddingLeft: '1.0rem', paddingRight: '1.0rem', marginLeft: '25px', marginRight: '25px', marginTop: '0px', borderRadius: '0px 0px 10px 10px', height: 'auto', minHeight: '4rem', zIndex: 50 }}
    >
      {/* Left Section: Icon + Earn Badge skeleton */}
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        <div className="h-8 w-32 bg-gray-300 rounded-full"></div>
      </div>

      {/* Center: Search Bar with Icons skeleton */}
      <div className="flex items-center flex-1 px-4">
        <div className="relative flex-1">
          <div className="flex items-center px-4 py-2 bg-gray-300 rounded-full">
            <div className="h-4 w-4 bg-gray-400 rounded mr-2"></div>
            <div className="h-4 flex-1 bg-gray-400 rounded"></div>
            <div className="h-4 w-4 bg-gray-400 rounded ml-2"></div>
          </div>
        </div>
      </div>

      {/* Right Section: Live Mode + Notifications + Profile skeleton */}
      <div className="flex items-center space-x-3">
        {/* Live Mode Toggle skeleton */}
        <div className="h-8 w-24 bg-gray-300 rounded-full"></div>
        {/* Notification Icon skeleton */}
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        {/* Profile Icon skeleton */}
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default TopbarSkeleton;