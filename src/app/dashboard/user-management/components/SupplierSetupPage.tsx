'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect';
import { Breadcrumb } from '@/components/reusable';
import { PlusOutlined } from '@ant-design/icons';
import SupplierManagementSidebar from './SupplierManagementSidebar';
import StatCard from '@/components/ui/StatCard';

import { Input, Button } from '@/components/ui';

const SupplierSetupPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  // Form state for supplier profile
  const [supplierData, setSupplierData] = useState({
    companyName: '',
    emailAddress: '',
    phoneNumber: '',
    tinNumber: ''
  });

  // Form state for additional supplier information
  const [additionalData, setAdditionalData] = useState({
    registrationDate: '',
    businessType: '',
    legalIdType: '',
    legalIdNumber: '',
    taxIdType: '',
    taxIdNumber: ''
  });

  // Form state for supplier address
  const [addressData, setAddressData] = useState({
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    useSameAddress: true
  });

  // Form state for account settings
  const [accountData, setAccountData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    twoFactorAuth: false,
    emailNotifications: true,
    smsNotifications: false
  });

  // Business types
  const businessTypes = [
    { value: '', label: 'Select business type' },
    { value: 'llc', label: 'Limited Liability Company (LLC)' },
    { value: 'corp', label: 'Corporation' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'sole-proprietorship', label: 'Sole Proprietorship' },
    { value: 'non-profit', label: 'Non-Profit Organization' },
    { value: 'government', label: 'Government Entity' }
  ];

  // Tax ID types
  const taxIdTypes = [
    { value: '', label: 'Select tax ID type' },
    { value: 'ein', label: 'Employer Identification Number (EIN)' },
    { value: 'vat', label: 'Value Added Tax (VAT) Number' },
    { value: 'gst', label: 'Goods and Services Tax (GST) Number' },
    { value: 'pan', label: 'Permanent Account Number (PAN)' },
    { value: 'tin', label: 'Tax Identification Number (TIN)' }
  ];

  // Steps configuration
  const steps = [
    { id: 'profile-additional', title: 'Supplier Profile' },
    { id: 'address', title: 'Supplier Address' },
    { id: 'account', title: 'Account Credentials' }
  ];

  // Handle profile form input changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSupplierData((prev: typeof supplierData) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle additional info form input changes
  const handleAdditionalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAdditionalData((prev: typeof additionalData) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle address form input changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, addressType: 'billing' | 'shipping') => {
    const { name, value } = e.target;
    
    // If "use same address" is checked, update both addresses when changing billing
    if (addressData.useSameAddress && addressType === 'billing') {
      setAddressData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [name]: value
        },
        shippingAddress: {
          ...prev.shippingAddress,
          [name]: value
        }
      }));
    } else {
      // Update only the specific address
      setAddressData(prev => ({
        ...prev,
        [`${addressType}Address`]: {
          ...prev[`${addressType}Address`],
          [name]: value
        }
      }));
    }
  };

  // Handle checkbox change for "use same address"
  const handleUseSameAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setAddressData(prev => {
      // If checking the box, copy billing address to shipping address
      if (checked) {
        return {
          ...prev,
          useSameAddress: checked,
          shippingAddress: { ...prev.billingAddress }
        };
      }
      return {
        ...prev,
        useSameAddress: checked
      };
    });
  };

  // Handle account form input changes
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAccountData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission for profile and additional info
  const handleProfileAdditionalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Supplier profile data submitted:', supplierData);
    console.log('Additional data submitted:', additionalData);
    // Move to next step
    setActiveStep(1);
  };

  // Handle form submission for address
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Address data submitted:', addressData);
    // Move to next step
    setActiveStep(2);
  };

  // Handle form submission for account
  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Account data submitted:', accountData);
    alert('Supplier setup completed successfully!');
    // Reset to first step
    setActiveStep(0);
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

  // Render step content based on active step
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div id="profile-additional" className="space-y-6">
            {/* Customer Profile Section */}
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
                    label="Company Name"
                    name="companyName"
                    value={supplierData.companyName}
                    onChange={handleProfileChange}
                    placeholder="Enter company name"
                    required
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <Input
                    label="Email Address"
                    type="email"
                    name="emailAddress"
                    value={supplierData.emailAddress}
                    onChange={handleProfileChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phoneNumber"
                    value={supplierData.phoneNumber}
                    onChange={handleProfileChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <Input
                    label="TIN Number"
                    name="tinNumber"
                    value={supplierData.tinNumber}
                    onChange={handleProfileChange}
                    placeholder="Enter TIN number"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="bg-white rounded-xl p-6 pt-0 shadow-sm">
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                <h2 className="text-lg font-semibold text-gray-800">OTHER INFORMATION</h2>
              </div>
              {/* Full-width divider */}
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col"   >
                  <Input
                    label="Registration Date"
                    type="date"
                    name="registrationDate"
                    value={additionalData.registrationDate}
                    onChange={handleAdditionalChange}
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <AutoCompleteSelect
                    label="Business Type"
                    name="businessType"
                    value={additionalData.businessType}
                    onChange={(value) => handleAdditionalChange({ target: { name: 'businessType', value } } as React.ChangeEvent<HTMLInputElement>)}
                    options={businessTypes}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex flex-col"   >
                  <AutoCompleteSelect
                    label="Legal ID Type"
                    name="legalIdType"
                    value={additionalData.legalIdType}
                    onChange={(value) => handleAdditionalChange({ target: { name: 'legalIdType', value } } as React.ChangeEvent<HTMLInputElement>)}
                    options={[
                      { value: '', label: 'Select ID type' },
                      { value: 'passport', label: 'Passport' },
                      { value: 'national-id', label: 'National ID' },
                      { value: 'drivers-license', label: "Driver's License" },
                      { value: 'residence-permit', label: 'Residence Permit' }
                    ]}
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <Input
                    label="Legal ID Number"
                    name="legalIdNumber"
                    value={additionalData.legalIdNumber}
                    onChange={handleAdditionalChange}
                    placeholder="Enter ID number"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex flex-col"   >
                  <AutoCompleteSelect
                    label="Tax ID Type"
                    name="taxIdType"
                    value={additionalData.taxIdType}
                    onChange={(value) => handleAdditionalChange({ target: { name: 'taxIdType', value } } as React.ChangeEvent<HTMLInputElement>)}
                    options={taxIdTypes}
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <Input
                    label="Tax ID Number"
                    name="taxIdNumber"
                    value={additionalData.taxIdNumber}
                    onChange={handleAdditionalChange}
                    placeholder="Enter tax ID number"
                  />
                </div>
              </div>
              
              {/* Continue button inside the ADDITIONAL INFORMATION section */}
              <div className="flex justify-end mt-6">
                <Button
                  variant="primary"
                  onClick={() => handleProfileAdditionalSubmit(new Event('submit') as unknown as React.FormEvent)}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div id="address" className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex items-center mb-0">
              <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
              <h2 className="text-lg font-semibold text-gray-800">SUPPLIER ADDRESS</h2>
            </div>
            {/* Full-width divider */}
            <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
            <form onSubmit={handleAddressSubmit} className="space-y-6">
              {/* Billing Address Section */}
              <StatCard className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-700 mb-4">Billing Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col"   >
                    <Input
                      label="Country"
                      name="country"
                      value={addressData.billingAddress.country}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      placeholder="Enter country"
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col"   >
                    <Input
                      label="State/Province"
                      name="state"
                      value={addressData.billingAddress.state}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      placeholder="Enter state or province"
                    />
                  </div>
                  
                  <div className="flex flex-col"   >
                    <Input
                      label="City"
                      name="city"
                      value={addressData.billingAddress.city}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col"   >
                    <Input
                      label="ZIP/Postal Code"
                      name="zipCode"
                      value={addressData.billingAddress.zipCode}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      placeholder="Enter ZIP or postal code"
                    />
                  </div>
                  
                  <div className="flex flex-col md:col-span-2"   >
                    <Input
                      label="Street Address"
                      name="street"
                      value={addressData.billingAddress.street}
                      onChange={(e) => handleAddressChange(e, 'billing')}
                      placeholder="Enter street address"
                      required
                    />
                  </div>
                </div>
              </StatCard>
              
              {/* Use same address checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="useSameAddress"
                  name="useSameAddress"
                  checked={addressData.useSameAddress}
                  onChange={handleUseSameAddressChange}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="useSameAddress" className="ml-2 block text-sm text-gray-700">
                  Use this address for both billing and shipping
                </label>
              </div>
              
              {/* Shipping Address Section - only shown if not using same address */}
              {!addressData.useSameAddress && (
                <StatCard className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-700 mb-4">Shipping Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col"   >
                      <Input
                        label="Country"
                        name="country"
                        value={addressData.shippingAddress.country}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        placeholder="Enter country"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col"   >
                      <Input
                        label="State/Province"
                        name="state"
                        value={addressData.shippingAddress.state}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        placeholder="Enter state or province"
                      />
                    </div>
                    
                    <div className="flex flex-col"   >
                      <Input
                        label="City"
                        name="city"
                        value={addressData.shippingAddress.city}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col"   >
                      <Input
                        label="ZIP/Postal Code"
                        name="zipCode"
                        value={addressData.shippingAddress.zipCode}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        placeholder="Enter ZIP or postal code"
                      />
                    </div>
                    
                    <div className="flex flex-col md:col-span-2"   >
                      <Input
                        label="Street Address"
                        name="street"
                        value={addressData.shippingAddress.street}
                        onChange={(e) => handleAddressChange(e, 'shipping')}
                        placeholder="Enter street address"
                        required
                      />
                    </div>
                  </div>
                </StatCard>
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
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div id="account" className="bg-white rounded-xl p-6 mb-6 pt-4 shadow-sm">
            <div className="flex items-center mb-0">
              <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
              <h2 className="text-lg font-semibold text-gray-800">ACCOUNT CREDENTIALS</h2>
            </div>
            {/* Full-width divider */}
            <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
            <form onSubmit={handleAccountSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col"   >
                  <Input
                    label="Username"
                    name="username"
                    value={accountData.username}
                    onChange={handleAccountChange}
                    placeholder="Enter username"
                    required
                  />
                </div>
                
                <div className="flex flex-col"   >
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={accountData.password}
                    onChange={handleAccountChange}
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
              
              <div className="flex flex-col"   >
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={accountData.confirmPassword}
                  onChange={handleAccountChange}
                  placeholder="Confirm password"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <div 
                    className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
                      accountData.twoFactorAuth ? 'bg-[rgb(133,237,104)]' : 'bg-gray-300'
                    }`}
                    onClick={() => setAccountData(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                  >
                    <div 
                      className={`w-5 h-5 bg-white rounded-full transform transition-transform mt-0.5 ${
                        accountData.twoFactorAuth ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </div>
                </StatCard>
                
                <StatCard className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive email notifications</p>
                  </div>
                  <div 
                    className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
                      accountData.emailNotifications ? 'bg-[rgb(133,237,104)]' : 'bg-gray-300'
                    }`}
                    onClick={() => setAccountData(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                  >
                    <div 
                      className={`w-5 h-5 bg-white rounded-full transform transition-transform mt-0.5 ${
                        accountData.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </div>
                </StatCard>
                
                <StatCard className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">SMS Notifications</h3>
                    <p className="text-sm text-gray-600">Receive SMS notifications</p>
                  </div>
                  <div 
                    className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
                      accountData.smsNotifications ? 'bg-[rgb(133,237,104)]' : 'bg-gray-300'
                    }`}
                    onClick={() => setAccountData(prev => ({ ...prev, smsNotifications: !prev.smsNotifications }))}
                  >
                    <div 
                      className={`w-5 h-5 bg-white rounded-full transform transition-transform mt-0.5 ${
                        accountData.smsNotifications ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </div>
                </StatCard>
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
                  type="submit"
                >
                  Complete Setup
                </Button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-fit bg-gray-50 rounded-xl">
      {/* Sidebar */}
      <div className="w-50 bg-white border-r border-gray-200 p-33 rounded-xl h-fit sticky top-20">
        <SupplierManagementSidebar 
          activeSection={steps[activeStep].id} 
          onSectionChange={(sectionId: string) => {
            const stepIndex = steps.findIndex(step => step.id === sectionId);
            if (stepIndex !== -1) setActiveStep(stepIndex);
          }} 
          supplierData={{
            companyName: supplierData.companyName,
            emailAddress: supplierData.emailAddress,
            phoneNumber: supplierData.phoneNumber
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-0.3 overflow-y-auto rounded-r-xl" style={{ marginTop: '0rem', marginLeft: '1.5rem' }}>
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

export default SupplierSetupPage;