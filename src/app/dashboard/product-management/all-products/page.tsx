'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb, Search, ActionButtons, GenericTable } from '@/components/reusable';
import { SearchOutlined, FilterOutlined, CaretUpOutlined, CaretDownOutlined, SettingOutlined, UnorderedListOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { AutoCompleteSelect } from '@/components/ui';
import FilterPanel from '@/components/reusable/FilterPanel';
import { ProductModal } from '../components';

interface Product {
  id: number;
  name: string;
  itemCode: string;
  category: string;
  price: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const AllProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Paracetamol 500mg', itemCode: 'PC500', category: 'Pain Relief', price: 'RWF 500', stock: 150, status: 'In Stock' },
    { id: 2, name: 'Amoxicillin 250mg', itemCode: 'AM250', category: 'Antibiotics', price: 'RWF 1,200', stock: 75, status: 'In Stock' },
    { id: 3, name: 'Cetirizine 10mg', itemCode: 'CT10', category: 'Allergy', price: 'RWF 800', stock: 25, status: 'Low Stock' },
    { id: 4, name: 'Omeprazole 20mg', itemCode: 'OM20', category: 'Digestive Health', price: 'RWF 1,500', stock: 0, status: 'Out of Stock' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    itemCode: '',
    category: '',
    brand: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  // Define filter fields for the FilterPanel
  const filterFields = [
    { key: 'name', label: 'Product Name', type: 'text' as const, placeholder: 'Filter by product name' },
    { key: 'itemCode', label: 'Code', type: 'text' as const, placeholder: 'Filter by code' },
    { 
      key: 'category', 
      label: 'Category', 
      type: 'select' as const,
      options: [
        { value: '', label: 'All Categories' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'food', label: 'Food' },
        { value: 'home', label: 'Home & Garden' }
      ]
    },
    { 
      key: 'brand', 
      label: 'Brand', 
      type: 'select' as const,
      options: [
        { value: '', label: 'All Brands' },
        { value: 'sony', label: 'Sony' },
        { value: 'nike', label: 'Nike' },
        { value: 'apple', label: 'Apple' },
        { value: 'samsung', label: 'Samsung' }
      ]
    },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'select' as const,
      options: [
        { value: '', label: 'All Statuses' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'draft', label: 'Draft' }
      ]
    },
    { key: 'dateFrom', label: 'Date From', type: 'date' as const },
    { key: 'dateTo', label: 'Date To', type: 'date' as const }
  ];

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    setIsFilterPanelOpen(false);
    // The filters are automatically applied through the filteredAndSortedProducts computation
    console.log('Applied filters:', filters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      name: '',
      itemCode: '',
      category: '',
      brand: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    });
    console.log('Cleared all filters');
  };

  const itemsPerPage = 6;

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Product Management', href: '/dashboard/product-management' },
    { name: 'All Products', current: true }
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

  // Filter and sort products based on search, status, and sorting config
  const filteredAndSortedProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || product.status.toLowerCase().includes(filterStatus);
    
    // Additional filter by itemCode if specified in filters
    const matchesItemCode = !filters.itemCode || product.itemCode.toLowerCase().includes(filters.itemCode.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesItemCode;
  }).sort((a, b) => {
    if (!sortConfig) return 0;
    
    let aValue, bValue;
    
    switch (sortConfig.key) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'category':
        aValue = a.category.toLowerCase();
        bValue = b.category.toLowerCase();
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
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const currentProducts = filteredAndSortedProducts.slice(
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

  // Stats data
  const stats = [
    { title: "Total Products", value: products.length, icon: <SearchOutlined className="w-5 h-5 text-[#2463EB]" />, color: "bg-[#F6F9FF] border border-[#DBE9FE]" },
    { title: "In Stock", value: products.filter(p => p.status === 'In Stock').length, icon: <SearchOutlined className="w-5 h-5 text-green-500" />, color: "bg-green-50" },
    { title: "Low Stock", value: products.filter(p => p.status === 'Low Stock').length, icon: <SearchOutlined className="w-5 h-5 text-yellow-500" />, color: "bg-yellow-50" },
    { title: "Out of Stock", value: products.filter(p => p.status === 'Out of Stock').length, icon: <SearchOutlined className="w-5 h-5 text-red-500" />, color: "bg-red-50" }
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
          
          {/* Add New Product Icon Skeleton */}
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

        {/* Products Table Skeleton */}
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Array.from({ length: 6 }, (_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </td>
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
      key: 'itemCode',
      title: 'CODE',
      sortable: true,
      render: (value: string, record: Product) => (
        <div className="text-sm font-medium text-gray-900">{record.itemCode}</div>
      )
    },
    {
      key: 'name',
      title: 'PRODUCT NAME',
      sortable: true,
      render: (value: string, record: Product) => (
        <div className="flex items-center">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${getProductColor(record.name)}`}>
            {getProductInitials(record.name)}
          </div>
          <span className="ml-4 text-sm font-medium text-gray-900">{record.name}</span>
        </div>
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
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      )
    },
    {
      key: 'stock',
      title: 'STOCK',
      sortable: true,
      render: (value: number, record: Product) => (
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
      render: (_: any, record: Product) => (
        <ActionButtons 
          onView={() => console.log('View product', record.id)}
          onEdit={() => console.log('Edit product', record.id)}
          onDelete={() => console.log('Delete product', record.id)}
        />
      )
    }
  ];

  // Handle product creation
  const handleCreateProduct = (productData: {
    productName: string;
    category: string;
    taxType: string;
    salePrice: string;
    purchaseCost: string;
  }) => {
    console.log('Product data submitted:', productData);
    // Here you would typically send the data to your backend
    // For now, we'll just close the modal
    setIsProductModalOpen(false);
    // You might want to show a success message or update the product list
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Add New Product Icon */}
        <div 
          className="h-8 w-8 rounded-[0.45rem] mr-0.5 flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
          style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
          onClick={() => setIsProductModalOpen(true)}
          title="Add new product"
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
              placeholder="Search or filter products"
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

      {/* Products Table */}
      <GenericTable
        data={currentProducts}
        columns={columns}
        loading={loading}
        onSort={handleSort}
        sortConfig={sortConfig}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: goToPage,
          itemsPerPage,
          totalItems: filteredAndSortedProducts.length
        }}
      />
      
      {/* Product Modal */}
      <ProductModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSubmit={handleCreateProduct}
      />
    </div>
  );
};

export default AllProductsPage;