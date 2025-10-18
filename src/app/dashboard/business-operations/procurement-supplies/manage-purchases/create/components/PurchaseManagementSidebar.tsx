'use client';

import React from 'react';
import { 
  ShoppingCartOutlined,
  SelectOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import StatCard from '@/components/ui/StatCard';

interface PurchaseManagementSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  totalItems?: number;
  grandTotal?: number;
}

const PurchaseManagementSidebar: React.FC<PurchaseManagementSidebarProps> = ({ 
  activeSection, 
  onSectionChange,
  totalItems = 0,
  grandTotal = 0
}) => {
  // Sidebar navigation items with corresponding icons
  const sidebarItems = [
    { id: 'purchase-info', label: 'Purchase Information', icon: <ShoppingCartOutlined /> },
    { id: 'product-selection', label: 'Product Selection', icon: <SelectOutlined /> },
    { id: 'payment-notes', label: 'Payment & Notes', icon: <FileTextOutlined /> }
  ];

  return (
    <StatCard>
      <div className="w-52" style={{marginTop: '-20px', paddingBottom: '5px', fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        {/* Header */}
        <div className="mb-0">
          <h1 className="text-2xl font-light text-gray-800 mb-0" style={{ color: '#000000', fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            Create Purchase
          </h1>
          <p className="text-gray-600 mt-0" style={{ color: '#000000', fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            Manage purchase details, products, and payment information
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
        <h3 className="text-sm font-medium text-gray-700 mb-3">Purchase Summary</h3>
        
        {/* Section 1: Purchase Thumbnail */}
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center" style={{ boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', backgroundColor: 'rgb(255, 255, 255)', border: '1px solid rgb(235 236 240)' }}>
            <ShoppingCartOutlined className="text-[#2663eb]" />
          </div>
          
          {/* Section 2 & 3: Purchase details */}
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex flex-col">
              <div className="flex items-center truncate">
                <FileTextOutlined className="text-[#2663eb] text-xs mr-1 flex-shrink-0" />
                <span className="text-xs text-gray-500 truncate">
                  Items: <span className="font-medium">{totalItems}</span>
                </span>
              </div>
              <div className="flex items-center truncate">
                <SelectOutlined className="text-[#2663eb] text-xs mr-1 flex-shrink-0" />
                <span className="text-xs text-gray-500 truncate">
                  G. Total: <span className="font-medium">{grandTotal.toFixed(2)} Frw</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StatCard>
  );
};

export default PurchaseManagementSidebar;