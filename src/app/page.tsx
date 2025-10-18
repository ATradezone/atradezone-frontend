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
          background-color: #f9fafd;
          margin: 0;
          padding: 0;
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f9fafd;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 4px;
          border: 2px solid #f9fafd;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
        /* Firefox support for root */
        html {
          scrollbar-color: #d1d5db #f9fafd;
          scrollbar-width: thin;
        }

        /* Custom scrollbar for internal scroll containers */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafd;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 4px;
          border: 2px solid #f9fafd;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
        /* Firefox support for custom scrollbars */
        .custom-scrollbar {
          scrollbar-color: #d1d5db #f9fafd;
          scrollbar-width: thin;
        }
      `}</style>

      <div className="min-h-screen bg-[#f9fafd] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#01363C] to-[#024a52] p-8 text-center">
            <h1 className="text-6xl font-bold text-white mb-2">404</h1>
            <p className="text-xl text-[#c8e6c9]">Page Not Found</p>
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
                <Button variant="primary" className="w-full py-3 mb-4 bg-[#c8e6c9] hover:bg-[#a5d6a7] text-gray-800">
                  Login to Your Account
                </Button>
              </Link>
              
              <Link href="/auth/register" passHref>
                <Button variant="secondary" className="w-full py-3 bg-white border border-[#01363C] text-[#01363C] hover:bg-[#f0f7f0]">
                  Create New Account
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-50 px-8 py-6 text-center">
            <button 
              onClick={() => window.open('https://www.atradezone.ca/', '_blank', 'noopener,noreferrer')}
              className="text-[#01363C] hover:text-[#024a52] font-medium mr-4 cursor-pointer bg-transparent border-none"
            >
              Back to Home
            </button>
            <div className="inline-block h-4 w-px bg-[#01363C] mx-2 align-middle"></div>
            <button 
              onClick={() => window.open('https://www.atradezone.ca/offices/', '_blank', 'noopener,noreferrer')}
              className="text-[#01363C] hover:text-[#024a52] font-medium cursor-pointer bg-transparent border-none"
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