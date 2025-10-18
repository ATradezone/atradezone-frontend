import React from 'react';
import GenericTable from '@/components/reusable/GenericTable';

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unit: string;
  lastUpdated: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface InventoryTableProps {
  items: InventoryItem[];
  loading?: boolean;
  onSort?: (key: string) => void;
  sortConfig?: { key: string; direction: 'asc' | 'desc' } | null;
  onRowClick?: (item: InventoryItem) => void;
  // Pagination props
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage?: number;
    totalItems?: number;
  };
}

const InventoryTable: React.FC<InventoryTableProps> = ({ 
  items, 
  loading = false, 
  onSort,
  sortConfig,
  onRowClick,
  pagination
}) => {
  const columns = [
    {
      key: 'sku',
      title: 'SKU',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      )
    },
    {
      key: 'name',
      title: 'ITEM NAME',
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
      key: 'quantity',
      title: 'QUANTITY',
      sortable: true,
      render: (value: number, record: InventoryItem) => (
        <div className="text-sm text-gray-900">{value} {record.unit}</div>
      )
    },
    {
      key: 'lastUpdated',
      title: 'LAST UPDATED',
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
          value === 'In Stock' 
            ? 'bg-green-100 text-green-800' 
            : value === 'Low Stock'
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
      data={items}
      columns={columns}
      loading={loading}
      onSort={onSort}
      sortConfig={sortConfig}
      onRowClick={onRowClick}
      pagination={pagination}
    />
  );
};

export default InventoryTable;