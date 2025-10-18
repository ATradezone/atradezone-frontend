'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Line } from '@ant-design/plots';
import { Tour } from 'antd';
import type { TourProps } from 'antd';
import DashboardSkeleton from './components/DashboardSkeleton';
import CustomCalendar from '../../components/shared/Calendar';
import RevenueReport from './components/RevenueReport';
import { UpOutlined } from '@ant-design/icons';
import PageTitle from '@/components/ui/PageTitle';

export default function Dashboard() {
  const [liveMode, setLiveMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [openTour, setOpenTour] = useState(false);
  
  // Refs for tour steps
  const upgradePlanRef = useRef(null);
  const revenueStatsRef = useRef(null);
  const chartRef = useRef(null);
  const metricsRef = useRef(null);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const steps: TourProps['steps'] = [
    {
      title: 'Upgrade Your Plan',
      description: 'Your trial expires in 7 days. Upgrade now to continue using all features.',
      target: () => upgradePlanRef.current,
    },
    {
      title: 'Revenue Statistics',
      description: 'Track your sales and purchase performance over time with this chart.',
      target: () => revenueStatsRef.current,
    },
    {
      title: 'Performance Chart',
      description: 'Visualize your revenue trends. Blue line represents sales, purple line represents purchases.',
      target: () => chartRef.current,
    },
    {
      title: 'Key Metrics',
      description: 'Monitor important business metrics like customer growth, order completion, and average order value.',
      target: () => metricsRef.current,
    },
    {
      title: 'Tour Completed',
      description: 'You\'ve completed the dashboard tour. You can restart it anytime by clicking the help icon in the sidebar.',
      target: null,
    },
  ];

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="p-6 mx-0">
      {/* Set dynamic page title */}
      <PageTitle title="Dashboard" />
      
      {/* New Single Column Section */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {/* Upgrade Plan Card */}
        <div ref={upgradePlanRef} className="flex flex-col justify-between p-6 bg-gradient-to-br from-gray-900 to-emerald-600 rounded-xl text-white w-full lg:w-80">
          <div>
            <h2 className="text-2xl font-bold mb-4">Upgrade your plan</h2>
            <p className="text-xl mb-6">Your trial expires in 7 days</p>
          </div>
          <button className="px-4 py-2 bg-white text-emerald-900 rounded-full font-medium hover:bg-emerald-50 transition-colors" style={{ border: 'none' }}>
            Upgrade Now
          </button>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {/* Sales Invoices and Reports */}
          <div className="flex flex-col items-center justify-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors cursor-pointer">
            <div className="p-3 bg-purple-200 rounded-lg mb-3">
              {/* <FileTextOutlined className="w-6 h-6 text-purple-600" /> */}
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Sales Invoices and Reports</h3>
              <div className="flex items-center justify-center text-xs font-semibold text-purple-600">
                <span>View</span>
                {/* <ArrowRightOutlined className="ml-1 text-xs" /> */}
              </div>
            </div>
          </div>

          {/* Purchase Reports */}
          <div className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors cursor-pointer">
            <div className="p-3 bg-green-200 rounded-lg mb-3">
              {/* <ShoppingCartOutlined className="w-6 h-6 text-green-600" /> */}
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Purchase Reports</h3>
              <div className="flex items-center justify-center text-xs font-semibold text-green-600">
                <span>View</span>
                {/* <ArrowRightOutlined className="ml-1 text-xs" /> */}
              </div>
            </div>
          </div>

          {/* Inventory Status Reports */}
          <div className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer">
            <div className="p-3 bg-blue-200 rounded-lg mb-3">
              {/* <DatabaseOutlined className="w-6 h-6 text-blue-600" /> */}
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Inventory Status Reports</h3>
              <div className="flex items-center justify-center text-xs font-semibold text-blue-600">
                <span>View</span>
                {/* <ArrowRightOutlined className="ml-1 text-xs" /> */}
              </div>
            </div>
          </div>

          {/* Medicines Shortage Report */}
          <div className="flex flex-col items-center justify-center p-6 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors cursor-pointer">
            <div className="p-3 bg-pink-200 rounded-lg mb-3">
              {/* <ExclamationCircleOutlined className="w-6 h-6 text-pink-600" /> */}
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Products Shortage Report</h3>
              <div className="flex items-center justify-center text-xs font-semibold text-pink-600">
                <span>View</span>
                {/* <ArrowRightOutlined className="ml-1 text-xs" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Single Column Section Below Reports - Revenue Statistics */}
      <div ref={revenueStatsRef} className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold" style={{ color: 'rgb(107 114 128 / var(--tw-text-opacity, 1))', marginTop: '0.0rem' }}>Revenue Statistic</h2>
          <CustomCalendar />
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Sales</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">5.4 M Frw</div>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <span>+12%</span>
                <UpOutlined className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#A855F7] rounded-full"></div>
              <span className="text-sm text-gray-600">Purchase</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">6.5 M Frw</div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div ref={chartRef} className="h-64">
          <Line
            data={[{ month: 'Jan', type: 'Sales', value: 15000 },
              { month: 'Feb', type: 'Sales', value: 20000 },
              { month: 'Mar', type: 'Sales', value: 25000 },
              { month: 'Apr', type: 'Sales', value: 40000 },
              { month: 'May', type: 'Sales', value: 35000 },
              { month: 'Jun', type: 'Sales', value: 50000 },
              { month: 'Jul', type: 'Sales', value: 45000 },
              { month: 'Aug', type: 'Sales', value: 55000 },
              { month: 'Sep', type: 'Sales', value: 40000 },
              { month: 'Oct', type: 'Sales', value: 30000 },
              { month: 'Nov', type: 'Sales', value: 35000 },
              { month: 'Dec', type: 'Sales', value: 45000 },
              { month: 'Jan', type: 'Purchase', value: 25000 },
              { month: 'Feb', type: 'Purchase', value: 30000 },
              { month: 'Mar', type: 'Purchase', value: 35000 },
              { month: 'Apr', type: 'Purchase', value: 50000 },
              { month: 'May', type: 'Purchase', value: 45000 },
              { month: 'Jun', type: 'Purchase', value: 60000 },
              { month: 'Jul', type: 'Purchase', value: 55000 },
              { month: 'Aug', type: 'Purchase', value: 65000 },
              { month: 'Sep', type: 'Purchase', value: 50000 },
              { month: 'Oct', type: 'Purchase', value: 40000 },
              { month: 'Nov', type: 'Purchase', value: 45000 },
              { month: 'Dec', type: 'Purchase', value: 55000 },
            ]}
            xField="month"
            yField="value"
            seriesField="type"
            color={['#3b82f6', '#A855F7']}
            smooth
            lineStyle={{}}
            point={{
              size: 4,
              shape: 'circle',
            }}
            legend={{
              position: 'top',
            }}
            xAxis={{
              label: {
                style: {
                  fill: '#6b7280',
                  fontSize: 12,
                },
              },
              line: {
                style: {
                  stroke: '#d1d5db',
                },
              },
            }}
            yAxis={{
              label: {
                style: {
                  fill: '#6b7280',
                  fontSize: 12,
                },
                formatter: (value: any) => `$${value / 1000}k`,
              },
              line: {
                style: {
                  stroke: '#d1d5db',
                },
              },
            }}
            tooltip={{
              formatter: (datum: any) => {
                return { name: datum.type, value: `$${datum.value?.toLocaleString()} Frw` };
              },
            }}
          />
        </div>
      </div>
      
      <RevenueReport loading={false} />
      
      {/* New Column Section */}
      <div ref={metricsRef} className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Additional Metrics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Growth</h3>
            <p className="text-2xl font-bold text-blue-600">12.5%</p>
            <p className="text-sm text-gray-600 mt-1">+2.3% from last month</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Completion</h3>
            <p className="text-2xl font-bold text-green-600">87.3%</p>
            <p className="text-sm text-gray-600 mt-1">+1.7% from last month</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Avg. Order Value</h3>
            <p className="text-2xl font-bold text-purple-600">$245.60</p>
            <p className="text-sm text-gray-600 mt-1">+5.2% from last month</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'rgb(107 114 128 / var(--tw-text-opacity, 1))', marginTop: '0.0rem' }}>Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-800">$12,345</p>
          <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'rgb(107 114 128 / var(--tw-text-opacity, 1))', marginTop: '0.0rem' }}>Active Users</h3>
          <p className="text-2xl font-bold text-gray-800">1,234</p>
          <p className="text-sm text-gray-500 mt-1">+8% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'rgb(107 114 128 / var(--tw-text-opacity, 1))', marginTop: '0.0rem' }}>Conversion Rate</h3>
          <p className="text-2xl font-bold text-gray-800">24.5%</p>
          <p className="text-sm text-gray-500 mt-1">+3% from last month</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgb(107 114 128 / var(--tw-text-opacity, 1))', marginTop: '0.0rem' }}>Performance Overview</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">Chart will be displayed here</p>
        </div>
      </div>

      {/* Tour Component */}
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
}