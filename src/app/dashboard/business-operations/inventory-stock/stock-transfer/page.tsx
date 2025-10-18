'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb, Search, StatCard, GenericTable, ActionButtons, Pagination } from '@/components/reusable';
import { PlusOutlined, SearchOutlined, FilterOutlined, CaretUpOutlined, CaretDownOutlined, SwapOutlined } from '@ant-design/icons';

interface StockTransferItem {
  id: number;
  transferId: string;
  productName: string;
  fromLocation: string;
  toLocation: string;
  quantity: number;
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
  date: string;
}

const StockTransferPage = () => {
  const [stockTransferData, setStockTransferData] = useState<StockTransferItem[]>([
    { id: 1, transferId: 'TR-001', productName: 'Paracetamol 500mg', fromLocation: 'Main Warehouse', toLocation: 'Pharmacy A', quantity: 50, status: 'Completed', date: '2023-06-15' },
    { id: 2, transferId: 'TR-002', productName: 'Amoxicillin 250mg', fromLocation: 'Main Warehouse', toLocation: 'Pharmacy B', quantity: 30, status: 'Approved', date: '2023-06-16' },
    { id: 3, transferId: 'TR-003', productName: 'Cetirizine 10mg', fromLocation: 'Pharmacy A', toLocation: 'Pharmacy C', quantity: 20, status: 'Pending', date: '2023-06-16' },
    { id: 4, transferId: 'TR-004', productName: 'Omeprazole 20mg', fromLocation: 'Main Warehouse', toLocation: 'Pharmacy A', quantity: 15, status: 'Cancelled', date: '2023-06-14' },
    { id: 5, transferId: 'TR-005', productName: 'Ibuprofen 400mg', fromLocation: 'Pharmacy B', toLocation: 'Main Warehouse', quantity: 25, status: 'Completed', date: '2023-06-15' },
    { id: 6, transferId: 'TR-006', productName: 'Aspirin 100mg', fromLocation: 'Main Warehouse', toLocation: 'Pharmacy C', quantity: 40, status: 'Pending', date: '2023-06-17' },
    { id: 7, transferId: 'TR-007', productName: 'Vitamin C 500mg', fromLocation: 'Pharmacy A', toLocation: 'Pharmacy B', quantity: 15, status: 'Approved', date: '2023-06-17' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Business Operations', href: '/dashboard/business-operations' },
    { name: 'Inventory & Stock', href: '/dashboard/business-operations/inventory-stock' },
    { name: 'Stock Transfer', current: true }
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort data based on search, status, and sorting config
  const filteredAndSortedData = stockTransferData.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.transferId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.fromLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.toLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || item.status.toLowerCase().includes(filterStatus);
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (!sortConfig) return 0;
    
    let aValue, bValue;
    
    switch (sortConfig.key) {
      case 'transferId':
        aValue = a.transferId.toLowerCase();
        bValue = b.transferId.toLowerCase();
        break;
      case 'productName':
        aValue = a.productName.toLowerCase();
        bValue = b.productName.toLowerCase();
        break;
      case 'locations':
        aValue = a.fromLocation.toLowerCase();
        bValue = b.fromLocation.toLowerCase();
        break;
      case 'quantity':
        aValue = a.quantity;
        bValue = b.quantity;
        break;
      case 'status':
        aValue = a.status.toLowerCase();
        bValue = b.status.toLowerCase();
        break;
      case 'date':
        aValue = a.date;
        bValue = b.date;
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
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const currentData = filteredAndSortedData.slice(
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

  // Generate random background color for product initials
  const getProductColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500',
      'bg-red-500', 'bg-lime-500', 'bg-amber-500', 'bg-emerald-500'
    ];
    
    // Use the first two letters of the name to generate a consistent color
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Get first two capital letters from name
  const getProductInitials = (name: string) => {
    const words = name.split(' ');
    let initials = '';
    
    if (words.length >= 2) {
      initials = words[0][0].toUpperCase() + words[1][0].toUpperCase();
    } else if (words.length === 1) {
      initials = words[0].substring(0, 2).toUpperCase();
    } else {
      initials = 'XX';
    }
    
    return initials;
  };

  const statCards = [
    { title: "Total Transfers", value: stockTransferData.length.toString(), description: "All transfers", icon: <SwapOutlined /> },
    { title: "Completed", value: stockTransferData.filter(i => i.status === 'Completed').length.toString(), description: "Finished transfers", icon: <SwapOutlined /> },
    { title: "Pending", value: stockTransferData.filter(i => i.status === 'Pending').length.toString(), description: "Awaiting approval", icon: <SwapOutlined /> },
    { title: "In Progress", value: stockTransferData.filter(i => i.status === 'Approved').length.toString(), description: "Approved transfers", icon: <SwapOutlined /> }
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

        {/* Stock Transfer Table Skeleton */}
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Array.from({ length: 6 }, (_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-300 mr-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                        <div className="h-6 bg-gray-300 rounded-full w-24"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                        <div className="h-6 bg-gray-300 rounded-full w-32"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-6 bg-gray-300 rounded-full w-20"></div>
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

  const columns = [
    {
      key: 'transferId',
      title: 'TRANSFER ID',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      )
    },
    {
      key: 'productName',
      title: 'PRODUCT NAME',
      sortable: true,
      render: (value: string, record: StockTransferItem) => (
        <div className="flex items-center">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${getProductColor(record.productName)}`}>
            {getProductInitials(record.productName)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{record.productName}</div>
          </div>
        </div>
      )
    },
    {
      key: 'locations',
      title: 'FROM → TO',
      sortable: true,
      render: (_: unknown, record: StockTransferItem) => (
        <div className="text-sm text-gray-900">
          <div>{record.fromLocation}</div>
          <div className="text-xs text-gray-500">→ {record.toLocation}</div>
        </div>
      )
    },
    {
      key: 'quantity',
      title: 'QUANTITY',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'status',
      title: 'STATUS',
      sortable: true,
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Completed' 
            ? 'bg-green-100 text-green-800' 
            : value === 'Approved'
            ? 'bg-blue-100 text-blue-800'
            : value === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'date',
      title: 'DATE',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'actions',
      title: 'ACTION',
      render: (_: any, record: StockTransferItem) => (
        <ActionButtons 
          onView={() => console.log('View transfer', record.id)}
          onEdit={() => console.log('Edit transfer', record.id)}
          onDelete={() => console.log('Delete transfer', record.id)}
        />
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Stock Transfer</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Add New Item Icon */}
        <div 
          className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
          style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
          onClick={() => console.log('Add new item')}
          title="Add new item"
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
              placeholder="Search stock transfers"
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
            {statCards.map((stat, index) => (
              <StatCard 
                key={index}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stock Transfer Table */}
      <GenericTable 
        data={currentData}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handleSort}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: goToPage,
          itemsPerPage,
          totalItems: filteredAndSortedData.length
        }}
      />
    </div>
  );
};

export default StockTransferPage;