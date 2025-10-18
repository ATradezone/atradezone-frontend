'use client';

import React from 'react';
import { Breadcrumb } from '@/components/reusable';

const UserManagementSkeleton = () => {
  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'User Management', current: true }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen animate-pulse">
      <div className="mb-6">
        <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
        <div className="flex items-center mt-2">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="mx-2 h-4 bg-gray-300 rounded w-2"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div 
            key={item} 
            className="bg-white rounded-lg shadow-sm p-6 h-48"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
            <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-40 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <div className="h-6 bg-gray-300 rounded w-56 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4 rounded-xl bg-gray-200 h-24"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagementSkeleton;