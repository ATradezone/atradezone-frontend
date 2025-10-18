'use client';

import React from 'react';
import { 
  UserOutlined,
  SettingOutlined,
  SafetyOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';
import StatCard from '@/components/ui/StatCard';

interface UserManagementSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  customerData?: {
    fullName?: string;
    emailAddress?: string;
    phoneNumber?: string;
  };
}

const UserManagementSidebar: React.FC<UserManagementSidebarProps> = ({ 
  activeSection, 
  onSectionChange,
  customerData = {
    fullName: '',
    emailAddress: '',
    phoneNumber: ''
  }
}) => {
  // Sidebar navigation items with corresponding icons
  const sidebarItems = [
    { id: 'profile-additional', label: 'Customer Profile', icon: <UserOutlined /> },
    { id: 'address', label: 'Customer Address', icon: <SettingOutlined /> },
    { id: 'account', label: 'Account Credentials', icon: <SafetyOutlined /> }
  ];

  return (
    <StatCard>
      <div className="w-52" style={{marginTop: '-20px', paddingBottom: '5px', fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        {/* Header */}
        <div className="mb-0">
          <h1 className="text-2xl font-light text-gray-800 mb-0" style={{ color: '#000000', fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            Customer Setup
          </h1>
          <p className="text-gray-600 mt-0" style={{ color: '#000000', fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            Manage customer profile, account settings, and permissions
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
        
        {/* Navigation Menu */}
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-xs" style={{ color: 'inherit' }}>
                <path d="M12 6L8 10L4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
      
      {/* Preview Section */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Member Card</h3>
        
        {/* Section 1: Customer Thumbnail */}
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center" style={{ boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', backgroundColor: 'rgb(255, 255, 255)' }}>
            <UserOutlined className="text-[#2663eb]" />
          </div>
          
          {/* Section 2 & 3: Customer Name, Phone, Email (stacked vertically) */}
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex flex-col">
              <div className="flex items-center truncate">
                <UserOutlined className="text-[#2663eb] text-xs mr-1 flex-shrink-0" />
                <span 
                  className="text-xs text-gray-500 truncate"
                  title={customerData.fullName || 'N/A'}
                >
                  {customerData.fullName || 'N/A'}
                </span>
              </div>
              <div className="flex items-center truncate">
                <MailOutlined className="text-[#2663eb] text-xs mr-1 flex-shrink-0" />
                <span 
                  className="text-xs text-gray-500 truncate"
                  title={customerData.emailAddress || 'N/A'}
                >
                  {customerData.emailAddress || 'N/A'}
                </span>
              </div>
              <div className="flex items-center truncate">
                <PhoneOutlined className="text-[#2663eb] text-xs mr-1 flex-shrink-0" />
                <span 
                  className="text-xs text-gray-500 truncate"
                  title={customerData.phoneNumber || 'N/A'}
                >
                  {customerData.phoneNumber || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StatCard>
  );
};

export default UserManagementSidebar;