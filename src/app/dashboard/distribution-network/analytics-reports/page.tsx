'use client';

import { useState, useEffect } from 'react';
import { Breadcrumb, Search, StatCard, GenericTable, ActionButtons } from '@/components/reusable';
import { PlusOutlined, CaretUpOutlined, CaretDownOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';

interface DistributionReport {
  id: number;
  period: string;
  productsDistributed: number;
  regionsCovered: number;
  totalRevenue: number;
  shippingCosts: number;
  profit: number;
  efficiency: number;
}

const AnalyticsReportsPage = () => {
  const [reports, setReports] = useState<DistributionReport[]>([
    { id: 1, period: 'January 2023', productsDistributed: 12500, regionsCovered: 15, totalRevenue: 125000.50, shippingCosts: 25000.25, profit: 100000.25, efficiency: 92.5 },
    { id: 2, period: 'February 2023', productsDistributed: 14250, regionsCovered: 18, totalRevenue: 142500.75, shippingCosts: 28500.50, profit: 114000.25, efficiency: 94.2 },
    { id: 3, period: 'March 2023', productsDistributed: 11890, regionsCovered: 12, totalRevenue: 118900.25, shippingCosts: 23780.05, profit: 95120.20, efficiency: 89.7 },
    { id: 4, period: 'April 2023', productsDistributed: 13675, regionsCovered: 16, totalRevenue: 136750.80, shippingCosts: 27350.16, profit: 109400.64, efficiency: 91.8 },
    { id: 5, period: 'May 2023', productsDistributed: 15299, regionsCovered: 20, totalRevenue: 152999.99, shippingCosts: 30599.99, profit: 122399.99, efficiency: 95.3 },
    { id: 6, period: 'June 2023', productsDistributed: 14875, regionsCovered: 19, totalRevenue: 148750.30, shippingCosts: 29750.06, profit: 119000.24, efficiency: 93.7 },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Distribution Network', href: '/dashboard/distribution-network' },
    { name: 'Analytics & Reports', current: true }
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  // Filter and sort reports based on search and sorting config
  const filteredAndSortedReports = reports.filter(report =>
    report.period.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (!sortConfig) return 0;
    
    let aValue, bValue;
    
    switch (sortConfig.key) {
      case 'period':
        aValue = a.period.toLowerCase();
        bValue = b.period.toLowerCase();
        break;
      case 'productsDistributed':
        aValue = a.productsDistributed;
        bValue = b.productsDistributed;
        break;
      case 'regionsCovered':
        aValue = a.regionsCovered;
        bValue = b.regionsCovered;
        break;
      case 'totalRevenue':
        aValue = a.totalRevenue;
        bValue = b.totalRevenue;
        break;
      case 'shippingCosts':
        aValue = a.shippingCosts;
        bValue = b.shippingCosts;
        break;
      case 'profit':
        aValue = a.profit;
        bValue = b.profit;
        break;
      case 'efficiency':
        aValue = a.efficiency;
        bValue = b.efficiency;
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedReports.length / itemsPerPage);
  const currentReports = filteredAndSortedReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSort = (key: string) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Stats data
  const totalProductsDistributed = reports.reduce((sum, report) => sum + report.productsDistributed, 0);
  const totalRevenue = reports.reduce((sum, report) => sum + report.totalRevenue, 0);
  const totalProfit = reports.reduce((sum, report) => sum + report.profit, 0);
  const avgEfficiency = reports.length > 0 ? reports.reduce((sum, report) => sum + report.efficiency, 0) / reports.length : 0;

  const stats = [
    { title: "Total Products Distributed", value: totalProductsDistributed.toLocaleString(), description: "All distributed products", icon: <PlusOutlined className="w-5 h-5 text-[#2463EB]" />, color: "bg-[#F6F9FF] border border-[#DBE9FE]", trend: "up" as const, trendValue: "12%" },
    { title: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, description: "Revenue generated", icon: <PlusOutlined className="w-5 h-5 text-green-500" />, color: "bg-green-50", trend: "up" as const, trendValue: "8%" },
    { title: "Total Profit", value: `$${totalProfit.toFixed(2)}`, description: "Net profit", icon: <PlusOutlined className="w-5 h-5 text-purple-500" />, color: "bg-purple-50", trend: "up" as const, trendValue: "10%" },
    { title: "Avg. Efficiency", value: `${avgEfficiency.toFixed(1)}%`, description: "Distribution efficiency", icon: <PlusOutlined className="w-5 h-5 text-orange-500" />, color: "bg-orange-50", trend: "up" as const, trendValue: "3%" }
  ];

  const columns = [
    {
      key: 'period',
      title: 'PERIOD',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      )
    },
    {
      key: 'productsDistributed',
      title: 'PRODUCTS DISTRIBUTED',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-900">{value.toLocaleString()}</div>
      )
    },
    {
      key: 'regionsCovered',
      title: 'REGIONS COVERED',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'totalRevenue',
      title: 'TOTAL REVENUE',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-900">${value.toFixed(2)}</div>
      )
    },
    {
      key: 'shippingCosts',
      title: 'SHIPPING COSTS',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-900">${value.toFixed(2)}</div>
      )
    },
    {
      key: 'profit',
      title: 'PROFIT',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-900">${value.toFixed(2)}</div>
      )
    },
    {
      key: 'efficiency',
      title: 'EFFICIENCY',
      sortable: true,
      render: (value: number) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value >= 90 
            ? 'bg-green-100 text-green-800' 
            : value >= 75
            ? 'bg-orange-100 text-orange-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {value.toFixed(1)}%
        </span>
      )
    },
    {
      key: 'actions',
      title: 'ACTION',
      render: (_: any, record: DistributionReport) => (
        <ActionButtons 
          onView={() => console.log('View report', record.id)}
          onEdit={() => console.log('Edit report', record.id)}
          onDelete={() => console.log('Delete report', record.id)}
        />
      )
    }
  ];

  // Show skeleton while loading
  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="h-8 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
            <div className="flex items-center mt-2">
              <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              <div className="mx-2 h-4 bg-gray-300 rounded w-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
            </div>
          </div>
          
          {/* Generate Report Button Skeleton */}
          <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Divider Line */}
        <div className="h-px bg-[#DDDDDD] mb-0 mx-1"></div>
        
        {/* Search Bar and Stats Boxes Container */}
        <div className="border-t border-[#dddddd] pt-6">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            {/* Search Bar Skeleton */}
            <div className="relative mb-6 mr-0">
              <div className="flex items-center px-4 py-3 bg-gray-200 rounded-lg animate-pulse">
                <div className="h-5 w-5 bg-gray-300 rounded-full mr-2"></div>
                <div className="h-4 flex-1 bg-gray-300 rounded"></div>
                <div className="h-5 w-5 bg-gray-300 rounded-full ml-2"></div>
              </div>
            </div>
            
            {/* Divider Line */}
            <div className="h-px bg-[#F2F2F2] mb-6 -mx-6"></div>
            
            {/* Stats Boxes Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="p-4 rounded-xl bg-white border border-gray-200 shadow-[-5px_5px_16px_6px_rgba(244,245,247,1)] animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#F6F9FF] border border-[#DBE9FE]">
                      <div className="h-5 w-5 bg-gray-300 rounded"></div>
                    </div>
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reports Table Skeleton */}
        <div className="bg-white rounded-xl overflow-hidden" style={{ borderRadius: '20px 20px 0px 0px' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Array.from({ length: 6 }, (_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="h-4 bg-gray-300 rounded w-8"></div>
                        <div className="h-4 bg-gray-300 rounded w-8"></div>
                        <div className="h-4 bg-gray-300 rounded w-12"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Skeleton */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
            <div className="flex items-center space-x-4">
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Distribution Analytics & Reports</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Generate Report Button */}
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => console.log('Generate Report')}
        >
          Generate Report
        </button>
      </div>

      {/* Divider Line */}
      <div className="h-px bg-[#DDDDDD] mb-0 mx-1"></div>
      
      {/* Search Bar and Stats Boxes Container */}
      <div className="border-t border-[#dddddd] pt-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          {/* Search Bar */}
          <div className="relative mb-6 mr-0" style={{marginRight: '2.7rem' }}>
            <SearchOutlined 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
              style={{ color: '#b7b7b7' }}  
            />
            
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ 
                border: '1px solid #E5E7EB', 
                backgroundColor: '#f8fafd', 
                borderRadius: '0.5rem' 
              }}
            />

            <FilterOutlined 
              className="absolute right-[-1.7rem] top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
              style={{ color: '#b7b7b7' }} 
              onClick={() => console.log('Filter clicked')}
            />
          </div>
          
          {/* Divider Line */}
          <div className="h-px bg-[#F2F2F2] mb-6 -mx-6"></div>
          
          {/* Stats Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard 
                key={index}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                color={stat.color}
                trend={stat.trend}
                trendValue={stat.trendValue}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="overflow-x-auto p-4">
          <GenericTable 
            data={currentReports}
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[#F2F2F2] flex items-center justify-between bg-[#F1F4F9] rounded-b-xl">
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedReports.length)} of {filteredAndSortedReports.length} entries
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`text-sm font-medium ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`text-sm font-medium ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReportsPage;