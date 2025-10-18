import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import StatCard from '@/components/ui/StatCard';
import { Input, AutoCompleteSelect } from '@/components/ui';
import Button from '@/components/ui/Button';
import { TagOutlined, FileTextOutlined, SkinOutlined, ApartmentOutlined } from '@ant-design/icons';

interface VariantOption {
  name: string;
  color?: string;
}

interface VariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (variantData: {
    type: string;
    name: string;
    values: string[];
  }) => void;
}

const VariantModal: React.FC<VariantModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    values: [] as string[],
    customValue: ''
  });
  const [customValues, setCustomValues] = useState<Array<{name: string, color?: string}>>([]);
  const [selectedColor, setSelectedColor] = useState('#000000');

  // Predefined variant options
  const predefinedVariants = [
    { 
      type: 'size', 
      name: 'Size', 
      values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] 
    },
    { 
      type: 'color', 
      name: 'Color', 
      values: [
        { name: 'Red', color: '#FF0000' },
        { name: 'Black', color: '#000000' },
        { name: 'Green', color: '#008000' },
        { name: 'Blue', color: '#0000FF' },
        { name: 'White', color: '#FFFFFF' },
        { name: 'Yellow', color: '#FFFF00' },
        { name: 'Purple', color: '#800080' },
        { name: 'Orange', color: '#FFA500' },
        { name: 'Pink', color: '#FFC0CB' },
        { name: 'Brown', color: '#A52A2A' }
      ] 
    },
    { 
      type: 'material', 
      name: 'Material', 
      values: ['Polyester', 'Wool', 'Cotton', 'Silk', 'Leather', 'Nylon', 'Denim', 'Linen'] 
    }
  ];

  const handleTypeChange = (value: string) => {
    const selectedType = value;
    setFormData(prev => ({
      ...prev,
      type: selectedType,
      name: selectedType ? predefinedVariants.find(v => v.type === selectedType)?.name || '' : '',
      values: selectedType ? [] : prev.values
    }));
    setCustomValues([]);
    setSelectedColor('#000000');
  };

  const handleValueChange = (value: string | { name: string; color?: string }, checked: boolean) => {
    const valueToAdd = typeof value === 'string' ? value : value.name;
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        values: [...prev.values, valueToAdd]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        values: prev.values.filter(v => v !== valueToAdd)
      }));
    }
  };

  const handleCustomValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      customValue: e.target.value
    }));
  };

  const addCustomValue = () => {
    if (formData.customValue.trim() && !customValues.some(v => v.name === formData.customValue.trim())) {
      const newCustomValue = { name: formData.customValue.trim() };
      setCustomValues(prev => [...prev, newCustomValue]);
      setFormData(prev => ({
        ...prev,
        values: [...prev.values, formData.customValue.trim()],
        customValue: ''
      }));
    }
  };

  const removeCustomValue = (value: string) => {
    setCustomValues(prev => prev.filter(v => v.name !== value));
    setFormData(prev => ({
      ...prev,
      values: prev.values.filter(v => v !== value)
    }));
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setSelectedColor(color);
    
    const colorName = `Custom Color ${customValues.filter(v => v.name.startsWith('Custom Color')).length + 1}`;
    const newCustomValue = { name: colorName, color: color };
    
    // Check if this color is already added
    if (!customValues.some(v => v.color === color)) {
      setCustomValues(prev => [...prev, newCustomValue]);
      setFormData(prev => ({
        ...prev,
        values: [...prev.values, colorName]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type || formData.name) {
      onSubmit({
        type: formData.type,
        name: formData.name || formData.type,
        values: formData.values
      });
      // Reset form
      setFormData({
        type: '',
        name: '',
        values: [],
        customValue: ''
      });
      setCustomValues([]);
      setSelectedColor('#000000');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const selectedVariant = predefinedVariants.find(v => v.type === formData.type);

  // Footer buttons
  const footer = (
    <div className="flex justify-between space-x-3">
      <Button
        variant="secondary"
        onClick={onClose}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        type="submit"
        disabled={formData.values.length === 0}
      >
        Add Variant
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Product Variant"
      subtitle="Define variant options for your product"
      onSubmit={handleSubmit}
      footer={footer}
      maxWidth="max-w-md" // Explicitly set the width
    >
      {/* Variant Type */}
      <StatCard 
        title="Variant Type"
        icon={<TagOutlined />}
        className="pr-5"
      >
        <AutoCompleteSelect
          label=""
          name="type"
          value={formData.type}
          onChange={handleTypeChange}
          options={[
            { value: '', label: 'Select variant type' },
            { value: 'size', label: 'Size' },
            { value: 'color', label: 'Color' },
            { value: 'material', label: 'Material' },
            { value: 'custom', label: 'Custom Type' }
          ]}
          required
          className="mt-2"
        />
      </StatCard>

      {/* Custom Type Name (only visible when custom type is selected) */}
      {formData.type === 'custom' && (
        <StatCard 
          title="Custom Variant Name"
          icon={<FileTextOutlined />}
          className="pr-5"
        >
          <Input
            label=""
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="Enter custom variant name (e.g., Style, Pattern)"
            required
          />
        </StatCard>
      )}

      {/* Predefined Values (only visible when a predefined type is selected) */}
      {selectedVariant && formData.type !== 'color' && (
        <StatCard 
          title={`${selectedVariant.name} Options`}
          icon={<SkinOutlined />}
          className="pr-5"
        >
          <div className="grid grid-cols-2 gap-2 mt-2" style={{ marginLeft: '3.3rem' }}>
            {selectedVariant.values.map((value) => {
              // Handle string values (size, material, etc.)
              const stringValue = value as string;
              return (
                <label key={stringValue} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.values.includes(stringValue)}
                    onChange={(e) => handleValueChange(stringValue, e.target.checked)}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm" style={{ color: '#7d7d7d' }}>
                    {stringValue}
                  </span>
                </label>
              );
            })}
          </div>
        </StatCard>
      )}

      {/* Color Options (only visible when color type is selected) */}
      {formData.type === 'color' && (
        <StatCard 
          title="Color Options"
          icon={<SkinOutlined />}
          className="pr-5"
        >
          <div className="grid grid-cols-2 gap-2 mt-2" style={{ marginLeft: '3.3rem' }}>
            {predefinedVariants.find(v => v.type === 'color')?.values.map((colorOption) => {
              if (typeof colorOption === 'object' && colorOption !== null && 'color' in colorOption) {
                const colorValue = colorOption as { name: string; color: string };
                return (
                  <label key={colorValue.name} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.values.includes(colorValue.name)}
                      onChange={(e) => handleValueChange(colorValue, e.target.checked)}
                      className="rounded text-green-600 focus:ring-green-500"
                    />
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300 mr-2" 
                        style={{ backgroundColor: colorValue.color }}
                      ></div>
                      <span 
                        className="text-sm" 
                        style={{ color: '#7d7d7d' }}
                      >
                        {colorValue.name}
                      </span>
                    </div>
                  </label>
                );
              }
              return null;
            })}
          </div>
        </StatCard>
      )}

      {/* Color Picker Section (only visible when color type is selected) */}
      {formData.type === 'color' && (
        <StatCard 
          title="Custom Color"
          icon={<ApartmentOutlined />}
          className="pr-5"
        >
          <div className="flex items-center mt-2" style={{ marginLeft: '3.3rem' }}>
            <input
              type="color"
              value={selectedColor}
              onChange={handleColorPickerChange}
              className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-600" style={{ color: '#7d7d7d' }}>Pick a custom color</span>
          </div>
          
          {/* Display selected custom colors */}
          {customValues.filter(v => v.color).length > 0 && (
            <div className="mt-3" style={{ marginLeft: '3.3rem' }}>
              <div className="text-sm font-medium text-gray-700 mb-1" style={{ color: '#7d7d7d' }}>Custom Colors:</div>
              <div className="flex flex-wrap gap-2">
                {customValues.filter(v => v.color).map((colorValue) => (
                  <div key={colorValue.name} className="flex items-center">
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-300 mr-2" 
                      style={{ backgroundColor: colorValue.color }}
                    ></div>
                    <span 
                      className="text-sm" 
                      style={{ color: '#7d7d7d' }}
                    >
                      {colorValue.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </StatCard>
      )}

      {/* Custom Values Section */}
      {formData.type === 'custom' && (
        <StatCard 
          title="Custom Values"
          icon={<ApartmentOutlined />}
          className="pr-5"
        >
          <div className="flex mt-2" style={{ marginLeft: '3.3rem' }}>
            <Input
              label=""
              name="customValue"
              value={formData.customValue}
              onChange={handleCustomValueChange}
              placeholder="Enter custom value"
              className="flex-1 mr-2"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={addCustomValue}
            >
              Add
            </Button>
          </div>
          
          {/* Display added custom values */}
          {customValues.length > 0 && (
            <div className="mt-3" style={{ marginLeft: '3.3rem' }}>
              <div className="text-sm font-medium text-gray-700 mb-1" style={{ color: '#7d7d7d' }}>Added Values:</div>
              <div className="flex flex-wrap gap-2">
                {customValues.map((value) => (
                  <div 
                    key={value.name} 
                    className="flex items-center rounded-full px-3 py-1 text-sm"
                    style={{
                      backgroundColor: '#ebfde5',
                      color: '#85ed68',
                      fontWeight: 'bold'
                    }}
                  >
                    {value.color && (
                      <div 
                        className="w-3 h-3 rounded-full border border-gray-300 mr-2" 
                        style={{ backgroundColor: value.color }}
                      ></div>
                    )}
                    <span style={{ color: '#7d7d7d' }}>{value.name}</span>
                    <button
                      type="button"
                      onClick={() => removeCustomValue(value.name)}
                      className="ml-2 text-green-800 hover:text-green-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </StatCard>
      )}
    </Modal>
  );
};

export default VariantModal;