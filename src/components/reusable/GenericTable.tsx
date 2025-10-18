import React from 'react';
import { Table } from '@/components/reusable';

interface GenericTableProps<T extends { id: string | number }> {
  data: T[];
  columns: Array<{
    key: string;
    title: string;
    render?: (value: any, record: T, index: number) => React.ReactNode;
    className?: string;
    sortable?: boolean;
  }>;
  loading?: boolean;
  onRowClick?: (record: T, index: number) => void;
  sortConfig?: { key: string; direction: 'asc' | 'desc' } | null;
  onSort?: (key: string) => void;
  // Pagination props
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage?: number;
    totalItems?: number;
  };
  className?: string;
}

const GenericTable = <T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  onRowClick,
  sortConfig = null,
  onSort,
  pagination,
  className = ""
}: GenericTableProps<T>) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm ${className}`} style={{ paddingBottom: '1rem' }}>
      <div className="overflow-x-auto p-4">
        <Table 
          data={data}
          columns={columns}
          loading={loading}
          onRowClick={onRowClick}
          sortConfig={sortConfig}
          onSort={onSort}
        />
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="px-6 py-4 border-t border-[#F2F2F2] flex items-center justify-between bg-[#F1F4F9] rounded-b-xl"
             style={{
               borderRadius: '0px 0px 15px 15px',
               marginLeft: '20px',
               marginRight: '20px'
             }}>
          <div className="text-sm text-gray-600">
            {pagination.totalItems !== undefined && pagination.itemsPerPage !== undefined ? (
              `Showing ${((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to ${Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of ${pagination.totalItems} entries`
            ) : (
              `Showing ${((pagination.currentPage - 1) * 6) + 1} to ${Math.min(pagination.currentPage * 6, data.length)} of ${data.length} entries`
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className={`text-sm font-medium ${
                pagination.currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button 
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className={`text-sm font-medium ${
                pagination.currentPage === pagination.totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericTable;