'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BellOutlined } from '@ant-design/icons';
import CloseButton from '../ui/CloseButton';

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

const NotificationDropdown = () => {
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setIsNotificationDropdownOpen(false);
      }
    };

    // Use 'click' instead of 'mousedown' to avoid timing issues
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Mock notifications data
  const notifications: Notification[] = [
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

  return (
    <div className="relative" ref={notificationDropdownRef}>
      {/* Notification Bell */}
      <div 
        className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center cursor-pointer" 
        style={{ boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', backgroundColor: 'rgb(255, 255, 255)' }}
        onMouseEnter={() => setIsNotificationDropdownOpen(true)}
        onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
      >
        <BellOutlined className="text-xl" />
        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {unreadCount}
        </span>
      </div>

      {/* Notification Dropdown Menu */}
      {isNotificationDropdownOpen && (
        <div 
          className="absolute top-full right-0 bg-[#F3F6FA] rounded-xl p-5 shadow-lg w-80 z-50"
          style={{ 
            marginTop: '1.5rem',
            marginRight: '0',
          }}
        >
          <div className="flex justify-end mb-2">
            <CloseButton 
              onClick={() => setIsNotificationDropdownOpen(false)}
              className="bg-[#E0E5EB] text-xs"
            />
          </div>
          
          {/* Fixed header */}
          <div className="flex justify-between items-center mb-0 flex-shrink-0" style={{marginTop: '-8px'}}>
            <div>
              <h3 className="text-lg font-semibold text-gray-800" style={{marginTop: '-8px'}}>Notifications</h3>
              <p className="text-sm text-gray-500" style={{marginTop: '-8px'}}>You have {unreadCount} unread notifications</p>
            </div>
          </div>
          
          {/* Scrollable notifications list */}
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
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start">
                        <h4 className="font-medium text-gray-800 leading-tight">{notification.title}</h4>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-green-500 rounded-full ml-2 mt-1.5 flex-shrink-0"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{notification.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Fixed footer */}
          <div className="mt-auto pt-4 border-t border-gray-200 flex-shrink-0">
            <button 
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              onClick={() => console.log('View All Notifications clicked')}
            >
              <div className="flex items-center">
                <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mr-3">
                  <BellOutlined className="text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800" style={{ margin: 0 }}>Notifications Center</h4>
                  <p className="text-sm text-gray-500" style={{ margin: '0px' }}>View All Notifications</p>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;