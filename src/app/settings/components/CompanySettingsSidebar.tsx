'use client';

import React, { useState, useEffect } from 'react';
import { 
  SettingOutlined,
  RightOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  ShopOutlined,
  DollarOutlined,
  UserOutlined,
  CreditCardOutlined,
  GiftOutlined,
  ExportOutlined,
  LeftOutlined
} from '@ant-design/icons';
import StatCard from '@/components/ui/StatCard';

const CompanySettingsSidebar = () => {
  const [activeSection, setActiveSection] = useState('brand');
  const [currentPage, setCurrentPage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Check the current page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      setCurrentPage(path);
      
      // Set active section based on current page
      if (path === '/settings/company/manage-roles-permissions') {
        setActiveSection('users');
      } else if (path === '/settings/company/renewal-billing') {
        setActiveSection('billing');
      } else if (path === '/settings/company/referral-program') {
        setActiveSection('referral');
      } else if (path === '/settings/company') {
        // Set default active section when on main settings page
        setActiveSection('brand');
      }
    }
  }, []);

  // Sidebar navigation items with corresponding icons
  const sidebarItems = [
    { id: 'brand', label: 'Brand Settings', icon: <DesktopOutlined /> },
    { id: 'system', label: 'System Settings', icon: <SettingOutlined /> },
    { id: 'company', label: 'Company Settings', icon: <ShopOutlined /> },
    { id: 'currency', label: 'Currency Settings', icon: <DollarOutlined /> },
    { id: 'warehouse', label: 'Warehouse Settings', icon: <DatabaseOutlined /> },
    { id: 'printers', label: 'Manage Printers', icon: <SettingOutlined /> },
    { id: 'billing', label: 'Renewal & Billing', icon: <CreditCardOutlined /> },
    { id: 'referral', label: 'Referral Program', icon: <GiftOutlined /> },
     { id: 'users', label: 'Manage User & Roles', icon: <UserOutlined /> }
  ];

  // Function to scroll to a section or navigate to a page
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Always navigate to the appropriate page regardless of current page
    // If user management is clicked, navigate to the manage-roles-permissions page
    if (sectionId === 'users') {
      window.location.href = '/settings/company/manage-roles-permissions';
      return;
    }
    
    // If renewal & billing is clicked, navigate to the renewal-billing page
    if (sectionId === 'billing') {
      window.location.href = '/settings/company/renewal-billing';
      return;
    }
    
    // If referral program is clicked, navigate to the referral-program page
    if (sectionId === 'referral') {
      window.location.href = '/settings/company/referral-program';
      return;
    }
    
    // For all other sections, scroll to the section if we're on the main settings page
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Skeleton loader component
  if (isLoading) {
    return (
      <StatCard>
        <div className="w-52 animate-pulse" style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px', fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
          {/* Header */}
          <div className="mb-0">
            <div className="h-8 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2"></div>
            <div className="h-4 w-48 bg-gradient-to-r from-gray-100 to-gray-200 rounded"></div>
          </div>
          
          <div className="h-px bg-[#EAECF0] my-2 mx-0 mb-6"></div>
          
          {/* Navigation Menu */}
          <div className="space-y-1">
            {/* First section items */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item}
                className="w-full flex items-center justify-between px-2 py-1 rounded-full"
                style={{ 
                  backgroundColor: '#f0f0f0',
                  border: 'solid 1px #e9eef6',
                  paddingTop: '0.2rem',
                  paddingBottom: '0.2rem'
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="h-4 w-4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                </div>
                <div className="h-3 w-3 bg-gray-300 rounded"></div>
              </div>
            ))}
            
            {/* Separator */}
            <div className="h-px bg-[#EAECF0] my-4 mx-0" style={{ marginTop: '1rem', marginBottom: '1rem' }}></div>
            
            {/* Second section items */}
            {[7, 8, 9].map((item) => (
              <div 
                key={item}
                className="w-full flex items-center justify-between px-2 py-1 rounded-full"
                style={{ 
                  backgroundColor: '#f0f0f0',
                  border: 'solid 1px #e9eef6',
                  paddingTop: '0.2rem',
                  paddingBottom: '0.2rem'
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="h-4 w-4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                </div>
                <div className="h-3 w-3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </StatCard>
    );
  }

  return (
    <StatCard>
      <div className="w-52" style={{marginTop: '-20px', paddingBottom: '5px', fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Header */}
      <div className="mb-0">
        <h1 className="text-2xl font-light text-gray-800 mb-0" style={{ color: '#000000', fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
          {currentPage === '/settings/company/manage-roles-permissions' 
            ? 'User Management' 
            : currentPage === '/settings/company/renewal-billing'
            ? 'Renewal & Billing'
            : currentPage === '/settings/company/referral-program'
            ? 'Referral Program'
            : 'Settings'}
        </h1>
        <p className="text-gray-600 mt-0" style={{ color: '#000000', fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
          {currentPage === '/settings/company/manage-roles-permissions' 
            ? 'Manage and control user access, roles, and permissions from here' 
            : currentPage === '/settings/company/renewal-billing'
            ? 'Managing your billings, Order history and Payment methods'
            : currentPage === '/settings/company/referral-program'
            ? 'Refer friends and save on your next renewal – every referral brings you closer to free renewal'
            : 'Here you can manage, change and edit your needs you'}
        </p>
      </div>
      <div 
        className="h-px bg-[#EAECF0] my-2" 
        style={{ 
          marginLeft: '-10px', 
          marginRight: '-10px',
          marginBottom: '1.5rem'
        }}
      ></div>
      
      {/* Back button for manage-roles-permissions, renewal-billing, and referral-program pages */}
      {(currentPage === '/settings/company/manage-roles-permissions' || 
        currentPage === '/settings/company/renewal-billing' || 
        currentPage === '/settings/company/referral-program') && (
        <button 
          onClick={() => window.location.href = '/settings/company'}
          className="w-full flex items-center justify-start px-2 py-1 rounded-full transition-all bg-[#e9eef6] text-gray-600 hover:bg-gray-100 mb-1"
          style={{ 
            border: 'none',
            backgroundColor: '#e9eef6',
            color: '#6E82A5',
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem',
            fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}
        >
          <div className="flex items-center space-x-3">
            <LeftOutlined className="text-xs" style={{ color: 'inherit' }} />
            <span className="text-sm font-normal">Back to Settings</span>
          </div>
        </button>
      )}
      
      {/* Navigation Menu */}
      <div className="space-y-1">
        {sidebarItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center justify-between px-2 py-1 rounded-full transition-all ${
                activeSection === item.id
                  ? 'bg-[#e9eef6] text-gray-600 hover:bg-gray-100' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              style={{ 
                border: 'none',
                backgroundColor: activeSection === item.id ? '#e9eef6' : '',
                color: activeSection === item.id ? '' : '#6E82A5',
                paddingTop: '0.2rem',
                paddingBottom: '0.2rem',
                fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              <div className="flex items-center space-x-3" >
                <span className="text-xs" style={{ color: 'inherit' }}>{item.icon}</span>
                <span className="text-sm font-normal">{item.label}</span>
              </div>
              {/* Use external page icon for specific items, otherwise use navigation icon */}
              {item.id === 'billing' || item.id === 'referral' || item.id === 'users' ? (
                <ExportOutlined className="text-xs" style={{ color: 'inherit' }} />
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-xs" style={{ color: 'inherit' }}>
                  <path d="M12 6L8 10L4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            {/* Add separator after 'printers' item with 1rem margin top and bottom, full width */}
            {item.id === 'printers' && (
              <div 
                className="h-px bg-[#EAECF0]" 
                style={{ 
                  marginTop: '1rem', 
                  marginBottom: '1rem',
                  marginLeft: '-10px', 
                  marginRight: '-10px'
                }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
    </StatCard>
  );
};

export default CompanySettingsSidebar;