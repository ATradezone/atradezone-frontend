'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb, Search, GenericTable, ActionButtons } from '@/components/reusable';
import { SearchOutlined, FilterOutlined, CaretUpOutlined, CaretDownOutlined, SettingOutlined, UnorderedListOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { AutoCompleteSelect } from '@/components/ui';
import FilterPanel from '@/components/reusable/FilterPanel';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  location: string;
  date: string;
}

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', quantity: 150, unit: 'tablets', status: 'In Stock', location: 'Warehouse A', date: '2023-10-01' },
    { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotics', quantity: 75, unit: 'capsules', status: 'In Stock', location: 'Warehouse B', date: '2023-10-02' },
    { id: 3, name: 'Cetirizine 10mg', category: 'Allergy', quantity: 25, unit: 'tablets', status: 'Low Stock', location: 'Store 1', date: '2023-10-03' },
    { id: 4, name: 'Omeprazole 20mg', category: 'Digestive Health', quantity: 0, unit: 'capsules', status: 'Out of Stock', location: 'Store 2', date: '2023-10-04' },
    { id: 5, name: 'Ibuprofen 400mg', category: 'Pain Relief', quantity: 200, unit: 'tablets', status: 'In Stock', location: 'Warehouse A', date: '2023-10-05' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    status: '',
    location: '',
    dateFrom: '',
    dateTo: ''
  });
  const itemsPerPage = 6;

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Business Operations', href: '/dashboard/business-operations' },
    { name: 'Inventory & Stock', current: true }
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

  // Filter and sort inventory based on search, status, and sorting config
  const filteredAndSortedItems = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || item.status.toLowerCase().includes(filterStatus);
    
    return matchesSearch && matchesStatus;
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
      case 'quantity':
        aValue = a.quantity;
        bValue = b.quantity;
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
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const currentInventory = filteredAndSortedItems.slice(
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
    { title: "Total Items", value: inventory.length, icon: <SearchOutlined className="w-5 h-5 text-[#2463EB]" />, color: "bg-[#F6F9FF] border border-[#DBE9FE]" },
    { title: "In Stock", value: inventory.filter(i => i.status === 'In Stock').length, icon: <SearchOutlined className="w-5 h-5 text-green-500" />, color: "bg-green-50" },
    { title: "Low Stock", value: inventory.filter(i => i.status === 'Low Stock').length, icon: <SearchOutlined className="w-5 h-5 text-yellow-500" />, color: "bg-yellow-50" },
    { title: "Out of Stock", value: inventory.filter(i => i.status === 'Out of Stock').length, icon: <SearchOutlined className="w-5 h-5 text-red-500" />, color: "bg-red-50" }
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

        {/* Inventory Table Skeleton */}
        <div className="bg-white rounded-xl overflow-hidden" style={{ borderRadius: '20px 20px 0px 0px' }}>
          <GenericTable
            data={[]}
            columns={[
              {
                key: 'name',
                title: 'ITEM NAME',
                sortable: true
              },
              {
                key: 'category',
                title: 'CATEGORY',
                sortable: true
              },
              {
                key: 'quantity',
                title: 'QUANTITY',
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
          />
        </div>
      </div>
    );
  }

  // Define filter fields for the FilterPanel
  const filterFields = [
    { key: 'name', label: 'Item Name', type: 'text' as const, placeholder: 'Filter by item name' },
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
      key: 'status', 
      label: 'Status', 
      type: 'select' as const,
      options: [
        { value: '', label: 'All Statuses' },
        { value: 'in-stock', label: 'In Stock' },
        { value: 'low-stock', label: 'Low Stock' },
        { value: 'out-of-stock', label: 'Out of Stock' }
      ]
    },
    { 
      key: 'location', 
      label: 'Location', 
      type: 'select' as const,
      options: [
        { value: '', label: 'All Locations' },
        { value: 'warehouse-a', label: 'Warehouse A' },
        { value: 'warehouse-b', label: 'Warehouse B' },
        { value: 'store-1', label: 'Store 1' },
        { value: 'store-2', label: 'Store 2' }
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
    // The filters are automatically applied through the filteredAndSortedItems computation
    console.log('Applied filters:', filters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      name: '',
      category: '',
      status: '',
      location: '',
      dateFrom: '',
      dateTo: ''
    });
    console.log('Cleared all filters');
  };

  const columns = [
    {
      key: 'name',
      title: 'ITEM NAME',
      sortable: true,
      render: (value: string, record: InventoryItem) => (
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
      key: 'quantity',
      title: 'QUANTITY',
      sortable: true,
      render: (value: number, record: InventoryItem) => (
        <div className="text-sm text-gray-900">{value} {record.unit}</div>
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
      render: (_: any, record: InventoryItem) => (
        <ActionButtons 
          onView={() => console.log('View item', record.id)}
          onEdit={() => console.log('Edit item', record.id)}
          onDelete={() => console.log('Delete item', record.id)}
        />
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory & Stock</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Add New Item Icon */}
        <div 
          className="h-8 w-8 rounded-[0.45rem] mr-0.5 flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
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
              placeholder="Search or filter inventory items"
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

      {/* Inventory Table */}
      <GenericTable
        data={currentInventory}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handleSort}
        loading={loading}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: goToPage,
          itemsPerPage,
          totalItems: filteredAndSortedItems.length
        }}
      />
    </div>
  );
};

export default InventoryPage;