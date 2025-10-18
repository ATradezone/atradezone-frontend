import React from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

interface Column<T> {
  key: string;
  title: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  className?: string;
  sortable?: boolean;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  onRowClick?: (record: T, index: number) => void;
  className?: string;
  sortConfig?: SortConfig | null;
  onSort?: (key: string) => void;
}

const DataTable = <T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  onRowClick,
  className = "",
  sortConfig = null,
  onSort
}: DataTableProps<T>) => {
  if (loading) {
    return (
      <div className="overflow-x-auto rounded-[17px]">
        <table className={`w-full ${className}`}>
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column, index) => (
                <th 
                  key={index}
                  scope="col" 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F2F2]">
            {Array.from({ length: 6 }, (_, index) => (
              <tr key={index} className="animate-pulse">
                {columns.map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap border-r border-[#F2F2F2]">
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[17px]">
      <table className={`w-full ${className}`}>
        <thead>
          <tr className="bg-[#F1F4F9]">
            {columns.map((column, index) => (
              <th 
                key={index}
                scope="col" 
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => column.sortable && onSort && onSort(column.key)}
              >
                <div className="flex items-center">
                  <span className="mr-2">{column.title}</span>
                  {column.sortable && sortConfig?.key === column.key && (
                    sortConfig.direction === 'asc' ? 
                    <CaretUpOutlined className="text-gray-500" /> : 
                    <CaretDownOutlined className="text-gray-500" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F2F2F2]">
          {data.map((record, rowIndex) => (
            <tr 
              key={record.id} 
              className={`hover:bg-gray-50 transition-colors duration-150 ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => onRowClick && onRowClick(record, rowIndex)}
            >
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex} 
                  className={`px-6 py-4 whitespace-nowrap border-r border-[#F2F2F2] ${column.className || ''}`}
                >
                  {column.render 
                    ? column.render((record as any)[column.key], record, rowIndex)
                    : (record as any)[column.key]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;