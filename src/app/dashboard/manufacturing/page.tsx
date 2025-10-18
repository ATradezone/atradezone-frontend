'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  BuildOutlined, 
  AuditOutlined, 
  DatabaseOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import PageTitle from '@/components/ui/PageTitle';

export default function ManufacturingPage() {
  const router = useRouter();
  
  const manufacturingCards = [
    {
      title: 'Production Planning',
      description: 'Plan and schedule production activities and resource allocation.',
      icon: <BuildOutlined className="text-2xl" />,
      href: '/dashboard/manufacturing/production-planning',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Quality Control',
      description: 'Monitor and ensure product quality throughout the manufacturing process.',
      icon: <AuditOutlined className="text-2xl" />,
      href: '/dashboard/manufacturing/quality-control',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Inventory Management',
      description: 'Track raw materials, work-in-progress, and finished goods inventory.',
      icon: <DatabaseOutlined className="text-2xl" />,
      href: '/dashboard/manufacturing/inventory-management',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Production Reports',
      description: 'Generate detailed reports on production performance and efficiency.',
      icon: <FileTextOutlined className="text-2xl" />,
      href: '/dashboard/manufacturing/production-reports',
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Set dynamic page title */}
      <PageTitle title="Manufacturing" />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manufacturing</h1>
        <p className="text-gray-600 mt-2">Manage your manufacturing operations including production planning, quality control, and inventory management.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {manufacturingCards.map((card, index) => (
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