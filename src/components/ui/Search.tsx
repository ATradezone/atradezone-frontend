import React, { useState } from 'react';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  showFilter?: boolean;
  onFilterClick?: () => void;
  className?: string;
}

const Search: React.FC<SearchProps> = ({ 
  placeholder = "Search...", 
  onSearch,
  showFilter = false,
  onFilterClick,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchOutlined className="text-gray-400 w-5 h-5" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ border: '1px solid #E5E7EB', backgroundColor: '#f8fafd', borderRadius: '0.5rem' }}
      />
      {showFilter && onFilterClick && (
        <FilterOutlined 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
          onClick={onFilterClick}
        />
      )}
      <button 
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
};

export default Search;