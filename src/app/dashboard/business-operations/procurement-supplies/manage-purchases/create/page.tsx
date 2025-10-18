'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/reusable';
import { ArrowLeftOutlined, UnorderedListOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { PurchaseManagementSidebar, PurchaseForm } from './components';
import { Input, TextArea } from '@/components/ui';
import ActionButtons from '@/components/ui/ActionButtons';
import StatCard from '@/components/ui/StatCard';
import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect';
import IconButton from '@/components/ui/IconButton';
import ProductModal from '@/app/dashboard/product-management/components/ProductModal';
import Validation from '@/components/shared/Validation';
import CloseButton from '@/components/ui/CloseButton';
import { Button } from '@/components/ui';
import ConfirmationModal from '@/components/shared/ConfirmationModal';
import { SectionHeader } from '@/components/layout';

interface Product {
  id: string;
  name: string;
  image: string;
  availableQty: number;
  unitPrice: number;
  quantity: number;
}

const CreatePurchasePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [validationType, setValidationType] = useState<'success' | 'error'>('success');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();
  
  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Business Operations', href: '/dashboard/business-operations' },
    { name: 'Procurement & Supplies', href: '/dashboard/business-operations/procurement-supplies' },
    { name: 'Manage Purchases', href: '/dashboard/business-operations/procurement-supplies/manage-purchases' },
    { name: 'Create Purchase', current: true }
  ];

  // Form state for purchase information
  const [purchaseData, setPurchaseData] = useState({
    invoiceNumber: '',
    supplier: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    referenceNumber: '',
    expectedDeliveryDate: ''
  });

  // Form state for products
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'PUR-21',
      name: 'Amino Acid clo...',
      image: '/images/web-favicon.png',
      availableQty: 21,
      unitPrice: 590,
      quantity: 2,
    },
  ]);

  // Product options for autocomplete
  const productOptions = [
    { value: '', label: 'Select product' },
    { value: 'product1', label: 'Amino Acid clo...', image: '/images/web-favicon.png', availableQty: 21, unitPrice: 590 },
    { value: 'product2', label: 'Vitamin D3 Capsules', image: '/images/web-favicon.png', availableQty: 15, unitPrice: 1200 },
    { value: 'product3', label: 'Omega-3 Fish Oil', image: '/images/web-favicon.png', availableQty: 30, unitPrice: 2500 },
    { value: 'product4', label: 'Probiotic Complex', image: '/images/web-favicon.png', availableQty: 12, unitPrice: 3200 },
  ];

  // Form state for payment and notes
  const [paymentData, setPaymentData] = useState({
    paymentType: 'cash',
    receiptType: 'official',
    orderNote: '',
    purchaseStatus: 'confirmed',
    discount: 0,
    shipping: 0,
    orderTax: 0
  });

  // Warehouse options removed as warehouse input is no longer used
  /*
  const warehouseOptions = [
    { value: '', label: 'Select warehouse' },
    { value: 'warehouse1', label: 'Main Warehouse' },
    { value: 'warehouse2', label: 'Regional Warehouse' },
    { value: 'warehouse3', label: 'Distribution Center' }
  ];
  */

  // Supplier options
  const supplierOptions = [
    { value: '', label: 'Select supplier' },
    { value: 'supplier1', label: 'ABC Medical Supplies' },
    { value: 'supplier2', label: 'XYZ Pharmaceuticals' },
    { value: 'supplier3', label: 'Global Health Distributors' }
  ];

  // Payment type options
  const paymentTypeOptions = [
    { value: '', label: 'Select payment type' },
    { value: 'cash', label: 'Cash' },
    { value: 'credit', label: 'Credit' },
    { value: 'transfer', label: 'Bank Transfer' }
  ];

  // Receipt type options
  const receiptTypeOptions = [
    { value: '', label: 'Select receipt type' },
    { value: 'official', label: 'Official Receipt' },
    { value: 'proforma', label: 'Proforma Invoice' },
    { value: 'simple', label: 'Simple Receipt' }
  ];

  // Purchase status options
  const purchaseStatusOptions = [
    { value: '', label: 'Select purchase status' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'received', label: 'Received' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  // Steps configuration
  const steps = [
    { id: 'purchase-info', title: 'Purchase Information' },
    { id: 'product-selection', title: 'Select Products' },
    { id: 'payment-notes', title: 'Payment & Notes' }
  ];

  // Calculate totals
  const subtotal = products.reduce(
    (sum, p) => sum + p.quantity * p.unitPrice,
    0
  );
  const grandTotal = subtotal + paymentData.shipping + paymentData.orderTax - paymentData.discount;

  // Handle purchase info form input changes
  const handlePurchaseInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPurchaseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle autocomplete select changes
  const handleAutoCompleteChange = (name: string, value: string) => {
    setPurchaseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle payment form input changes
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: name === 'discount' || name === 'shipping' || name === 'orderTax' ? parseFloat(value) || 0 : value
    }));
  };

  // Function to add a new product from the modal
  const handleAddProductFromModal = (productData: {
    productName: string;
    category: string;
    taxType: string;
    salePrice: string;
    purchaseCost: string;
  }) => {
    setProducts([
      {
        id: `PUR-${Math.floor(Math.random() * 1000)}`,
        name: productData.productName,
        image: '/images/web-favicon.png', // Default image
        availableQty: 10, // Default quantity
        unitPrice: parseFloat(productData.salePrice) || 0,
        quantity: 1, // Default quantity
      },
      ...products,
    ]);
  };

  // Add new product
  const addProduct = () => {
    setProducts([
      {
        id: `PUR-${Math.floor(Math.random() * 1000)}`,
        name: 'New Product',
        image: '/images/web-favicon.png',
        availableQty: 10,
        unitPrice: 100,
        quantity: 1,
      },
      ...products,
    ]);
  };

  // Update product quantity
  const updateQuantity = (index: number, delta: number) => {
    const updated = [...products];
    updated[index].quantity = Math.max(1, updated[index].quantity + delta);
    setProducts(updated);
  };

  // Remove product
  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Handle form submission for purchase info
  const handlePurchaseInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Purchase info data submitted:', purchaseData);
    // Move to next step (product selection)
    setActiveStep(1);
  };

  // Handle form submission for product selection
  const handleProductSelectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Products data submitted:', products);
    // Move to next step (payment notes)
    setActiveStep(2);
  };

  // Handle form submission for payment and notes
  const handlePaymentNotesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment data submitted:', paymentData);
    setValidationMessage('Purchase created successfully!');
    setValidationType('success');
    setShowValidation(true);
    // Reset to first step
    setActiveStep(0);
    router.push('/dashboard/business-operations/procurement-supplies/manage-purchases/create');
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Handle next step
  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  // Handle purchase confirmation
  const handleConfirmPurchase = () => {
    setShowConfirmModal(false);
    handlePaymentNotesSubmit(new Event('submit') as unknown as React.FormEvent);
  };

  // Render step content based on active step
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="flex flex-col h-full">
            <div id="purchase-info" className="space-y-6 flex-grow">
              {/* Purchase Information Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <SectionHeader title="PURCHASE INFORMATION" showDivider />
                <div className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                      <Input
                        label="Invoice Number"
                        name="invoiceNumber"
                        value={purchaseData.invoiceNumber}
                        onChange={handlePurchaseInfoChange}
                        placeholder="Enter invoice number"
                      />
                      <p className="mt-1 text-xs text-green-600" style={{ fontSize: '0.8rem' }}>Leave it blank to generate automatically</p>
                    </div>
                    
                    <div className="flex flex-col">
                      <AutoCompleteSelect
                        label="Supplier"
                        name="supplier"
                        value={purchaseData.supplier}
                        onChange={(value) => handleAutoCompleteChange('supplier', value)}
                        options={supplierOptions}
                        placeholder="Select Supplier"
                        swapActionButtonPosition={true}
                        actionButton={{
                          icon: <PlusOutlined className="text-gray-500" />,
                          onClick: () => console.log('Add new supplier')
                        }}
                      />
                    </div>
                    
                    {/* Warehouse input removed as requested */}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                      <Input
                        label="Purchase Date"
                        name="purchaseDate"
                        type="date"
                        value={purchaseData.purchaseDate}
                        onChange={handlePurchaseInfoChange}
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <Input
                        label="Est. Date"
                        name="expectedDeliveryDate"
                        type="date"
                        value={purchaseData.expectedDeliveryDate}
                        onChange={handlePurchaseInfoChange}
                      />
                    </div>
                    <div className="flex flex-col z-20">
                      <AutoCompleteSelect
                        label="Purchase Status"
                        value={paymentData.purchaseStatus}
                        onChange={(value) => handlePaymentChange({ target: { name: 'purchaseStatus', value } } as any)}
                        options={purchaseStatusOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm sticky bottom-0 z-10 mt-4">
              <div className="flex justify-end">
                <Button
                  type="submit"
                  onClick={(e) => handlePurchaseInfoSubmit(e as React.FormEvent)}
                  variant="primary"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col h-full">
            <div id="product-selection" className="space-y-6 flex-grow">
              <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                <SectionHeader title="SELECT PRODUCT(S)" showDivider />
                <form onSubmit={handleProductSelectionSubmit} className="space-y-6">
                  <div className="mb-4">
                    <AutoCompleteSelect
                      label="Product"
                      name="product"
                      value=""
                      onChange={(value) => {
                        // Find the selected product from options
                        const selectedProduct = productOptions.find(option => option.value === value);
                        if (selectedProduct && selectedProduct.value !== '') {
                          // Add the product to the beginning of products array
                          setProducts([
                            {
                              id: `PUR-${Math.floor(Math.random() * 1000)}`,
                              name: selectedProduct.label,
                              image: selectedProduct.image || '/images/web-favicon.png',
                              availableQty: selectedProduct.availableQty || 0,
                              unitPrice: selectedProduct.unitPrice || 0,
                              quantity: 1,
                            },
                            ...products
                          ]);
                        }
                      }}
                      options={productOptions}
                      placeholder="Search product name/ Item Code/ Scan bar code"
                      swapActionButtonPosition={true}
                      actionButton={{
                        icon: <PlusOutlined className="text-gray-500" />,
                        onClick: () => setIsCreateProductModalOpen(true)
                      }}
                    />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/12">NAME</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">QUANTITY</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">UNIT PRICE</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">SUBTOTAL</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[...products].reverse().map((product, index) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <img src={product.image} alt="Product" className="h-8 w-8 rounded mr-2" />
                                <div>
                                  <div className="font-medium text-gray-900">{product.name}</div>
                                  <div className="text-xs text-green-600">Avl. qty: {product.availableQty}Bottle</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(products.length - 1 - index, -1)}
                                  className="px-2 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100"
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  value={product.quantity}
                                  onChange={(e) => {
                                    const val = e.target.value ? parseInt(e.target.value) : 1;
                                    const updated = [...products];
                                    updated[products.length - 1 - index].quantity = val;
                                    setProducts(updated);
                                  }}
                                  className="w-16 px-2 py-1 border-t border-b border-gray-300 text-center"
                                />
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(products.length - 1 - index, 1)}
                                  className="px-2 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.unitPrice} Frw</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {(product.quantity * product.unitPrice).toFixed(2)} Frw
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <ActionButtons 
                                onEdit={() => console.log('Edit product')}
                                onDelete={() => removeProduct(products.length - 1 - index)}
                                iconOnly={true}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Moved SubTotal and Grand Total below the products table */}
                  <div className="mt-4 pt-4 flex justify-end sticky bottom-20 bg-white z-10 pb-4 border-t border-gray-200 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <div className="text-right w-full max-w-xs">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-900">SubTotal </span>
                        <span className="text-gray-900">{subtotal.toFixed(2)} Frw</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-900">Grand Total </span>
                        <span className="text-gray-900">{grandTotal.toFixed(2)} Frw</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm sticky bottom-0 z-10 mt-0">
              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  onClick={handlePrevStep}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  onClick={(e) => handleProductSelectionSubmit(e as React.FormEvent)}
                  variant="primary"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        );
    case 2:
      return (
        <div className="flex flex-col h-full">
          <div id="payment-notes" className="space-y-6 flex-grow">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <SectionHeader title="ORDER NOTE" showDivider />
                <div className="space-y-6">
                  <div className="flex flex-col">
                    <AutoCompleteSelect
                      label="Receipt Type"
                      value={paymentData.receiptType}
                      onChange={(value) => handlePaymentChange({ target: { name: 'receiptType', value } } as any)}
                      options={receiptTypeOptions}
                    />
                  </div>
                  {/* Added Payment Type input here, below Receipt Type */}
                  <div className="flex flex-col">
                    <AutoCompleteSelect
                      label="Payment Type"
                      value={paymentData.paymentType}
                      onChange={(value) => handlePaymentChange({ target: { name: 'paymentType', value } } as any)}
                      options={paymentTypeOptions}
                    />
                  </div>
                  <div className="flex flex-col">
                    <TextArea
                      label="Order Note"
                      name="orderNote"
                      value={paymentData.orderNote}
                      onChange={handlePaymentChange}
                      placeholder="Order Note"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <SectionHeader title="PAYMENT SUMMARY" showDivider />
                <div className="space-y-6">
                  <div className="space-y-3">
                    <StatCard 
                      title="Order Tax" 
                      value={`${paymentData.orderTax.toFixed(2)} Frw`} 
                      className="p-3"
                    />
                    <StatCard 
                      title="Grand Total" 
                      value={`${grandTotal.toFixed(2)} Frw`} 
                      className="p-3 bg-[#F0FDF4] border border-[#BBF7D0]"
                    />
                    
                    {/* Moved Discount and Shipping fields below Grand Total */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex flex-col">
                        <Input
                          label="Discount"
                          name="discount"
                          type="number"
                          value={paymentData.discount.toString()}
                          onChange={handlePaymentChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <Input
                          label="Shipping"
                          name="shipping"
                          type="number"
                          value={paymentData.shipping.toString()}
                          onChange={handlePaymentChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm sticky bottom-0 z-10 mt-4">
            <div className="flex justify-between">
              <Button
                variant="secondary"
                onClick={handlePrevStep}
              >
                Back
              </Button>
              <Button
                onClick={() => setShowConfirmModal(true)}
                variant="primary"
              >
                Create Purchase
              </Button>
            </div>
          </div>
        </div>
      );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {showValidation && (
        <Validation
          message={validationMessage}
          type={validationType}
          duration={5000}
          onClose={() => setShowValidation(false)}
        />
      )}
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmPurchase}
        title="Confirm Purchase"
        message="This action is irreversible.<br />Are you sure you want to create this purchase?"
        confirmText="Confirm Purchase"
        cancelText="Cancel"
        itemsCount={products.length}
        grandTotal={grandTotal}
      />
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create Purchase</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Icons Container */}
        <div className="flex items-center space-x-2">
          {/* Listing Icon */}
          <div 
            className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
            onClick={() => router.push('/dashboard/business-operations/procurement-supplies/manage-purchases')}
            title="Purchase listing"
          >
            <UnorderedListOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
          </div>
          
          {/* Go Back Icon */}
          <div 
            className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
            title="Go Back"
            onClick={() => router.push('/dashboard/business-operations/procurement-supplies/manage-purchases')}
          >
            <ArrowLeftOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="h-px bg-[#DDDDDD] my-6 mx-1" style={{ marginTop: '0rem' }}></div>
      
      <div className="flex h-fit bg-gray-50 rounded-xl" style={{ marginTop: '-1rem' }}>
        {/* Sidebar */}
        <div className="w-50 bg-white border-r border-gray-200 p-33 rounded-xl h-fit sticky top-20 mt-4">
          <PurchaseManagementSidebar 
            activeSection={steps[activeStep].id} 
            onSectionChange={(sectionId: string) => {
              const stepIndex = steps.findIndex(step => step.id === sectionId);
              if (stepIndex !== -1) setActiveStep(stepIndex);
            }} 
            totalItems={products.length}
            grandTotal={grandTotal}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-0.3 rounded-r-xl mt-0" style={{marginLeft: '1.5rem' }}>
          <PurchaseForm steps={steps} activeStep={activeStep} />
          
          {/* Step Content */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {renderStepContent()}
          </div>
        </div>
      </div>
      
      {/* Create Product Modal */}
      <ProductModal
        isOpen={isCreateProductModalOpen}
        onClose={() => setIsCreateProductModalOpen(false)}
        onSubmit={handleAddProductFromModal}
      />
    </div>
  );
};

export default CreatePurchasePage;