'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

const NotFoundPage = () => {
  return (
    <>
      {/* Global styles for background and custom scrollbar */}
      <style jsx global>{`
        html, body {
          background-color: #e8efff;
          margin: 0;
          padding: 0;
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #e8efff;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #c7d2fe;
          border-radius: 4px;
          border: 2px solid #e8efff;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: #a5b4fc;
        }
        /* Firefox support for root */
        html {
          scrollbar-color: #c7d2fe #e8efff;
          scrollbar-width: thin;
        }

        /* Custom scrollbar for internal scroll containers */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e8efff;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #c7d2fe;
          border-radius: 4px;
          border: 2px solid #e8efff;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #a5b4fc;
        }
        /* Firefox support for custom scrollbars */
        .custom-scrollbar {
          scrollbar-color: #c7d2fe #e8efff;
          scrollbar-width: thin;
        }
      `}</style>

      <div className="min-h-screen bg-[#e8efff] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-center">
            <h1 className="text-6xl font-bold text-white mb-2">404</h1>
            <p className="text-xl text-blue-100">Page Not Found</p>
          </div>
          
          <div className="p-8 text-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Page not found</h2>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
            
            <div className="space-y-4">
              <Link href="/auth/login" passHref>
                <Button variant="primary" className="w-full py-3 mb-4">
                  Login to Your Account
                </Button>
              </Link>
              
              <Link href="/auth/register" passHref>
                <Button variant="secondary" className="w-full py-3">
                  Create New Account
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-50 px-8 py-6 text-center">
            <button 
              onClick={() => window.open('https://www.atradezone.ca/', '_blank', 'noopener,noreferrer')}
              className="text-indigo-600 hover:text-indigo-800 font-medium mr-4 cursor-pointer bg-transparent border-none"
            >
              Back to Home
            </button>
            <button 
              onClick={() => window.open('https://www.atradezone.ca/offices/', '_blank', 'noopener,noreferrer')}
              className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer bg-transparent border-none"
            >
              Get Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;