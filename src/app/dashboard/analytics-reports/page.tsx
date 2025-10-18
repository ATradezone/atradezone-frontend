'use client';

import React from 'react';
import { Breadcrumb } from '@/components/reusable';
import { 
  TransactionOutlined, 
  BarChartOutlined, 
  PieChartOutlined, 
  FileTextOutlined, 
  ShoppingCartOutlined, 
  LineChartOutlined, 
  CalculatorOutlined, 
  AccountBookOutlined 
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import PageTitle from '@/components/ui/PageTitle';

const AnalyticsReportsPage = () => {
  const router = useRouter();
  
  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Analytics & Reports', current: true }
  ];

  const analyticsCards = [
    {
      title: 'Transactions',
      description: 'View all financial transactions',
      icon: <TransactionOutlined className="text-2xl" />,
      href: '/dashboard/analytics-reports/transactions',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Income Summary',
      description: 'Analyze income sources and trends',
      icon: <BarChartOutlined className="text-2xl" />,
      href: '/dashboard/analytics-reports/income-summary',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Expense Summary',
      description: 'Track and analyze expenses',
      icon: <PieChartOutlined className="text-2xl" />,
      href: '/dashboard/analytics-reports/expense-summary',
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Invoice Summary',
      description: 'Review invoice data and status',
      icon: <FileTextOutlined className="text-2xl" />,
      href: '/dashboard/analytics-reports/invoice-summary',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Purchase Report',
      description: 'Detailed purchase history and analysis',
      icon: <ShoppingCartOutlined className="text-2xl" />,
      href: '/dashboard/analytics-reports/purchase-report',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Sales Vs Purchase',
      description: 'Compare sales and purchase performance',
      icon: <LineChartOutlined className="text-2xl" />,
      href: '/dashboard/analytics-reports/sales-vs-purchase',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      title: 'Tax Summary',
      description: 'Tax calculations and summaries',
      icon: <CalculatorOutlined className="text-2xl" />,
      href: '/dashboard/analytics-reports/tax-summary',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      title: 'Profits & Loss',
      description: 'Profit and loss statements',
      icon: <AccountBookOutlined className="text-2xl" />,
      href: '/dashboard/analytics-reports/profits-loss',
      color: 'bg-teal-100 text-teal-600'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Set dynamic page title */}
      <PageTitle title="Analytics & Reports" />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 block cursor-pointer"
            onClick={() => router.push(card.href)}
          >
            <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center mb-4`}>
              {card.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{card.description}</p>
            <div className="text-blue-600 text-sm font-medium flex items-center">
              View Report
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

export default AnalyticsReportsPage;