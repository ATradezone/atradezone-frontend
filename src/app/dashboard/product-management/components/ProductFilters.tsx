import React, { useState } from 'react';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect';

interface ProductFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
  searchTerm: string;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  onSearch, 
  onFilter,
  searchTerm
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-6 mr-0" style={{marginRight: '2.7rem' }}>
        <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search or filter products"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ border: '1px solid #E5E7EB', backgroundColor: '#f8fafd', borderRadius: '0.5rem' }}
        />
        
        <FilterOutlined 
          className="absolute right-[-1.7rem] top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        />
      </div>
      
      {/* Divider Line */}
      <div className="h-px bg-[#F2F2F2] mb-6 -mx-6"></div>
      
      {/* Filter Options - Collapsible */}
      {isFilterOpen && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Filter Options</h3>
          {/* Add filter options here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <AutoCompleteSelect 
                options={[
                  { value: '', label: 'All Categories' },
                  { value: 'electronics', label: 'Electronics' },
                  { value: 'clothing', label: 'Clothing' },
                  { value: 'home-garden', label: 'Home & Garden' }
                ]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <AutoCompleteSelect 
                options={[
                  { value: '', label: 'All Statuses' },
                  { value: 'in-stock', label: 'In Stock' },
                  { value: 'low-stock', label: 'Low Stock' },
                  { value: 'out-of-stock', label: 'Out of Stock' }
                ]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <AutoCompleteSelect 
                options={[
                  { value: '', label: 'All Prices' },
                  { value: 'under-50', label: 'Under $50' },
                  { value: '50-100', label: '$50 - $100' },
                  { value: '100-500', label: '$100 - $500' },
                  { value: 'over-500', label: 'Over $500' }
                ]}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-3">
            <button 
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={() => setIsFilterOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => {
                // Apply filters
                setIsFilterOpen(false);
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;