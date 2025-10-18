'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb, StatCard } from '@/components/reusable';
import { UserOutlined, TeamOutlined, ContactsOutlined, PlusOutlined, UnorderedListOutlined, SettingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import UserManagementSkeleton from './components/UserManagementSkeleton';
import PageTitle from '@/components/ui/PageTitle';

const UserManagementPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'User Management', current: true }
  ];

  const managementCards = [
    {
      title: 'Users & Roles',
      description: 'Manage user accounts, roles, and permissions',
      icon: <UserOutlined className="text-2xl" />,
      href: '/dashboard/user-management/users-roles',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Manage Suppliers',
      description: 'View and manage supplier information',
      icon: <TeamOutlined className="text-2xl" />,
      href: '/dashboard/user-management/manage-suppliers',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Manage Customers',
      description: 'View and manage customer information',
      icon: <ContactsOutlined className="text-2xl" />,
      href: '/dashboard/user-management/manage-customers',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Add New Customer',
      description: 'Create a new customer account with profile and permissions',
      icon: <PlusOutlined className="text-2xl" />,
      href: '/dashboard/user-management/customer-setup',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Add New Supplier',
      description: 'Create a new supplier account with profile and permissions',
      icon: <PlusOutlined className="text-2xl" />,
      href: '/dashboard/user-management/supplier-setup',
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  const statCards = [
    { title: 'Total Users', value: '24', description: '+2 from last month', icon: <UserOutlined />, trend: 'up' as 'up' | 'down', trendValue: '8.3%' },
    { title: 'Active Suppliers', value: '42', description: '+5 from last month', icon: <TeamOutlined />, trend: 'up' as 'up' | 'down', trendValue: '11.9%' },
    { title: 'Active Customers', value: '128', description: '+12 from last month', icon: <ContactsOutlined />, trend: 'up' as 'up' | 'down', trendValue: '9.4%' },
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <UserManagementSkeleton />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Set dynamic page title */}
      <PageTitle title="User Management" />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Icons Container */}
        <div className="flex items-center space-x-2">
          {/* Listing Icon */}
          {/* Manage Users Icon */}
          <div 
            className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
            title="Go Back"
            onClick={() => router.push('/settings/company/manage-roles-permissions')}
          >
            <SettingOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="h-px bg-[#DDDDDD] mb-0 mx-1"></div>
      
      {/* User Management Overview moved to the top */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">User Management Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statCards.map((card, index) => (
            <StatCard 
              key={index}
              title={card.title}
              value={card.value}
              description={card.description}
              icon={card.icon}
              trend={card.trend}
              trendValue={card.trendValue}
            />
          ))}
        </div>
      </div>

      {/* Management cards moved below the overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {managementCards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 block cursor-pointer"
            onClick={() => router.push(card.href)}
          >
            <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center mb-4`}>
              {card.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.description}</p>
            <div className="mt-4 text-blue-600 text-sm font-medium flex items-center">
              Manage
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagementPage;