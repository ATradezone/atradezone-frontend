'use client';

import { useState, useEffect } from 'react';
import { Breadcrumb, Search, StatCard, ActionButtons, GenericTable } from '@/components/reusable';
import { AccountBookOutlined, ArrowUpOutlined, ArrowDownOutlined, SearchOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';

interface ProfitLossRecord {
  id: number;
  period: string;
  revenue: number;
  cogs: number;
  grossProfit: number;
  expenses: number;
  netProfit: number;
  margin: number;
}

const ProfitsLossPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Mock data for profit and loss records
  const records: ProfitLossRecord[] = [
    { id: 1, period: 'January 2023', revenue: 125000.50, cogs: 75000.00, grossProfit: 50000.50, expenses: 35000.25, netProfit: 15000.25, margin: 12.0 },
    { id: 2, period: 'February 2023', revenue: 142500.75, cogs: 85500.00, grossProfit: 57000.75, expenses: 38000.50, netProfit: 19000.25, margin: 13.3 },
    { id: 3, period: 'March 2023', revenue: 118900.25, cogs: 71340.00, grossProfit: 47560.25, expenses: 32000.75, netProfit: 15559.50, margin: 13.1 },
    { id: 4, period: 'April 2023', revenue: 136750.80, cogs: 82050.00, grossProfit: 54700.80, expenses: 39500.30, netProfit: 15200.50, margin: 11.1 },
    { id: 5, period: 'May 2023', revenue: 152999.99, cogs: 91799.99, grossProfit: 61200.00, expenses: 42000.80, netProfit: 19199.20, margin: 12.5 },
    { id: 6, period: 'June 2023', revenue: 148750.30, cogs: 89250.18, grossProfit: 59500.12, expenses: 41000.60, netProfit: 18499.52, margin: 12.4 },
    { id: 7, period: 'Q1 2023', revenue: 386401.50, cogs: 231840.00, grossProfit: 154561.50, expenses: 105001.50, netProfit: 49560.00, margin: 12.8 },
    { id: 8, period: 'Q2 2023', revenue: 438501.09, cogs: 263100.17, grossProfit: 175400.92, expenses: 122501.70, netProfit: 52899.22, margin: 12.1 },
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredRecords = records.filter(record =>
    record.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRecords = [...filteredRecords];
  if (sortConfig !== null) {
    sortedRecords.sort((a, b) => {
      if (a[sortConfig.key as keyof ProfitLossRecord] < b[sortConfig.key as keyof ProfitLossRecord]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof ProfitLossRecord] > b[sortConfig.key as keyof ProfitLossRecord]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(sortedRecords.length / itemsPerPage);
  const currentRecords = sortedRecords.slice(
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
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const columns = [
    {
      key: 'period',
      title: 'Period',
      sortable: true,
    },
    {
      key: 'revenue',
      title: 'Revenue ($)',
      sortable: true,
      render: (value: number) => (
        <span className="text-gray-900">
          {value.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'cogs',
      title: 'COGS ($)',
      sortable: true,
      render: (value: number) => (
        <span className="text-gray-900">
          {value.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'grossProfit',
      title: 'Gross Profit ($)',
      sortable: true,
      render: (value: number) => (
        <span className="text-gray-900">
          {value.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'expenses',
      title: 'Expenses ($)',
      sortable: true,
      render: (value: number) => (
        <span className="text-gray-900">
          {value.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'netProfit',
      title: 'Net Profit ($)',
      sortable: true,
      render: (value: number) => (
        <span className="text-gray-900">
          {value.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'margin',
      title: 'Margin (%)',
      sortable: true,
      render: (value: number) => (
        <span className="text-gray-900">
          {value.toFixed(1)}%
        </span>
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: unknown, record: ProfitLossRecord) => (
        <ActionButtons 
          onView={() => console.log('View', record.id)}
          onEdit={() => console.log('Edit', record.id)}
          onDelete={() => console.log('Delete', record.id)}
        />
      ),
    },
  ];

  // Calculate totals
  const totalRevenue = records.reduce((sum, record) => sum + record.revenue, 0);
  const totalCOGS = records.reduce((sum, record) => sum + record.cogs, 0);
  const totalGrossProfit = totalRevenue - totalCOGS;
  const totalExpenses = records.reduce((sum, record) => sum + record.expenses, 0);
  const totalNetProfit = totalGrossProfit - totalExpenses;
  const overallMargin = totalRevenue > 0 ? (totalNetProfit / totalRevenue) * 100 : 0;

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Analytics & Reports', href: '/dashboard/analytics-reports' },
    { name: 'Profits & Loss', current: true }
  ];

  const statCards = [
    { 
      title: "Total Revenue", 
      value: `$${totalRevenue.toFixed(2)}`, 
      description: "Total income",
      trend: "up" as const,
      trendValue: "15%",
      icon: <ArrowUpOutlined />
    },
    { 
      title: "Total Expenses", 
      value: `$${totalExpenses.toFixed(2)}`, 
      description: "Operating costs",
      trend: "up" as const,
      trendValue: "8%",
      icon: <ArrowDownOutlined />
    },
    { 
      title: "Net Profit", 
      value: `$${totalNetProfit.toFixed(2)}`, 
      description: "Bottom line",
      trend: totalNetProfit >= 0 ? "up" as const : "down" as const,
      trendValue: `${Math.abs(totalNetProfit).toFixed(2)}%`,
      icon: <AccountBookOutlined />
    },
    { 
      title: "Profit Margin", 
      value: `${overallMargin.toFixed(1)}%`, 
      description: "Net profit ratio",
      trend: "up" as const,
      trendValue: "2.1%",
      icon: <AccountBookOutlined />
    },
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
          
          {/* Add New Item Icon Skeleton */}
          <div className="h-8 w-8 bg-gray-300 rounded-[0.45rem] animate-pulse"></div>
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

        {/* Profit & Loss Table Skeleton */}
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
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F2F2]">
                {Array.from({ length: 6 }, (_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4 whitespace-nowrap border-r border-[#F2F2F2]">
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-[#F2F2F2]">
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-[#F2F2F2]">
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-[#F2F2F2]">
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-[#F2F2F2]">
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-[#F2F2F2]">
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-[#F2F2F2]">
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-[#F2F2F2]">
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Skeleton */}
          <div className="px-6 py-4 border-t border-[#F2F2F2] flex items-center justify-between bg-[#F1F4F9] rounded-b-xl">
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
          <h1 className="text-2xl font-bold text-gray-800">Profits & Loss Statement</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Add New Item Icon */}
        <div 
          className="h-8 w-8 rounded-[0.45rem] mr-0.5 flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
          style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)' }}
          onClick={() => console.log('Add new record')}
          title="Add new record"
        >
          <PlusOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
        </div>
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
              placeholder="Search periods..."
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
              onClick={() => {
                console.log('Filter clicked');
              }}
            />
          </div>
          
          {/* Divider Line */}
          <div className="h-px bg-[#F2F2F2] mb-6 -mx-6"></div>
          
          {/* Stats Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {statCards.map((card, index) => (
              <div key={index} className="p-4 rounded-xl bg-white border border-gray-200 shadow-[-5px_5px_16px_6px_rgba(244,245,247,1)]">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${card.icon.props.className ? card.icon.props.className : ''}`}>
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">{card.title}</div>
                    <div className="text-xl font-bold text-gray-800">{card.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profit & Loss Table */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="overflow-x-auto p-4">
          <GenericTable 
            data={currentRecords}
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[#F2F2F2] flex items-center justify-between bg-[#F1F4F9] rounded-b-xl">
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedRecords.length)} of {sortedRecords.length} entries
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

export default ProfitsLossPage;