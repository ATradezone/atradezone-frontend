'use client';

import { useState, useEffect } from 'react';
import { Breadcrumb, Search, StatCard, ActionButtons, GenericTable } from '@/components/reusable';
import { FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined, SearchOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';

interface InvoiceRecord {
  id: number;
  invoiceNumber: string;
  customer: string;
  date: string;
  dueDate: string;
  amount: number;
  paid: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
}

const InvoiceSummaryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Mock data for invoices
  const invoices: InvoiceRecord[] = [
    { id: 1, invoiceNumber: 'INV-2023-001', customer: 'ABC Pharmaceuticals', date: '2023-06-15', dueDate: '2023-07-15', amount: 1250.50, paid: 1250.50, status: 'paid' },
    { id: 2, invoiceNumber: 'INV-2023-002', customer: 'XYZ Medical Supplies', date: '2023-06-14', dueDate: '2023-07-14', amount: 2450.75, paid: 2450.75, status: 'paid' },
    { id: 3, invoiceNumber: 'INV-2023-003', customer: 'HealthPlus Clinic', date: '2023-06-14', dueDate: '2023-07-14', amount: 890.25, paid: 0, status: 'pending' },
    { id: 4, invoiceNumber: 'INV-2023-004', customer: 'MediCare Hospital', date: '2023-06-13', dueDate: '2023-07-13', amount: 675.80, paid: 675.80, status: 'paid' },
    { id: 5, invoiceNumber: 'INV-2023-005', customer: 'Wellness Pharmacy', date: '2023-06-12', dueDate: '2023-06-12', amount: 299.99, paid: 0, status: 'overdue' },
    { id: 6, invoiceNumber: 'INV-2023-006', customer: 'CareFirst Medical', date: '2023-06-12', dueDate: '2023-07-12', amount: 1875.30, paid: 1875.30, status: 'paid' },
    { id: 7, invoiceNumber: 'INV-2023-007', customer: 'PharmaDirect', date: '2023-06-11', dueDate: '2023-07-11', amount: 925.60, paid: 0, status: 'pending' },
    { id: 8, invoiceNumber: 'INV-2023-008', customer: 'MedSupply Co.', date: '2023-06-10', dueDate: '2023-05-10', amount: 750.40, paid: 0, status: 'overdue' },
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusDisplay = (status: 'paid' | 'pending' | 'overdue' | 'cancelled') => {
    const statusConfig = {
      paid: { 
        color: 'bg-green-100 text-green-800', 
        text: 'Paid',
        icon: <CheckCircleOutlined className="mr-1" />
      },
      pending: { 
        color: 'bg-yellow-100 text-yellow-800', 
        text: 'Pending',
        icon: <ClockCircleOutlined className="mr-1" />
      },
      overdue: { 
        color: 'bg-red-100 text-red-800', 
        text: 'Overdue',
        icon: <ExclamationCircleOutlined className="mr-1" />
      },
      cancelled: { 
        color: 'bg-gray-100 text-gray-800', 
        text: 'Cancelled',
        icon: <CloseCircleOutlined className="mr-1" />
      },
    };
    
    const config = statusConfig[status];
    return (
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {config.text}
      </div>
    );
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedInvoices = [...filteredInvoices];
  if (sortConfig !== null) {
    sortedInvoices.sort((a, b) => {
      if (a[sortConfig.key as keyof InvoiceRecord] < b[sortConfig.key as keyof InvoiceRecord]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof InvoiceRecord] > b[sortConfig.key as keyof InvoiceRecord]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(sortedInvoices.length / itemsPerPage);
  const currentInvoices = sortedInvoices.slice(
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
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const columns = [
    {
      key: 'invoiceNumber',
      title: 'Invoice #',
      sortable: true,
    },
    {
      key: 'customer',
      title: 'Customer',
      sortable: true,
    },
    {
      key: 'date',
      title: 'Date',
      sortable: true,
    },
    {
      key: 'dueDate',
      title: 'Due Date',
      sortable: true,
    },
    {
      key: 'amount',
      title: 'Amount ($)',
      sortable: true,
      render: (value: number) => value.toFixed(2),
    },
    {
      key: 'paid',
      title: 'Paid ($)',
      sortable: true,
      render: (value: number) => value.toFixed(2),
    },
    {
      key: 'status',
      title: 'Status',
      render: (_: unknown, record: InvoiceRecord) => getStatusDisplay(record.status),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: unknown, record: InvoiceRecord) => (
        <ActionButtons 
          onView={() => {
            // TODO: Implement view functionality
          }}
          onEdit={() => {
            // TODO: Implement edit functionality
          }}
          onDelete={() => {
            // TODO: Implement delete functionality
          }}
        />
      ),
    },
  ];

  // Calculate totals
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(i => i.status === 'paid').length;
  const pendingInvoices = invoices.filter(i => i.status === 'pending').length;
  const overdueInvoices = invoices.filter(i => i.status === 'overdue').length;
  
  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPaid = invoices.reduce((sum, invoice) => sum + invoice.paid, 0);
  const totalOutstanding = totalAmount - totalPaid;

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Analytics & Reports', href: '/dashboard/analytics-reports' },
    { name: 'Invoice Summary', current: true }
  ];

  const statCards = [
    { 
      title: "Total Invoices", 
      value: totalInvoices.toString(), 
      description: "All invoices",
      icon: <FileTextOutlined />
    },
    { 
      title: "Total Amount", 
      value: `$${totalAmount.toFixed(2)}`, 
      description: "Invoice value",
      trend: "up" as const,
      trendValue: "10%",
      icon: <FileTextOutlined />
    },
    { 
      title: "Outstanding", 
      value: `$${totalOutstanding.toFixed(2)}`, 
      description: "Unpaid invoices",
      trend: "down" as const,
      trendValue: "3%",
      icon: <ExclamationCircleOutlined />
    },
    { 
      title: "Paid Invoices", 
      value: paidInvoices.toString(), 
      description: "Fully paid",
      trend: "up" as const,
      trendValue: "7%",
      icon: <CheckCircleOutlined />
    },
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

        {/* Invoices Table Skeleton */}
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Invoice Summary</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Add New Item Icon */}
        <div 
          className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
          style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)' }}
          onClick={() => {
            // TODO: Implement create new invoice functionality
          }}
          title="Create new invoice"
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
              placeholder="Search invoices..."
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
                // TODO: Implement filter functionality
              }}
            />
          </div>
          
          {/* Divider Line */}
          <div className="h-px bg-[#F2F2F2] mb-6 -mx-6"></div>
          
          {/* Stats Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {statCards.map((card, index) => (
              <div key={index} className="p-4 rounded-xl bg-white border border-gray-200 shadow-[-5px_5px_16px_6px_rgba(244,245,247,1)]">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${card.icon.props.className ? card.icon.props.className : ''}`}>
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">{card.title}</div>
                    <div className="text-xl font-bold text-gray-800">{card.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <GenericTable 
        data={currentInvoices}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handleSort}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: goToPage,
          itemsPerPage,
          totalItems: sortedInvoices.length
        }}
      />
    </div>
  );
};

export default InvoiceSummaryPage;