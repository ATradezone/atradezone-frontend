'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  DatabaseOutlined, 
  FileSearchOutlined, 
  SwapOutlined
} from '@ant-design/icons';
import { Breadcrumb } from '@/components/reusable';

const InventoryStockPage = () => {
  const router = useRouter();
  
  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Business Operations', href: '/dashboard/business-operations' },
    { name: 'Inventory & Stock', current: true }
  ];

  const submenuCards = [
    {
      title: 'Inventory',
      description: 'Manage and track all inventory items and their details.',
      icon: <DatabaseOutlined className="text-2xl" />,
      href: '/dashboard/business-operations/inventory-stock/inventory',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Stock Count',
      description: 'Perform physical inventory counts and reconcile discrepancies.',
      icon: <FileSearchOutlined className="text-2xl" />,
      href: '/dashboard/business-operations/inventory-stock/stock-count',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Stock Transfer',
      description: 'Transfer stock between different locations or warehouses.',
      icon: <SwapOutlined className="text-2xl" />,
      href: '/dashboard/business-operations/inventory-stock/stock-transfer',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventory & Stock</h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submenuCards.map((card, index) => (
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

export default InventoryStockPage;