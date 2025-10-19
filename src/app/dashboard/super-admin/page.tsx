'use client';

import React, { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';
import StatCard from '@/components/ui/StatCard';
import { Line, Bar } from '@ant-design/plots';

export default function SuperAdminDashboard() {
  const [liveMode, setLiveMode] = useState(true);
  const [reportType, setReportType] = useState('revenue');

  // Mock data for the dashboard
  const statsData = [
    { title: 'Total Companies', value: '124', trendValue: '+12%', trend: 'up' as const },
    { title: 'Active Subscriptions', value: '89', trendValue: '+5%', trend: 'up' as const },
    { title: 'Total Users', value: '1,240', trendValue: '+8%', trend: 'up' as const },
    { title: 'Revenue (Monthly)', value: 'Frw 24,500', trendValue: '+15%', trend: 'up' as const },
  ];

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', type: 'Revenue', value: 15000 },
    { month: 'Feb', type: 'Revenue', value: 20000 },
    { month: 'Mar', type: 'Revenue', value: 25000 },
    { month: 'Apr', type: 'Revenue', value: 40000 },
    { month: 'May', type: 'Revenue', value: 35000 },
    { month: 'Jun', type: 'Revenue', value: 50000 },
    { month: 'Jul', type: 'Revenue', value: 45000 },
    { month: 'Aug', type: 'Revenue', value: 55000 },
    { month: 'Sep', type: 'Revenue', value: 40000 },
    { month: 'Oct', type: 'Revenue', value: 30000 },
    { month: 'Nov', type: 'Revenue', value: 35000 },
    { month: 'Dec', type: 'Revenue', value: 45000 },
  ];

  const companiesData = [
    { month: 'Jan', type: 'New Companies', value: 5 },
    { month: 'Feb', type: 'New Companies', value: 8 },
    { month: 'Mar', type: 'New Companies', value: 12 },
    { month: 'Apr', type: 'New Companies', value: 7 },
    { month: 'May', type: 'New Companies', value: 10 },
    { month: 'Jun', type: 'New Companies', value: 15 },
    { month: 'Jul', type: 'New Companies', value: 9 },
    { month: 'Aug', type: 'New Companies', value: 11 },
    { month: 'Sep', type: 'New Companies', value: 6 },
    { month: 'Oct', type: 'New Companies', value: 13 },
    { month: 'Nov', type: 'New Companies', value: 8 },
    { month: 'Dec', type: 'New Companies', value: 14 },
  ];

  const modulesData = [
    { module: 'Pharmacy', value: 85 },
    { module: 'Manufacturing', value: 62 },
    { module: 'POS', value: 112 },
    { module: 'Analytics', value: 78 },
    { module: 'Business Ops', value: 95 },
    { module: 'Distribution', value: 42 },
  ];

  const configRevenue = {
    data: revenueData,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    color: ['#3b82f6'],
    smooth: true,
    lineStyle: {},
    point: {
      size: 4,
      shape: 'circle',
    },
    legend: {
      position: 'top',
    },
    xAxis: {
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
    },
    yAxis: {
      label: {
        style: {
          fill: '#6b7280',
          fontSize: 12,
        },
        formatter: (value: any) => `Frw ${value / 1000}k`,
      },
      line: {
        style: {
          stroke: '#d1d5db',
        },
      },
    },
    tooltip: {
      formatter: (datum: any) => {
        return { name: datum.type, value: `Frw ${datum.value?.toLocaleString()}` };
      },
    },
  };

  const configCompanies = {
    data: companiesData,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    color: ['#10b981'],
    smooth: true,
    lineStyle: {},
    point: {
      size: 4,
      shape: 'circle',
    },
    legend: {
      position: 'top',
    },
    xAxis: {
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
    },
    yAxis: {
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
    },
    tooltip: {
      formatter: (datum: any) => {
        return { name: datum.type, value: `${datum.value} companies` };
      },
    },
  };

  const configModules = {
    data: modulesData,
    xField: 'module',
    yField: 'value',
    color: ['#8b5cf6'],
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
  };

  const topSellingCompanies = [
    { name: 'ABC Pharmaceuticals', revenue: 'Frw 2,450', growth: '+12%' },
    { name: 'XYZ Manufacturing', revenue: 'Frw 2,100', growth: '+8%' },
    { name: 'DEF Trading', revenue: 'Frw 1,890', growth: '+5%' },
    { name: 'GHI Construction', revenue: 'Frw 1,650', growth: '+10%' },
    { name: 'JKL Pharmacy', revenue: 'Frw 1,420', growth: '+7%' },
  ];

  const topSellingPlans = [
    { name: 'Enterprise Plan', sales: '42', revenue: 'Frw 12,600' },
    { name: 'Professional Plan', sales: '38', revenue: 'Frw 7,600' },
    { name: 'Basic Plan', sales: '25', revenue: 'Frw 2,500' },
    { name: 'Starter Plan', sales: '18', revenue: 'Frw 1,800' },
  ];

  return (
    <div className="p-6">
      {/* Set dynamic page title */}
      <PageTitle title="Super Admin Dashboard" />

      {/* Live Mode Toggle */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center">
          <span className="mr-2 text-sm font-medium text-gray-700">Live Mode</span>
          <button
            onClick={() => setLiveMode(!liveMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              liveMode ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                liveMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            trendValue={stat.trendValue}
          />
        ))}
      </div>

      {/* Report Type Selector - Modern Tab Design */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setReportType('revenue')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              reportType === 'revenue'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Revenue Overview
          </button>
          <button
            onClick={() => setReportType('companies')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              reportType === 'companies'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Companies Growth
          </button>
          <button
            onClick={() => setReportType('modules')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              reportType === 'modules'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Modules Usage
          </button>
          <button
            onClick={() => setReportType('users')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              reportType === 'users'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            User Activity
          </button>
        </div>
      </div>

      {/* Charts based on selected report type */}
      {reportType === 'revenue' && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Revenue Overview</h2>
          <div className="h-80">
            <Line {...configRevenue} />
          </div>
        </div>
      )}

      {reportType === 'companies' && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">New Companies Registration</h2>
          <div className="h-80">
            <Line {...configCompanies} />
          </div>
        </div>
      )}

      {reportType === 'modules' && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Modules Usage Distribution</h2>
          <div className="h-80">
            <Bar {...configModules} />
          </div>
        </div>
      )}

      {reportType === 'users' && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">User Activity Report</h2>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">User activity chart will be displayed here</p>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-800">Frw 24,500</p>
          <p className="text-sm text-green-600 mt-1">+15% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Active Companies</h3>
          <p className="text-2xl font-bold text-gray-800">124</p>
          <p className="text-sm text-green-600 mt-1">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Total Users</h3>
          <p className="text-2xl font-bold text-gray-800">1,240</p>
          <p className="text-sm text-green-600 mt-1">+8% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Avg. Subscription</h3>
          <p className="text-2xl font-bold text-gray-800">Frw 1,975</p>
          <p className="text-sm text-green-600 mt-1">+5% from last month</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-emerald-100 p-2 rounded-full mr-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">New company registered</p>
                <p className="text-xs text-gray-500">MediCare Pharmacy - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Subscription upgraded</p>
                <p className="text-xs text-gray-500">TechSolutions Ltd - 5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">New user added</p>
                <p className="text-xs text-gray-500">John Doe to ABC Corp - 1 day ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Plan expired</p>
                <p className="text-xs text-gray-500">XYZ Manufacturing - 2 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Usage */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Modules Usage</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">Pharmacy Management</p>
                <p className="text-sm text-gray-500">85 companies</p>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">Manufacturing</p>
                <p className="text-sm text-gray-500">62 companies</p>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">Point of Sales</p>
                <p className="text-sm text-gray-500">112 companies</p>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">Analytics & Reports</p>
                <p className="text-sm text-gray-500">78 companies</p>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}