'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb, Search, GenericTable, ActionButtons } from '@/components/reusable';
import { SearchOutlined, FilterOutlined, CaretUpOutlined, CaretDownOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import FilterPanel from '@/components/reusable/FilterPanel';
import CustomerModal from '../components/CustomerModal';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
}

const ManageCustomersPage = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: 'ABC Pharmacy', email: 'john@abcpharma.com', phone: '+250 788 123 456', status: 'Active' },
    { id: 2, name: 'XYZ Medical Center', email: 'jane@xyzmedical.com', phone: '+250 788 234 567', status: 'Active' },
    { id: 3, name: 'Global Health Clinic', email: 'robert@globalhealth.com', phone: '+250 788 345 678', status: 'Inactive' },
    { id: 4, name: 'MediCare Hospital', email: 'sarah@medicare.com', phone: '+250 788 456 789', status: 'Active' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add modal state
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    category: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  // Define filter fields for the FilterPanel component
  const filterFields = [
    { key: 'name', label: 'Customer Name', type: 'text' as const, placeholder: 'Enter customer name' },
    { key: 'email', label: 'Email', type: 'text' as const, placeholder: 'Enter email' },
    { key: 'category', label: 'Category', type: 'select' as const, options: [
      { value: '', label: 'All Categories' },
      { value: 'pharmacy', label: 'Pharmacy' },
      { value: 'hospital', label: 'Hospital' },
      { value: 'clinic', label: 'Clinic' }
    ]},
    { key: 'status', label: 'Status', type: 'select' as const, options: [
      { value: '', label: 'All Statuses' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]},
    { key: 'dateFrom', label: 'Date From', type: 'date' as const },
    { key: 'dateTo', label: 'Date To', type: 'date' as const }
  ];
  const itemsPerPage = 6;

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'User Management', href: '/dashboard/user-management' },
    { name: 'Manage Customers', current: true }
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

  // Filter and sort customers based on search, status, and sorting config
  const filteredAndSortedCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.phone.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || customer.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (!sortConfig) return 0;
    
    let aValue, bValue;
    
    switch (sortConfig.key) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'email':
        aValue = a.email.toLowerCase();
        bValue = b.email.toLowerCase();
        break;
      case 'phone':
        aValue = a.phone;
        bValue = b.phone;
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
  const totalPages = Math.ceil(filteredAndSortedCustomers.length / itemsPerPage);
  const currentCustomers = filteredAndSortedCustomers.slice(
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

  // Handle customer creation
  const handleCreateCustomer = (customerData: {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    tinNumber: string;
  }) => {
    console.log('Creating customer:', customerData);
    // In a real app, you would send this data to your API
    // For now, we'll just show an alert
    alert(`Customer ${customerData.fullName} created successfully!`);
    setIsModalOpen(false);
  };

  // Generate random background color for customer initials
  const getCustomerColor = (name: string) => {
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
  const getCustomerInitials = (name: string) => {
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
    { title: "Total Customers", value: customers.length, icon: <SearchOutlined className="w-5 h-5 text-[#2463EB]" />, color: "bg-[#F6F9FF] border border-[#DBE9FE]" },
    { title: "Active Customers", value: customers.filter(c => c.status === 'Active').length, icon: <SearchOutlined className="w-5 h-5 text-green-500" />, color: "bg-green-50" },
    { title: "Inactive Customers", value: customers.filter(c => c.status === 'Inactive').length, icon: <SearchOutlined className="w-5 h-5 text-red-500" />, color: "bg-red-50" },
    { title: "New This Month", value: "12", icon: <SearchOutlined className="w-5 h-5 text-purple-500" />, color: "bg-purple-50" }
  ];

  // Filter handler functions
  const handleApplyFilters = (appliedFilters: typeof filters) => {
    console.log('Applying filters:', appliedFilters);
    setFilters(appliedFilters);
    setIsFilterPanelOpen(false);
  };

  const handleClearAllFilters = () => {
    setFilters({
      name: '',
      email: '',
      category: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const handleFilterChange = <K extends keyof typeof filters>(key: K, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

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
          
          {/* Add New Customer Icon Skeleton */}
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
      </div>
    );
  }

  const columns = [
    {
      key: 'name',
      title: 'CUSTOMER NAME',
      sortable: true,
      render: (value: string, record: Customer) => (
        <div className="flex items-center">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${getCustomerColor(record.name)}`}>
            {getCustomerInitials(record.name)}
          </div>
          <span className="ml-4 text-sm font-medium text-gray-900">{record.name}</span>
        </div>
      )
    },
    {
      key: 'email',
      title: 'EMAIL',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'phone',
      title: 'PHONE',
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
          value === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'ACTION',
      render: (_: any, record: Customer) => (
        <ActionButtons 
          onView={() => console.log('View customer', record.id)}
          onEdit={() => console.log('Edit customer', record.id)}
          onDelete={() => console.log('Delete customer', record.id)}
        />
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Customer Creation Modal */}
      <CustomerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCustomer}
      />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Customers</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Icons Container */}
        <div className="flex items-center space-x-2">
          {/* Listing Icon */}
          <div 
            className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
            onClick={() => router.push('/dashboard/user-management')}
            title="Customer listing"
          >
            <UnorderedListOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
          </div>
          
          {/* Add New Customer Icon */}
          <div 
            className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
            onClick={() => setIsModalOpen(true)}
            title="Add new customer"
          >
            <SettingOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
          </div>
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
              placeholder="Search or filter customers"
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

      {/* Customers Table */}
      <GenericTable
        data={currentCustomers}
        columns={columns}
        loading={loading}
        onSort={handleSort}
        sortConfig={sortConfig}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: goToPage,
          itemsPerPage,
          totalItems: filteredAndSortedCustomers.length
        }}
      />
    </div>
  );
};

export default ManageCustomersPage;