'use client';

import React from 'react';
import GenericTable from '@/components/reusable/GenericTable';

interface TestItem {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const TestTablePage = () => {
  const testData: TestItem[] = [
    { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', price: 500, stock: 150, status: 'In Stock' },
    { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotics', price: 1200, stock: 75, status: 'In Stock' },
    { id: 3, name: 'Cetirizine 10mg', category: 'Allergy', price: 800, stock: 25, status: 'Low Stock' },
    { id: 4, name: 'Omeprazole 20mg', category: 'Digestive Health', price: 1500, stock: 0, status: 'Out of Stock' },
  ];

  const columns = [
    {
      key: 'name',
      title: 'PRODUCT NAME',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'category',
      title: 'CATEGORY',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'price',
      title: 'PRICE',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm font-medium text-gray-900">RWF {value.toLocaleString()}</div>
      )
    },
    {
      key: 'stock',
      title: 'STOCK',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-900">{value} units</div>
      )
    },
    {
      key: 'status',
      title: 'STATUS',
      sortable: true,
      render: (value: string) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'In Stock' 
            ? 'bg-green-100 text-green-800' 
            : value === 'Low Stock'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Test Generic Table Component</h1>
      
      <GenericTable
        data={testData}
        columns={columns}
        loading={false}
        sortConfig={null}
        pagination={{
          currentPage: 1,
          totalPages: 1,
          onPageChange: (page) => console.log('Go to page:', page)
        }}
      />
    </div>
  );
};

export default TestTablePage;