'use client';

import { useState, useEffect } from 'react';
import { Breadcrumb, Search, StatCard, GenericTable, ActionButtons } from '@/components/reusable';
import { PlusOutlined, FilePdfOutlined, PrinterOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';

interface Invoice {
  id: number;
  invoiceNumber: string;
  patient: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod: string;
}

const SalesInvoiceReportsPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 1, invoiceNumber: 'INV-2023-001', patient: 'John Doe', date: '2023-06-15', amount: 125.50, status: 'paid', paymentMethod: 'Credit Card' },
    { id: 2, invoiceNumber: 'INV-2023-002', patient: 'Jane Smith', date: '2023-06-14', amount: 89.99, status: 'paid', paymentMethod: 'Cash' },
    { id: 3, invoiceNumber: 'INV-2023-003', patient: 'Robert Johnson', date: '2023-06-14', amount: 210.75, status: 'pending', paymentMethod: 'Insurance' },
    { id: 4, invoiceNumber: 'INV-2023-004', patient: 'Emily Davis', date: '2023-06-13', amount: 67.25, status: 'paid', paymentMethod: 'Debit Card' },
    { id: 5, invoiceNumber: 'INV-2023-005', patient: 'Michael Wilson', date: '2023-06-12', amount: 145.60, status: 'overdue', paymentMethod: 'Credit Card' },
    { id: 6, invoiceNumber: 'INV-2023-006', patient: 'Sarah Brown', date: '2023-06-12', amount: 98.30, status: 'paid', paymentMethod: 'Cash' },
    { id: 7, invoiceNumber: 'INV-2023-007', patient: 'David Miller', date: '2023-06-11', amount: 175.80, status: 'pending', paymentMethod: 'Insurance' },
    { id: 8, invoiceNumber: 'INV-2023-008', patient: 'Lisa Taylor', date: '2023-06-10', amount: 89.40, status: 'paid', paymentMethod: 'Debit Card' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Pharmacy Management', href: '/dashboard/pharmacy-management' },
    { name: 'Sales Invoice & Reports', current: true }
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

  // Filter and sort invoices based on search and sorting config
  const filteredAndSortedInvoices = invoices.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.patient.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (!sortConfig) return 0;
    
    let aValue, bValue;
    
    switch (sortConfig.key) {
      case 'invoiceNumber':
        aValue = a.invoiceNumber.toLowerCase();
        bValue = b.invoiceNumber.toLowerCase();
        break;
      case 'patient':
        aValue = a.patient.toLowerCase();
        bValue = b.patient.toLowerCase();
        break;
      case 'date':
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
        break;
      case 'amount':
        aValue = a.amount;
        bValue = b.amount;
        break;
      case 'paymentMethod':
        aValue = a.paymentMethod.toLowerCase();
        bValue = b.paymentMethod.toLowerCase();
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
  const totalPages = Math.ceil(filteredAndSortedInvoices.length / itemsPerPage);
  const currentInvoices = filteredAndSortedInvoices.slice(
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
  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices
    .filter(inv => inv.status === 'pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const stats = [
    { title: "Total Invoices", value: totalInvoices.toString(), description: "All invoices", icon: <PlusOutlined className="w-5 h-5 text-[#2463EB]" /> },
    { title: "Total Revenue", value: `$${totalAmount.toFixed(2)}`, description: "All invoices", icon: <PlusOutlined className="w-5 h-5 text-green-500" />, trend: "up" as const, trendValue: "8%" },
    { title: "Paid Amount", value: `$${paidAmount.toFixed(2)}`, description: "Paid invoices", icon: <PlusOutlined className="w-5 h-5 text-purple-500" />, trend: "up" as const, trendValue: "5%" },
    { title: "Pending Amount", value: `$${pendingAmount.toFixed(2)}`, description: "Unpaid invoices", icon: <PlusOutlined className="w-5 h-5 text-orange-500" /> }
  ];

  const columns = [
    {
      key: 'invoiceNumber',
      title: 'INVOICE #',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      )
    },
    {
      key: 'patient',
      title: 'PATIENT',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'date',
      title: 'DATE',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      )
    },
    {
      key: 'amount',
      title: 'AMOUNT ($)',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-green-600 font-medium">${value.toFixed(2)}</div>
      )
    },
    {
      key: 'paymentMethod',
      title: 'PAYMENT METHOD',
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
          value === 'paid' 
            ? 'bg-green-100 text-green-800' 
            : value === 'pending'
            ? 'bg-orange-100 text-orange-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'ACTION',
      render: (_: any, record: Invoice) => (
        <ActionButtons 
          onView={() => console.log('View invoice', record.id)}
          onEdit={() => console.log('Edit invoice', record.id)}
          onDelete={() => console.log('Delete invoice', record.id)}
          onDownload={() => console.log('Download PDF', record.id)}
          onPrint={() => console.log('Print', record.id)}
        />
      )
    }
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
          
          {/* Action Buttons Skeleton */}
          <div className="flex space-x-2">
            <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
          </div>
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
              <tbody className="divide-y divide-gray-200">
                {Array.from({ length: 6 }, (_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sales Invoice & Reports</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => console.log('New Invoice')}
          >
            New Invoice
          </button>
          <button 
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => console.log('Generate Report')}
          >
            Generate Report
          </button>
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
              onClick={() => console.log('Filter clicked')}
            />
          </div>
          
          {/* Divider Line */}
          <div className="h-px bg-[#F2F2F2] mb-6 -mx-6"></div>
          
          {/* Stats Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard 
                key={index}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                trend={stat.trend as "up" | "down" | undefined}
                trendValue={stat.trendValue}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
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
            totalItems: filteredAndSortedInvoices.length
          }}
        />
      </div>
    </div>
  );
};

export default SalesInvoiceReportsPage;