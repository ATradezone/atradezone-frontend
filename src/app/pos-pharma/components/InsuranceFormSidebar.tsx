'use client';

import React from 'react';
import { 
  UserOutlined,
  FileTextOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons';
import StatCard from '@/components/ui/StatCard';

interface InsuranceFormSidebarProps {
  activeStep: number;
  onStepChange: (step: number) => void;
  patientData?: {
    insuranceNumber?: string;
    patientName?: string;
    insuranceType?: string;
  };
}

const InsuranceFormSidebar: React.FC<InsuranceFormSidebarProps> = ({ 
  activeStep, 
  onStepChange,
  patientData = {
    insuranceNumber: '',
    patientName: '',
    insuranceType: ''
  }
}) => {
  // Sidebar navigation items with corresponding icons
  const sidebarItems = [
    { id: 0, label: 'Personal Details', icon: <UserOutlined /> },
    { id: 1, label: 'Health Facility', icon: <MedicineBoxOutlined /> },
    { id: 2, label: 'Review & Confirm', icon: <FileTextOutlined /> }
  ];

  return (
    <StatCard>
      <div className="w-52" style={{marginTop: '-20px', paddingBottom: '5px', fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        {/* Header */}
        <div className="mb-0">
          <h1 className="text-2xl font-light text-gray-800 mb-0" style={{ color: '#000000', fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            Patient Setup
          </h1>
          <p className="text-gray-600 mt-0" style={{ color: '#000000', fontFamily: 'Afacad, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            Manage patient insurance information
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
              onClick={() => onStepChange(item.id)}
              className={`w-full flex items-center justify-between px-2 py-1 rounded-full transition-all ${
                activeStep === item.id
                  ? 'bg-[#e9eef6] text-gray-600 hover:bg-gray-100' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              style={{ 
                border: 'none',
                backgroundColor: activeStep === item.id ? '#e9eef6' : '',
                color: activeStep === item.id ? '' : '#6E82A5',
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
        <h3 className="text-sm font-medium text-gray-700 mb-3">Patient Card</h3>
        
        {/* Section 1: Patient Thumbnail */}
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center" style={{ boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', backgroundColor: 'rgb(255, 255, 255)' }}>
            <UserOutlined className="text-[#2663eb]" />
          </div>
          
          {/* Section 2 & 3: Patient Info */}
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex flex-col">
              <div className="flex items-center truncate">
                <UserOutlined className="text-[#2663eb] text-xs mr-1 flex-shrink-0" />
                <span 
                  className="text-xs text-gray-500 truncate"
                  title={patientData.patientName || 'N/A'}
                >
                  {patientData.patientName || 'N/A'}
                </span>
              </div>
              <div className="flex items-center truncate">
                <MedicineBoxOutlined className="text-[#2663eb] text-xs mr-1 flex-shrink-0" />
                <span 
                  className="text-xs text-gray-500 truncate"
                  title={patientData.insuranceType || 'N/A'}
                >
                  {patientData.insuranceType || 'N/A'}
                </span>
              </div>
              <div className="flex items-center truncate">
                <FileTextOutlined className="text-[#2663eb] text-xs mr-1 flex-shrink-0" />
                <span 
                  className="text-xs text-gray-500 truncate"
                  title={patientData.insuranceNumber || 'N/A'}
                >
                  {patientData.insuranceNumber || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StatCard>
  );
};

export default InsuranceFormSidebar;