'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import CloseButton from '../ui/CloseButton';

const AccountDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center cursor-pointer" 
        style={{ boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', backgroundColor: 'rgb(255, 255, 255)' }}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <UserOutlined className="text-xl" />
      </div>

      {/* Account Dropdown Menu */}
      {isDropdownOpen && (
        <div 
          className="absolute top-full right-0 bg-[#F3F6FA] rounded-xl p-5 shadow-lg w-80 z-50"
          style={{ 
            marginTop: '1.5rem',
            marginRight: '0',
          }}
        >
          {/* Add the CSS animation in a style tag */}
          <style>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
          
          <div className="flex justify-end mb-2">
            <CloseButton 
              onClick={() => setIsDropdownOpen(false)}
              className="bg-[#E0E5EB] text-xs"
            />
          </div>
          
          <div className="flex justify-center mb-3">
            <div 
              className="rounded-full flex items-center justify-center"
              style={{ 
                height: '50px', 
                width: '50px', 
                backgroundColor: 'rgb(70 82 103)',
              }}
            >
              <UserOutlined className="text-2xl text-green-500" />
            </div>
          </div>
          
          <div className="text-center mb-4">
            <div className="text-lg font-semibold text-gray-800">Hi Maxime!</div>
          </div>
          
          <button 
            className="text-[#344054] font-semibold text-center w-full mb-5 hover:underline transition-all"
            style={{ background: 'none', border: 'none', textDecoration: 'underline' }}
            onClick={() => console.log('Manage My Account clicked')}
          >
            Manage My Account
          </button>
          
          {/* First section: Top 3 menus */}
          <div className="bg-white rounded-xl p-2 mb-4">
            <div 
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 hover:translate-x-1 transition-all cursor-pointer"
              onClick={() => {
                window.location.href = '/settings/company';
              }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#f0f6ff' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                  <path d="M14.6666 6.66669V12C14.6666 12.3536 14.5261 12.6927 14.276 12.9428C14.0259 13.1929 13.6868 13.3334 13.3333 13.3334H2.66663C2.31301 13.3334 1.97387 13.1929 1.72377 12.9428C1.47368 12.6927 1.33329 12.3536 1.33329 12V6.66669" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.33329 13.3334V8.00002C5.33329 7.6464 5.47377 7.30726 5.72386 7.05717C5.97396 6.80707 6.31309 6.66669 6.66663 6.66669H9.33329C9.68691 6.66669 10.026 6.80707 10.2761 7.05717C10.5262 7.30726 10.6666 7.6464 10.6666 8.00002V13.3334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1.33329 4.00002L7.99996 1.33337L14.6666 4.00002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-blue-800">Company Settings</div>
                <div className="text-sm text-gray-500">Edit company details</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 ml-2">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="h-px bg-[#EAECF0] my-2 mx-3"></div>
            
            <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 hover:translate-x-1 transition-all cursor-pointer">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#f0f6ff' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                  <path d="M13.3333 6.66669V12C13.3333 12.3536 13.1929 12.6927 12.9428 12.9428C12.6927 13.1929 12.3536 13.3334 12 13.3334H4C3.64638 13.3334 3.30724 13.1929 3.05715 12.9428C2.80705 12.6927 2.66663 12.3536 2.66663 12V6.66669C2.66663 6.31307 2.80705 5.97393 3.05715 5.72383C3.30724 5.47373 3.64638 5.33335 4 5.33335H12C12.3536 5.33335 12.6927 5.47373 12.9428 5.72383C13.1929 5.97393 13.3333 6.31307 13.3333 6.66669Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.66663 9.33335H13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.33337 2.66669V5.33335" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 2.66669V5.33335" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-blue-800">Renewals & Billing</div>
                <div className="text-sm text-gray-500">Manage plans & billing</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 ml-2">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="h-px bg-[#EAECF0] my-2 mx-3"></div>
            
            <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 hover:translate-x-1 transition-all cursor-pointer">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#f0f6ff' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                  <path d="M13.3333 6.66669L8.66663 11.3334L2.66663 5.33337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.3333 8.66669V12.6667C13.3333 13.0203 13.1929 13.3594 12.9428 13.6095C12.6927 13.8596 12.3536 14 12 14H4C3.64638 14 3.30724 13.8596 3.05715 13.6095C2.80705 13.3594 2.66663 13.0203 2.66663 12.6667V8.66669" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.33329 4.66669C5.33329 4.31307 5.47372 3.97393 5.72382 3.72383C5.97391 3.47373 6.31305 3.33337 6.66663 3.33337H9.33329C9.68687 3.33337 10.026 3.47373 10.2761 3.72383C10.5262 3.97393 10.6666 4.31307 10.6666 4.66669V8.00002C10.6666 8.35364 10.5262 8.69278 10.2761 8.94288C10.026 9.19297 9.68687 9.33335 9.33329 9.33335H6.66663C6.31305 9.33335 5.97391 9.19297 5.72382 8.94288C5.47372 8.69278 5.33329 8.35364 5.33329 8.00002V4.66669Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-blue-800">Security Settings</div>
                <div className="text-sm text-gray-500">Update security options</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 ml-2">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* Add New Business - separate box */}
          <div className="rounded-xl p-2 mb-4" style={{ backgroundColor: '#f9fafd', border: '10px solid white' }}>
            <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 hover:translate-x-1 transition-all cursor-pointer">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'rgb(233 238 246)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(71, 82, 103)' }}>
                  <path d="M8 3.33337V12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.33325 8H12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium" style={{ color: 'rgb(71 82 103)' }}>Add New Business</div>
                <div className="text-sm text-gray-500">Create New Business</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 ml-2">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* Logout - separate box */}
          <div className="rounded-xl p-2 mb-4" style={{ backgroundColor: '#f9fafd', border: '10px solid white' }}>
            <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 hover:translate-x-1 transition-all cursor-pointer">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'rgb(233 238 246)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(71, 82, 103)' }}>
                  <path d="M11.3334 10.6667L14.6667 8L11.3334 5.33337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 8H6.66669" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.6667 14.6667H5.33337C4.62613 14.6667 3.9478 14.3857 3.44777 13.8857C2.94775 13.3857 2.66671 12.7074 2.66671 12V4.00002C2.66671 3.29278 2.94775 2.61445 3.44777 2.11442C3.9478 1.6144 4.62613 1.33337 5.33337 1.33337H10.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium" style={{ color: 'rgb(71 82 103)' }}>Logout</div>
                <div className="text-sm text-gray-500">Sign out safely</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 ml-2">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;