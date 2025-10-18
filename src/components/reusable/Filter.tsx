import React, { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  options: FilterOption[];
  onFilterChange: (value: string) => void;
  defaultValue?: string;
  className?: string;
}

const Filter: React.FC<FilterProps> = ({ 
  options, 
  onFilterChange,
  defaultValue = "all",
  className = ""
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onFilterChange(value);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FilterOutlined className="text-gray-400 w-5 h-5" />
      </div>
      <AutoCompleteSelect
        value={selectedValue}
        onChange={handleChange}
        options={options}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      />
    </div>
  );
};

export default Filter;