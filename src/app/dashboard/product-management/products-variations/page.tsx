'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb, Search, GenericTable, ActionButtons } from '@/components/reusable';
import { PlusOutlined, SearchOutlined, FilterOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import FilterPanel from '@/components/reusable/FilterPanel';

interface Variation {
  id: number;
  productName: string;
  variation: string;
  sku: string;
  price: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const ProductsVariationsPage = () => {
  const [variations, setVariations] = useState<Variation[]>([
    { id: 1, productName: 'Paracetamol 500mg', variation: '10 tablets', sku: 'PAR-500-10', price: 'RWF 500', stock: 150, status: 'In Stock' },
    { id: 2, productName: 'Paracetamol 500mg', variation: '20 tablets', sku: 'PAR-500-20', price: 'RWF 900', stock: 75, status: 'In Stock' },
    { id: 3, productName: 'Amoxicillin 250mg', variation: '10 capsules', sku: 'AMO-250-10', price: 'RWF 1,200', stock: 25, status: 'Low Stock' },
    { id: 4, productName: 'Amoxicillin 250mg', variation: '20 capsules', sku: 'AMO-250-20', price: 'RWF 2,200', stock: 0, status: 'Out of Stock' },
    { id: 5, productName: 'Cetirizine 10mg', variation: '10 tablets', sku: 'CET-10-10', price: 'RWF 800', stock: 50, status: 'In Stock' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    productName: '',
    variation: '',
    sku: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });
  const itemsPerPage = 6;

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Product Management', href: '/dashboard/product-management' },
    { name: 'Products Variations', current: true }
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

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    setIsFilterPanelOpen(false);
    // The filters are automatically applied through the filteredAndSortedVariations computation
    console.log('Applied filters:', filters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      productName: '',
      variation: '',
      sku: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    });
    console.log('Cleared all filters');
  };

  // Filter and sort variations based on search, status, and sorting config
  const filteredAndSortedVariations = variations.filter(variation => {
    const matchesSearch = variation.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          variation.variation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          variation.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || variation.status.toLowerCase().includes(filterStatus);
    
    // Apply dynamic filters
    const matchesProductName = !filters.productName || variation.productName.toLowerCase().includes(filters.productName.toLowerCase());
    const matchesVariation = !filters.variation || variation.variation.toLowerCase().includes(filters.variation.toLowerCase());
    const matchesSku = !filters.sku || variation.sku.toLowerCase().includes(filters.sku.toLowerCase());
    const matchesFilterStatus = !filters.status || variation.status.toLowerCase() === filters.status.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesProductName && matchesVariation && matchesSku && matchesFilterStatus;
  }).sort((a, b) => {
    if (!sortConfig) return 0;
    
    let aValue, bValue;
    
    switch (sortConfig.key) {
      case 'productName':
        aValue = a.productName.toLowerCase();
        bValue = b.productName.toLowerCase();
        break;
      case 'variation':
        aValue = a.variation.toLowerCase();
        bValue = b.variation.toLowerCase();
        break;
      case 'sku':
        aValue = a.sku.toLowerCase();
        bValue = b.sku.toLowerCase();
        break;
      case 'price':
        aValue = parseFloat(a.price.replace('RWF ', '').replace(',', ''));
        bValue = parseFloat(b.price.replace('RWF ', '').replace(',', ''));
        break;
      case 'stock':
        aValue = a.stock;
        bValue = b.stock;
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
  const totalPages = Math.ceil(filteredAndSortedVariations.length / itemsPerPage);
  const currentVariations = filteredAndSortedVariations.slice(
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
    { title: "Total Variations", value: variations.length, icon: <SearchOutlined className="w-5 h-5 text-[#2463EB]" />, color: "bg-[#F6F9FF] border border-[#DBE9FE]" },
    { title: "In Stock", value: variations.filter(v => v.status === 'In Stock').length, icon: <SearchOutlined className="w-5 h-5 text-green-500" />, color: "bg-green-50" },
    { title: "Low Stock", value: variations.filter(v => v.status === 'Low Stock').length, icon: <SearchOutlined className="w-5 h-5 text-yellow-500" />, color: "bg-yellow-50" },
    { title: "Out of Stock", value: variations.filter(v => v.status === 'Out of Stock').length, icon: <SearchOutlined className="w-5 h-5 text-red-500" />, color: "bg-red-50" }
  ];

  // Define filter fields for the FilterPanel
  const filterFields = [
    { key: 'productName', label: 'Product Name', type: 'text' as const, placeholder: 'Filter by product name' },
    { key: 'variation', label: 'Variation', type: 'text' as const, placeholder: 'Filter by variation' },
    { key: 'sku', label: 'SKU', type: 'text' as const, placeholder: 'Filter by SKU' },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'select' as const,
      options: [
        { value: '', label: 'All Statuses' },
        { value: 'in stock', label: 'In Stock' },
        { value: 'low stock', label: 'Low Stock' },
        { value: 'out of stock', label: 'Out of Stock' }
      ]
    },
    { key: 'dateFrom', label: 'Date From', type: 'date' as const },
    { key: 'dateTo', label: 'Date To', type: 'date' as const }
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
          
          {/* Add New Variation Icon Skeleton */}
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

        {/* Variations Table Skeleton */}
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
                        <div className="h-6 bg-gray-300 rounded-full w-16"></div>
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
      key: 'productName',
      title: 'PRODUCT NAME',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      )
    },
    {
      key: 'variation',
      title: 'VARIATION',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'sku',
      title: 'SKU',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'price',
      title: 'PRICE',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
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
    },
    {
      key: 'actions',
      title: 'ACTION',
      render: (_: any, record: Variation) => (
        <ActionButtons 
          onView={() => console.log('View variation', record.id)}
          onEdit={() => console.log('Edit variation', record.id)}
          onDelete={() => console.log('Delete variation', record.id)}
        />
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products Variations</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Add New Variation Icon */}
        <div 
          className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
          style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
          onClick={() => console.log('Add new variation')}
          title="Add new variation"
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
              placeholder="Search or filter variations"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ border: '1px solid #E5E7EB', backgroundColor: '#f8fafd', borderRadius: '0.5rem' }}
            />
            
            <FilterOutlined 
              className="absolute right-[-1.7rem] top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
              style={{ color: '#b7b7b7' }}
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            />
          </div>
          
          {/* Filter Panel - Collapsible */}
          {isFilterPanelOpen && (
            <FilterPanel
              fields={filterFields}
              onApply={handleApplyFilters}
              onClear={handleClearAllFilters}
              onClose={() => setIsFilterPanelOpen(false)}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          )}
          
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

      {/* Variations Table */}
      <GenericTable
        data={currentVariations}
        columns={columns}
        loading={loading}
        onSort={handleSort}
        sortConfig={sortConfig}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: goToPage,
          itemsPerPage,
          totalItems: filteredAndSortedVariations.length
        }}
      />
    </div>
  );
};

export default ProductsVariationsPage;