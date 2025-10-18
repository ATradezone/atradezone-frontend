'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { StatCard, Input, TextArea, Button } from '@/components/ui';
import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect';
import countryData from '@/data/countries.json';
import VariantModal from '@/app/dashboard/product-management/components/VariantModal';
import Feedback from '@/components/shared/Feedback';
import { Validation } from '@/components/shared';
import JsBarcode from 'jsbarcode';

const ProductSetupPage = ({ 
  onStepChange,
  onProductDataChange
}: { 
  onStepChange?: (stepId: string) => void;
  onProductDataChange?: (data: { productName: string; category: string }) => void;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showValidator, setShowValidator] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [validatorMessage, setValidatorMessage] = useState('');
  const [feedbackMode, setFeedbackMode] = useState<'live' | 'test'>('test');
  const [validatorType, setValidatorType] = useState<'success' | 'error'>('error');
  const barcodeRef = useRef(null);
  
  // Form state for basic info & pricing
  const [basicInfoData, setBasicInfoData] = useState({
    productName: '',
    category: '',
    taxType: 'no-tax-d',
    itemType: 'Finished Product',
    salePrice: '',
    purchaseCost: '',
    barcode: ''
  });

  // Form state for variants & addons
  const [variantsData, setVariantsData] = useState({
    variants: [] as any[],
    addons: [] as any[],
    rawMaterials: [] as any[]
  });

  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);

  // Form state for stock & details
  const [stockData, setStockData] = useState({
    unit: 'item',
    package: 'net',
    countryOfOrigin: 'Rwanda',
    minimumStockAlert: '',
    currentStock: '',
    notes: '',
    image: null as File | null,
    productClassification: 'consumable',
    expirationDate: '',
    insurance: 'yes'
  });

  // Steps configuration
  const steps = [
    { id: 'basic-info', title: 'Basic Info & Pricing' },
    { id: 'stock-details', title: 'Stock & Details' },
    { id: 'barcode-other', title: 'Barcode & Other Info' },
    { id: 'variants-addons', title: 'Variants & Addons' }
  ];

  // Listen for step change events from the parent
  useEffect(() => {
    const handleStepChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setActiveStep(customEvent.detail);
    };

    window.addEventListener('stepChange', handleStepChange);
    return () => {
      window.removeEventListener('stepChange', handleStepChange);
    };
  }, []);

  // Generate barcode when barcode value changes
  useEffect(() => {
    if (barcodeRef.current && basicInfoData.barcode) {
      try {
        // Validate barcode format before rendering
        const barcodeValue = basicInfoData.barcode.trim();
        
        // Check if barcode is empty
        if (!barcodeValue) {
          return;
        }
        
        // Validate EAN-13 format (13 digits)
        if (barcodeValue.length === 13 && /^\d+$/.test(barcodeValue)) {
          // Validate checksum
          let sum = 0;
          for (let i = 0; i < 12; i++) {
            const digit = parseInt(barcodeValue[i]);
            sum += digit * (i % 2 === 0 ? 1 : 3);
          }
          const checksum = (10 - (sum % 10)) % 10;
          if (parseInt(barcodeValue[12]) !== checksum) {
            throw new Error('Invalid EAN-13 checksum');
          }
        }
        
        // Try to render the barcode with explicit EAN-13 format
        JsBarcode(barcodeRef.current, barcodeValue, {
          format: 'EAN13',
          displayValue: true,
          width: 2,
          height: 40,
          margin: 10,
          fontSize: 12
        });
        
        // Clear any previous validation errors if barcode is valid
        if (showValidator) {
          setShowValidator(false);
        }
      } catch (error) {
        console.error('Barcode generation error:', error);
        setValidatorMessage('Invalid barcode format: ' + (error as Error).message);
        setValidatorType('error');
        setShowValidator(true);
      }
    }
  }, [basicInfoData.barcode]);

  // Handle basic info form input changes
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Prevent negative values for numeric fields
    if (name === 'salePrice' || name === 'purchaseCost') {
      const numValue = parseFloat(value);
      if (numValue < 0) return; // Don't update state if negative
    }
    
    setBasicInfoData((prev: typeof basicInfoData) => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Notify parent component of product data changes
      if (onProductDataChange && (name === 'productName' || name === 'category')) {
        onProductDataChange({
          productName: name === 'productName' ? value : newData.productName,
          category: name === 'category' ? value : newData.category
        });
      }
      
      return newData;
    });
  };

  // Handle stock form input changes
  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Prevent negative values for numeric fields
    if (name === 'currentStock' || name === 'minimumStockAlert') {
      const numValue = parseFloat(value);
      if (numValue < 0) return; // Don't update state if negative
    }
    
    setStockData((prev: typeof stockData) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setStockData(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  const handleAddVariant = (variantData: { type: string; name: string; values: string[] }) => {
    setVariantsData(prev => ({
      ...prev,
      variants: [...prev.variants, variantData]
    }));
    setIsVariantModalOpen(false);
  };

  // Handle form submission for basic info
  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that Sale Price is greater than Purchase Cost
    const salePrice = parseFloat(basicInfoData.salePrice);
    const purchaseCost = parseFloat(basicInfoData.purchaseCost);
    
    if (!isNaN(salePrice) && !isNaN(purchaseCost) && salePrice <= purchaseCost) {
      setValidatorMessage('Sale Price must be greater than Purchase Cost');
      setValidatorType('error');
      setShowValidator(true);
      return;
    }
    
    // Show success message
    setValidatorMessage('Basic info data submitted successfully');
    setValidatorType('success');
    setShowValidator(true);
    
    onProductDataChange?.({
      productName: basicInfoData.productName,
      category: basicInfoData.category,
    });
    // Move to next step (Stock & Details)
    setActiveStep(1);
    onStepChange?.(steps[1].id);
  };

  // Handle form submission for stock & details
  const handleStockDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that Safety Stock is not less than zero and not greater than Current Stock
    const currentStock = parseFloat(stockData.currentStock);
    const safetyStock = parseFloat(stockData.minimumStockAlert);
    
    if (!isNaN(safetyStock) && safetyStock < 0) {
      setValidatorMessage('Safety Stock cannot be less than zero');
      setValidatorType('error');
      setShowValidator(true);
      return;
    }
    
    if (!isNaN(currentStock) && !isNaN(safetyStock) && safetyStock > currentStock) {
      setValidatorMessage('Safety Stock cannot be greater than Current Stock');
      setValidatorType('error');
      setShowValidator(true);
      return;
    }
    
    // Show success message
    setValidatorMessage('Stock & details data submitted successfully');
    setValidatorType('success');
    setShowValidator(true);
    
    // Move to next step (Barcode & Other Info)
    setActiveStep(2);
    onStepChange?.(steps[2].id);
  };

  // Handle form submission for barcode & other info
  const handleBarcodeOtherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Move to next step (Variants & Addons)
    setActiveStep(3);
    onStepChange?.(steps[3].id);
  };

  // Handle form submission for variants & addons
  const handleVariantsAddonsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success message using Feedback for the final completion
    setFeedbackMessage('Product setup completed successfully!');
    setFeedbackMode('live');
    setShowFeedback(true);
    
    // Reset to first step
    setActiveStep(0);
    onStepChange?.(steps[0].id);
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      onStepChange?.(steps[activeStep - 1].id);
    }
  };

  // Handle next step
  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      onStepChange?.(steps[activeStep + 1].id);
    }
  };

  // Generate EAN-13 barcode
  const generateEAN13 = () => {
    // Generate a proper EAN-13 barcode with checksum
    // EAN-13 must be 12 digits + 1 checksum digit
    let barcode = '';
    for (let i = 0; i < 12; i++) {
      barcode += Math.floor(Math.random() * 10);
    }
    
    // Calculate checksum for EAN-13
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(barcode[i]);
      sum += digit * (i % 2 === 0 ? 1 : 3);
    }
    const checksum = (10 - (sum % 10)) % 10;
    barcode += checksum;
    
    console.log('Generated EAN-13 barcode:', barcode);
    
    // Set the barcode and clear any previous validation errors
    setBasicInfoData(prev => ({
      ...prev,
      barcode: barcode
    }));
    
    // Hide any existing validator messages
    if (showValidator) {
      setShowValidator(false);
    }
  };

  // Print barcode
  const printBarcode = () => {
    window.print();
  };

  // Render step content based on active step
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div id="basic-info" className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                <h2 className="text-lg font-semibold text-gray-800">BASIC INFORMATION</h2>
              </div>
              {/* Full-width divider */}
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col"   >
                  <Input
                    label="Product Name"
                    type="text"
                    name="productName"
                    value={basicInfoData.productName}
                    onChange={handleBasicInfoChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <AutoCompleteSelect
                    label="Category"
                    name="category"
                    value={basicInfoData.category}
                    onChange={(value) => handleBasicInfoChange({ target: { name: 'category', value } } as React.ChangeEvent<HTMLSelectElement>)}
                    options={[
                      { value: '', label: 'Select category' },
                      { value: 'electronics', label: 'Electronics' },
                      { value: 'clothing', label: 'Clothing' },
                      { value: 'home', label: 'Home & Garden' },
                      { value: 'books', label: 'Books' },
                      { value: 'health', label: 'Health & Beauty' }
                    ]}
                    placeholder="Select category"
                    swapActionButtonPosition={true}
                    actionButton={{
                      icon: <PlusOutlined className="text-gray-500" />,
                      onClick: () => console.log('Add new category')
                    }}
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <AutoCompleteSelect
                    label="Tax Type"
                    name="taxType"
                    value={basicInfoData.taxType}
                    onChange={(value) => handleBasicInfoChange({ target: { name: 'taxType', value } } as React.ChangeEvent<HTMLSelectElement>)}
                    options={[
                      { value: '', label: 'Select tax type' },
                      { value: 'vat', label: 'Tax Type A - EX' },
                      { value: 'sales-tax', label: 'Tax Type B - 18%' },
                      { value: 'no-tax-c', label: 'Tax Type C' },
                      { value: 'no-tax-d', label: 'Tax Type D' }
                    ]}
                    placeholder="Select tax type"
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <AutoCompleteSelect
                    label="Item Type"
                    name="itemType"
                    value={basicInfoData.itemType}
                    onChange={(value) => handleBasicInfoChange({ target: { name: 'itemType', value } } as React.ChangeEvent<HTMLSelectElement>)}
                    options={[
                      { value: 'Service', label: 'Service' },
                      { value: 'Raw Material', label: 'Raw Material' },
                      { value: 'Finished Product', label: 'Finished Product' }
                    ]}
                    placeholder="Select item type"
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <Input
                    label="Sale Price"
                    type="number"
                    name="salePrice"
                    value={basicInfoData.salePrice}
                    onChange={handleBasicInfoChange}
                    placeholder="Enter sale price"
                    min="0"
                    required
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <Input
                    label="Purchase Cost"
                    type="number"
                    name="purchaseCost"
                    value={basicInfoData.purchaseCost}
                    onChange={handleBasicInfoChange}
                    placeholder="Enter purchase cost"
                    min="0"
                    required
                  />
                </div>
              </div>
              
              {/* Continue button inside the BASIC INFORMATION section */}
              <div className="flex justify-end mt-6">
                <Button
                  variant="primary"
                  onClick={() => handleBasicInfoSubmit(new Event('submit') as unknown as React.FormEvent)}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div id="stock-details" className="space-y-6">
            {/* Inventory Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                <h2 className="text-lg font-semibold text-gray-800">INVENTORY</h2>
              </div>
              {/* Full-width divider */}
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col"   >
                  <AutoCompleteSelect
                    label="Unit"
                    name="unit"
                    value={stockData.unit}
                    onChange={(value) => handleStockChange({ target: { name: 'unit', value } } as React.ChangeEvent<HTMLInputElement>)}
                    options={[
                      { value: 'item', label: 'Item' },
                      { value: 'piece', label: 'Piece' },
                      { value: 'kg', label: 'Kilogram' },
                      { value: 'g', label: 'Gram' },
                      { value: 'lb', label: 'Pound' },
                      { value: 'm', label: 'Meter' },
                      { value: 'cm', label: 'Centimeter' },
                      { value: 'liter', label: 'Liter' },
                      { value: 'ml', label: 'Milliliter' }
                    ]}
                    placeholder="Select unit"
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <AutoCompleteSelect
                    label="Package"
                    name="package"
                    value={stockData.package}
                    onChange={(value) => handleStockChange({ target: { name: 'package', value } } as React.ChangeEvent<HTMLInputElement>)}
                    options={[
                      { value: 'box', label: 'Box' },
                      { value: 'carton', label: 'Carton' },
                      { value: 'pack', label: 'Pack' },
                      { value: 'bundle', label: 'Bundle' },
                      { value: 'case', label: 'Case' },
                      { value: 'pallet', label: 'Pallet' },
                      { value: 'drum', label: 'Drum' },
                      { value: 'container', label: 'Container' },
                      { value: 'net', label: 'Net' }
                    ]}
                    placeholder="Select package"
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <AutoCompleteSelect
                    label="Item Classification"
                    name="productClassification"
                    value={stockData.productClassification || ''}
                    onChange={(value) => handleStockChange({ target: { name: 'productClassification', value } } as React.ChangeEvent<HTMLInputElement>)}
                    options={[
                      { value: '', label: 'Select classification' },
                      { value: 'raw-material', label: 'Raw Material' },
                      { value: 'finished-goods', label: 'Finished Goods' },
                      { value: 'work-in-progress', label: 'Work in Progress' },
                      { value: 'consumable', label: 'Consumable' },
                      { value: 'service', label: 'Service' },
                      { value: 'component', label: 'Component' },
                      { value: 'sub-assembly', label: 'Sub-Assembly' }
                    ]}
                    placeholder="Select item classification"
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <AutoCompleteSelect
                    label="Country of Origin"
                    name="countryOfOrigin"
                    value={stockData.countryOfOrigin}
                    onChange={(value) => handleStockChange({ target: { name: 'countryOfOrigin', value } } as React.ChangeEvent<HTMLInputElement>)}
                    options={countryData}
                    placeholder="Select country of origin"
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <Input
                    label="Current Stock"
                    type="number"
                    name="currentStock"
                    value={stockData.currentStock}
                    onChange={handleStockChange}
                    placeholder="Enter current stock"
                    min="0"
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <Input
                    label="Safety Stock"
                    type="number"
                    name="minimumStockAlert"
                    value={stockData.minimumStockAlert}
                    onChange={handleStockChange}
                    placeholder="Enter safety stock level"
                    min="0"
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <Input
                    label="Expiration Date"
                    type="date"
                    name="expirationDate"
                    value={stockData.expirationDate}
                    onChange={handleStockChange}
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <AutoCompleteSelect
                    label="Insurance"
                    name="insurance"
                    value={stockData.insurance}
                    onChange={(value) => handleStockChange({ target: { name: 'insurance', value } } as React.ChangeEvent<HTMLInputElement>)}
                    options={[
                      { value: '', label: 'Select option' },
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' }
                    ]}
                    placeholder="Select insurance option"
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button
                  variant="secondary"
                  onClick={handlePrevStep}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleStockDetailsSubmit(new Event('submit') as unknown as React.FormEvent)}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div id="barcode-other" className="space-y-6">
            {/* Barcode Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                <h2 className="text-lg font-semibold text-gray-800">BARCODE</h2>
              </div>
              {/* Full-width divider */}
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              
              <div className="flex flex-col mb-4">
                <Input
                  label="Enter barcode (13 digits for EAN-13 or other valid formats)"
                  type="text"
                  name="barcode"
                  value={basicInfoData.barcode}
                  onChange={handleBasicInfoChange}
                  placeholder="e.g. 5901234123457 (EAN-13) or ABC123DEF456"
                />
              </div>
              
              {/* Barcode Preview */}
              {basicInfoData.barcode && (
                <div className="flex flex-col items-center mb-4">
                  <svg ref={barcodeRef} className="mb-2 w-full"></svg>
                  <p className="text-sm text-gray-600">Barcode: {basicInfoData.barcode}</p>
                </div>
              )}
              
              <div className="flex justify-center space-x-4 mb-4">
                <Button
                  variant="primary"
                  onClick={generateEAN13}
                >
                  Generate EAN-13
                </Button>
                <Button
                  variant="secondary"
                  onClick={printBarcode}
                >
                  Print
                </Button>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 text-center">
                Tip: You can simply focus the input and scan with your USB/Bluetooth handheld scanner.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 text-center">
                  Enter your own barcode (letters/digits) or use a hardware scanner (keyboard wedge). 
                  All-zero values are not allowed. EAN-13 preview appears when valid.
                </p>
              </div>
            </div>
            
            {/* Other Information Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                <h2 className="text-lg font-semibold text-gray-800">PRODUCT IMAGE</h2>
              </div>
              {/* Full-width divider */}
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Item Picture</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <PlusOutlined className="text-2xl text-gray-400 mb-2" />
                      <p className="text-gray-600">Upload image</p>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="text-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                </div>
                <TextArea
                  name="notes"
                  value={stockData.notes}
                  onChange={handleStockChange}
                  placeholder="Additional notes about this product... Add any relevant notes regarding this item."
                  rows={4}
                />
              </div>
              
              <div className="flex justify-between mt-6">
                <Button
                  variant="secondary"
                  onClick={handlePrevStep}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleBarcodeOtherSubmit(new Event('submit') as unknown as React.FormEvent)}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div id="variants-addons" className="space-y-6">
            {/* Variants Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                <h2 className="text-lg font-semibold text-gray-800">VARIANTS</h2>
              </div>
              {/* Full-width divider */}
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              
              {variantsData.variants.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No variants added yet. Add variants for products with different sizes, colors, etc.</p>
                  <Button
                    variant="primary"
                    onClick={() => setIsVariantModalOpen(true)}
                  >
                    Add Variant
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {variantsData.variants.map((variant, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-800">{variant.name}</h3>
                        <span className="text-sm text-gray-500">{variant.type}</span>
                      </div>
                      <div className="mt-2">
                        <div className="text-sm text-gray-600">Values:</div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {variant.values.map((value: string, valueIndex: number) => (
                            <span key={valueIndex} className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                              {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="primary"
                    onClick={() => setIsVariantModalOpen(true)}
                  >
                    Add Another Variant
                  </Button>
                </div>
              )}
            </div>
            
            {/* Addons Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                <h2 className="text-lg font-semibold text-gray-800">ADDONS</h2>
              </div>
              {/* Full-width divider */}
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              
              {variantsData.addons.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No addons added yet. Add optional addons for this product.</p>
                  <Button
                    variant="primary"
                  >
                    Add Addon
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Addon list would go here */}
                  <p>Addon list placeholder</p>
                </div>
              )}
            </div>
            
            {/* Raw Materials Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                <h2 className="text-lg font-semibold text-gray-800">RAW MATERIALS</h2>
              </div>
              {/* Full-width divider */}
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              
              {variantsData.rawMaterials.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No raw materials added yet. Add materials required for this product.</p>
                  <Button
                    variant="primary"
                  >
                    Add Raw Material
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Raw material list would go here */}
                  <p>Raw material list placeholder</p>
                </div>
              )}
              
              <div className="flex justify-between mt-6">
                <Button
                  variant="secondary"
                  onClick={handlePrevStep}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleVariantsAddonsSubmit(new Event('submit') as unknown as React.FormEvent)}
                >
                  Complete Setup
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
    <div className="flex h-fit bg-gray-50 rounded-xl">
      {/* Feedback Component for success messages */}
      {showFeedback && (
        <Feedback 
          message={feedbackMessage} 
          description={feedbackMessage}
          mode={feedbackMode} 
          onClose={() => setShowFeedback(false)} 
        />
      )}
      
      {/* Validation Component for validation messages */}
      {showValidator && (
        <Validation 
          message={validatorMessage} 
          description={validatorMessage}
          type={validatorType} 
          onClose={() => setShowValidator(false)} 
        />
      )}
      
      {/* Variant Modal */}
      <VariantModal
        isOpen={isVariantModalOpen}
        onClose={() => setIsVariantModalOpen(false)}
        onSubmit={handleAddVariant}
      />
      
      {/* Main Content */}
      <div className="flex-1 p-0 overflow-y-auto rounded-r-xl">
        {/* Stepper */}
        <div className="mb-6" style={{ backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity, 1))', borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem', marginBottom: '1.5rem', padding: '10px'}}>
          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
            <div 
              className="absolute top-4 left-0 h-0.5 bg-[rgb(133,237,104)] z-10 transition-all duration-300"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center z-20">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    index <= activeStep 
                      ? 'bg-[rgb(133,237,104)] text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index < activeStep ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div 
                  className={`mt-2 text-sm font-medium ${
                    index <= activeStep ? 'text-gray-800' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Step Content */}
        {renderStepContent()}
      </div>
    </div>
  );
};

export default ProductSetupPage;