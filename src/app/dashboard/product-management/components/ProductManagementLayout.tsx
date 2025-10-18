import React from 'react';
import { Breadcrumb } from '@/components/reusable';

interface ProductManagementLayoutProps {
  title: string;
  breadcrumbItems: { name: string; href?: string; current?: boolean }[];
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const ProductManagementLayout: React.FC<ProductManagementLayoutProps> = ({ 
  title, 
  breadcrumbItems, 
  children,
  actions
}) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Action Buttons */}
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>

      {/* Divider Line */}
      <div className="h-px bg-[#DDDDDD] mb-0 mx-1"></div>
      
      {/* Content */}
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
};

export default ProductManagementLayout;