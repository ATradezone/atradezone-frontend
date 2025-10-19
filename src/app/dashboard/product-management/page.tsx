'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCartOutlined, 
  FileSearchOutlined, 
  SwapOutlined,
  BarChartOutlined,
  TeamOutlined,
  DatabaseOutlined,
  DollarOutlined,
  TagOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  FileDoneOutlined,
  UserOutlined,
  ContactsOutlined,
  TeamOutlined as TeamIcon,
  PrinterOutlined,
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined
} from '@ant-design/icons';
import { ProductManagementLayout, ProductStats, ProductManagementCard } from './components';
import { StatCard } from '@/components/reusable';

export default function ProductManagementPage() {
  const router = useRouter();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  
  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Product Management', current: true }
  ];
  
  const productCards = [
    {
      title: 'All Products',
      description: 'View, manage, and organize all your products in one place.',
      icon: <DatabaseOutlined className="text-2xl" />,
      href: '/dashboard/product-management/all-products',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Manage Categories',
      description: 'Create and organize product categories for better inventory management.',
      icon: <UnorderedListOutlined className="text-2xl" />,
      href: '/dashboard/product-management/manage-categories',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Products Variations',
      description: 'Manage product variations such as size, color, and other attributes.',
      icon: <AppstoreOutlined className="text-2xl" />,
      href: '/dashboard/product-management/products-variations',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Order Management',
      description: 'Track and manage customer orders and fulfillment processes.',
      icon: <FileDoneOutlined className="text-2xl" />,
      href: '/dashboard/product-management/order-management',
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  const statCards = [
    { title: 'Total Products', value: '1,248', description: '+12% from last month', icon: <DatabaseOutlined />, trend: 'up' as 'up' | 'down', trendValue: '12%' },
    { title: 'Active Categories', value: '42', description: '+3% from last month', icon: <UnorderedListOutlined />, trend: 'up' as 'up' | 'down', trendValue: '3%' },
    { title: 'Product Variations', value: '3,892', description: '-2% from last month', icon: <AppstoreOutlined />, trend: 'down' as 'up' | 'down', trendValue: '2%' },
    { title: 'Pending Orders', value: '56', description: '+8% from last month', icon: <FileDoneOutlined />, trend: 'up' as 'up' | 'down', trendValue: '8%' }
  ];

  const handleDownload = (format: 'excel' | 'pdf') => {
    console.log(`Downloading report in ${format} format`);
    setIsDownloadModalOpen(false);
    // Here you would implement the actual download logic
  };

  const actions = (
    <>
      {/* Download Icon */}
      <div 
        className="h-8 w-8 rounded-[0.45rem] mr-0.5 flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
        style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
        onClick={() => setIsDownloadModalOpen(true)}
        title="Download Report"
      >
        <DownloadOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
      </div>
      
      {/* Print Icon */}
      <div 
        className="h-8 w-8 rounded-[0.45rem] mr-0.5 flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
        style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
        onClick={() => console.log('Print report')}
        title="Print Report"
      >
        <PrinterOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
      </div>
    </>
  );

  return (
    <ProductManagementLayout
      title="Product Management"
      breadcrumbItems={breadcrumbItems}
      actions={actions}
    >
      {/* Product Overview */}
      <ProductStats stats={statCards} />
      
      {/* Management cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {productCards.map((card, index) => (
          <ProductManagementCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            href={card.href}
            color={card.color}
          />
        ))}
      </div>
      
      {/* Recent Activity - updated to use two columns */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">
              <DatabaseOutlined />
            </div>
            <div>
              <div className="font-medium text-gray-800">New product added</div>
              <div className="text-gray-600 text-sm">iPhone 15 Pro Max was added to inventory</div>
              <div className="text-gray-400 text-xs mt-1">2 hours ago</div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3">
              <UnorderedListOutlined />
            </div>
            <div>
              <div className="font-medium text-gray-800">Category updated</div>
              <div className="text-gray-600 text-sm">Electronics category description was updated</div>
              <div className="text-gray-400 text-xs mt-1">5 hours ago</div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-3">
              <AppstoreOutlined />
            </div>
            <div>
              <div className="font-medium text-gray-800">New variation added</div>
              <div className="text-gray-600 text-sm">Added color variations for MacBook Air</div>
              <div className="text-gray-400 text-xs mt-1">1 day ago</div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-yellow-100 text-yellow-600 rounded-full p-2 mr-3">
              <FileDoneOutlined />
            </div>
            <div>
              <div className="font-medium text-gray-800">Order processed</div>
              <div className="text-gray-600 text-sm">Order #ORD-2023-00124 has been shipped</div>
              <div className="text-gray-400 text-xs mt-1">2 days ago</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Download Modal */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 bg-[#01363C] bg-opacity-15 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-[1.563rem] shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
            {/* Sticky header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200 rounded-t-[1.563rem] shadow-[0_4px_5px_0px_rgb(219_225_226)]">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img 
                    src="/images/web-favicon.png" 
                    alt="ATradezone™ Cloud favicon logo" 
                    className="h-10 w-10 mr-2"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-[-0.1rem] mt-[-0.5rem]">Download Report</h2>
                    <p className="text-sm text-gray-600 mb-[-0.5rem] mt-[-0.1rem]">Choose your preferred format</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsDownloadModalOpen(false)}
                  className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300 hover:opacity-80 transition-opacity w-6 h-6 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 flex-1 overflow-y-auto">
              <p className="text-gray-600 mb-6">Select the format you would like to download the product management report in:</p>
              
              {/* Two-column layout for format options using StatCard */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                {/* Excel Option */}
                <div 
                  className="cursor-pointer"
                  onClick={() => handleDownload('excel')}
                >
                  <StatCard 
                    title="Excel Format"
                    icon={<FileExcelOutlined />}
                    className="h-full flex flex-col justify-center items-center text-center pr-12"
                  >
                    <p className="text-gray-600 text-sm mt-2">Download as .xlsx file</p>
                  </StatCard>
                </div>
                
                {/* PDF Option */}
                <div 
                  className="cursor-pointer"
                  onClick={() => handleDownload('pdf')}
                >
                  <StatCard 
                    title="PDF Format"
                    icon={<FilePdfOutlined />}
                    className="h-full flex flex-col justify-center items-center text-center pr-12"
                  >
                    <p className="text-gray-600 text-sm mt-2">Download as .pdf file</p>
                  </StatCard>
                </div>
              </div>
            </div>
            
            {/* Sticky footer */}
            <div className="sticky bottom-0 bg-white z-10 p-4 rounded-b-[1.563rem]" 
                 style={{ 
                   borderTop: '1px solid #E2E8F0',
                   borderBottomLeftRadius: '1.563rem',
                   borderBottomRightRadius: '1.563rem',
                   paddingTop: '13px',
                   backgroundColor: '#E2E8F0',
                 }}>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsDownloadModalOpen(false)}
                  className="px-4 py-2 border border-black-300 rounded-lg text-gray-80 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProductManagementLayout>
  );
}