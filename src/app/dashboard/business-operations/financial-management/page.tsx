'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb, Search, Table, ActionButtons } from '@/components/reusable';
import { PlusCircleOutlined, SearchOutlined, FilterOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

interface FinancialRecord {
  id: number;
  transactionId: string;
  date: string;
  description: string;
  amount: string;
  type: 'Income' | 'Expense';
  status: 'Completed' | 'Pending' | 'Failed';
}

const FinancialManagementPage = () => {
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([
    { id: 1, transactionId: '#TXN-001', date: '2023-06-15', description: 'Product Sales - Order #ORD-001', amount: 'RWF 12,500', type: 'Income', status: 'Completed' },
    { id: 2, transactionId: '#TXN-002', date: '2023-06-16', description: 'Supplier Payment - PO #PO-001', amount: 'RWF 8,200', type: 'Expense', status: 'Completed' },
    { id: 3, transactionId: '#TXN-003', date: '2023-06-17', description: 'Product Sales - Order #ORD-002', amount: 'RWF 15,750', type: 'Income', status: 'Pending' },
    { id: 4, transactionId: '#TXN-004', date: '2023-06-18', description: 'Utility Bills - June 2023', amount: 'RWF 2,300', type: 'Expense', status: 'Completed' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Business Operations', href: '/dashboard/business-operations' },
    { name: 'Financial Management', current: true }
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

  // Filter and sort financial records based on search, type, and sorting config
  const filteredAndSortedRecords = financialRecords.filter(record => {
    const matchesSearch = record.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || record.type.toLowerCase().includes(filterType);
    
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    if (!sortConfig) return 0;
    
    let aValue, bValue;
    
    switch (sortConfig.key) {
      case 'transactionId':
        aValue = a.transactionId.toLowerCase();
        bValue = b.transactionId.toLowerCase();
        break;
      case 'date':
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
        break;
      case 'description':
        aValue = a.description.toLowerCase();
        bValue = b.description.toLowerCase();
        break;
      case 'amount':
        aValue = parseFloat(a.amount.replace('RWF ', '').replace(',', ''));
        bValue = parseFloat(b.amount.replace('RWF ', '').replace(',', ''));
        break;
      case 'type':
        aValue = a.type.toLowerCase();
        bValue = b.type.toLowerCase();
        break;
      case 'status':
        aValue = a.status.toLowerCase();
        bValue = b.status.toLowerCase();
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
  const totalPages = Math.ceil(filteredAndSortedRecords.length / itemsPerPage);
  const currentRecords = filteredAndSortedRecords.slice(
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
  const stats = [
    { title: "Total Transactions", value: financialRecords.length, icon: <SearchOutlined className="w-5 h-5 text-[#2463EB]" />, color: "bg-[#F6F9FF] border border-[#DBE9FE]" },
    { title: "Total Income", value: 'RWF 28,250', icon: <SearchOutlined className="w-5 h-5 text-green-500" />, color: "bg-green-50" },
    { title: "Total Expenses", value: 'RWF 10,500', icon: <SearchOutlined className="w-5 h-5 text-red-500" />, color: "bg-red-50" },
    { title: "Net Profit", value: 'RWF 17,750', icon: <SearchOutlined className="w-5 h-5 text-purple-500" />, color: "bg-purple-50" }
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
          
          {/* Add New Transaction Icon Skeleton */}
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

        {/* Financial Records Table Skeleton */}
        <div className="bg-white rounded-xl overflow-hidden" style={{ borderRadius: '20px 20px 0px 0px' }}>
          <Table
            data={[]}
            columns={[
              {
                key: 'transactionId',
                title: 'TRANSACTION ID',
                sortable: true
              },
              {
                key: 'date',
                title: 'DATE',
                sortable: true
              },
              {
                key: 'description',
                title: 'DESCRIPTION',
                sortable: true
              },
              {
                key: 'amount',
                title: 'AMOUNT',
                sortable: true
              },
              {
                key: 'type',
                title: 'TYPE',
                sortable: true
              },
              {
                key: 'status',
                title: 'STATUS',
                sortable: true
              },
              {
                key: 'actions',
                title: 'ACTION'
              }
            ]}
            loading={true}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              itemsPerPage: 6,
              totalItems: 0
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Financial Management</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Add New Transaction Icon */}
        <div 
          className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
          style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)' }}
          onClick={() => console.log('Add new transaction')}
          title="Add new transaction"
        >
          <PlusCircleOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
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
              placeholder="Search or filter financial records"
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
            {stats.map((stat, index) => (
              <div key={index} className="p-4 rounded-xl bg-white border border-gray-200 shadow-[-5px_5px_16px_6px_rgba(244,245,247,1)]">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">{stat.title}</div>
                    <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Records Table */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <Table
          data={currentRecords}
          columns={[
            {
              key: 'transactionId',
              title: 'TRANSACTION ID',
              sortable: true,
              render: (value: string, record: FinancialRecord) => (
                <div className="text-sm font-medium text-gray-900">{record.transactionId}</div>
              )
            },
            {
              key: 'date',
              title: 'DATE',
              sortable: true,
              render: (value: string, record: FinancialRecord) => (
                <div className={`text-sm ${record.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>{record.date}</div>
              )
            },
            {
              key: 'description',
              title: 'DESCRIPTION',
              sortable: true,
              render: (value: string, record: FinancialRecord) => (
                <div className={`text-sm ${record.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>{record.description}</div>
              )
            },
            {
              key: 'amount',
              title: 'AMOUNT',
              sortable: true,
              render: (value: string, record: FinancialRecord) => (
                <div className={`text-sm font-medium ${record.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>{record.type === 'Expense' ? '-' : ''}{record.amount}</div>
              )
            },
            {
              key: 'type',
              title: 'TYPE',
              sortable: true,
              render: (value: string, record: FinancialRecord) => (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  record.type === 'Income' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {record.type}
                </span>
              )
            },
            {
              key: 'status',
              title: 'STATUS',
              sortable: true,
              render: (value: string, record: FinancialRecord) => (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  record.status === 'Completed' 
                    ? 'bg-green-100 text-green-800' 
                    : record.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {record.status}
                </span>
              )
            },
            {
              key: 'actions',
              title: 'ACTION',
              render: (_: any, record: FinancialRecord) => (
                <ActionButtons 
                  onView={() => console.log('View transaction', record.id)}
                  onEdit={() => console.log('Edit transaction', record.id)}
                  onDelete={() => console.log('Delete transaction', record.id)}
                />
              )
            }
          ]}
          sortConfig={sortConfig}
          onSort={handleSort}
          loading={loading}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: goToPage,
            itemsPerPage,
            totalItems: filteredAndSortedRecords.length
          }}
        />
      </div>
    </div>
  );
};

export default FinancialManagementPage;