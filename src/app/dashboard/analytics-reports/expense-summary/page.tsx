'use client';

import { useState, useEffect } from 'react';
import { Breadcrumb, Search, StatCard, ActionButtons, GenericTable } from '@/components/reusable';
import { PieChartOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, SearchOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';

interface ExpenseRecord {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  paymentMethod: string;
  status: 'paid' | 'pending' | 'overdue';
}

const ExpenseSummaryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Mock data for expense records
  const expenseRecords: ExpenseRecord[] = [
    { id: 1, date: '2023-06-15', description: 'Inventory Purchase', category: 'Inventory', amount: 1250.50, paymentMethod: 'Credit Card', status: 'paid' },
    { id: 2, date: '2023-06-14', description: 'Utility Bills', category: 'Utilities', amount: 245.75, paymentMethod: 'Bank Transfer', status: 'paid' },
    { id: 3, date: '2023-06-14', description: 'Employee Salaries', category: 'Payroll', amount: 8900.25, paymentMethod: 'Bank Transfer', status: 'paid' },
    { id: 4, date: '2023-06-13', description: 'Office Supplies', category: 'Supplies', amount: 167.80, paymentMethod: 'Cash', status: 'paid' },
    { id: 5, date: '2023-06-12', description: 'Monthly Subscription', category: 'Software', amount: 299.99, paymentMethod: 'Credit Card', status: 'pending' },
    { id: 6, date: '2023-06-12', description: 'Equipment Maintenance', category: 'Maintenance', amount: 450.30, paymentMethod: 'Bank Transfer', status: 'paid' },
    { id: 7, date: '2023-06-11', description: 'Marketing Campaign', category: 'Marketing', amount: 1200.60, paymentMethod: 'Credit Card', status: 'paid' },
    { id: 8, date: '2023-06-10', description: 'Rent Payment', category: 'Rent', amount: 2500.00, paymentMethod: 'Bank Transfer', status: 'overdue' },
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusDisplay = (status: 'paid' | 'pending' | 'overdue') => {
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
    };
    
    const config = statusConfig[status];
    return (
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {config.text}
      </div>
    );
  };

  const filteredExpenseRecords = expenseRecords.filter(record =>
    record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedExpenseRecords = [...filteredExpenseRecords];
  if (sortConfig !== null) {
    sortedExpenseRecords.sort((a, b) => {
      if (a[sortConfig.key as keyof ExpenseRecord] < b[sortConfig.key as keyof ExpenseRecord]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof ExpenseRecord] > b[sortConfig.key as keyof ExpenseRecord]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(sortedExpenseRecords.length / itemsPerPage);
  const currentExpenseRecords = sortedExpenseRecords.slice(
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
      key: 'date',
      title: 'Date',
      sortable: true,
    },
    {
      key: 'description',
      title: 'Description',
      sortable: true,
    },
    {
      key: 'category',
      title: 'Category',
      sortable: true,
    },
    {
      key: 'amount',
      title: 'Amount ($)',
      sortable: true,
      render: (value: number) => (
        <span className="text-gray-900">
          {value.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'paymentMethod',
      title: 'Payment Method',
    },
    {
      key: 'status',
      title: 'Status',
      render: (_: unknown, record: ExpenseRecord) => getStatusDisplay(record.status),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: unknown, record: ExpenseRecord) => (
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
  const totalExpenses = expenseRecords
    .filter(r => r.status === 'paid')
    .reduce((sum, record) => sum + record.amount, 0);
    
  const pendingExpenses = expenseRecords
    .filter(r => r.status === 'pending')
    .reduce((sum, record) => sum + record.amount, 0);
    
  const overdueExpenses = expenseRecords
    .filter(r => r.status === 'overdue')
    .reduce((sum, record) => sum + record.amount, 0);

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Analytics & Reports', href: '/dashboard/analytics-reports' },
    { name: 'Expense Summary', current: true }
  ];

  const statCards = [
    { 
      title: "Total Paid", 
      value: `$${totalExpenses.toFixed(2)}`, 
      description: "Confirmed expenses",
      trend: "down" as const,
      trendValue: "5%",
      icon: <PieChartOutlined />
    },
    { 
      title: "Pending Expenses", 
      value: `$${pendingExpenses.toFixed(2)}`, 
      description: "Awaiting payment",
      icon: <ClockCircleOutlined />
    },
    { 
      title: "Overdue Expenses", 
      value: `$${overdueExpenses.toFixed(2)}`, 
      description: "Late payments",
      trend: "up" as const,
      trendValue: "2%",
      icon: <ExclamationCircleOutlined />
    },
    { 
      title: "Expense Categories", 
      value: "8", 
      description: "Different categories",
      icon: <PieChartOutlined />
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

        {/* Expense Records Table Skeleton */}
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
          <h1 className="text-2xl font-bold text-gray-800">Expense Summary</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Add New Item Icon */}
        <div 
          className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
          style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)' }}
          onClick={() => {
            // TODO: Implement add new expense record functionality
          }}
          title="Add new expense record"
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
              placeholder="Search expense records..."
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

      {/* Expense Records Table */}
      <GenericTable 
        data={currentExpenseRecords}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handleSort}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: goToPage,
          itemsPerPage,
          totalItems: sortedExpenseRecords.length
        }}
      />
    </div>
  );
};

export default ExpenseSummaryPage;