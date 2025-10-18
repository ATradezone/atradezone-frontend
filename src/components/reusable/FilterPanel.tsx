import React from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Input } from '@/components/ui';
import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect';
import ActionButtons from '@/components/reusable/ActionButtons';
import Button from '@/components/ui/Button';

interface FilterField {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface FilterPanelProps<T extends Record<string, string>> {
  fields: FilterField[];
  onApply: (filters: T) => void;
  onClear: () => void;
  onClose?: () => void;
  filters: T;
  onFilterChange: <K extends keyof T>(key: K, value: string) => void;
}

const FilterPanel = <T extends Record<string, string>>({
  fields,
  onApply,
  onClear,
  onClose,
  filters,
  onFilterChange
}: FilterPanelProps<T>) => {
  const handleApply = () => {
    onApply(filters);
  };

  const handleClearAll = () => {
    onClear();
  };

  const handleCancel = () => {
    // Just close the panel without clearing filters
    if (onClose) {
      if (typeof onClose === 'function') {
        onClose();
      } else {
        console.warn('onClose prop is not a function:', typeof onClose);
      }
    }
  };

  return (
    <div className="rounded-lg p-4 mb-6 bg-gray-50" style={{ border: 'solid 1px #e6e7eb' }}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <FilterOutlined style={{ color: '#1f2937' }} />
          <h3 className="text-lg font-semibold text-gray-800">Quick Filters</h3>
        </div>
        <ActionButtons
          onReload={handleClearAll}
          reloadLabel="Clear all filters"
          className="!p-0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{field.label}</label>
            {field.type === 'select' ? (
              <AutoCompleteSelect
                value={filters[field.key as keyof T] || ''}
                onChange={(value) => onFilterChange(field.key as keyof T, value)}
                options={field.options || []}
              />
            ) : (
              <Input
                type={field.type}
                value={filters[field.key as keyof T] || ''}
                onChange={(e) => onFilterChange(field.key as keyof T, e.target.value)}
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button
          variant="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleApply}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;