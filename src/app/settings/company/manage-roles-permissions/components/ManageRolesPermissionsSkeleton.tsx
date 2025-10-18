'use client';

import React from 'react';

const ManageRolesPermissionsSkeleton = () => {
  return (
    <div className="flex h-fit bg-gray-50 rounded-xl animate-pulse">
      {/* Sidebar Skeleton */}
      <div className="w-50 bg-white border-r border-gray-200 p-4 rounded-xl h-fit sticky top-20">
        <div className="w-52">
          {/* Header */}
          <div className="mb-0">
            <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-48"></div>
          </div>
          
          <div className="h-px bg-gray-300 my-2 mx-0 mb-6"></div>
          
          {/* Navigation Menu */}
          <div className="space-y-1">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item}
                className="w-full flex items-center justify-between px-2 py-1 rounded-full h-8 bg-gray-200"
              >
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 p-0.3 overflow-y-auto rounded-r-xl" style={{ marginLeft: '1.5rem' }}>
        {/* Users Management Section */}
        <div className="bg-white rounded-xl p-6 mb-6 pt-0 shadow-sm">
          <div className="flex items-center mb-0">
            <div className="w-3 h-6 bg-gray-300 rounded mr-3"></div>
            <div className="h-5 bg-gray-300 rounded w-40"></div>
          </div>
          <div className="h-px bg-gray-300 mt-2 -mx-6 mb-6"></div>
          
          {/* User Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex flex-col">
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-6">
            <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
          </div>
        </div>

        {/* Roles Management Section */}
        <div className="bg-white rounded-xl p-6 mb-6 pt-4 shadow-sm">
          <div className="flex items-center mb-0">
            <div className="w-3 h-6 bg-gray-300 rounded mr-3"></div>
            <div className="h-5 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="h-px bg-gray-300 mt-2 -mx-6 mb-6"></div>
          
          {/* Role Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col">
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-20 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
          
          {/* Permissions List */}
          <div className="mb-6">
            <div className="h-5 bg-gray-300 rounded w-32 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="p-4 bg-gray-200 rounded-lg h-16"></div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
          </div>
        </div>

        {/* Permissions Management Section */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center mb-0">
            <div className="w-3 h-6 bg-gray-300 rounded mr-3"></div>
            <div className="h-5 bg-gray-300 rounded w-40"></div>
          </div>
          <div className="h-px bg-gray-300 mt-2 -mx-6 mb-6"></div>
          
          {/* Permission Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col">
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex flex-col">
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-20 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRolesPermissionsSkeleton;