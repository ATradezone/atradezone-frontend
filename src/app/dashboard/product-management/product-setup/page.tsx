'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumb } from '@/components/reusable';
import { 
  ArrowLeftOutlined
} from '@ant-design/icons';
import ProductManagementSidebar from '../components/ProductManagementSidebar';
import ProductSetupPage from '../components/ProductSetupPage';
import ActionButtons from '@/components/reusable/ActionButtons';

const ProductSetupMainPage = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('basic-info');
  const [productData, setProductData] = useState({
    productName: '',
    category: ''
  });
  
  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Product Management', href: '/dashboard/product-management' },
    { name: 'Product Setup', href: '/dashboard/product-management/product-setup' }
  ];

  // Handle section change from sidebar
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    // Update the step in the main content
    const stepIndex = ['basic-info', 'stock-details', 'variants-addons'].indexOf(sectionId);
    if (stepIndex !== -1) {
      const event = new CustomEvent('stepChange', { detail: stepIndex });
      window.dispatchEvent(event);
    }
  };

  const handleStepChange = (stepId: string) => {
    setActiveSection(stepId);
  };

  // Handle product data updates from ProductSetupPage
  const handleProductDataChange = (data: { productName: string; category: string }) => {
    setProductData(data);
  };

  // Handle navigation to product listing
  const handleProductListing = () => {
    router.push('/dashboard/product-management');
  };

  // Handle go back action (to previous page)
  const handleGoBack = () => {
    router.push('/dashboard/product-management');
  };

  // Handle import functionality
  const handleImport = () => {
    // Placeholder for import functionality
    console.log('Import functionality triggered');
    // In a real implementation, this would open a file dialog or import wizard
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Setup</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} linkColor="rgb(17 24 39)" />
          </div>
        </div>
        
        {/* Icons Container */}
        <div className="flex items-center space-x-2">
          <ActionButtons 
            onImport={handleImport}
            importLabel="Import"
            className="mt-6"
          />

          <ActionButtons 
            onBack={handleGoBack}
            backLabel="Go Back"
            className="mt-6"
          />
        </div>
      </div>

      {/* Divider Line */}
      <div className="h-px bg-[#DDDDDD] mb-4 mx-1"></div>
      
      <div className="flex gap-6" >
        {/* Sticky Sidebar */}
        <div className="w-64 flex-shrink-0 sticky top-6 h-fit">
          <ProductManagementSidebar 
            activeSection={activeSection} 
            onSectionChange={handleSectionChange} 
            productData={productData}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <ProductSetupPage 
            onStepChange={handleStepChange} 
            onProductDataChange={handleProductDataChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSetupMainPage;