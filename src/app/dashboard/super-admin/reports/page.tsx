'use client';

import React, { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';
import { Line, Bar } from '@ant-design/plots';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('revenue');

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

  return (
    <div className="p-6 mx-0">
      <PageTitle title="Reports & Analytics" />

      {/* Report Type Selector */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setReportType('revenue')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              reportType === 'revenue'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Revenue Overview
          </button>
          <button
            onClick={() => setReportType('companies')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              reportType === 'companies'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Companies Growth
          </button>
          <button
            onClick={() => setReportType('modules')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              reportType === 'modules'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Modules Usage
          </button>
          <button
            onClick={() => setReportType('users')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              reportType === 'users'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
    </div>
  );
}