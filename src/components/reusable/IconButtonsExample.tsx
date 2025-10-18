import React from 'react';
import IconButton from '@/components/ui/IconButton';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  DownloadOutlined, 
  UploadOutlined,
  SearchOutlined,
  FilterOutlined,
  CloseOutlined,
  CheckOutlined,
  SaveOutlined,
  CopyOutlined
} from '@ant-design/icons';

const IconButtonsExample = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Icon Buttons Example</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Primary Variant Buttons */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Primary Buttons</h3>
          <div className="flex flex-wrap gap-2">
            <IconButton 
              icon={<PlusOutlined />} 
              onClick={() => console.log('Add clicked')}
              ariaLabel="Add new item"
            />
            <IconButton 
              icon={<EditOutlined />} 
              variant="primary"
              onClick={() => console.log('Edit clicked')}
              ariaLabel="Edit item"
            />
            <IconButton 
              icon={<SaveOutlined />} 
              variant="primary"
              onClick={() => console.log('Save clicked')}
              ariaLabel="Save changes"
            />
          </div>
        </div>
        
        {/* Secondary Variant Buttons */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Secondary Buttons</h3>
          <div className="flex flex-wrap gap-2">
            <IconButton 
              icon={<EyeOutlined />} 
              variant="secondary"
              onClick={() => console.log('View clicked')}
              ariaLabel="View details"
            />
            <IconButton 
              icon={<DownloadOutlined />} 
              variant="secondary"
              onClick={() => console.log('Download clicked')}
              ariaLabel="Download file"
            />
            <IconButton 
              icon={<UploadOutlined />} 
              variant="secondary"
              onClick={() => console.log('Upload clicked')}
              ariaLabel="Upload file"
            />
          </div>
        </div>
        
        {/* Outline Variant Buttons */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Outline Buttons</h3>
          <div className="flex flex-wrap gap-2">
            <IconButton 
              icon={<SearchOutlined />} 
              variant="outline"
              onClick={() => console.log('Search clicked')}
              ariaLabel="Search"
            />
            <IconButton 
              icon={<FilterOutlined />} 
              variant="outline"
              onClick={() => console.log('Filter clicked')}
              ariaLabel="Filter results"
            />
            <IconButton 
              icon={<CopyOutlined />} 
              variant="outline"
              onClick={() => console.log('Copy clicked')}
              ariaLabel="Copy to clipboard"
            />
          </div>
        </div>
        
        {/* Ghost Variant Buttons */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Ghost Buttons</h3>
          <div className="flex flex-wrap gap-2">
            <IconButton 
              icon={<CheckOutlined />} 
              variant="ghost"
              onClick={() => console.log('Check clicked')}
              ariaLabel="Confirm"
            />
            <IconButton 
              icon={<CloseOutlined />} 
              variant="ghost"
              onClick={() => console.log('Close clicked')}
              ariaLabel="Close"
            />
            <IconButton 
              icon={<DeleteOutlined />} 
              variant="ghost"
              onClick={() => console.log('Delete clicked')}
              ariaLabel="Delete item"
            />
          </div>
        </div>
      </div>
      
      {/* Different Sizes */}
      <div className="mt-8">
        <h3 className="font-medium text-gray-700 mb-4">Different Sizes</h3>
        <div className="flex items-center gap-4">
          <IconButton 
            icon={<PlusOutlined />} 
            size="sm"
            onClick={() => console.log('Small add clicked')}
            ariaLabel="Add small item"
          />
          <IconButton 
            icon={<PlusOutlined />} 
            size="md"
            onClick={() => console.log('Medium add clicked')}
            ariaLabel="Add medium item"
          />
          <IconButton 
            icon={<PlusOutlined />} 
            size="lg"
            onClick={() => console.log('Large add clicked')}
            ariaLabel="Add large item"
          />
        </div>
      </div>
    </div>
  );
};

export default IconButtonsExample;