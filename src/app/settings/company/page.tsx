'use client';

import React, { useState, useEffect } from 'react';
import CompanySettingsSidebar from '../components/CompanySettingsSidebar';
import SettingsPageSkeleton from '../components/SettingsPageSkeleton';
import StatCard from '@/components/ui/StatCard';
import PageTitle from '@/components/ui/PageTitle';
import { Input } from '@/components/ui';
import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect';
import { PlusOutlined } from '@ant-design/icons';
import Button from '@/components/ui/Button';

const CompanySettingsPage = () => {
  const [loading, setLoading] = useState(true);
  
  // Form state for existing sections
  const [formData, setFormData] = useState({
    titleText: '',
    footerText: '',
    primaryColor: '#22c55e', // default green
    layoutMode: 'light',
    rtlLayout: 'ltr',
    categoryWiseSidemenu: false,
    defaultLanguage: 'en',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    defaultTimezone: 'UTC'
  });

  // New company settings form state
  const [companyData, setCompanyData] = useState({
    companyName: '',
    businessAddress: 'KN 5 Rd Kigali Heights, East Wing, 4th Floor',
    zipCode: '',
    city: '',
    state: '',
    country: '',
    emailAddress: '',
    telephone: '',
    tinNumber: '',
    systemEmail: '',
    warehouse: '',
    currency: ''
  });

  // Currency settings form state
  const [currencyData, setCurrencyData] = useState({
    decimalFormat: '1.0',
    defaultCurrency: 'FRW - Rwandan Francs',
    decimalSeparator: 'Dot',
    currencySymbolPosition: 'Post',
    currencySymbolSpace: 'With space',
    currencySymbolAndName: 'With Currency Symbol'
  });

  // Warehouse settings form state
  const [warehouseData, setWarehouseData] = useState({
    warehouse: 'Kigali',
    emailAddress: 'company@admin.com',
    telephone: '0788228888',
    branchId: 'Kigali',
    serialNumber: 'atradezonevsdctest',
    signature: '',
    customersVisibility: 'All Customers',
    suppliersVisibility: 'All Suppliers',
    productsVisibility: 'All Products',
    showProductStockItems: 'No',
    posDefaultStatus: 'Delivered',
    barcodeType: 'Barcode',
    printType: 'POS',
    enableMrc: 'Yes',
    showMrpOnInvoice: 'Yes',
    showDiscountTaxOnInvoice: 'Yes',
    showEmailOnInvoice: 'No',
    showPhoneOnInvoice: 'No',
    printerA4: 'OFF',
    printerA5: 'OFF',
    printerRoll80mm: 'OFF',
    printerRoll72mm: 'OFF',
    printerRoll58mm: 'OFF'
  });

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Color palette options
  const colorPalette = [
    '#22c55e', // green
    '#3b82f6', // blue
    '#ef4444', // red
    '#f59e0b', // amber
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#06b6d4'  // cyan - new color
  ];

  // Language options
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' }
  ];

  // Date format options
  const dateFormats = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
  ];

  // Time format options
  const timeFormats = [
    { value: '12h', label: '12 Hour' },
    { value: '24h', label: '24 Hour' }
  ];

  // Timezone options
  const timezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'EST', label: 'Eastern Time' },
    { value: 'PST', label: 'Pacific Time' },
    { value: 'GMT', label: 'GMT' }
  ];

  // Warehouse options
  const warehouses = [
    { value: '', label: 'Select warehouse' },
    { value: 'warehouse1', label: 'Main Warehouse' },
    { value: 'warehouse2', label: 'Regional Warehouse' },
    { value: 'warehouse3', label: 'Distribution Center' }
  ];

  // Currency options
  const currencies = [
    { value: '', label: 'Select currency' },
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'RWF', label: 'RWF - Rwandan Franc' }
  ];

  // Handle form input changes for existing sections
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle company settings form input changes
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle currency settings form input changes
  const handleCurrencyChange = (value: string, name: string) => {
    setCurrencyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle currency settings radio button changes
  const handleCurrencyRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrencyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle warehouse settings form input changes
  const handleWarehouseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWarehouseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle warehouse settings radio button changes
  const handleWarehouseRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWarehouseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle warehouse settings toggle changes
  const handleWarehouseToggleChange = (setting: string) => {
    setWarehouseData(prev => {
      const currentValue = prev[setting as keyof typeof warehouseData];
      let newValue;
      
      // Handle printer settings which have ON/OFF values
      if (setting.startsWith('printer')) {
        newValue = currentValue === 'ON' ? 'OFF' : 'ON';
      } 
      // Handle yes/no toggles
      else if (['showMrpOnInvoice', 'showDiscountTaxOnInvoice', 'showEmailOnInvoice', 'showPhoneOnInvoice'].includes(setting)) {
        newValue = currentValue === 'Yes' ? 'No' : 'Yes';
      }
      // Handle MRC setting
      else if (setting === 'enableMrc') {
        newValue = currentValue === 'Yes' ? 'No' : 'Yes';
      }
      
      return {
        ...prev,
        [setting]: newValue
      };
    });
  };

  // Handle color selection
  const handleColorSelect = (color: string) => {
    setFormData(prev => ({
      ...prev,
      primaryColor: color
    }));
  };

  // Handle toggle switches
  const handleToggle = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof formData]
    }));
  };

  // Handle form submission for existing sections
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Add actual form submission logic here
  };

  // Handle company settings form submission
  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Company settings saved:', companyData);
    alert('Company settings saved successfully!');
  };

  // Handle currency settings form submission
  const handleCurrencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Currency settings saved:', currencyData);
    alert('Currency settings saved successfully!');
  };

  // Handle warehouse settings form submission
  const handleWarehouseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Warehouse settings saved:', warehouseData);
    alert('Warehouse settings saved successfully!');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Set dynamic page title */}
      <PageTitle title="Company Settings" />
      {loading ? <SettingsPageSkeleton /> : (
        <div className="flex h-fit bg-gray-50 rounded-xl">
          {/* Sidebar */}
          <div className="w-50 bg-white border-r border-gray-200 p-33 rounded-xl h-fit sticky top-20">
            <CompanySettingsSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-0.3 overflow-y-auto rounded-r-xl" style={{ marginTop: '0rem', marginLeft: '1.5rem' }}>
            <>
              {/* Brand Settings Section */}
              <div id="brand" className="bg-white rounded-xl p-6 mb-6 pt-0 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
                <div className="flex items-center mb-0">
                  <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                  <h2 className="text-lg font-semibold text-gray-800">BRAND SETTINGS</h2>
                </div>
                {/* Full-width divider */}
                <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col"  >
                    <Input
                      label="Title Text"
                      name="titleText"
                      value={formData.titleText}
                      onChange={handleChange}
                      placeholder="Enter title text"
                    />
                  </div>
                  <div className="flex flex-col"  >
                    <Input
                      label="Footer Text"
                      name="footerText"
                      value={formData.footerText}
                      onChange={handleChange}
                      placeholder="Enter footer text"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-800 mb-4">Theme Customizer</h3>
                  <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                  <div className="grid grid-cols-4 gap-6">
                    {/* Primary Color Settings */}
                    <StatCard 
                      title="Primary color settings"
                      className="p-4"
                    >
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="flex flex-wrap gap-2">
                        {colorPalette.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            className={`w-6 h-6 rounded-full border-2 ${
                              formData.primaryColor === color 
                                ? 'border-green-500' 
                                : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                          ></button>
                        ))}
                        {/* Custom color picker */}
                        <div className="relative">
                          <button
                            onClick={() => document.getElementById('color-picker')?.click()}
                            className={`w-6 h-6 rounded-full border-2 ${
                              !colorPalette.includes(formData.primaryColor) 
                                ? 'border-green-500' 
                                : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: formData.primaryColor }}
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </button>
                          <input
                            id="color-picker"
                            type="color"
                            value={formData.primaryColor}
                            onChange={(e) => handleColorSelect(e.target.value)}
                            className="absolute opacity-0 w-0 h-0"
                          />
                        </div>
                      </div>
                    </StatCard>
                    
                    {/* Layout Settings */}
                    <StatCard 
                      title="Layout settings"
                      className="p-4"
                    >
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${formData.layoutMode === 'light' ? 'text-green-600' : 'text-gray-500'}`}>Light Mode</span>
                        <div 
                          className={`w-10 h-4 rounded-full cursor-pointer transition-colors ${
                            formData.layoutMode === 'light' ? 'bg-[rgb(133,237,104)]' : 'bg-gray-300'
                          }`}
                          style={{ marginRight: '12px' }}
                          onClick={() => setFormData(prev => ({ ...prev, layoutMode: prev.layoutMode === 'light' ? 'dark' : 'light' }))}
                        >
                          <div 
                            className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                              formData.layoutMode === 'light' ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          ></div>
                        </div>
                        <span className={`text-xs ${formData.layoutMode === 'dark' ? 'text-green-600' : 'text-gray-500'}`}>Dark Mode</span>
                      </div>
                    </StatCard>
                    
                    {/* RTL & LTR Settings */}
                    <StatCard 
                      title="Enable RTL & LTR"
                      className="p-4"
                    >
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${formData.rtlLayout === 'ltr' ? 'text-green-600' : 'text-gray-500'}`}>LTR Layout</span>
                        <div 
                          className={`w-10 h-4 rounded-full cursor-pointer transition-colors ${
                            formData.rtlLayout === 'ltr' ? 'bg-[rgb(133,237,104)]' : 'bg-gray-300'
                          }`}
                          style={{ marginRight: '12px' }}
                          onClick={() => setFormData(prev => ({ ...prev, rtlLayout: prev.rtlLayout === 'ltr' ? 'rtl' : 'ltr' }))}
                        >
                          <div 
                            className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                              formData.rtlLayout === 'ltr' ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          ></div>
                        </div>
                        <span className={`text-xs ${formData.rtlLayout === 'rtl' ? 'text-green-600' : 'text-gray-500'}`}>RTL Layout</span>
                      </div>
                    </StatCard>
                    
                    {/* Category Wise Sidemenu */}
                    <StatCard 
                      title="Sidemenu"
                      className="p-4"
                    >
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${formData.categoryWiseSidemenu ? 'text-green-600' : 'text-gray-500'}`}>Category Wise Sidemenu</span>
                        <div 
                          className={`w-10 h-4 rounded-full cursor-pointer transition-colors ${
                            formData.categoryWiseSidemenu ? 'bg-[rgb(133,237,104)]' : 'bg-gray-300'
                          }`}
                          style={{ marginRight: '12px' }}
                          onClick={() => handleToggle('categoryWiseSidemenu')}
                        >
                          <div 
                            className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                              formData.categoryWiseSidemenu ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          ></div>
                        </div>
                      </div>
                    </StatCard>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button
                    variant="primary"
                    onClick={(e) => handleSubmit(e as any)}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>

              {/* System Settings Section */}
              <div id="system" className="bg-white rounded-xl p-6 mb-6 pt-4 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
                <div className="flex items-center mb-0">
                  <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                  <h2 className="text-lg font-semibold text-gray-800">SYSTEM SETTINGS</h2>
                </div>
                {/* Full-width divider */}
                <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="flex flex-col">
                    <AutoCompleteSelect
                      label="Default Language"
                      name="defaultLanguage"
                      value={formData.defaultLanguage}
                      onChange={(value) => setFormData(prev => ({ ...prev, defaultLanguage: value }))}
                      options={languages}
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <AutoCompleteSelect
                      label="Date Format"
                      name="dateFormat"
                      value={formData.dateFormat}
                      onChange={(value) => setFormData(prev => ({ ...prev, dateFormat: value }))}
                      options={dateFormats}
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <AutoCompleteSelect
                      label="Time Format"
                      name="timeFormat"
                      value={formData.timeFormat}
                      onChange={(value) => setFormData(prev => ({ ...prev, timeFormat: value }))}
                      options={timeFormats}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <AutoCompleteSelect
                    label="Default Timezone"
                    name="defaultTimezone"
                    value={formData.defaultTimezone}
                    onChange={(value) => setFormData(prev => ({ ...prev, defaultTimezone: value }))}
                    options={timezones}
                  />
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button
                    variant="primary"
                    onClick={(e) => handleSubmit(e as any)}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>

              {/* Company Settings Section */}
              <div id="company" className="bg-white rounded-xl p-6 mb-6 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
                {/* Header */}
                <div className="flex items-center mb-0">
                  <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                      <h2 className="text-lg font-semibold text-gray-800">COMPANY SETTINGS</h2>
                    </div>
                    {/* Full-width divider */}
                    <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
                  <form onSubmit={handleCompanySubmit} className="space-y-6">
                  {/* First Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col"  >
                      <Input
                        label="Company Name"
                        name="companyName"
                        value={companyData.companyName}
                        onChange={handleCompanyChange}
                        placeholder="Enter company name"
                      />
                    </div>
                    
                    <div className="flex flex-col"  >
                      <Input
                        label="Business Address"
                        name="businessAddress"
                        value={companyData.businessAddress}
                        onChange={handleCompanyChange}
                        placeholder="Enter business address"
                      />
                    </div>
                    
                    <div className="flex flex-col"  >
                      <Input
                        label="Zip/Post Code"
                        name="zipCode"
                        value={companyData.zipCode}
                        onChange={handleCompanyChange}
                        placeholder="Enter zip code"
                      />
                    </div>
                  </div>
                  
                  {/* Second Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col"  >
                      <Input
                        label="City"
                        name="city"
                        value={companyData.city}
                        onChange={handleCompanyChange}
                        placeholder="Enter city"
                      />
                    </div>
                    
                    <div className="flex flex-col"  >
                      <Input
                        label="State"
                        name="state"
                        value={companyData.state}
                        onChange={handleCompanyChange}
                        placeholder="Enter state"
                      />
                    </div>
                    
                    <div className="flex flex-col"  >
                      <Input
                        label="Country"
                        name="country"
                        value={companyData.country}
                        onChange={handleCompanyChange}
                        placeholder="Enter country"
                      />
                    </div>
                  </div>
                  
                  {/* Third Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col"  >
                      <Input
                        label="Email Address"
                        name="emailAddress"
                        value={companyData.emailAddress}
                        onChange={handleCompanyChange}
                        placeholder="Enter email address"
                      />
                    </div>
                    
                    <div className="flex flex-col"  >
                      <Input
                        label="Telephone"
                        name="telephone"
                        value={companyData.telephone}
                        onChange={handleCompanyChange}
                        placeholder="Enter telephone number"
                      />
                    </div>
                    
                    <div className="flex flex-col"  >
                      <Input
                        label="TIN Number"
                        name="tinNumber"
                        value={companyData.tinNumber}
                        onChange={handleCompanyChange}
                        placeholder="Enter TIN number"
                      />
                    </div>
                  </div>
                  
                  {/* Fourth Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col"  >
                      <Input
                        label="System Email"
                        name="systemEmail"
                        value={companyData.systemEmail}
                        onChange={handleCompanyChange}
                        placeholder="Enter system email"
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <AutoCompleteSelect
                        label="Warehouse"
                        name="warehouse"
                        value={companyData.warehouse}
                        onChange={(value) => setCompanyData(prev => ({ ...prev, warehouse: value }))}
                        options={warehouses}
                        swapActionButtonPosition={true}
                        actionButton={{
                          icon: companyData.warehouse ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <PlusOutlined className="text-gray-500" />
                          ),
                          onClick: () => {
                            if (companyData.warehouse) {
                              // Reset the selection
                              setCompanyData(prev => ({ ...prev, warehouse: '' }));
                            } else {
                              console.log('Add new warehouse');
                            }
                          }
                        }}
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <AutoCompleteSelect
                        label="Currency"
                        name="currency"
                        value={companyData.currency}
                        onChange={(value) => setCompanyData(prev => ({ ...prev, currency: value }))}
                        options={currencies}
                        swapActionButtonPosition={true}
                        actionButton={{
                          icon: companyData.currency ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <PlusOutlined className="text-gray-500" />
                          ),
                          onClick: () => {
                            if (companyData.currency) {
                              // Reset the selection
                              setCompanyData(prev => ({ ...prev, currency: '' }));
                            } else {
                              console.log('Add new currency');
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Save Button */}
                  <div className="flex justify-end mt-6">
                  <Button
                    variant="primary"
                    onClick={(e) => handleSubmit(e as any)}
                  >
                    Save Changes
                  </Button>
                </div>
                </form>
              </div>

              {/* Currency Settings Section */}
              <div id="currency" className="bg-white rounded-xl p-6 mb-6 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
                {/* Header */}
                <div className="flex items-center mb-0">
                  <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                  <h2 className="text-lg font-semibold text-gray-800">CURRENCY SETTINGS</h2>
                </div>
                {/* Full-width divider */}
                <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
                
                <form onSubmit={handleCurrencySubmit} className="space-y-6">
                  {/* First Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col"  >
                      <AutoCompleteSelect
                        label="Decimal Format"
                        name="decimalFormat"
                        value={currencyData.decimalFormat}
                        onChange={(value) => handleCurrencyChange(value, 'decimalFormat')}
                        options={[
                          { value: "1.0", label: "1.0" },
                          { value: "1.00", label: "1.00" },
                          { value: "1.000", label: "1.000" }
                        ]}
                      />
                    </div>
                    
                    <div className="flex flex-col"  >
                      <AutoCompleteSelect
                        label="Default Currency"
                        name="defaultCurrency"
                        value={currencyData.defaultCurrency}
                        onChange={(value) => handleCurrencyChange(value, 'defaultCurrency')}
                        options={[
                          { value: "FRW - Rwandan Francs", label: "FRW - Rwandan Francs" },
                          { value: "USD - US Dollar", label: "USD - US Dollar" },
                          { value: "EUR - Euro", label: "EUR - Euro" },
                          { value: "GBP - British Pound", label: "GBP - British Pound" }
                        ]}
                      />
                    </div>
                    
                    <div className="flex flex-col"  >
                      <AutoCompleteSelect
                        label="Decimal Separator"
                        name="decimalSeparator"
                        value={currencyData.decimalSeparator}
                        onChange={(value) => handleCurrencyChange(value, 'decimalSeparator')}
                        options={[
                          { value: "Dot", label: "Dot" },
                          { value: "Comma", label: "Comma" }
                        ]}
                      />
                    </div>
                  </div>
                  
                  {/* Second Row - Radio Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard title="Currency Symbol Position" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="flex justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="pre"
                              name="currencySymbolPosition"
                              value="Pre"
                              checked={currencyData.currencySymbolPosition === 'Pre'}
                              onChange={handleCurrencyRadioChange}
                              className="mr-2"
                            />
                            <label htmlFor="pre" className="text-sm text-gray-700">Pre</label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="post"
                              name="currencySymbolPosition"
                              value="Post"
                              checked={currencyData.currencySymbolPosition === 'Post'}
                              onChange={handleCurrencyRadioChange}
                              className="mr-2"
                            />
                            <label htmlFor="post" className="text-sm text-gray-700">Post</label>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-start">
                          <span className="text-xs text-gray-500" style={{ fontSize: '0.9rem', lineHeight: '0.9rem' }}>Preview:</span>
                          <div className="text-sm font-medium mt-1" style={{ color: 'rgb(107 114 128)' }}>
                            {currencyData.currencySymbolPosition === 'Pre' ? 'Frw 1,000.00' : '1,000.00 Frw'}
                          </div>
                        </div>
                      </div>
                    </StatCard>
                    
                    <StatCard title="Currency Symbol Space" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="withSpace"
                            name="currencySymbolSpace"
                            value="With space"
                            checked={currencyData.currencySymbolSpace === 'With space'}
                            onChange={handleCurrencyRadioChange}
                            className="mr-2"
                          />
                          <label htmlFor="withSpace" className="text-sm text-gray-700">With space</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="withoutSpace"
                            name="currencySymbolSpace"
                            value="Without space"
                            checked={currencyData.currencySymbolSpace === 'Without space'}
                            onChange={handleCurrencyRadioChange}
                            className="mr-2"
                          />
                          <label htmlFor="withoutSpace" className="text-sm text-gray-700">Without space</label>
                        </div>
                      </div>
                    </StatCard>
                    
                    <StatCard title="Currency Symbol & Name" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="withSymbol"
                            name="currencySymbolAndName"
                            value="With Currency Symbol"
                            checked={currencyData.currencySymbolAndName === 'With Currency Symbol'}
                            onChange={handleCurrencyRadioChange}
                            className="mr-2"
                          />
                          <label htmlFor="withSymbol" className="text-sm text-gray-700">With Currency Symbol</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="withName"
                            name="currencySymbolAndName"
                            value="With Currency Name"
                            checked={currencyData.currencySymbolAndName === 'With Currency Name'}
                            onChange={handleCurrencyRadioChange}
                            className="mr-2"
                          />
                          <label htmlFor="withName" className="text-sm text-gray-700">With Currency Name</label>
                        </div>
                      </div>
                    </StatCard>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>

              {/* Warehouse Settings Section */}
              <div id="warehouse" className="bg-white rounded-xl p-6 mb-6 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
                {/* Header */}
                <div className="flex items-center mb-0">
                  <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                  <h2 className="text-lg font-semibold text-gray-800">WAREHOUSE SETTINGS</h2>
                </div>
                {/* Full-width divider */}
                <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
                <form onSubmit={handleWarehouseSubmit} className="space-y-6">
                  {/* Basic Information Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col"  >
                      <Input
                        label="Warehouse"
                        name="warehouse"
                        value={warehouseData.warehouse}
                        onChange={handleWarehouseChange}
                        placeholder="Enter warehouse name"
                      />
                    </div>
                    
                    <div className="flex flex-col"  >
                      <Input
                        label="Email Address"
                        name="emailAddress"
                        value={warehouseData.emailAddress}
                        onChange={handleWarehouseChange}
                        placeholder="Enter email address"
                      />
                    </div>
                    
                    <div className="flex flex-col"  >
                      <Input
                        label="Telephone"
                        name="telephone"
                        value={warehouseData.telephone}
                        onChange={handleWarehouseChange}
                        placeholder="Enter telephone number"
                      />
                    </div>
                  </div>
                  
                  {/* Branch and Serial Info Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col"  >
                      <Input
                        label="Branch ID"
                        name="branchId"
                        value={warehouseData.branchId}
                        onChange={handleWarehouseChange}
                        placeholder="Enter branch ID"
                      />
                    </div>
                    
                    <div className="flex flex-col"  >
                      <Input
                        label="Serial Number"
                        name="serialNumber"
                        value={warehouseData.serialNumber}
                        onChange={handleWarehouseChange}
                        placeholder="Enter serial number"
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Signature</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors cursor-pointer">
                        <span className="text-gray-500">+ Upload</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Visibility Section */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Visibility - Customers */}
                    <StatCard title="Customers Visibility" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="allCustomers"
                            name="customersVisibility"
                            value="All Customers"
                            checked={warehouseData.customersVisibility === 'All Customers'}
                            onChange={handleWarehouseRadioChange}
                            className="mr-2"
                          />
                          <label htmlFor="allCustomers" className="text-sm text-gray-700">All Customers</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="warehouseCustomers"
                            name="customersVisibility"
                            value="Warehouse Customers"
                            checked={warehouseData.customersVisibility === 'Warehouse Customers'}
                            onChange={handleWarehouseRadioChange}
                            className="mr-2"
                          />
                          <label htmlFor="warehouseCustomers" className="text-sm text-gray-700">Warehouse Customers</label>
                        </div>
                      </div>
                    </StatCard>
                    
                    {/* Visibility - Suppliers */}
                    <StatCard title="Suppliers Visibility" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="allSuppliers"
                            name="suppliersVisibility"
                            value="All Suppliers"
                            checked={warehouseData.suppliersVisibility === 'All Suppliers'}
                            onChange={handleWarehouseRadioChange}
                            className="mr-2"
                          />
                          <label htmlFor="allSuppliers" className="text-sm text-gray-700">All Suppliers</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="warehouseSuppliers"
                            name="suppliersVisibility"
                            value="Warehouse Suppliers"
                            checked={warehouseData.suppliersVisibility === 'Warehouse Suppliers'}
                            onChange={handleWarehouseRadioChange}
                            className="mr-2"
                          />
                          <label htmlFor="warehouseSuppliers" className="text-sm text-gray-700">Warehouse Suppliers</label>
                        </div>
                      </div>
                    </StatCard>
                    
                    {/* Visibility - Products */}
                    <StatCard title="Products Visibility" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="allProducts"
                            name="productsVisibility"
                            value="All Products"
                            checked={warehouseData.productsVisibility === 'All Products'}
                            onChange={handleWarehouseRadioChange}
                            className="mr-2"
                          />
                          <label htmlFor="allProducts" className="text-sm text-gray-700">All Products</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="warehouseProducts"
                            name="productsVisibility"
                            value="Warehouse Products"
                            checked={warehouseData.productsVisibility === 'Warehouse Products'}
                            onChange={handleWarehouseRadioChange}
                            className="mr-2"
                          />
                          <label htmlFor="warehouseProducts" className="text-sm text-gray-700">Warehouse Products</label>
                        </div>
                      </div>
                    </StatCard>
                    
                    {/* Visibility - Show Product Stock Items */}
                    <StatCard title="Show Product Stock Items" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="showNo"
                            name="showProductStockItems"
                            value="No"
                            checked={warehouseData.showProductStockItems === 'No'}
                            onChange={handleWarehouseRadioChange}
                            className="mr-2"
                          />
                          <label htmlFor="showNo" className="text-sm text-gray-700">No</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="showYes"
                            name="showProductStockItems"
                            value="Yes"
                            checked={warehouseData.showProductStockItems === 'Yes'}
                            onChange={handleWarehouseRadioChange}
                            className="mr-2"
                          />
                          <label htmlFor="showYes" className="text-sm text-gray-700">Yes</label>
                        </div>
                      </div>
                    </StatCard>
                  </div>
                  
                  {/* POS Settings Section */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* POS Default Status */}
                    <StatCard title="POS Default Status" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <AutoCompleteSelect
                        name="posDefaultStatus"
                        value={warehouseData.posDefaultStatus}
                        onChange={(value) => setWarehouseData(prev => ({ ...prev, posDefaultStatus: value }))}
                        options={[
                          { value: "Delivered", label: "Delivered" },
                          { value: "Pending", label: "Pending" },
                          { value: "Cancelled", label: "Cancelled" }
                        ]}
                      />
                    </StatCard>
                    
                    {/* Barcode Type */}
                    <StatCard title="Barcode Type" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <AutoCompleteSelect
                        name="barcodeType"
                        value={warehouseData.barcodeType}
                        onChange={(value) => setWarehouseData(prev => ({ ...prev, barcodeType: value }))}
                        options={[
                          { value: "Barcode", label: "Barcode" },
                          { value: "QR Code", label: "QR Code" }
                        ]}
                      />
                    </StatCard>
                    
                    {/* Print Type */}
                    <StatCard title="Print Type" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <AutoCompleteSelect
                        name="printType"
                        value={warehouseData.printType}
                        onChange={(value) => setWarehouseData(prev => ({ ...prev, printType: value }))}
                        options={[
                          { value: "POS", label: "POS" },
                          { value: "Invoice", label: "Invoice" }
                        ]}
                      />
                    </StatCard>
                    
                    {/* Enable MRC */}
                    <StatCard title="Enable MRC" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <AutoCompleteSelect
                        name="enableMrc"
                        value={warehouseData.enableMrc}
                        onChange={(value) => setWarehouseData(prev => ({ ...prev, enableMrc: value }))}
                        options={[
                          { value: "Yes", label: "Yes" },
                          { value: "No", label: "No" }
                        ]}
                      />
                    </StatCard>
                  </div>
                  
                  {/* Invoice Display Options */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Show MRP On Invoice */}
                    <StatCard title="Show MRP On Invoice" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleWarehouseToggleChange('showMrpOnInvoice')}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            warehouseData.showMrpOnInvoice === 'Yes' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-white text-gray-700 hover:bg-gray-300'
                          }`}
                          style={{
                            color: warehouseData.showMrpOnInvoice === 'Yes' ? 'rgb(133 237 104)' : '',
                            border: 'solid 1px'
                          }}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWarehouseToggleChange('showMrpOnInvoice')}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            warehouseData.showMrpOnInvoice === 'No' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-white text-gray-700 hover:bg-gray-300'
                          }`}
                          style={{
                            color: warehouseData.showMrpOnInvoice === 'No' ? 'rgb(133 237 104)' : '',
                            border: 'solid 1px'
                          }}
                        >
                          No
                        </button>
                      </div>
                    </StatCard>
                    
                    {/* Show discount & Tax On Invoice */}
                    <StatCard title="Show discount & Tax On Invoice" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleWarehouseToggleChange('showDiscountTaxOnInvoice')}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            warehouseData.showDiscountTaxOnInvoice === 'Yes' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-white text-gray-700 hover:bg-gray-300'
                          }`}
                          style={{
                            color: warehouseData.showDiscountTaxOnInvoice === 'Yes' ? 'rgb(133 237 104)' : '',
                            border: 'solid 1px'
                          }}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWarehouseToggleChange('showDiscountTaxOnInvoice')}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            warehouseData.showDiscountTaxOnInvoice === 'No' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-white text-gray-700 hover:bg-gray-300'
                          }`}
                          style={{
                            color: warehouseData.showDiscountTaxOnInvoice === 'No' ? 'rgb(133 237 104)' : '',
                            border: 'solid 1px'
                          }}
                        >
                          No
                        </button>
                      </div>
                    </StatCard>
                    
                    {/* Show email on invoice */}
                    <StatCard title="Show email on invoice" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleWarehouseToggleChange('showEmailOnInvoice')}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            warehouseData.showEmailOnInvoice === 'Yes' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-white text-gray-700 hover:bg-gray-300'
                          }`}
                          style={{
                            color: warehouseData.showEmailOnInvoice === 'Yes' ? 'rgb(133 237 104)' : '',
                            border: 'solid 1px'
                          }}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWarehouseToggleChange('showEmailOnInvoice')}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            warehouseData.showEmailOnInvoice === 'No' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-white text-gray-700 hover:bg-gray-300'
                          }`}
                          style={{
                            color: warehouseData.showEmailOnInvoice === 'No' ? 'rgb(133 237 104)' : '',
                            border: 'solid 1px'
                          }}
                        >
                          No
                        </button>
                      </div>
                    </StatCard>
                    
                    {/* Show phone on invoice */}
                    <StatCard title="Show phone on invoice" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleWarehouseToggleChange('showPhoneOnInvoice')}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            warehouseData.showPhoneOnInvoice === 'Yes' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-white text-gray-700 hover:bg-gray-300'
                          }`}
                          style={{
                            color: warehouseData.showPhoneOnInvoice === 'Yes' ? 'rgb(133 237 104)' : '',
                            border: 'solid 1px'
                          }}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWarehouseToggleChange('showPhoneOnInvoice')}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            warehouseData.showPhoneOnInvoice === 'No' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-white text-gray-700 hover:bg-gray-300'
                          }`}
                          style={{
                            color: warehouseData.showPhoneOnInvoice === 'No' ? 'rgb(133 237 104)' : '',
                            border: 'solid 1px'
                          }}
                        >
                          No
                        </button>
                      </div>
                    </StatCard>
                  </div>
                  
                  {/* Save Button */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
              
              {/* Printer Management Section */}
              <div id="printers" className="bg-white rounded-xl p-6 shadow-sm mt-6" style={{ scrollMarginTop: '3rem' }}>
                {/* Header */}
                <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                <h2 className="text-lg font-semibold text-gray-800">MANAGE PRINTERS</h2>
              </div>
              {/* Full-width divider */}
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  console.log('Saving printer settings:', warehouseData);
                  alert('Printer settings saved successfully!');
                }} className="space-y-6">
                  {/* Printer Model Section */}
                  <StatCard title="Printer Model" className="p-4">
                    <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                    <div className="flex items-center mb-4">
                      <span className="text-sm text-gray-600">Turn on default receipt paper size</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {/* A4 Printer */}
                      <StatCard className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-base leading-none font-bold" style={{ color: 'rgb(109 109 109)', fontSize: '0.9rem' }}>A4</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => handleWarehouseToggleChange('printerA4')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              warehouseData.printerA4 === 'ON' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-300'
                            }`}
                            style={{
                              color: warehouseData.printerA4 === 'ON' ? 'rgb(133 237 104)' : '',
                              border: 'solid 1px'
                            }}
                          >
                            On
                          </button>
                          <button
                            type="button"
                            onClick={() => handleWarehouseToggleChange('printerA4')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              warehouseData.printerA4 === 'OFF' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-300'
                            }`}
                            style={{
                              color: warehouseData.printerA4 === 'OFF' ? 'rgb(133 237 104)' : '',
                              border: 'solid 1px'
                            }}
                          >
                            Off
                          </button>
                        </div>
                      </StatCard>
                      
                      {/* A5 Printer */}
                      <StatCard className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-base leading-none font-bold" style={{ color: 'rgb(109 109 109)', fontSize: '0.9rem' }}>A5</span>
                          <span className="text-xs text-gray-500" style={{ fontSize: '0.4rem', lineHeight: '0.4rem' }}>Width: 148 mm<br/>Height: 210 mm</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => handleWarehouseToggleChange('printerA5')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              warehouseData.printerA5 === 'ON' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-300'
                            }`}
                            style={{
                              color: warehouseData.printerA5 === 'ON' ? 'rgb(133 237 104)' : '',
                              border: 'solid 1px'
                            }}
                          >
                            On
                          </button>
                          <button
                            type="button"
                            onClick={() => handleWarehouseToggleChange('printerA5')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              warehouseData.printerA5 === 'OFF' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-300'
                            }`}
                            style={{
                              color: warehouseData.printerA5 === 'OFF' ? 'rgb(133 237 104)' : '',
                              border: 'solid 1px'
                            }}
                          >
                            Off
                          </button>
                        </div>
                      </StatCard>
                      
                      {/* Roll 80mm Printer */}
                      <StatCard className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-base leading-none font-bold" style={{ color: 'rgb(109 109 109)', fontSize: '0.9rem' }}>Roll 80mm</span>
                          <span className="text-xs text-gray-500" style={{ fontSize: '0.4rem', lineHeight: '0.4rem' }}>Width: 80 mm<br/>Height: infinity</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => handleWarehouseToggleChange('printerRoll80mm')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              warehouseData.printerRoll80mm === 'ON' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-300'
                            }`}
                            style={{
                              color: warehouseData.printerRoll80mm === 'ON' ? 'rgb(133 237 104)' : '',
                              border: 'solid 1px'
                            }}
                          >
                            On
                          </button>
                          <button
                            type="button"
                            onClick={() => handleWarehouseToggleChange('printerRoll80mm')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              warehouseData.printerRoll80mm === 'OFF' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-300'
                            }`}
                            style={{
                              color: warehouseData.printerRoll80mm === 'OFF' ? 'rgb(133 237 104)' : '',
                              border: 'solid 1px'
                            }}
                          >
                            Off
                          </button>
                        </div>
                      </StatCard>
                      
                      {/* Roll 72mm Printer */}
                      <StatCard className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-base leading-none font-bold" style={{ color: 'rgb(109 109 109)', fontSize: '0.9rem' }}>Roll 72mm</span>
                          <span className="text-xs text-gray-500" style={{ fontSize: '0.4rem', lineHeight: '0.4rem' }}>Width: 72 mm<br/>Height: infinity</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => handleWarehouseToggleChange('printerRoll72mm')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              warehouseData.printerRoll72mm === 'ON' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-300'
                            }`}
                            style={{
                              color: warehouseData.printerRoll72mm === 'ON' ? 'rgb(133 237 104)' : '',
                              border: 'solid 1px'
                            }}
                          >
                            On
                          </button>
                          <button
                            type="button"
                            onClick={() => handleWarehouseToggleChange('printerRoll72mm')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              warehouseData.printerRoll72mm === 'OFF' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-300'
                            }`}
                            style={{
                              color: warehouseData.printerRoll72mm === 'OFF' ? 'rgb(133 237 104)' : '',
                              border: 'solid 1px'
                            }}
                          >
                            Off
                          </button>
                        </div>
                      </StatCard>
                      
                      {/* Roll 58mm Printer */}
                      <StatCard className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-base leading-none font-bold" style={{ color: 'rgb(109 109 109)', fontSize: '0.9rem' }}>Roll 58mm</span>
                          <span className="text-xs text-gray-500" style={{ fontSize: '0.4rem', lineHeight: '0.4rem' }}>Width: 58 mm<br/>Height: infinity</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => handleWarehouseToggleChange('printerRoll58mm')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              warehouseData.printerRoll58mm === 'ON' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-[rgb(233 238 246)] text-gray-700 hover:bg-gray-3300'
                            }`}
                            style={{
                              color: warehouseData.printerRoll58mm === 'ON' ? 'rgb(133 237 104)' : '',
                              border: 'solid 1px'
                            }}
                          >
                            On
                          </button>
                          <button
                            type="button"
                            onClick={() => handleWarehouseToggleChange('printerRoll58mm')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              warehouseData.printerRoll58mm === 'OFF' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-[rgb(233 238 246)] text-gray-700 hover:bg-gray-300'
                            }`}
                            style={{
                              color: warehouseData.printerRoll58mm === 'OFF' ? 'rgb(133 237 104)' : '',
                              border: 'solid 1px'
                            }}
                          >
                            Off
                          </button>
                        </div>
                      </StatCard>
                    </div>
                  </StatCard>
                  
                  {/* Save Button */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex items-center space-x-2"
                    >
                      <span>Save Changes</span>
                    </Button>
                  </div>
                </form>
              </div>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanySettingsPage;