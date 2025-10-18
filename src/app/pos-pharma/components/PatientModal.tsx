'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import StatCard from '@/components/ui/StatCard';
import Input from '@/components/ui/Input';
import SectionHeader from '@/components/layout/SectionHeader';

import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect';
import { ActionButtons } from '@/components/reusable';
import { MinusOutlined, PlusOutlined, SearchOutlined, CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import MedicineAutoCompleteSelect from '../components/MedicineAutoCompleteSelect';
import InsuranceAutoCompleteSelect from '../components/InsuranceAutoCompleteSelect';
import InsuranceIdAutoCompleteSelect from '../components/InsuranceIdAutoCompleteSelect';
import InsuranceFormSidebar from './InsuranceFormSidebar';

// Define Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface InsuranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  productOptions: { value: string; label: string; price: number }[];
  onConfirmPatient?: (patientData: { insuranceId: string; patientName: string; insuranceType: string }) => void;
}

const PatientModal = ({
  isOpen,
  onClose,
  cartItems,
  setCartItems,
  productOptions,
  onConfirmPatient
}: InsuranceModalProps) => {
  const [productSearch, setProductSearch] = useState('');
  const [insuranceSearch, setInsuranceSearch] = useState('');
  const [insuranceIdSearch, setInsuranceIdSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isPatientRegistered, setIsPatientRegistered] = useState(false);
  const [registeredPatientData, setRegisteredPatientData] = useState<any>(null);
  
  // Reset form states when modal opens
  useEffect(() => {
    if (isOpen) {
      setInsuranceSearch('');
      setInsuranceIdSearch('');
      setSelectedInsurance(null);
      setActiveStep(0);
      setIsPatientRegistered(false);
      setRegisteredPatientData(null);
      // Reset form data
      setPersonalData({
        insuranceNumber: '',
        beneficialNumber: '',
        clientPercentage: '',
        affiliateName: '',
        beneficialName: '',
        gender: '',
        relationship: '',
        patientNumber: '',
        dutyStation: '',
        patientWeight: '',
        patientHeight: '',
        dateOfBirth: '',
        newborn: false
      });
      setHealthFacilityData({
        voucherNumber: '',
        practitionerName: '',
        healthFacility: '',
        licenseNumber: '',
        clientName: '',
        clientTin: ''
      });
      setOtherInsuranceData({
        insuranceNumber: '',
        affiliationNumber: '',
        affiliateFullNames: '',
        clientPercentage: '',
        gender: '',
        dateOfBirth: '',
        dutyStation: '',
        patientWeight: '',
        patientHeight: ''
      });
    }
  }, [isOpen]);
  
  // Form state for personal details
  const [personalData, setPersonalData] = useState({
    insuranceNumber: '',
    beneficialNumber: '',
    clientPercentage: '',
    affiliateName: '',
    beneficialName: '',
    gender: '',
    relationship: '',
    patientNumber: '',
    dutyStation: '',
    patientWeight: '',
    patientHeight: '',
    dateOfBirth: '',
    newborn: false
  });

  // Form state for health facility information
  const [healthFacilityData, setHealthFacilityData] = useState({
    voucherNumber: '',
    practitionerName: '',
    healthFacility: '',
    licenseNumber: '',
    clientName: '',
    clientTin: ''
  });

  // Form state for other insurances
  const [otherInsuranceData, setOtherInsuranceData] = useState({
    insuranceNumber: '',
    affiliationNumber: '',
    affiliateFullNames: '',
    clientPercentage: '',
    gender: '',
    dateOfBirth: '',
    dutyStation: '',
    patientWeight: '',
    patientHeight: ''
  });

  // Insurance options
  const insuranceOptions = [
    { value: 'ram', label: 'RAM Insurance' },
    { value: 'uap', label: 'UAP Insurance' },
    { value: 'old-mutual', label: 'Old Mutual Insurance' },
    { value: 'sanlam', label: 'Sanlam Insurance' },
    { value: 'prudential', label: 'Prudential Insurance' },
    { value: 'heritage', label: 'Heritage Insurance' }
  ];

  // Insurance ID options with actual ID formats
  const insuranceIdOptions = [
    { value: 'ram-001', label: 'RAM-INS-2023-001', patientName: 'John Doe' },
    { value: 'uap-001', label: 'UAP-COV-876543', patientName: 'Jane Smith' },
    { value: 'old-mutual-001', label: 'OM-POL-124578', patientName: 'Robert Johnson' },
    { value: 'sanlam-001', label: 'SAN-CLI-987654', patientName: 'Emily Davis' },
    { value: 'prudential-001', label: 'PRU-MED-456123', patientName: 'Michael Wilson' },
    { value: 'heritage-001', label: 'HER-HEALTH-789456', patientName: 'Sarah Brown' }
  ];

  // Filter cart items based on search term
  const filteredCartItems = cartItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle product search selection
  const handleProductSearch = (value: string) => {
    setProductSearch(value);
    // Find the selected product
    const selectedProduct = productOptions.find(option => option.value === value);
    if (selectedProduct) {
      // Check if product already exists in cart
      const existingItemIndex = cartItems.findIndex(item => item.name === selectedProduct.label);
      if (existingItemIndex !== -1) {
        // If exists, increase quantity
        const updatedCart = [...cartItems];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        setCartItems(updatedCart);
      } else {
        // If not exists, add new item
        const newItem = {
          id: Date.now(), // Generate unique ID
          name: selectedProduct.label,
          price: selectedProduct.price,
          quantity: 1
        };
        setCartItems(prev => [...prev, newItem]);
      }
      setProductSearch(''); // Clear search
    }
  };
  
  // Handle insurance search selection
  const handleInsuranceSearch = (value: string) => {
    setInsuranceSearch(value);
    setSelectedInsurance(value);
    // Reset form steps when new insurance is selected
    setActiveStep(0);
    setIsPatientRegistered(false);
    setRegisteredPatientData(null);
    // Handle insurance selection logic here
    console.log('Selected insurance:', value);
  };

  // Handle insurance ID search selection
  const handleInsuranceIdSearch = (value: string) => {
    setInsuranceIdSearch(value);
    // Find if the insurance ID exists in our system
    const selectedInsuranceId = insuranceIdOptions.find(option => option.value === value);
    if (selectedInsuranceId) {
      // If insurance ID exists, mark patient as registered
      setIsPatientRegistered(true);
      setRegisteredPatientData(selectedInsuranceId);
      // Set the patient data
      if (selectedInsurance === 'ram') {
        setPersonalData(prev => ({
          ...prev,
          beneficialName: selectedInsuranceId.patientName
        }));
      } else {
        setOtherInsuranceData(prev => ({
          ...prev,
          affiliateFullNames: selectedInsuranceId.patientName
        }));
      }
    } else {
      // If insurance ID doesn't exist, reset registration status
      setIsPatientRegistered(false);
      setRegisteredPatientData(null);
    }
  };

  // Handle personal data change
  const handlePersonalDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setPersonalData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'newborn') {
      // Handle radio button for newborn question
      setPersonalData(prev => ({ ...prev, [name]: value === 'yes' }));
    } else {
      setPersonalData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle health facility data change
  const handleHealthFacilityDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHealthFacilityData(prev => ({ ...prev, [name]: value }));
  };

  // Handle other insurance data change
  const handleOtherInsuranceDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOtherInsuranceData(prev => ({ ...prev, [name]: value }));
  };

  // Handle autocomplete select changes for personal details
  const handlePersonalSelectChange = (name: string, value: string) => {
    setPersonalData(prev => ({ ...prev, [name]: value }));
  };

  // Handle autocomplete select changes for other insurances
  const handleOtherInsuranceSelectChange = (name: string, value: string) => {
    setOtherInsuranceData(prev => ({ ...prev, [name]: value }));
  };

  // Update quantity of an item in cart
  const updateQuantity = (id: number, change: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Steps configuration
  const steps = [
    { id: 'personal-details', title: 'Personal Details', description: 'Patient information' },
    { id: 'health-facility', title: 'Health Facility', description: 'Treatment details' },
    { id: 'review-confirm', title: 'Review & Confirm', description: 'Verify information' }
  ];

  // Handle next step
  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Submit all form data
    console.log('Personal Data:', personalData);
    console.log('Health Facility Data:', healthFacilityData);
    console.log('Other Insurance Data:', otherInsuranceData);
    
    // Call the onConfirmPatient callback with patient data
    if (onConfirmPatient) {
      // Find the selected insurance ID option to get the actual label
      const selectedInsuranceIdOption = insuranceIdOptions.find(option => option.value === insuranceIdSearch);
      const actualInsuranceId = selectedInsuranceIdOption ? selectedInsuranceIdOption.label : insuranceIdSearch;
      
      const patientData = {
        insuranceId: actualInsuranceId,
        patientName: selectedInsurance === 'ram' ? personalData.beneficialName : otherInsuranceData.affiliateFullNames,
        insuranceType: insuranceOptions.find(opt => opt.value === selectedInsurance)?.label || 'N/A'
      };
      onConfirmPatient(patientData);
    }
    
    // Close modal after submission
    onClose();
  };

  // Handle keyboard navigation (Enter key to proceed to next step)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Check if the event is coming from an input or select element
    const target = e.target as HTMLElement;
    const isFromInput = target.tagName === 'INPUT' || target.tagName === 'SELECT';
    
    // Only proceed if Enter is pressed and not from an autocomplete select
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey && isFromInput) {
      // Check if this is from our AutoCompleteSelect component
      const isFromAutoComplete = target.closest('.relative.pr-8') !== null;
      
      // Only proceed to next step if not from AutoCompleteSelect
      if (!isFromAutoComplete) {
        e.preventDefault();
        handleNextStep();
      }
    }
  };

  // Render step content with keyboard support
  const renderStepContent = () => {
    // If patient is already registered, show confirmation message
    if (isPatientRegistered && registeredPatientData) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="bg-green-50 rounded-full p-4 mb-6">
            <CheckCircleOutlined className="text-green-500 text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Patient Already Registered</h3>
          <p className="text-gray-600 text-center max-w-md mb-6">
            This patient is already registered in our system. You can proceed with the transaction.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Patient Name</p>
                <p className="font-medium" style={{ color: '#959ba5' }}>{registeredPatientData.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Insurance ID</p>
                <p className="font-medium" style={{ color: '#959ba5' }}>{registeredPatientData.label}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Insurance Type</p>
                <p className="font-medium" style={{ color: '#959ba5' }}>
                  {insuranceOptions.find(opt => opt.value === selectedInsurance)?.label || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (activeStep) {
      case 0:
        return (
          <div 
            className="space-y-4" 
            tabIndex={0} 
            onKeyDown={handleKeyDown}
          >
            {selectedInsurance === 'ram' ? (
              // RAM Insurance Personal Details Form
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="w-full">
                    <Input
                      label="Insurance Number"
                      name="insuranceNumber"
                      value={personalData.insuranceNumber}
                      onChange={handlePersonalDataChange}
                      placeholder="Enter insurance number"
                    />
                  </div>
                  
                  <div className="w-full">
                    <Input
                      label="Beneficial Number"
                      name="beneficialNumber"
                      value={personalData.beneficialNumber}
                      onChange={handlePersonalDataChange}
                      placeholder="Enter beneficial number"
                    />
                  </div>
                  
                  <div className="w-full">
                    <Input
                      label="Client Percentage"
                      name="clientPercentage"
                      value={personalData.clientPercentage}
                      onChange={handlePersonalDataChange}
                      type="number"
                      placeholder="Enter client percentage"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="w-full">
                    <Input
                      label="Affiliate Name"
                      name="affiliateName"
                      value={personalData.affiliateName}
                      onChange={handlePersonalDataChange}
                      placeholder="Enter affiliate name"
                    />
                  </div>
                  
                  <div className="w-full">
                    <AutoCompleteSelect
                      label="Gender"
                      name="gender"
                      value={personalData.gender}
                      onChange={(value) => handlePersonalSelectChange('gender', value)}
                      placeholder="Select gender"
                      options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' }
                      ]}
                    />
                  </div>
                  
                  <div className="w-full">
                    <Input
                      label="Beneficial Name"
                      name="beneficialName"
                      value={personalData.beneficialName}
                      onChange={handlePersonalDataChange}
                      placeholder="Enter beneficial name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="w-full">
                    <Input
                      label="Date of Birth (DoB)"
                      name="dateOfBirth"
                      value={personalData.dateOfBirth}
                      onChange={handlePersonalDataChange}
                      type="date"
                    />
                  </div>
                  
                  <div className="w-full">
                    <AutoCompleteSelect
                      label="Relationship"
                      name="relationship"
                      value={personalData.relationship}
                      onChange={(value) => handlePersonalSelectChange('relationship', value)}
                      placeholder="Select relationship"
                      options={[
                        { value: 'self', label: 'Self' },
                        { value: 'spouse', label: 'Spouse' },
                        { value: 'child', label: 'Child' }
                      ]}
                    />
                  </div>
                  
                  <div className="w-full">
                    <Input
                      label="Patient Number"
                      name="patientNumber"
                      value={personalData.patientNumber}
                      onChange={handlePersonalDataChange}
                      placeholder="Enter patient number"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="w-full">
                    <Input
                      label="Patient Weight (kg)"
                      name="patientWeight"
                      value={personalData.patientWeight}
                      onChange={handlePersonalDataChange}
                      type="number"
                      placeholder="Enter weight"
                    />
                  </div>
                  
                  <div className="w-full">
                    <Input
                      label="Patient Height (cm)"
                      name="patientHeight"
                      value={personalData.patientHeight}
                      onChange={handlePersonalDataChange}
                      type="number"
                      placeholder="Enter height"
                    />
                  </div>
                  
                  <div className="w-full">
                    <Input
                      label="Duty Station"
                      name="dutyStation"
                      value={personalData.dutyStation}
                      onChange={handlePersonalDataChange}
                      placeholder="Enter duty station"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Was this patient a newborn infant (less than 3 months old?) 
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="newborn"
                        value="yes"
                        checked={personalData.newborn === true}
                        onChange={() => setPersonalData(prev => ({ ...prev, newborn: true }))}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="newborn"
                        value="no"
                        checked={personalData.newborn === false}
                        onChange={() => setPersonalData(prev => ({ ...prev, newborn: false }))}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              // Other Insurances Personal Details Form
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <Input
                      label="Insurance Number"
                      name="insuranceNumber"
                      value={otherInsuranceData.insuranceNumber}
                      onChange={handleOtherInsuranceDataChange}
                      placeholder="Enter insurance number"
                    />
                  </div>
                  
                  <div className="w-full">
                    <Input
                      label="Affiliation Number"
                      name="affiliationNumber"
                      value={otherInsuranceData.affiliationNumber}
                      onChange={handleOtherInsuranceDataChange}
                      placeholder="Enter affiliation number"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <Input
                      label="Affiliate Full Names"
                      name="affiliateFullNames"
                      value={otherInsuranceData.affiliateFullNames}
                      onChange={handleOtherInsuranceDataChange}
                      placeholder="Enter affiliate full names"
                    />
                  </div>
                  
                  <div className="w-full">
                    <Input
                      label="Client Percentage"
                      name="clientPercentage"
                      value={otherInsuranceData.clientPercentage}
                      onChange={handleOtherInsuranceDataChange}
                      type="number"
                      placeholder="Enter client percentage"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <AutoCompleteSelect
                      label="Gender"
                      name="gender"
                      value={otherInsuranceData.gender}
                      onChange={(value) => handleOtherInsuranceSelectChange('gender', value)}
                      placeholder="Select gender"
                      options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' }
                      ]}
                    />
                  </div>
                  
                  <div className="w-full">
                    <Input
                      label="Date of Birth (DoB)"
                      name="dateOfBirth"
                      value={otherInsuranceData.dateOfBirth}
                      onChange={handleOtherInsuranceDataChange}
                      type="date"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="w-full">
                    <Input
                      label="Duty Station"
                      name="dutyStation"
                      value={otherInsuranceData.dutyStation}
                      onChange={handleOtherInsuranceDataChange}
                      placeholder="Enter duty station"
                    />
                  </div>
                  
                  <div className="w-full">
                    <Input
                      label="Patient Weight (kg)"
                      name="patientWeight"
                      value={otherInsuranceData.patientWeight}
                      onChange={handleOtherInsuranceDataChange}
                      type="number"
                      placeholder="Enter weight"
                    />
                  </div>
                  
                  <div className="w-full">
                    <Input
                      label="Patient Height (cm)"
                      name="patientHeight"
                      value={otherInsuranceData.patientHeight}
                      onChange={handleOtherInsuranceDataChange}
                      type="number"
                      placeholder="Enter height"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 1:
        return (
          <div 
            className="space-y-4" 
            tabIndex={0} 
            onKeyDown={handleKeyDown}
          >
            {/* Health Facility Information Form (same for all insurances) */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full">
                  <Input
                    label="Voucher Number"
                    name="voucherNumber"
                    value={healthFacilityData.voucherNumber}
                    onChange={handleHealthFacilityDataChange}
                    placeholder="Enter voucher number"
                  />
                </div>
                
                <div className="w-full">
                  <Input
                    label="Health Practitioner's Name"
                    name="practitionerName"
                    value={healthFacilityData.practitionerName}
                    onChange={handleHealthFacilityDataChange}
                    placeholder="Enter practitioner name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full">
                  <Input
                    label="Treatment Health Facility"
                    name="healthFacility"
                    value={healthFacilityData.healthFacility}
                    onChange={handleHealthFacilityDataChange}
                    placeholder="Enter health facility"
                  />
                </div>
                
                <div className="w-full">
                  <Input
                    label="Practitioner License Number"
                    name="licenseNumber"
                    value={healthFacilityData.licenseNumber}
                    onChange={handleHealthFacilityDataChange}
                    placeholder="Enter license number"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full">
                  <Input
                    label="Client Name"
                    name="clientName"
                    value={healthFacilityData.clientName}
                    onChange={handleHealthFacilityDataChange}
                    placeholder="Enter client name"
                  />
                </div>
                
                <div className="w-full">
                  <Input
                    label="Client TIN Number"
                    name="clientTin"
                    value={healthFacilityData.clientTin}
                    onChange={handleHealthFacilityDataChange}
                    placeholder="Enter TIN number"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div 
            className="space-y-6" 
            tabIndex={0} 
            onKeyDown={handleKeyDown}
          >
            {/* Review & Confirm Step */}
            <StatCard className="bg-gray-50 rounded-lg p-4">
              <SectionHeader title="Personal Details" showDivider={true} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedInsurance === 'ram' ? (
                  <>
                    <div>
                      <p className="text-sm text-gray-600">Insurance Number</p>
                      <p className="font-medium">{personalData.insuranceNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Beneficial Number</p>
                      <p className="font-medium">{personalData.beneficialNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Client Percentage</p>
                      <p className="font-medium">{personalData.clientPercentage || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Affiliate Name</p>
                      <p className="font-medium">{personalData.affiliateName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Beneficial Name</p>
                      <p className="font-medium">{personalData.beneficialName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Gender</p>
                      <p className="font-medium">{personalData.gender || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Relationship</p>
                      <p className="font-medium">{personalData.relationship || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Patient Number</p>
                      <p className="font-medium">{personalData.patientNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duty Station</p>
                      <p className="font-medium">{personalData.dutyStation || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Patient Weight</p>
                      <p className="font-medium">{personalData.patientWeight || 'N/A'} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Patient Height</p>
                      <p className="font-medium">{personalData.patientHeight || 'N/A'} cm</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Newborn</p>
                      <p className="font-medium">{personalData.newborn ? 'Yes' : 'No'}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-600">Insurance Number</p>
                      <p className="font-medium">{otherInsuranceData.insuranceNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Affiliation Number</p>
                      <p className="font-medium">{otherInsuranceData.affiliationNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Affiliate Full Names</p>
                      <p className="font-medium">{otherInsuranceData.affiliateFullNames || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Client Percentage</p>
                      <p className="font-medium">{otherInsuranceData.clientPercentage || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Gender</p>
                      <p className="font-medium">{otherInsuranceData.gender || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p className="font-medium">{otherInsuranceData.dateOfBirth || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duty Station</p>
                      <p className="font-medium">{otherInsuranceData.dutyStation || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Patient Weight</p>
                      <p className="font-medium">{otherInsuranceData.patientWeight || 'N/A'} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Patient Height</p>
                      <p className="font-medium">{otherInsuranceData.patientHeight || 'N/A'} cm</p>
                    </div>
                  </>
                )}
              </div>
            </StatCard>
            
            <StatCard className="bg-gray-50 rounded-lg p-4">
              <SectionHeader title="Health Facility Information" showDivider={true} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Voucher Number</p>
                  <p className="font-medium">{healthFacilityData.voucherNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Health Practitioner's Name</p>
                  <p className="font-medium">{healthFacilityData.practitionerName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Treatment Health Facility</p>
                  <p className="font-medium">{healthFacilityData.healthFacility || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Practitioner License Number</p>
                  <p className="font-medium">{healthFacilityData.licenseNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Client Name</p>
                  <p className="font-medium">{healthFacilityData.clientName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Client TIN Number</p>
                  <p className="font-medium">{healthFacilityData.clientTin || 'N/A'}</p>
                </div>
              </div>
            </StatCard>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Footer buttons
  const footer = (
    <div className="flex justify-between space-x-3">
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <div className="flex space-x-3">
        {activeStep > 0 && !isPatientRegistered && (
          <Button variant="secondary" onClick={handlePrevStep}>
            Back
          </Button>
        )}
        {isPatientRegistered ? (
          <Button variant="primary" onClick={handleSubmit}>
            Confirm Patient
          </Button>
        ) : activeStep < steps.length - 1 ? (
          <Button variant="primary" onClick={handleNextStep}>
            Continue
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSubmit}>
            Confirm Patient
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Patient Details"
      subtitle="Manage patient information"
      maxWidth="max-w-6xl"
      footer={footer}
    >
      {/* Scrollable content */}
      <div className="overflow-y-auto max-h-[60vh] pr-0">
        {/* Section 1: Patient Insurance */}
        <div className="flex items-center justify-between p-2 mb-0">
          <div className="flex items-center justify-center flex-grow">
            <div className="w-full mr-0 ml-0">
              <StatCard
                value=""
                description=""
                className="hover:shadow-md transition-shadow h-full"
              >
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <InsuranceAutoCompleteSelect
                        label="Search Insurance"
                        value={insuranceSearch}
                        onChange={handleInsuranceSearch}
                        options={insuranceOptions}
                        placeholder="Search insurance name..."
                        actionButton={{
                          icon: insuranceSearch ? <CloseOutlined /> : <SearchOutlined />,
                          onClick: () => {
                            if (insuranceSearch) {
                              // Reset the insurance search
                              handleInsuranceSearch('');
                              // Also reset the insurance ID search since insurance is cleared
                              setInsuranceIdSearch('');
                              setSelectedInsurance('');
                              setIsPatientRegistered(false);
                              setRegisteredPatientData(null);
                            } else {
                              console.log('Search insurance');
                            }
                          }
                        }}
                        swapActionButtonPosition={true}
                      />
                    </div>
                  </div>
                </div>
              </StatCard>
            </div>
            <div className="flex-grow text-right ml-4">
              <StatCard
                value=""
                description=""
                className="hover:shadow-md transition-shadow h-full"
              >
                <div className="mt-2">
                  <div className="flex items-center justify-end">
                    <div className="flex-grow">
                      <InsuranceIdAutoCompleteSelect
                        label="Search Insurance ID"
                        value={insuranceIdSearch}
                        onChange={handleInsuranceIdSearch}
                        options={insuranceIdOptions}
                        placeholder="Enter insurance ID..."
                        actionButton={{
                          icon: insuranceIdSearch ? <CloseOutlined /> : <SearchOutlined />,
                          onClick: () => {
                            if (insuranceIdSearch) {
                              // Reset the insurance ID search
                              handleInsuranceIdSearch('');
                              setIsPatientRegistered(false);
                              setRegisteredPatientData(null);
                            } else {
                              console.log('Search insurance');
                            }
                          }
                        }}
                        swapActionButtonPosition={true}
                        disabled={!selectedInsurance}
                        labelAlign="left"
                        className="w-full md:w-80 lg:w-96"
                      />
                    </div>
                  </div>
                </div>
              </StatCard>
            </div>
          </div>
        </div>
        
        {/* Section 2: Multi-step Insurance Form or Registered Patient Message */}
        {selectedInsurance ? (
          isPatientRegistered ? (
            // Show registered patient message without stepper and sidebar
            <div className="bg-white rounded-xl shadow-sm p-2">
              <StatCard
                value=""
                description=""
                className="hover:shadow-md transition-shadow h-full pl-12 pr-12"
              >
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="bg-gray-100 rounded-full p-4 mb-6" >
                    <CheckCircleOutlined className="text-gray-700 text-4xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Patient Already Registered</h3>
                  <p className="text-gray-600 text-center max-w-md mb-6">
                    This patient is already registered in our system. You can proceed with the transaction.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Patient Name</p>
                        <p className="font-medium" style={{ color: '#959ba5' }}>{registeredPatientData.patientName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Insurance ID</p>
                        <p className="font-medium" style={{ color: '#959ba5' }}>{registeredPatientData.label}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Insurance Type</p>
                        <p className="font-medium" style={{ color: '#959ba5' }}>
                          {insuranceOptions.find(opt => opt.value === selectedInsurance)?.label || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </StatCard>
            </div>
          ) : (
            // Show multi-step form with stepper and sidebar
            <div className="flex h-fit bg-gray-50 rounded-xl p-2">
              {/* Sidebar */}
              <div className="w-50 bg-white border-r border-gray-200 p-33 rounded-xl h-fit sticky top-4">
                <InsuranceFormSidebar 
                  activeStep={activeStep} 
                  onStepChange={setActiveStep} 
                  patientData={{
                    insuranceNumber: selectedInsurance === 'ram' ? personalData.insuranceNumber : otherInsuranceData.insuranceNumber,
                    patientName: selectedInsurance === 'ram' ? personalData.beneficialName : otherInsuranceData.affiliateFullNames,
                    insuranceType: insuranceOptions.find(opt => opt.value === selectedInsurance)?.label || 'N/A'
                  }}
                />
              </div>

              {/* Main Content */}
              <div className="flex-1 p-0.3 rounded-r-xl" style={{ marginTop: '0rem', marginLeft: '1rem' }}>
                {/* Stepper - Fixed at top */}
                <div className="sticky top-4 z-10" style={{ backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity, 1))', borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem', padding: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                  <div className="flex items-center justify-between relative">
                    {/* Progress line */}
                    <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
                    <div className="absolute top-4 left-0 h-0.5 bg-[rgb(133,237,104)] z-10 transition-all duration-300"
                      style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                    ></div>
                    
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex flex-col items-center z-20" style={{ width: `${100 / steps.length}%` }}>
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
                          className={`mt-2 text-sm font-medium text-center w-full px-2 ${
                            index <= activeStep ? 'text-gray-800' : 'text-gray-500'
                          }`}
                        >
                          {step.title}
                        </div>
                        <div 
                          className={`text-xs text-center w-full px-4 mt-1 ${
                            index <= activeStep ? 'text-gray-600' : 'text-gray-400'
                          }`}
                        >
                          {step.description}
                        </div>
                      </div>
                    ))}
                    {/* Add registered step */}
                    <div className="flex flex-col items-center z-20" style={{ width: `${100 / steps.length}%` }}>
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isPatientRegistered
                            ? 'bg-[rgb(133,237,104)] text-white' 
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isPatientRegistered ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <span>4</span>
                        )}
                      </div>
                      <div 
                        className={`mt-2 text-sm font-medium text-center w-full px-2 ${
                          isPatientRegistered ? 'text-gray-800' : 'text-gray-500'
                        }`}
                      >
                        Registered
                      </div>
                      <div 
                        className={`text-xs text-center w-full px-4 mt-1 ${
                          isPatientRegistered ? 'text-gray-600' : 'text-gray-400'
                        }`}
                      >
                        Patient found
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Scrollable Content Area */}
                <div className="bg-white rounded-xl shadow-sm mb-2 mt-4">
                  <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(60vh - 120px)' }}>
                    {renderStepContent()}
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-2 mb-6">
            <StatCard
              value=""
              description=""
              className="hover:shadow-md transition-shadow h-full"
            >
              <div className="flex flex-col items-center justify-center h-full" style={{ minHeight: '300px' }}>
                <div className="bg-gray-100 rounded-full p-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Insurance Selected</h3>
                <p className="text-gray-500 text-center max-w-md mb-4">
                  Please select an insurance provider or choose "No Insurance" to proceed
                </p>
                <div className="flex items-center text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Select insurance from the search options above
                </div>
              </div>
            </StatCard>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PatientModal;