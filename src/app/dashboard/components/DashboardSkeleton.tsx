'use client';

import React from 'react';

const DashboardSkeleton = () => {
  return (
    <div className="p-6 mx-0 animate-pulse">
      {/* New Single Column Section */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {/* Upgrade Plan Card */}
        <div className="flex flex-col justify-between p-6 bg-gray-300 rounded-xl text-white w-full lg:w-80 h-40"></div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {/* Sales Invoices and Reports */}
          <div className="flex flex-col items-center justify-center p-6 bg-gray-200 rounded-xl h-32"></div>

          {/* Purchase Reports */}
          <div className="flex flex-col items-center justify-center p-6 bg-gray-200 rounded-xl h-32"></div>

          {/* Inventory Status Reports */}
          <div className="flex flex-col items-center justify-center p-6 bg-gray-200 rounded-xl h-32"></div>

          {/* Medicines Shortage Report */}
          <div className="flex flex-col items-center justify-center p-6 bg-gray-200 rounded-xl h-32"></div>
        </div>
      </div>

      {/* Single Column Section Below Reports - Revenue Statistics */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-300 rounded w-40"></div>
          <div className="h-10 w-40 bg-gray-300 rounded"></div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-12"></div>
            </div>
            <div>
              <div className="h-6 bg-gray-300 rounded w-24 mb-1"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
            <div>
              <div className="h-6 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
      
      {/* Revenue Report Skeleton */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-300 rounded w-32"></div>
          <div className="h-10 w-40 bg-gray-300 rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
      
      {/* Additional Metrics Skeleton */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-200 rounded-lg h-24"></div>
          <div className="p-4 bg-gray-200 rounded-lg h-24"></div>
          <div className="p-4 bg-gray-200 rounded-lg h-24"></div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-24">
          <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-7 bg-gray-300 rounded w-20 mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-24">
          <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-7 bg-gray-300 rounded w-20 mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-24">
          <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-7 bg-gray-300 rounded w-20 mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-80">
        <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
          <div className="h-5 bg-gray-300 rounded w-64"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;