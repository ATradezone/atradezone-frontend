'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MenuOutlined, QuestionCircleOutlined, MessageOutlined, SettingOutlined, ApiOutlined, CodeOutlined } from '@ant-design/icons';
import { Tour } from 'antd';
import type { TourProps } from 'antd';

const Column1 = () => {
  const router = useRouter();
  const [openTour, setOpenTour] = useState(false);
  
  const handleSettingsClick = () => {
    router.push('/settings/company');
  };

  const steps: TourProps['steps'] = [
    {
      title: 'Navigation Menu',
      description: 'Access different sections of the application through the main navigation menu.',
      target: () => document.querySelector('.ant-menu') as HTMLElement | null || document.body,
    },
    {
      title: 'Messaging',
      description: 'Quick access to your messages and notifications.',
      target: () => {
        const elements = document.querySelectorAll('.h-8.w-8');
        return elements[1] as HTMLElement | null || document.body;
      }
    },
    {
      title: 'Help Tour',
      description: 'Restart this tour anytime by clicking this help icon.',
      target: () => {
        const elements = document.querySelectorAll('.h-8.w-8');
        return elements[2] as HTMLElement | null || document.body;
      }
    },
    {
      title: 'API Access',
      description: 'Access API documentation and integration tools.',
      target: () => {
        const elements = document.querySelectorAll('.h-8.w-8');
        return elements[3] as HTMLElement | null || document.body;
      }
    },
    {
      title: 'Settings',
      description: 'Configure your application settings and preferences.',
      target: () => {
        const elements = document.querySelectorAll('.h-8.w-8');
        return elements[4] as HTMLElement | null || document.body;
      }
    },
  ];

  return (
    <div 
      className="w-16 bg-[#E9EEF6] border-r-[3px] border-[#F8FAFD] flex flex-col justify-between sticky top-0 h-screen"
      style={{ backgroundColor: '#E9EEF6', borderRight: '3px solid #F8FAFD' }}
    >
      <div className="p-2 mx-1">
        {/* Hamburger Icon */}
        <div className="h-8 w-8 bg-white rounded-[0.45rem] mb-4 mx-auto flex items-center justify-center border border-[#DDDDDD] shadow-sm"
          style={{ backgroundColor: '#ffffff', borderColor: '#DDDDDD', marginTop: '5px' }}
        >
          <MenuOutlined style={{ color: '#6E82A5', fontSize: '16px' }} />
        </div>
        {/* Message Icon */}
        <div className="h-8 w-8 bg-white rounded-[0.45rem] mb-4 mx-auto flex items-center justify-center border border-[#DDDDDD] shadow-sm"
          style={{ backgroundColor: '#ffffff', borderColor: '#DDDDDD' }}
        >
          <MessageOutlined style={{ color: '#6E82A5', fontSize: '16px' }} />
        </div>
        {/* Help Tour Icon */}
        <div 
          className="h-8 w-8 bg-white rounded-[0.45rem] mb-4 mx-auto flex items-center justify-center border border-[#DDDDDD] shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          style={{ backgroundColor: '#ffffff', borderColor: '#DDDDDD' }}
          onClick={() => setOpenTour(true)}
        >
          <QuestionCircleOutlined style={{ color: '#6E82A5', fontSize: '16px' }} />
        </div>
      </div>
      <div className="p-2 mx-1 mt-auto">
        {/* Divider Line */}
        <div className="h-px bg-[#DDDDDD] mb-4 mx-1"></div>
        {/* API Icon */}
        <div className="h-8 w-8 bg-white rounded-[0.45rem] mb-4 mx-auto flex items-center justify-center border border-[#DDDDDD] shadow-sm"
          style={{ backgroundColor: '#ffffff', borderColor: '#DDDDDD' }}
        >
          <CodeOutlined style={{ color: '#6E82A5', fontSize: '16px' }} />
        </div>
        {/* Setting Icon */}
        <div 
          className="h-8 w-8 rounded-[0.45rem] mb-4 mx-auto flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          style={{ backgroundColor: 'rgb(249 250 251)', borderColor: 'rgb(31 41 55)' }}
          onClick={handleSettingsClick}
        >
          <SettingOutlined style={{ color: '#6E82A5', fontSize: '16px' }} />
        </div>
      </div>

      {/* Tour Component with custom mask color */}
      <Tour 
        open={openTour} 
        onClose={() => setOpenTour(false)} 
        steps={steps} 
        mask={{
          style: {
            backgroundColor: 'rgba(1, 54, 60, 0.15)',
          },
          color: 'rgba(1, 54, 60, 0.15)',
        }}
        indicatorsRender={(current, total) => (
          <span>{current + 1} / {total}</span>
        )}
      />
    </div>
  );
};

export default Column1;