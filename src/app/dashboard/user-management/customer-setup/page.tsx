'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/reusable';
import { ArrowLeftOutlined, UnorderedListOutlined } from '@ant-design/icons';
import CustomerSetupPage from '../components/CustomerSetupPage';
import CustomerSetupSkeleton from '../components/CustomerSetupSkeleton';
import { useRouter } from 'next/navigation';

const CustomerSetupMainPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'User Management', href: '/dashboard/user-management' },
    { name: 'Customer Setup', current: true }
  ];

  // Simulate loading data
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <CustomerSetupSkeleton />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customer Setup</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Icons Container */}
        <div className="flex items-center space-x-2">
          {/* Listing Icon */}
          <div 
            className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
            onClick={() => router.push('/dashboard/user-management')}
            title="Customer listing"
          >
            <UnorderedListOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
          </div>
          
          {/* Go Back Icon */}
          <div 
            className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
            title="Go Back"
            onClick={() => router.push('/dashboard/user-management/manage-customers')}
          >
            <ArrowLeftOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="h-px bg-[#DDDDDD] mb-4 mx-1"></div>
      
      <CustomerSetupPage />
    </div>
  );
};

export default CustomerSetupMainPage;