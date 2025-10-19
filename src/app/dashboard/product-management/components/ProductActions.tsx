import React from 'react';
import { PlusOutlined, DownloadOutlined, PrinterOutlined } from '@ant-design/icons';

interface ProductActionsProps {
  onAddNew: () => void;
  onDownload: () => void;
  onPrint: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ 
  onAddNew,
  onDownload,
  onPrint
}) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Add New Product Icon */}
      <div 
        className="h-8 w-8 rounded-[0.45rem] mr-0.5 flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
        style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
        onClick={onAddNew}
        title="Add new product"
      >
        <PlusOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
      </div>
      
      {/* Download Icon */}
      <div 
        className="h-8 w-8 rounded-[0.45rem] mr-0.5 flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
        style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
        onClick={onDownload}
        title="Download Report"
      >
        <DownloadOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
      </div>
      
      {/* Print Icon */}
      <div 
        className="h-8 w-8 rounded-[0.45rem] mr-0.5 flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
        style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
        onClick={onPrint}
        title="Print Report"
      >
        <PrinterOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
      </div>
    </div>
  );
};

export default ProductActions;