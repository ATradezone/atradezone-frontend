'use client';

import React, { useState } from 'react';
import { Breadcrumb, Search, StatCard, GenericTable, ActionButtons } from '@/components/reusable';
import { PlusOutlined, SearchOutlined, FilterOutlined, FileTextOutlined } from '@ant-design/icons';

interface QuotationItem {
  id: number;
  quotationId: string;
  customer: string;
  date: string;
  expiryDate: string;
  totalAmount: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired';
}

const ManageQuotationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Business Operations', href: '/dashboard/business-operations' },
    { name: 'Sales Management', href: '/dashboard/business-operations/sales-management' },
    { name: 'Manage Quotation', current: true }
  ];

  const quotationData: QuotationItem[] = [
    { id: 1, quotationId: 'QUO-001', customer: 'John Doe', date: '2023-06-15', expiryDate: '2023-07-15', totalAmount: 1250.00, status: 'Accepted' },
    { id: 2, quotationId: 'QUO-002', customer: 'Jane Smith', date: '2023-06-16', expiryDate: '2023-07-16', totalAmount: 2450.50, status: 'Sent' },
    { id: 3, quotationId: 'QUO-003', customer: 'Robert Johnson', date: '2023-06-17', expiryDate: '2023-07-17', totalAmount: 875.25, status: 'Draft' },
    { id: 4, quotationId: 'QUO-004', customer: 'Emily Davis', date: '2023-06-14', expiryDate: '2023-07-14', totalAmount: 3200.00, status: 'Expired' },
    { id: 5, quotationId: 'QUO-005', customer: 'Michael Brown', date: '2023-06-18', expiryDate: '2023-07-18', totalAmount: 1750.75, status: 'Sent' },
    { id: 6, quotationId: 'QUO-006', customer: 'Sarah Wilson', date: '2023-06-13', expiryDate: '2023-07-13', totalAmount: 2100.00, status: 'Rejected' },
    { id: 7, quotationId: 'QUO-007', customer: 'David Miller', date: '2023-06-12', expiryDate: '2023-07-12', totalAmount: 950.00, status: 'Accepted' },
  ];

  // Filter data based on search and filter
  const filteredData = quotationData.filter(item => {
    const matchesSearch = item.quotationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    { title: "Total Quotations", value: quotationData.length.toString(), description: "All quotations", icon: <FileTextOutlined /> },
    { title: "Accepted", value: quotationData.filter(i => i.status === 'Accepted').length.toString(), description: "Accepted quotations", icon: <FileTextOutlined /> },
    { title: "Pending", value: quotationData.filter(i => i.status === 'Sent' || i.status === 'Draft').length.toString(), description: "Awaiting response", icon: <FileTextOutlined /> },
    { title: "Total Value", value: `$${quotationData.reduce((sum, item) => sum + item.totalAmount, 0).toFixed(2)}`, description: "Total quotation value", icon: <FileTextOutlined /> }
  ];

  const columns = [
    {
      key: 'quotationId',
      title: 'QUOTATION ID',
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
      key: 'expiryDate',
      title: 'EXPIRY DATE',
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
          value === 'Accepted' 
            ? 'bg-green-100 text-green-800' 
            : value === 'Sent'
            ? 'bg-blue-100 text-blue-800'
            : value === 'Draft'
            ? 'bg-yellow-100 text-yellow-800'
            : value === 'Rejected'
            ? 'bg-red-100 text-red-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'ACTION',
      render: (_: any, record: QuotationItem) => (
        <ActionButtons 
          onView={() => console.log('View quotation', record.id)}
          onEdit={() => console.log('Edit quotation', record.id)}
          onDelete={() => console.log('Delete quotation', record.id)}
        />
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Quotation</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Add New Quotation */}
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
          <PlusOutlined className="mr-2" />
          New Quotation
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
              placeholder="Search quotations"
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

      {/* Quotations Table */}
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

export default ManageQuotationPage;