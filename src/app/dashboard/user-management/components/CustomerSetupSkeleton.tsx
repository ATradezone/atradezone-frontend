'use client';

import React from 'react';
import { Breadcrumb } from '@/components/reusable';
import { ArrowLeftOutlined } from '@ant-design/icons';
import StatCard from '@/components/ui/StatCard';

const CustomerSetupSkeleton = () => {
  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'User Management', href: '/dashboard/user-management' },
    { name: 'Customer Setup', current: true }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="h-8 bg-gray-300 rounded w-32 mb-2 animate-pulse"></div>
          <div className="flex items-center mt-2">
            <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
            <div className="mx-2 h-4 bg-gray-300 rounded w-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
            <div className="mx-2 h-4 bg-gray-300 rounded w-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
          </div>
        </div>
        
        {/* Go Back Icon Skeleton */}
        <div className="h-8 w-8 bg-gray-300 rounded-[0.45rem] animate-pulse"></div>
      </div>

      {/* Divider Line */}
      <div className="h-px bg-[#DDDDDD] mb-4 mx-1"></div>
      
      <div className="flex h-fit bg-gray-50 rounded-xl">
        {/* Sidebar Skeleton */}
        <div className="w-50 bg-white border-r border-gray-200 p-4 rounded-xl h-fit sticky top-20">
          <StatCard>
            <div className="w-52 animate-pulse" style={{ paddingBottom: '5px' }}>
              {/* Header */}
              <div className="mb-0">
                <div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-48"></div>
              </div>
              
              <div className="h-px bg-[#EAECF0] my-2 mx-0 mb-6"></div>
              
              {/* Navigation Menu */}
              <div className="space-y-1">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item}
                    className="w-full flex items-center justify-between px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: '#f0f0f0',
                      paddingTop: '0.2rem',
                      paddingBottom: '0.2rem'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-4 w-4 bg-gray-300 rounded"></div>
                      <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-4 w-4 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </StatCard>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 p-0.3 overflow-y-auto rounded-r-xl" style={{ marginLeft: '1.5rem' }}>
          {/* Stepper Skeleton */}
          <div className="mb-6" style={{ backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity, 1))', borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem', marginBottom: '1.5rem', padding: '10px'}}>
            <div className="flex items-center justify-between relative">
              {/* Progress line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
              
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex flex-col items-center z-20">
                  <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
                  <div className="mt-2 h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Form Content Skeleton */}
          <div className="space-y-6">
            {/* Customer Information Section */}
            <div className="bg-white rounded-xl p-6 pt-0 shadow-sm">
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-gray-300 rounded mr-3 animate-pulse"></div>
                <div className="h-5 bg-gray-300 rounded w-40 animate-pulse"></div>
              </div>
              {/* Full-width divider */}
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <div className="h-4 bg-gray-300 rounded w-20 mb-2 animate-pulse"></div>
                  <div className="h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
                
                <div className="flex flex-col">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex flex-col">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
                
                <div className="flex flex-col">
                  <div className="h-4 bg-gray-300 rounded w-32 mb-2 animate-pulse"></div>
                  <div className="h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="bg-white rounded-xl p-6 pt-0 shadow-sm">
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-gray-300 rounded mr-3 animate-pulse"></div>
                <div className="h-5 bg-gray-300 rounded w-44 animate-pulse"></div>
              </div>
              {/* Full-width divider */}
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
                
                <div className="flex flex-col">
                  <div className="h-4 bg-gray-300 rounded w-16 mb-2 animate-pulse"></div>
                  <div className="h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex flex-col">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
                
                <div className="flex flex-col">
                  <div className="h-4 bg-gray-300 rounded w-32 mb-2 animate-pulse"></div>
                  <div className="h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex flex-col">
                  <div className="h-4 bg-gray-300 rounded w-32 mb-2 animate-pulse"></div>
                  <div className="h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
                
                <div className="flex flex-col">
                  <div className="h-4 bg-gray-300 rounded w-32 mb-2 animate-pulse"></div>
                  <div className="h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <div className="h-10 w-24 bg-gray-300 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSetupSkeleton;