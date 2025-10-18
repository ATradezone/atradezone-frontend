'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  GiftOutlined, 
  SearchOutlined, 
  SettingOutlined, 
  BellOutlined, 
  UserOutlined,
  EnvironmentOutlined,
  CloseOutlined,
  FilterTwoTone,
  MenuOutlined
} from '@ant-design/icons';
import CloseButton from '../ui/CloseButton';
import Feedback from '../shared/Feedback';
import { useRouter } from 'next/navigation';
import WorkspaceOverviewModal from './WorkspaceOverviewModal';
import { Filter, FilterIcon, FilterXIcon, ListFilter, ListFilterPlusIcon } from 'lucide-react';

interface TopbarProps {
  liveMode: boolean;
  setLiveMode: (mode: boolean) => void;
}

const Topbar = ({ liveMode, setLiveMode }: TopbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackMode, setFeedbackMode] = useState<'live' | 'test'>('live');
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setIsNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when resizing to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Dispatch a custom event with the search term
      const searchEvent = new CustomEvent('pageSearch', {
        detail: { term: searchTerm.trim() }
      });
      window.dispatchEvent(searchEvent);
    }
  };

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "Low stock alert",
      description: "Product #789456 is running low at Downtown Flagship Store",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      title: "Sales Target Achieved",
      description: "Monthly sales target achieved for Westside Distribution Center",
      time: "6 hours ago",
      unread: false
    },
    {
      id: 3,
      title: "VAT declarations",
      description: "Upcoming deadline for VAT declaration in 15 Days",
      time: "5 days ago",
      unread: true
    },
    {
      id: 4,
      title: "New feature update",
      description: "Enhanced reporting dashboard now available",
      time: "3 days ago",
      unread: false
    }
  ];

  // Count unread notifications
  const unreadCount = notifications.filter(n => n.unread).length;

  // Reusable Account Dropdown Content
  const renderAccountDropdown = () => (
    <div 
      className="absolute top-full right-0 bg-[#F3F6FA] rounded-xl p-5 shadow-lg w-80 z-50 md:mt-2"
      style={{ 
        marginTop: '0.5rem',
        marginRight: '0rem',
      }}
    >
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
          onClick={() => router.push('/settings/company')}
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
        
        <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 hover:translate-x-1 transition-all cursor-pointer"
          onClick={() => router.push('/settings/company/renewal-billing')}
        >
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
      <div className="rounded-xl p-2 mb-4" style={{ backgroundColor: '#f9fafd', border: '1px solid rgb(133 237 104)' }}>
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
      <div className="rounded-xl p-2 mb-1" style={{ backgroundColor: '#f9fafd', border: '1px solid #FF346A' }}>
        <div 
          className="flex items-center p-3 rounded-lg hover:bg-gray-50 hover:translate-x-1 transition-all cursor-pointer"
          onClick={() => router.push('/auth/login')}
        >
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
  );

  // Reusable Notification Dropdown Content
  const renderNotificationDropdown = () => (
    <div 
      className="absolute top-full right-0 bg-[#F3F6FA] rounded-xl p-5 shadow-lg w-80 z-50 flex flex-col max-h-[600px] md:mt-2"
      style={{ 
        marginTop: '0.5rem',
        marginRight: '0rem',
      }}
    >
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
          onClick={() => setIsNotificationDropdownOpen(false)}
          className="bg-[#E0E5EB] text-xs"
        />
      </div>
      
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          <p className="text-sm text-gray-500">You have {unreadCount} unread notifications</p>
        </div>
      </div>
      
      <div className="overflow-y-auto flex-grow mb-4">
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                notification.unread ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
              style={{ 
                backgroundColor: notification.unread ? '#F0F7FF' : 'white',
                border: notification.unread ? '1px solid #E0E5EB' : 'none'
              }}
              onClick={(e) => {
                e.stopPropagation();
                console.log('Notification clicked:', notification.id);
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 leading-tight mt-2">{notification.title}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">{notification.description}</p>
                  <p className="text-xs text-gray-400 mb-1">{notification.time}</p>
                </div>
                {notification.unread && (
                  <div className="w-3 h-3 bg-green-500 rounded-full ml-2 mt-2 flex-shrink-0"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="rounded-xl p-2 mb-1" style={{ backgroundColor: '#f9fafd', border: '1px solid rgb(133 237 104)' }}>
        <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 hover:translate-x-1 transition-all cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'rgb(233 238 246)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(71, 82, 103)' }}><path d="M8 14.6667C8.73638 14.6667 9.33333 14.0697 9.33333 13.3333H6.66667C6.66667 14.0697 7.26362 14.6667 8 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 10.6667V7.33333C12 5.19324 10.4734 3.40697 8.44444 2.96897V2.66667C8.44444 2.29848 8.14596 2 7.77778 2C7.40959 2 7.11111 2.29848 7.11111 2.66667V2.96897C5.08222 3.40697 3.55556 5.19324 3.55556 7.33333V10.6667L2.66667 12V12.6667H13.3333V12L12 10.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div className="flex-1">
            <div className="font-medium" style={{ color: 'rgb(71 82 103)' }}>Notification Center</div>
            <div className="text-sm text-gray-500">View All Notifications </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 ml-2">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="bg-white border border-gray-200 flex flex-col md:flex-row items-center justify-between sticky top-0 z-10 shadow-sm"
      style={{ borderColor: '#EAECF0', paddingLeft: '1.0rem', paddingRight: '1.0rem', marginLeft: '25px', marginRight: '25px', marginTop: '0px', borderRadius: '0px 0px 10px 10px', height: 'auto', minHeight: '4rem', zIndex: 50 }}
    >
      {/* Mobile menu button - only visible on small screens */}
      <div className="flex items-center justify-between w-full md:w-auto py-2 md:py-0">
        <div className="flex items-center space-x-3">
          <div 
            className="h-10 w-10 text-blue-600 rounded-full flex items-center justify-center cursor-pointer" 
            style={{ boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', backgroundColor: 'rgb(255, 255, 255)' }}
            onClick={() => setIsWorkspaceModalOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
              <path d="M14.6666 6.66669V12C14.6666 12.3536 14.5261 12.6927 14.276 12.9428C14.0259 13.1929 13.6868 13.3334 13.3333 13.3334H2.66663C2.31301 13.3334 1.97387 13.1929 1.72377 12.9428C1.47368 12.6927 1.33329 12.3536 1.33329 12V6.66669" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.33329 13.3334V8.00002C5.33329 7.6464 5.47377 7.30726 5.72386 7.05717C5.97396 6.80707 6.31309 6.66669 6.66663 6.66669H9.33329C9.68691 6.66669 10.026 6.80707 10.2761 7.05717C10.5262 7.30726 10.6666 7.6464 10.6666 8.00002V13.3334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.33329 4.00002L7.99996 1.33337L14.6666 4.00002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <button 
            className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1 hover:bg-green-100 transition-colors cursor-pointer hidden md:flex"
            style={{ border: 'solid 3px rgb(241 253 244)', boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px' }}
            onClick={() => router.push('/settings/company/referral-program')}
          >
            <GiftOutlined className="text-lg" />
            <span>Earn Up to $200</span>
          </button>
        </div>
        
        <button 
          className="md:hidden h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center cursor-pointer"
          style={{ border: 'solid 3px rgb(241 253 244)', boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', backgroundColor: 'rgb(255, 255, 255)' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <MenuOutlined className="text-xl" />
        </button>
      </div>

      {/* Center: Search Bar with Icons - hidden on mobile when menu is closed */}
      <div className={`w-full md:w-auto md:flex items-center px-4 py-2 md:py-0 ${isMobileMenuOpen ? 'flex' : 'hidden md:flex'} md:flex-1`}>
        <div className="relative w-full">
          <form onSubmit={handleSearch}>
            <div 
              className="flex items-center px-4 py-2 bg-[#E9EEF6] text-[#5E5E5E] rounded-full"
              style={{ border: 'none', marginRight: '-0.75rem' }}
            >
              <SearchOutlined className="text-[#5E5E5E] mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent flex-1 outline-none text-[#5E5E5E] placeholder-[#5E5E5E]"
                style={{ fontSize: '1rem', border: 'none' }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="text-[#5E5E5E] ml-2 cursor-pointer hover:opacity-80 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                  <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
                </svg>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section: Live Mode + Notifications + Profile - hidden on mobile when menu is closed */}
      <div className={`w-full md:w-auto md:flex items-center space-x-0 md:space-x-3 py-2 md:py-0 ${isMobileMenuOpen ? 'flex flex-col space-y-2 md:space-y-0' : 'hidden md:flex'}`}>
        {/* Mobile version of Earn Badge and Live Mode - only visible on small screens when menu is open */}
        <div className="flex w-full md:hidden space-x-2">
          <button 
            className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1 hover:bg-green-100 transition-colors cursor-pointer w-1/2 justify-center"
            style={{ border: 'solid 3px rgb(241 253 244)', boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px' }}
            onClick={() => router.push('/settings/company/referral-program')}
          >
            <GiftOutlined className="text-lg" />
            <span className="hidden sm:inline">Earn Up to $200</span>
            <span className="sm:hidden">Earn</span>
          </button>
          
          {/* Live Mode Toggle */}
          <button 
            onClick={() => {
              const newMode = !liveMode;
              setLiveMode(newMode);
              setFeedbackMessage(newMode ? 'Live Mode Enabled' : 'Test Mode / Training Mode Enabled');
              setFeedbackMode(newMode ? 'live' : 'test');
              setShowFeedback(true);
            }}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium ${liveMode ? 'bg-green-50 text-green-700' : 'bg-orange-100 text-orange-700'} w-1/2 justify-center`}
            style={{ border: liveMode ? 'solid 3px rgb(241 253 244)' : 'solid 3px rgb(255 237 213)', boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px' }}
          >
            <div className={`h-3 w-3 rounded-full ${liveMode ? 'bg-[rgb(134,238,104)] animate-pulse' : 'bg-[#FFA841]'}`}></div>
            <span className="truncate">{liveMode ? 'Live' : 'Test'}</span>
          </button>
        </div>
        
        {/* Desktop version of Earn Badge - only visible on medium screens and up */}
        <button 
          className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1 hover:bg-green-100 transition-colors cursor-pointer hidden"
          style={{ border: 'solid 3px rgb(241 253 244)', boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px' }}
          onClick={() => router.push('/settings/company/referral-program')}
        >
          <GiftOutlined className="text-lg" />
          <span>Earn Up to $200</span>
        </button>
        
        {/* Desktop version of Live Mode Toggle - only visible on medium screens and up */}
        <button 
          onClick={() => {
            const newMode = !liveMode;
            setLiveMode(newMode);
            setFeedbackMessage(newMode ? 'Live Mode Enabled' : 'Test Mode / Training Mode Enabled');
            setFeedbackMode(newMode ? 'live' : 'test');
            setShowFeedback(true);
          }}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium ${liveMode ? 'bg-green-50 text-green-700' : 'bg-orange-100 text-orange-700'} hidden md:flex`}
          style={{ border: liveMode ? 'solid 3px rgb(241 253 244)' : 'solid 3px rgb(255 237 213)', boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px' }}
        >
          <div className={`h-3 w-3 rounded-full ${liveMode ? 'bg-[rgb(134,238,104)] animate-pulse' : 'bg-[#FFA841]'}`}></div>
          <span>{liveMode ? 'Live Mode' : 'Test Mode'}</span>
        </button>

        {/* Mobile version of Notification and User Avatar - only visible on small screens when menu is open */}
        <div className="flex w-full md:hidden justify-between mt-2">
          {/* Notification Bell - aligned to the left */}
          <div className="relative" ref={notificationDropdownRef}>
            <div 
              className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center" 
              style={{ boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', backgroundColor: 'rgb(255, 255, 255)' }}
              onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
            >
              <BellOutlined className="text-xl" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            </div>
            {isNotificationDropdownOpen && renderNotificationDropdown()}
          </div>

          {/* User Avatar - aligned to the right */}
          <div className="relative" ref={dropdownRef}>
            <div 
              className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center cursor-pointer" 
              style={{ boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', backgroundColor: 'rgb(255, 255, 255)' }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <UserOutlined className="text-xl" />
            </div>
            {isDropdownOpen && renderAccountDropdown()}
          </div>
        </div>

        {/* Desktop version of Notification and User Avatar - only visible on medium screens and up */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Notification Bell */}
          <div className="relative" ref={notificationDropdownRef}>
            <div 
              className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center" 
              style={{ boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', backgroundColor: 'rgb(255, 255, 255)' }}
              onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
            >
              <BellOutlined className="text-xl" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            </div>
            {isNotificationDropdownOpen && renderNotificationDropdown()}
          </div>

          {/* User Avatar */}
          <div className="relative" ref={dropdownRef}>
            <div 
              className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center cursor-pointer" 
              style={{ boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', backgroundColor: 'rgb(255, 255, 255)' }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <UserOutlined className="text-xl" />
            </div>
            {isDropdownOpen && renderAccountDropdown()}
          </div>
        </div>
      </div>

      {/* Full-width divider - only visible on mobile, above search bar and below earn/live buttons */}
      <div className="md:hidden h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
      
      {/* Full-width divider - only visible on mobile, placed as direct child of topbar */}
      {isMobileMenuOpen && (
        <div className="md:hidden h-px bg-[#EAECF0] mt-2 mb-4" 
            style={{ marginLeft: '-25px', marginRight: '-25px' }}></div>
      )}

      {showFeedback && <Feedback 
        message={feedbackMessage} 
        mode={feedbackMode} 
        onClose={() => setShowFeedback(false)} 
      />}
      
      <WorkspaceOverviewModal 
        isOpen={isWorkspaceModalOpen} 
        onClose={() => setIsWorkspaceModalOpen(false)} 
      />
    </div>
  );
};

export default Topbar;