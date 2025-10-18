import React from 'react';
import GenericTable from '@/components/reusable/GenericTable';

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
}

interface TransactionsTableProps {
  transactions: Transaction[];
  loading?: boolean;
  onSort?: (key: string) => void;
  sortConfig?: { key: string; direction: 'asc' | 'desc' } | null;
  onRowClick?: (transaction: Transaction) => void;
  // Pagination props
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage?: number;
    totalItems?: number;
  };
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ 
  transactions, 
  loading = false, 
  onSort,
  sortConfig,
  onRowClick,
  pagination
}) => {
  const columns = [
    {
      key: 'date',
      title: 'DATE',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      )
    },
    {
      key: 'description',
      title: 'DESCRIPTION',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
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
      key: 'amount',
      title: 'AMOUNT',
      sortable: true,
      render: (value: number) => (
        <div className={`text-sm font-medium ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {value >= 0 ? '+' : ''}{value.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}
        </div>
      )
    },
    {
      key: 'status',
      title: 'STATUS',
      sortable: true,
      render: (value: string) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'Completed' 
            ? 'bg-green-100 text-green-800' 
            : value === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  return (
    <GenericTable
      data={transactions}
      columns={columns}
      loading={loading}
      onSort={onSort}
      sortConfig={sortConfig}
      onRowClick={onRowClick}
      pagination={pagination}
    />
  );
};

export default TransactionsTable;