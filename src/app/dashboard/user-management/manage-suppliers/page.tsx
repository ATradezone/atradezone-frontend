'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb, GenericTable, ActionButtons } from '@/components/reusable';
import PageTitle from '@/components/ui/PageTitle';
import { SearchOutlined, FilterOutlined, CaretUpOutlined, CaretDownOutlined, SettingOutlined, UnorderedListOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import FilterPanel from '@/components/reusable/FilterPanel';
import SupplierModal from '../components/SupplierModal';

interface Supplier {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: "Active" | "Disabled";
  connectionStatus?: "Connected" | "Disconnected"; // New optional field
}

const ManageSuppliersPage = () => {
  const router = useRouter();
  const itemsPerPage = 6; // Move this before any hooks
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: "ABC Distributors", phone: "0782424845", email: "contact@abcdistributors.com", status: "Active", connectionStatus: "Connected" },
    { id: 2, name: "XYZ Suppliers", phone: "0782424845", email: "info@xyzsuppliers.com", status: "Disabled", connectionStatus: "Disconnected" },
    { id: 3, name: "Global Pharma", phone: "N/A", email: "support@globalpharma.com", status: "Active", connectionStatus: "Connected" },
    { id: 4, name: "MediCare Inc.", phone: "0782424845", email: "hello@medicareinc.com", status: "Active", connectionStatus: "Connected" },
    { id: 5, name: "HealthFirst", phone: "N/A", email: "care@healthfirst.com", status: "Active", connectionStatus: "Disconnected" },
    { id: 6, name: "PharmaDirect", phone: "N/A", email: "sales@pharmadirect.com", status: "Active", connectionStatus: "Connected" },
    { id: 7, name: "QuickMed", phone: "0782424845", email: "help@quickmed.com", status: "Disabled", connectionStatus: "Disconnected" },
    { id: 8, name: "CarePlus", phone: "N/A", email: "contact@careplus.com", status: "Active", connectionStatus: "Connected" }
  ]);
  // Move all state hooks before any conditional logic
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    category: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  // Handle supplier creation
  const handleCreateSupplier = (supplierData: {
    companyName: string;
    emailAddress: string;
    phoneNumber: string;
    tinNumber: string;
    website: string;
  }) => {
    console.log('Supplier data submitted:', supplierData);
    // Here you would typically send the data to your backend
    // For now, we'll just close the modal
    setIsSupplierModalOpen(false);
    // You might want to show a success message or update the supplier list
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'User Management', href: '/dashboard/user-management' },
    { name: 'Manage Suppliers', current: true }
  ];

  // Stats data
  const stats = [
    {title: "Total Suppliers", value: 230,  icon: <SearchOutlined className="w-5 h-5 text-[#2463EB]" />,  color: "bg-[#F6F9FF] border border-[#DBE9FE]"},
    { title: "Active Suppliers", value: 13, icon: <SearchOutlined className="w-5 h-5 text-green-500" />, color: "bg-green-50" },
    { title: "Disabled Approvals", value: 12, icon: <ExclamationCircleOutlined className="w-5 h-5 text-yellow-500" />, color: "bg-yellow-50" },
    { title: "Monthly Transactions", value: "12M Frw", icon: <ExclamationCircleOutlined className="w-5 h-5 text-red-500" />, color: "bg-red-50" }
  ];

  // Generate random background color for company initials
  const getCompanyColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500',
      'bg-red-500', 'bg-lime-500', 'bg-amber-500', 'bg-emerald-500'
    ];
    
    // Use the first two letters of the company name to generate a consistent color
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Get first two capital letters from company name
  const getCompanyInitials = (name: string) => {
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

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort suppliers based on search, status, and sorting config
  const filteredAndSortedSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          supplier.phone.includes(searchTerm) ||
                          supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || supplier.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (!sortConfig) return 0;
    
    let aValue, bValue;
    
    switch (sortConfig.key) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'phone':
        aValue = a.phone.toLowerCase();
        bValue = b.phone.toLowerCase();
        break;
      case 'email':
        aValue = a.email.toLowerCase();
        bValue = b.email.toLowerCase();
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
  const totalPages = Math.ceil(filteredAndSortedSuppliers.length / itemsPerPage);
  const currentSuppliers = filteredAndSortedSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
          
          {/* Add New Supplier Icon Skeleton */}
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

        {/* Suppliers Table Skeleton */}
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

  // Define filter fields for the FilterPanel
  const filterFields = [
    { key: 'name', label: 'Name', type: 'text' as const, placeholder: 'Filter by name' },
    { key: 'email', label: 'Email', type: 'text' as const, placeholder: 'Filter by email' },
    { 
      key: 'category', 
      label: 'Category', 
      type: 'select' as const,
      options: [
        { value: '', label: 'All Categories' },
        { value: 'manufacturer', label: 'Manufacturer' },
        { value: 'distributor', label: 'Distributor' },
        { value: 'retailer', label: 'Retailer' }
      ]
    },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'select' as const,
      options: [
        { value: '', label: 'All Statuses' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
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
    // The filters are automatically applied through the filteredAndSortedSuppliers computation
    console.log('Applied filters:', filters);
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
    console.log('Cleared all filters');
  };

  const columns = [
    {
      key: 'name',
      title: 'SUPPLIER NAME',
      sortable: true,
      render: (value: string, record: Supplier) => (
        <div className="flex items-center">
          {/* Dynamic Company Initials with Random Background Color */}
          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${getCompanyColor(record.name)}`}>
            {getCompanyInitials(record.name)}
          </div>
          <span className="ml-4 text-sm font-medium text-gray-900">{record.name}</span>
        </div>
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
      key: 'connectionStatus',
      title: 'CONNECTION',
      render: (value: string) => (
        <div className="flex items-center">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            value === 'Connected' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {value || 'Disconnected'}
          </span>
        </div>
      )
    },
    {
      key: 'request',
      title: 'REQUEST',
      render: (_: any, record: Supplier) => (
        <div 
          className={`w-9 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
            record.connectionStatus === 'Connected' 
              ? 'bg-[#85ed68]' 
              : 'bg-gray-300'
          }`}
          style={{ border: 'solid 1px #85ed68' }}
          onClick={() => {
            // Update the connection status
            const updatedSuppliers: Supplier[] = suppliers.map(s => {
              if (s.id === record.id) {
                const newStatus = s.connectionStatus === 'Connected' ? 'Disconnected' : 'Connected';
                return {...s, connectionStatus: newStatus};
              }
              return s;
            });
            setSuppliers(updatedSuppliers);
            console.log(`Supplier ${record.name} connection status changed to ${record.connectionStatus === 'Connected' ? 'Disconnected' : 'Connected'}`);
          }}
        >
          <div className={`bg-white rounded-full shadow-sm transform transition-transform ${
            record.connectionStatus === 'Connected' ? 'translate-x-4' : ''
          }`}>
            <div className="w-3 h-3 rounded-full"></div>
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      title: 'ACTION',
      render: (_: any, record: Supplier) => (
        <ActionButtons 
          onView={() => router.push(`/dashboard/user-management/manage-suppliers/supplier-profile?id=${record.id}`)}
          onEdit={() => console.log('Edit supplier', record.id)}
          onDelete={() => console.log('Delete supplier', record.id)}
        />
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Set dynamic page title */}
      <PageTitle title="Manage Suppliers" />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-gray-800">Manage Suppliers</h1>
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
            title="Supplier listing"
          >
            <UnorderedListOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
          </div>
          
          {/* Add New Supplier Icon */}
          <div 
            className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
            onClick={() => setIsSupplierModalOpen(true)}
            title="Add new supplier"
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
              placeholder="Search or filter suppliers"
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

      {/* Suppliers Table */}
      <GenericTable
        data={currentSuppliers}
        columns={columns}
        loading={loading}
        onSort={(key) => {
          setSortConfig(prevConfig => ({
            key,
            direction: prevConfig?.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
          }));
        }}
        sortConfig={sortConfig}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: goToPage,
          itemsPerPage,
          totalItems: filteredAndSortedSuppliers.length
        }}
      />
      <SupplierModal 
        isOpen={isSupplierModalOpen}
        onClose={() => setIsSupplierModalOpen(false)}
        onSubmit={handleCreateSupplier}
      />
    </div>
  );
};

export default ManageSuppliersPage;