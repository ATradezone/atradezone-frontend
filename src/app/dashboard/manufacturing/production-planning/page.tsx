'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb, Search, GenericTable, ActionButtons } from '@/components/reusable';
import { PlusOutlined, PlusCircleOutlined, SearchOutlined, FilterOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

interface ProductionPlan {
  id: number;
  productName: string;
  batchNumber: string;
  plannedQuantity: number;
  producedQuantity: number;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in-progress' | 'completed' | 'delayed';
}

const ProductionPlanningPage = () => {
  const [productionPlans, setProductionPlans] = useState<ProductionPlan[]>([
    { id: 1, productName: 'Paracetamol 500mg', batchNumber: 'BATCH-001', plannedQuantity: 10000, producedQuantity: 8500, startDate: '2023-06-01', endDate: '2023-06-15', status: 'in-progress' },
    { id: 2, productName: 'Amoxicillin 250mg', batchNumber: 'BATCH-002', plannedQuantity: 5000, producedQuantity: 5000, startDate: '2023-06-05', endDate: '2023-06-12', status: 'completed' },
    { id: 3, productName: 'Vitamin C 1000mg', batchNumber: 'BATCH-003', plannedQuantity: 7500, producedQuantity: 0, startDate: '2023-06-20', endDate: '2023-07-05', status: 'planned' },
    { id: 4, productName: 'Ibuprofen 200mg', batchNumber: 'BATCH-004', plannedQuantity: 12000, producedQuantity: 3000, startDate: '2023-06-10', endDate: '2023-06-25', status: 'delayed' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Manufacturing', href: '/dashboard/manufacturing' },
    { name: 'Production Planning', current: true }
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort productionPlans based on search, status, and sorting config
  const filteredAndSortedPlans = productionPlans.filter(plan => {
    const matchesSearch = plan.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plan.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || plan.status.toLowerCase().includes(filterStatus);
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (!sortConfig) return 0;
    
    let aValue, bValue;
    
    switch (sortConfig.key) {
      case 'productName':
        aValue = a.productName.toLowerCase();
        bValue = b.productName.toLowerCase();
        break;
      case 'batchNumber':
        aValue = a.batchNumber.toLowerCase();
        bValue = b.batchNumber.toLowerCase();
        break;
      case 'plannedQuantity':
        aValue = a.plannedQuantity;
        bValue = b.plannedQuantity;
        break;
      case 'producedQuantity':
        aValue = a.producedQuantity;
        bValue = b.producedQuantity;
        break;
      case 'startDate':
        aValue = new Date(a.startDate).getTime();
        bValue = new Date(b.startDate).getTime();
        break;
      case 'endDate':
        aValue = new Date(a.endDate).getTime();
        bValue = new Date(b.endDate).getTime();
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
  const totalPages = Math.ceil(filteredAndSortedPlans.length / itemsPerPage);
  const currentPlans = filteredAndSortedPlans.slice(
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
    { title: "Total Plans", value: productionPlans.length.toString(), icon: <SearchOutlined className="w-5 h-5 text-[#2463EB]" />, color: "bg-[#F6F9FF] border border-[#DBE9FE]" },
    { title: "In Progress", value: productionPlans.filter(p => p.status === 'in-progress').length.toString(), icon: <SearchOutlined className="w-5 h-5 text-blue-500" />, color: "bg-blue-50" },
    { title: "Completed", value: productionPlans.filter(p => p.status === 'completed').length.toString(), icon: <SearchOutlined className="w-5 h-5 text-green-500" />, color: "bg-green-50" },
    { title: "Planned", value: productionPlans.filter(p => p.status === 'planned').length.toString(), icon: <SearchOutlined className="w-5 h-5 text-purple-500" />, color: "bg-purple-50" }
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

        {/* Production Plans Table Skeleton */}
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

  const columns = [
    {
      key: 'productName',
      title: 'PRODUCT NAME',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'batchNumber',
      title: 'BATCH NUMBER',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'plannedQuantity',
      title: 'PLANNED QTY',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-900">{value.toLocaleString()}</div>
      )
    },
    {
      key: 'producedQuantity',
      title: 'PRODUCED QTY',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-900">{value.toLocaleString()}</div>
      )
    },
    {
      key: 'startDate',
      title: 'START DATE',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'endDate',
      title: 'END DATE',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'status',
      title: 'STATUS',
      sortable: true,
      render: (value: string) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'completed' 
            ? 'bg-green-100 text-green-800' 
            : value === 'in-progress'
            ? 'bg-blue-100 text-blue-800'
            : value === 'planned'
            ? 'bg-purple-100 text-purple-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'ACTION',
      render: (_: any, record: ProductionPlan) => (
        <ActionButtons 
          onView={() => console.log('View plan', record.id)}
          onEdit={() => console.log('Edit plan', record.id)}
          onDelete={() => console.log('Delete plan', record.id)}
        />
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Production Planning</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Add New Item Icon */}
        <div 
          className="h-8 w-8 bg-white mt-1 rounded-[0.45rem] flex items-center justify-center border border-[#F2F2F2] shadow-sm cursor-pointer"
          style={{ backgroundColor: '#ffffff', borderColor: '#F2F2F2' }}
          onClick={() => console.log('Add new plan')}
          title="Add new plan"
        >
          <PlusCircleOutlined style={{ color: '#6E82A5', fontSize: '16px' }} />
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
              placeholder="Search production plans..."
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

      {/* Production Plans Table */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="overflow-x-auto p-4">
          <GenericTable 
            data={currentPlans}
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSort}
            pagination={{
              currentPage,
              totalPages,
              onPageChange: goToPage,
              itemsPerPage,
              totalItems: filteredAndSortedPlans.length
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductionPlanningPage;