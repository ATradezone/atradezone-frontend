'use client';

import React, { useState } from 'react';
import { Breadcrumb, Search, StatCard, GenericTable, ActionButtons } from '@/components/reusable';
import { PlusOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';

interface SaleItem {
  id: number;
  saleId: string;
  customer: string;
  date: string;
  totalAmount: number;
  status: 'Pending' | 'Completed' | 'Cancelled' | 'Refunded';
  paymentStatus: 'Paid' | 'Unpaid' | 'Partial' | 'Overdue' | 'Refunded';
}

const ManageSalesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Business Operations', href: '/dashboard/business-operations' },
    { name: 'Sales Management', href: '/dashboard/business-operations/sales-management' },
    { name: 'Manage Sales', current: true }
  ];

  const salesData: SaleItem[] = [
    { id: 1, saleId: 'INV-001', customer: 'John Doe', date: '2023-06-15', totalAmount: 1250.00, status: 'Completed', paymentStatus: 'Paid' },
    { id: 2, saleId: 'INV-002', customer: 'Jane Smith', date: '2023-06-16', totalAmount: 2450.50, status: 'Completed', paymentStatus: 'Paid' },
    { id: 3, saleId: 'INV-003', customer: 'Robert Johnson', date: '2023-06-17', totalAmount: 875.25, status: 'Pending', paymentStatus: 'Unpaid' },
    { id: 4, saleId: 'INV-004', customer: 'Emily Davis', date: '2023-06-14', totalAmount: 3200.00, status: 'Completed', paymentStatus: 'Paid' },
    { id: 5, saleId: 'INV-005', customer: 'Michael Brown', date: '2023-06-18', totalAmount: 1750.75, status: 'Pending', paymentStatus: 'Partial' },
    { id: 6, saleId: 'INV-006', customer: 'Sarah Wilson', date: '2023-06-13', totalAmount: 2100.00, status: 'Cancelled', paymentStatus: 'Refunded' },
    { id: 7, saleId: 'INV-007', customer: 'David Miller', date: '2023-06-12', totalAmount: 950.00, status: 'Completed', paymentStatus: 'Paid' },
  ];

  // Filter data based on search and filter
  const filteredData = salesData.filter(item => {
    const matchesSearch = item.saleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || item.status.toLowerCase().includes(filterStatus);
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const statCards = [
    { title: "Total Sales", value: salesData.length.toString(), description: "All sales orders", icon: <SearchOutlined /> },
    { title: "Completed", value: salesData.filter(i => i.status === 'Completed').length.toString(), description: "Finished sales", icon: <SearchOutlined /> },
    { title: "Pending", value: salesData.filter(i => i.status === 'Pending').length.toString(), description: "Awaiting completion", icon: <SearchOutlined /> },
    { title: "Total Revenue", value: `$${salesData.reduce((sum, item) => sum + item.totalAmount, 0).toFixed(2)}`, description: "Total sales revenue", icon: <SearchOutlined /> }
  ];

  const columns = [
    {
      key: 'saleId',
      title: 'SALE ID',
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      )
    },
    {
      key: 'customer',
      title: 'CUSTOMER',
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'date',
      title: 'DATE',
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'totalAmount',
      title: 'TOTAL AMOUNT',
      render: (value: number) => (
        <div className="text-sm font-medium text-gray-900">${value.toFixed(2)}</div>
      )
    },
    {
      key: 'status',
      title: 'STATUS',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Completed' 
            ? 'bg-green-100 text-green-800' 
            : value === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : value === 'Cancelled'
            ? 'bg-red-100 text-red-800'
            : 'bg-purple-100 text-purple-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'paymentStatus',
      title: 'PAYMENT',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Paid' 
            ? 'bg-green-100 text-green-800' 
            : value === 'Partial'
            ? 'bg-blue-100 text-blue-800'
            : value === 'Overdue'
            ? 'bg-orange-100 text-orange-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'ACTION',
      render: (_: any, record: SaleItem) => (
        <ActionButtons 
          onView={() => console.log('View sale', record.id)}
          onEdit={() => console.log('Edit sale', record.id)}
          onDelete={() => console.log('Delete sale', record.id)}
        />
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Sales</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Add New Sale */}
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
          <PlusOutlined className="mr-2" />
          New Sale
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
              placeholder="Search sales orders"
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

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <GenericTable
          data={currentData}
          columns={columns}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: goToPage,
            itemsPerPage,
            totalItems: filteredData.length
          }}
        />
      </div>
    </div>
  );
};

export default ManageSalesPage;