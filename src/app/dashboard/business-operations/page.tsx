'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCartOutlined, 
  FileSearchOutlined, 
  SwapOutlined,
  BarChartOutlined,
  TeamOutlined,
  DatabaseOutlined,
  DollarOutlined
} from '@ant-design/icons';
import PageTitle from '@/components/ui/PageTitle';

export default function BusinessOperationsPage() {
  const router = useRouter();
  
  const businessCards = [
    {
      title: 'Sales Management',
      description: 'Track and manage all sales activities and performance metrics.',
      icon: <BarChartOutlined className="text-2xl" />,
      href: '/dashboard/business-operations/sales-management',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Procurement & Supplies',
      description: 'Manage procurement processes and supplier relationships.',
      icon: <TeamOutlined className="text-2xl" />,
      href: '/dashboard/business-operations/procurement-supplies',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Inventory & Stock',
      description: 'Monitor and control inventory levels and stock movements.',
      icon: <DatabaseOutlined className="text-2xl" />,
      href: '/dashboard/business-operations/inventory-stock',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Financial Management',
      description: 'Track financial performance and manage accounting processes.',
      icon: <DollarOutlined className="text-2xl" />,
      href: '/dashboard/business-operations/financial-management',
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Set dynamic page title */}
      <PageTitle title="Business Operations" />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Business Operations</h1>
        <p className="text-gray-600 mt-2">Manage your business operations including sales, procurement, inventory, and financial management.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {businessCards.map((card, index) => (
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
}