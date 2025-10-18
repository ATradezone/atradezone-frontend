'use client';

import React from 'react';

const AuthFormSkeleton = () => {
  return (
    <div 
      className="p-4 sm:p-6 lg:p-8 rounded-[15px] sm:rounded-[20px] border border-[#e1e1e1] animate-pulse"
      style={{
        boxShadow: '-5px 5px 50px -5px #e1e1e1',
        fontFamily: "'Afacad', sans-serif"
      }}
    >
      {/* Business Name Field Skeleton (Register only) */}
      <div className="mb-6">
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Email Field Skeleton */}
      <div className="mb-6">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Password Field Skeleton */}
      <div className="mb-6">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Confirm Password Field Skeleton (Register only) */}
      <div className="mb-6">
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Remember Me / Forgot Password Skeleton (Login only) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 sm:gap-0">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>

      {/* Agreement Checkbox Skeleton (Register only) */}
      <div className="mb-6">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>

      {/* Submit Button Skeleton */}
      <div className="h-12 bg-gray-300 rounded-lg mb-6"></div>

      {/* Or continue with section skeleton */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="px-2 bg-white">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>

      {/* Social login buttons skeleton */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="h-10 bg-gray-200 rounded-md"></div>
        <div className="h-10 bg-gray-200 rounded-md"></div>
      </div>

      {/* Footer link skeleton */}
      <div className="text-center">
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthFormSkeleton;