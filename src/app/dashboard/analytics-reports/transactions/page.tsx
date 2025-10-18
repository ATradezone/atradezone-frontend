'use client';

import { useState, useEffect } from 'react';
import { Breadcrumb, Search, StatCard, ActionButtons, GenericTable } from '@/components/reusable';
import { TransactionOutlined, ArrowUpOutlined, ArrowDownOutlined, SearchOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'completed' | 'pending' | 'cancelled';
}

const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Mock data for transactions
  const transactions: Transaction[] = [
    { id: 1, date: '2023-06-15', description: 'Product Sale - Order #12345', category: 'Sales', amount: 125.50, type: 'income', status: 'completed' },
    { id: 2, date: '2023-06-15', description: 'Supplier Payment - INV-7890', category: 'Purchases', amount: 89.99, type: 'expense', status: 'completed' },
    { id: 3, date: '2023-06-14', description: 'Product Sale - Order #12344', category: 'Sales', amount: 67.25, type: 'income', status: 'completed' },
    { id: 4, date: '2023-06-14', description: 'Monthly Subscription', category: 'Subscriptions', amount: 29.99, type: 'expense', status: 'pending' },
    { id: 5, date: '2023-06-13', description: 'Product Sale - Order #12343', category: 'Sales', amount: 210.75, type: 'income', status: 'completed' },
    { id: 6, date: '2023-06-13', description: 'Equipment Purchase', category: 'Equipment', amount: 450.00, type: 'expense', status: 'completed' },
    { id: 7, date: '2023-06-12', description: 'Product Sale - Order #12342', category: 'Sales', amount: 89.50, type: 'income', status: 'cancelled' },
    { id: 8, date: '2023-06-12', description: 'Utility Bill Payment', category: 'Utilities', amount: 120.30, type: 'expense', status: 'completed' },
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusDisplay = (status: 'completed' | 'pending' | 'cancelled') => {
    const statusConfig = {
      completed: { 
        color: 'bg-green-100 text-green-800', 
        text: 'Completed'
      },
      pending: { 
        color: 'bg-yellow-100 text-yellow-800', 
        text: 'Pending'
      },
      cancelled: { 
        color: 'bg-red-100 text-red-800', 
        text: 'Cancelled'
      },
    };
    
    const config = statusConfig[status];
    return (
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </div>
    );
  };

  const getTypeDisplay = (type: 'income' | 'expense') => {
    return (
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {type === 'income' ? (
          <>
            <ArrowUpOutlined className="mr-1" />
            Income
          </>
        ) : (
          <>
            <ArrowDownOutlined className="mr-1" />
            Expense
          </>
        )}
      </div>
    );
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = [...filteredTransactions];
  if (sortConfig !== null) {
    sortedTransactions.sort((a, b) => {
      if (a[sortConfig.key as keyof Transaction] < b[sortConfig.key as keyof Transaction]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof Transaction] > b[sortConfig.key as keyof Transaction]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const currentTransactions = sortedTransactions.slice(
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
      render: (value: number, record: Transaction) => (
        <span className="text-gray-900">
          {record.type === 'expense' ? '-' : ''}{value.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'type',
      title: 'Type',
      render: (_: unknown, record: Transaction) => getTypeDisplay(record.type),
    },
    {
      key: 'status',
      title: 'Status',
      render: (_: unknown, record: Transaction) => getStatusDisplay(record.status),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: unknown, record: Transaction) => (
        <ActionButtons 
          onView={() => console.log('View', record.id)}
          onEdit={() => console.log('Edit', record.id)}
          onDelete={() => console.log('Delete', record.id)}
        />
      ),
    },
  ];

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
    
  const netProfit = totalIncome - totalExpenses;

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Analytics & Reports', href: '/dashboard/analytics-reports' },
    { name: 'Transactions', current: true }
  ];

  const statCards = [
    { 
      title: "Total Income", 
      value: `$${totalIncome.toFixed(2)}`, 
      description: "Completed transactions",
      trend: "up" as const,
      trendValue: "12%",
      icon: <ArrowUpOutlined />
    },
    { 
      title: "Total Expenses", 
      value: `$${totalExpenses.toFixed(2)}`, 
      description: "Completed transactions",
      trend: "down" as const,
      trendValue: "5%",
      icon: <ArrowDownOutlined />
    },
    { 
      title: "Net Profit", 
      value: `$${netProfit.toFixed(2)}`, 
      description: "Income minus expenses",
      trend: netProfit >= 0 ? "up" as const : "down" as const,
      trendValue: `${Math.abs(netProfit).toFixed(2)}%`,
      icon: <TransactionOutlined />
    },
    { 
      title: "Total Transactions", 
      value: transactions.length.toString(), 
      description: "All transactions",
      icon: <TransactionOutlined />
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

        {/* Transactions Table Skeleton */}
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
          <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Add New Item Icon */}
        <div 
          className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
          style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)' }}
          onClick={() => console.log('Add new transaction')}
          title="Add new transaction"
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
              placeholder="Search transactions..."
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

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="overflow-x-auto p-4">
          <GenericTable 
            data={currentTransactions}
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[#F2F2F2] flex items-center justify-between bg-[#F1F4F9] rounded-b-xl">
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedTransactions.length)} of {sortedTransactions.length} entries
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`text-sm font-medium ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`text-sm font-medium ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;