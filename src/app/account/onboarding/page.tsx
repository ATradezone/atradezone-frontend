'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeftOutlined, CheckOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Button from '@/components/ui/Button';
import CloseButton from '@/components/ui/CloseButton';
import SectionHeader from '@/components/layout/SectionHeader';
import StatCard from '@/components/ui/StatCard';
import PageTitle from '@/components/ui/PageTitle';
import AuthBranding from '@/app/auth/components/AuthBranding';
import OnboardingSkeleton from './components/OnboardingSkeleton';
import { Validation } from '@/components/shared';
import Input from '@/components/ui/Input';
import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect';
import { fetchCountryOptions } from '@/utils/countryUtils';

// Add CSS for animations
const CelebrationStyles = `
  @keyframes pop-in {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  .animate-pop-in {
    animation: pop-in 0.3s ease-out forwards;
  }
  
  .animate-bounce {
    animation: bounce 1s infinite;
  }
`;

export default function Onboarding() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubOptions, setSelectedSubOptions] = useState<string[]>([]); // For Trading sub-options
  const [customCategory, setCustomCategory] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [showSubOptionsOverlay, setShowSubOptionsOverlay] = useState<boolean>(false); // To show/hide sub-options overlay
  const [showWaitingListOverlay, setShowWaitingListOverlay] = useState<boolean>(false); // For waiting list overlay
  const [showWaitingListThankYou, setShowWaitingListThankYou] = useState<boolean>(false); // For thank you message
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showBusinessForm, setShowBusinessForm] = useState<boolean>(false); // New state for business form
  const [currentStep, setCurrentStep] = useState<number>(1); // New state for form steps
  const [businessData, setBusinessData] = useState({
    businessName: '',
    businessCategory: selectedCategory || '',
    country: 'Rwanda',
    phoneNumber: '',
    businessLocation: '',
    businessEmail: '',
    tinNumber: '',
    businessCertificate: null as File | null,
    ownerFullName: '',
    ownerCountry: 'Rwanda',
    ownerPhoneNumber: '',
    ownerEmail: '',
    legalIdType: 'national-id',
    legalIdNumber: '',
    locationName: '',
    locationCategory: selectedCategory || '',
    locationPhoneNumber: ''
  });
  const [waitingListData, setWaitingListData] = useState({
    businessName: '',
    businessLocation: '',
    ownerEmail: '',
    ownerPhoneNumber: ''
  });
  const [countryOptions, setCountryOptions] = useState<Array<{value: string, label: string}>>([]);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState<boolean>(false); // For collapsible additional info
  const [showBusinessLocation, setShowBusinessLocation] = useState<boolean>(false); // For collapsible business location
  const [showCelebration, setShowCelebration] = useState<boolean>(false); // For celebration popup
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get business name and email from query parameters
  const businessName = searchParams.get('businessName') || '';
  const email = searchParams.get('email') || '';

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Load country options
    fetchCountryOptions().then(options => {
      setCountryOptions(options);
    });

    return () => clearTimeout(timer);
  }, []);

  // Function to get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return { 
        greeting: 'Good Morning', 
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#85eb68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun w-8 h-8">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
        )
      };
    } else if (hour < 18) {
      return { 
        greeting: 'Good Afternoon', 
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#85eb68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun w-8 h-8">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
        )
      };
    } else {
      return { 
        greeting: 'Good Evening', 
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#85eb68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon w-8 h-8">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        )
      };
    }
  };

  const { greeting, icon } = getGreeting();

  const handleCategorySelect = (categoryId: string) => {
    // Check if the category is disabled (Hospitality or Logistics)
    const category = categories.find(cat => cat.id === categoryId);
    if (category && category.disabled) {
      // Set the selected category and show waiting list overlay for disabled categories
      setSelectedCategory(categoryId);
      setShowWaitingListOverlay(true);
      return;
    }
    
    setSelectedCategory(categoryId);
    
    // Show sub-options only if General Trading is selected (remove Pharmacy)
    if (categoryId === 'general-trading') {
      setShowSubOptionsOverlay(true);
      setSelectedSubOptions([]); // Reset sub-options when General Trading is selected
    } else {
      setShowSubOptionsOverlay(false);
      setSelectedSubOptions([]); // Clear sub-options for other categories
    }
    
    // Remove the Other category logic
    setShowCustomInput(false);
    setCustomCategory('');
  };

  // Handle sub-option selection for General Trading only
  const handleSubOptionSelect = (option: string) => {
    setSelectedSubOptions(prev => {
      if (prev.includes(option)) {
        // Remove option if already selected
        return prev.filter(item => item !== option);
      } else {
        // Add option if not selected
        return [...prev, option];
      }
    });
  };

  const handleContinue = () => {
    // Show business creation form instead of redirecting
    if (selectedCategory) {
      setShowBusinessForm(true);
      // Set the selected category in business data
      setBusinessData(prev => ({
        ...prev,
        businessCategory: selectedCategory,
        locationCategory: selectedCategory
      }));
    }
  };

  // New handler for business form submission
  const handleBusinessFormSubmit = () => {
    // Show celebration inside the card instead of redirecting immediately
    setShowCelebration(true);
  };

  // New handler to go back to category selection
  const handleBackToCategories = () => {
    setShowBusinessForm(false);
  };

  // Handler for moving to next step in business form
  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleBusinessFormSubmit();
    }
  };

  // Handler for moving to previous step in business form
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      handleBackToCategories();
    }
  };

  // Handler for input changes in business form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBusinessData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBusinessData(prev => ({
        ...prev,
        businessCertificate: e.target.files![0]
      }));
    }
  };

  // Handler for waiting list form input changes
  const handleWaitingListInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWaitingListData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler to submit waiting list form
  const handleWaitingListSubmit = () => {
    // In a real app, you would submit this data to your backend
    console.log('Waiting list submission:', waitingListData);
    // Show thank you message instead of closing the overlay
    setShowWaitingListThankYou(true);
  };

  // Handler to close waiting list thank you message
  const handleCloseWaitingListThankYou = () => {
    setShowWaitingListOverlay(false);
    setShowWaitingListThankYou(false);
    setWaitingListData({
      businessName: '',
      businessLocation: '',
      ownerEmail: '',
      ownerPhoneNumber: ''
    });
  };

  // Handler to cancel waiting list form
  const handleCancelWaitingList = () => {
    setShowWaitingListOverlay(false);
    setWaitingListData({
      businessName: '',
      businessLocation: '',
      ownerEmail: '',
      ownerPhoneNumber: ''
    });
  };

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const categories = [
    { 
      id: 'general-trading', 
      name: 'General Trading', 
      description: 'General trading services and product distribution',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 w-8 h-8">
          <path d="M14 11V7a1 1 0 0 1 2 0v4"/>
          <path d="M14 11h8v8a2 2 0 0 1-2 2h-6v-8a2 2 0 0 0-2-2z"/>
          <path d="m9 15 3-3 3 3"/>
        </svg>
      )
    },
    { 
      id: 'healthcare', 
      name: 'Pharmacy', 
      description: 'Pharmaceutical services and medication providers',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 w-8 h-8">
          <path d="M7 11V7a1 1 0 0 1 2 0v4"/>
          <path d="M11 11V7a1 1 0 0 1 2 0v4"/>
          <path d="M15 11V7a1 1 0 0 1 2 0v4"/>
          <path d="M3 3v18h18V3H3z"/>
          <path d="M3 9h18"/>
          <path d="M3 15h18"/>
        </svg>
      )
    },
    { 
      id: 'manufacturing', 
      name: 'Manufacturing', 
      description: 'Production and manufacturing operations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 w-8 h-8">
          <path d="m12 14 4-4"/>
          <path d="m12 14-4-4"/>
          <path d="M12 14v8"/>
          <path d="M4 20h16"/>
          <path d="M6 16h12"/>
          <path d="M8 12h8"/>
          <path d="M10 8h4"/>
        </svg>
      )
    },
    { 
      id: 'construction', 
      name: 'Construction', 
      description: 'Building, renovation, and construction services',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 w-8 h-8">
          <path d="M12 2v20"/>
          <path d="M6 2v20"/>
          <path d="M18 2v20"/>
          <path d="M2 6h20"/>
          <path d="M2 12h20"/>
          <path d="M2 18h20"/>
        </svg>
      )
    },
    { 
      id: 'services', 
      name: 'Services', 
      description: 'Professional services and consulting',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 w-8 h-8">
          <path d="M12 4V2"/>
          <path d="M5 10v4a7 7 0 0 0 14 0v-4"/>
          <path d="M4 10h16"/>
          <path d="M12 10v10"/>
          <path d="M9 19l3 3 3-3"/>
        </svg>
      )
    },
    { 
      id: 'business-partner', 
      name: 'Business Partner', 
      description: 'Strategic partnerships and collaborations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 w-8 h-8">
          <path d="M17 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    { 
      id: 'developer', 
      name: 'Developer', 
      description: 'Integrate with our EBM API for custom solutions',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 w-8 h-8">
          <path d="M10 20l4-16m4 4l4 4-4 4"/>
          <path d="M6 16l-4-4 4-4"/>
        </svg>
      )
    },
    { 
      id: 'hospitality', 
      name: 'Hospitality', 
      description: 'Coming soon - Early adopters get exclusive discounts!',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 w-8 h-8">
          <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      disabled: true
    },
    { 
      id: 'logistics', 
      name: 'Logistics', 
      description: 'Coming soon - Early adopters get exclusive discounts!',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 w-8 h-8">
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
          <path d="M12 18V6l9-3v12"/>
          <circle cx="18" cy="18" r="3"/>
          <circle cx="6" cy="18" r="3"/>
        </svg>
      ),
      disabled: true
    },
  ];

  // Sub-options for Trading (remove Pharmacy)
  const pharmacySubOptions = [
    { 
      id: 'retail', 
      name: 'Retail', 
      description: 'Retail trading services'
    },
    { 
      id: 'supplier', 
      name: 'Supplier', 
      description: 'Product supplier services'
    }
  ];

  const handleCancelSubOptions = () => {
    setShowSubOptionsOverlay(false);
    setSelectedSubOptions([]);
  };

  const handleConfirmSubOptions = () => {
    setShowSubOptionsOverlay(false);
  };

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Set dynamic page title */}
        <PageTitle title="Business Category Selection" />
        
        {/* Left Side - Branding */}
        <AuthBranding />
        
        {/* Right Side - Category Selection */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-20 bg-white min-h-screen lg:min-h-0">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Logo */}
            <div className="md:hidden text-center mb-6 sm:mb-8">
              <div className="h-12 w-auto object-contain mx-auto mb-2 bg-gray-300 rounded animate-pulse"></div>
            </div>
            
            <div className="mb-8 text-center lg:text-left">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
            </div>
            
            <OnboardingSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Add animation styles */}
      <style>{CelebrationStyles}</style>
      
      {/* Set dynamic page title */}
      <PageTitle title={showBusinessForm ? (currentStep === 1 ? "Create a New Business" : "Owner Information") : "Business Category Selection"} />
      
      {/* Left Side - Branding */}
      <AuthBranding />
      
      {/* Right Side - Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-20 bg-white min-h-screen lg:min-h-0">
        <div className="w-full max-w-md mx-auto">
          {/* Show business form or category selection */}
          {showBusinessForm ? (
            // Business Creation Form
            <div>
              {/* Dynamic greetings and welcoming message */}
              <div className="mb-8 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50">
                    {icon}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 ml-3 mb-4" style={{ marginBottom: '-1rem' }}>
                    Hi there!<br />
                    <span className="text-emerald-600">{greeting}!</span>
                  </h1>
                </div>
                <p className="text-sm sm:text-base text-gray-600" style={{ color: '#6E82A5' }}>
                  {businessName || 'There'}, welcome onboard! <br />
                  {showCelebration 
                    ? "Congratulations on your successful registration!" 
                    : currentStep === 1 
                    ? "Fill in the details to register your business." 
                    : "Provide details about the business owner."}
                </p>
              </div>
              
              {/* Steps Progress Indicator */}
              {!showCelebration && (
                <div className="mb-6" style={{ backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity, 1))', borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem', marginBottom: '1.5rem', padding: '10px'}}>
                  <div className="flex items-center justify-between relative">
                    {/* Progress line */}
                    <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
                    <div 
                      className="absolute top-4 left-0 h-0.5 bg-[rgb(133,237,104)] z-10 transition-all duration-300"
                      style={{ width: `${((currentStep - 1) / 1) * 100}%` }}
                    ></div>
                    
                    {/* Step 1 - Create a New Business */}
                    <div className="flex flex-col items-center z-20" style={{ width: '50%' }}>
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          currentStep >= 1 
                            ? 'bg-[rgb(133,237,104)] text-white' 
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {currentStep > 1 ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <span>1</span>
                        )}
                      </div>
                      <div 
                        className={`mt-2 text-sm font-medium text-center w-full px-2 ${
                          currentStep >= 1 ? 'text-gray-800' : 'text-gray-500'
                        }`}
                      >
                        Create a New Business
                      </div>
                      <div 
                        className={`text-xs text-center w-full px-4 mt-1 ${
                          currentStep >= 1 ? 'text-gray-600' : 'text-gray-400'
                        }`}
                      >
                        Business information
                      </div>
                    </div>
                    
                    {/* Step 2 - Owner Information */}
                    <div className="flex flex-col items-center z-20" style={{ width: '50%' }}>
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          currentStep >= 2 
                            ? 'bg-[rgb(133,237,104)] text-white' 
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {currentStep > 2 ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <span>2</span>
                        )}
                      </div>
                      <div 
                        className={`mt-2 text-sm font-medium text-center w-full px-2 ${
                          currentStep >= 2 ? 'text-gray-800' : 'text-gray-500'
                        }`}
                      >
                        Owner Information
                      </div>
                      <div 
                        className={`text-xs text-center w-full px-4 mt-1 ${
                          currentStep >= 2 ? 'text-gray-600' : 'text-gray-400'
                        }`}
                      >
                        Business owner details
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Card container */}
              <div 
                className="p-4 sm:p-6 rounded-[15px] sm:rounded-[20px] border border-[#e1e1e1] flex flex-col relative"
                style={{
                  boxShadow: '-5px 5px 50px -5px #e1e1e1'
                }}
              >
                {/* Celebration Popup inside the card */}
                {showCelebration ? (
                  <div className="flex flex-col items-center justify-center py-8 animate-pop-in">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full opacity-75 animate-pop-in" style={{ backgroundColor: 'rgb(236 254 246)' }}></div>
                        <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(255 167 0)', border: 'solid rgb(242, 242, 242)', boxShadow: 'rgba(225, 225, 225) -5px 5px 50px -5px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" style={{ color: '#ffffff' }} />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-0">Congratulations! 🎉</h2>
                    <p className="text-gray-600 mb-0 text-center">
                      {businessData.ownerFullName ? `${businessData.ownerFullName},` : ''}
                    </p>
                    <p className="text-gray-600 mb-8 text-center">
                     Welcome onboard! Your business has been successfully registered.🎊
                    </p>
                    
                    <div className="flex justify-center space-x-2 mb-8">
                      <div className="text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>🎊</div>
                      <div className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</div>
                      <div className="text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>🎈</div>
                      <div className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</div>
                      <div className="text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎁</div>
                    </div>
                    
                    <Button
                      variant="primary"
                      onClick={() => {
                        router.push('/settings/company/renewal-billing');
                      }}
                      className="w-full max-w-xs h-10 rounded-full text-base"
                    >
                      Continue to Dashboard
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Scrollable form content */}
                    <div className="flex-grow overflow-y-auto max-h-96 py-2 px-2">
                      {/* Step 1: Business Information */}
                      {currentStep === 1 && (
                        <div className="space-y-6">
                          {/* Section 1 */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Input
                                  label="Business Name"
                                  type="text"
                                  name="businessName"
                                  value={businessData.businessName}
                                  onChange={handleInputChange}
                                  placeholder="Enter business name"
                                  className="w-full"
                                />
                              </div>
                              
                              <div>
                                <Input
                                  label="Business Category"
                                  type="text"
                                  name="businessCategory"
                                  value={businessData.businessCategory}
                                  onChange={handleInputChange}
                                  disabled
                                  className="w-full"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <AutoCompleteSelect
                                  label="Country"
                                  name="country"
                                  value={businessData.country}
                                  onChange={(value: string) => setBusinessData(prev => ({ ...prev, country: value }))}
                                  options={countryOptions}
                                  className="w-full"
                                />
                              </div>
                              
                              <div>
                                <Input
                                  label="Phone Number"
                                  type="tel"
                                  name="phoneNumber"
                                  value={businessData.phoneNumber}
                                  onChange={handleInputChange}
                                  placeholder="Enter phone number"
                                  className="w-full"
                                />
                              </div>
                            </div>
                          </div>
                          
                          {/* Section 2 - Additional Information (Collapsible) */}
                          <div className="border border-gray-200 rounded-lg">
                            <div 
                              className="flex justify-between items-center p-0 cursor-pointer"
                              onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                            >
                              <h3 className="font-medium text-gray-800">Business Information</h3>
                              {showAdditionalInfo ? <MinusOutlined style={{ color: '#1f2937' }} /> : <PlusOutlined style={{ color: '#1f2937' }} />}
                            </div>
                            
                            {showAdditionalInfo && (
                              <div className="p-0 pt-0 border-t border-gray-200 space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Certificate</label>
                                  <div 
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-400 transition-colors bg-gray-50"
                                    onClick={() => document.getElementById('businessCertificate')?.click()}
                                    onDrop={(e) => {
                                      e.preventDefault();
                                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                        const file = e.dataTransfer.files[0];
                                        if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
                                          setBusinessData(prev => ({ ...prev, businessCertificate: file }));
                                        }
                                      }
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                  >
                                    <input
                                      type="file"
                                      accept=".pdf,.png,.jpg,.jpeg"
                                      onChange={handleFileChange}
                                      className="hidden"
                                      id="businessCertificate"
                                    />
                                    <div className="flex flex-col items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                      </svg>
                                      <p className="text-gray-600 mb-1">
                                        {businessData.businessCertificate ? businessData.businessCertificate.name : "Click or drag file to this area to upload"}
                                      </p>
                                      <p className="text-gray-500 text-sm">
                                        PDF, PNG, JPG or JPEG (Max 10MB)
                                      </p>
                                      {businessData.businessCertificate && (
                                        <button
                                          type="button"
                                          className="mt-3 text-sm text-red-500 hover:text-red-700"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setBusinessData(prev => ({ ...prev, businessCertificate: null }));
                                          }}
                                        >
                                          Remove file
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Input
                                      label="Business Email"
                                      type="email"
                                      name="businessEmail"
                                      value={businessData.businessEmail}
                                      onChange={handleInputChange}
                                      placeholder="Enter business email"
                                      className="w-full"
                                    />
                                  </div>
                                  
                                  <div>
                                    <Input
                                      label="TIN Number"
                                      type="text"
                                      name="tinNumber"
                                      value={businessData.tinNumber}
                                      onChange={handleInputChange}
                                      placeholder="Enter TIN number"
                                      className="w-full"
                                    />
                                  </div>
                                </div>
                                
                                <div>
                                  <AutoCompleteSelect
                                    label="Business Location"
                                    name="businessLocation"
                                    value={businessData.businessLocation}
                                    onChange={(value: string) => setBusinessData(prev => ({ ...prev, businessLocation: value }))}
                                    options={[]}
                                    placeholder="Enter street number location"
                                    className="w-full"
                                    actionButton={{
                                      icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
                                          <path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 1.8.6 3.4 1.6 4.7L12 22l6.4-7.3c1-1.3 1.6-2.9 1.6-4.7z"/>
                                          <circle cx="12" cy="10" r="3"/>
                                        </svg>
                                      ),
                                      onClick: () => {
                                        if (navigator.geolocation) {
                                          // Show loading state
                                          setBusinessData(prev => ({ ...prev, businessLocation: 'Detecting location...' }));
                                          
                                          navigator.geolocation.getCurrentPosition(
                                            (position) => {
                                              const { latitude, longitude } = position.coords;
                                              // Format the coordinates in a more readable way
                                              setBusinessData(prev => ({ ...prev, businessLocation: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}` }));
                                            },
                                            (error) => {
                                              console.error('Error getting location:', error);
                                              setBusinessData(prev => ({ ...prev, businessLocation: '' }));
                                              // Provide more specific error messages based on the error code
                                              let errorMessage = 'Unable to retrieve your location. ';
                                              switch (error.code) {
                                                case error.PERMISSION_DENIED:
                                                  errorMessage += 'Location access was denied. Please enable location permissions for this site in your browser settings.';
                                                  break;
                                                case error.POSITION_UNAVAILABLE:
                                                  errorMessage += 'Location information is unavailable. Please check your device location settings.';
                                                  break;
                                                case error.TIMEOUT:
                                                  errorMessage += 'The request to get your location timed out. Please try again.';
                                                  break;
                                                default:
                                                  errorMessage += 'An unknown error occurred. Please check your browser settings and try again.';
                                                  break;
                                              }
                                              alert(errorMessage);
                                            },
                                            {
                                              enableHighAccuracy: true,
                                              timeout: 10000,
                                              maximumAge: 0
                                            }
                                          );
                                        } else {
                                          alert('Geolocation is not supported by your browser. Please enter location manually.');
                                        }
                                      },
                                      title: 'Click to detect location'
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Step 2: Owner Information */}
                      {currentStep === 2 && (
                        <div className="space-y-6">
                          {/* Section 1 */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Input
                                  label="Full Name"
                                  type="text"
                                  name="ownerFullName"
                                  value={businessData.ownerFullName}
                                  onChange={handleInputChange}
                                  placeholder="Enter full name"
                                  className="w-full"
                                />
                              </div>
                              
                              <div>
                                <Input
                                  label="Email Address"
                                  type="email"
                                  name="ownerEmail"
                                  value={businessData.ownerEmail}
                                  onChange={handleInputChange}
                                  placeholder="Enter email address"
                                  className="w-full"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <AutoCompleteSelect
                                  label="Country"
                                  name="ownerCountry"
                                  value={businessData.ownerCountry}
                                  onChange={(value: string) => setBusinessData(prev => ({ ...prev, ownerCountry: value }))}
                                  options={countryOptions}
                                  className="w-full"
                                />
                              </div>
                              
                              <div>
                                <Input
                                  label="Phone Number"
                                  type="tel"
                                  name="ownerPhoneNumber"
                                  value={businessData.ownerPhoneNumber}
                                  onChange={handleInputChange}
                                  placeholder="Enter phone number"
                                  className="w-full"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <AutoCompleteSelect
                                  label="Legal ID Type"
                                  name="legalIdType"
                                  value={businessData.legalIdType}
                                  onChange={(value: string) => setBusinessData(prev => ({ ...prev, legalIdType: value }))}
                                  options={[
                                    { value: '', label: 'Select ID type' },
                                    { value: 'passport', label: 'Passport' },
                                    { value: 'driver-license', label: "Driver's License" },
                                    { value: 'national-id', label: 'National ID' }
                                  ]}
                                  className="w-full"
                                />
                              </div>
                              
                              <div>
                                <Input
                                  label="Legal ID Number"
                                  type="text"
                                  name="legalIdNumber"
                                  value={businessData.legalIdNumber}
                                  onChange={handleInputChange}
                                  placeholder="Enter ID number"
                                  className="w-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Navigation Buttons - outside scrollable area */}
                    <div className="sticky bottom-0 bg-white pt-4">
                      <div className="flex justify-between">
                        <Button
                          variant="secondary"
                          onClick={handlePreviousStep}
                          className="flex items-center h-9 sm:h-10 rounded-full text-sm sm:text-base"
                          style={{ fontFamily: "'Afacad', sans-serif" }}
                        >
                          <ArrowLeftOutlined className="mr-2" />
                          {currentStep === 1 ? "Back" : "Previous"}
                        </Button>
                        
                        <Button
                          variant="primary"
                          onClick={handleNextStep}
                          className="h-9 sm:h-10 rounded-full text-sm sm:text-base"
                          style={{ fontFamily: "'Afacad', sans-serif" }}
                        >
                          {currentStep === 2 ? "Finish" : "Continue"}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            // Category Selection
            <div>
              <div className="mb-8 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50">
                    {icon}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 ml-3 mb-4" style={{ marginBottom: '-1rem' }}>
                    Hi there!<br />
                    <span className="text-emerald-600">{greeting}!</span>
                  </h1>
                </div>
                <p className="text-sm sm:text-base text-gray-600" style={{ color: '#6E82A5' }}>
                 {businessName || 'There'}, welcome onboard! <br />
                 Please select the category that best describes your business.
                </p>
              </div>
              
              {/* Card container — now with relative positioning for overlay */}
              <div 
                className="p-4 sm:p-6 rounded-[15px] sm:rounded-[20px] border border-[#e1e1e1] flex flex-col relative"
                style={{
                  boxShadow: '-5px 5px 50px -5px #e1e1e1'
                }}
              >
                {/* Scrollable categories and custom input (NO overlay inside) */}
                <div className="flex-grow overflow-y-auto max-h-96 py-2 px-2">
                  <div className="grid grid-cols-2 gap-4">
                    {categories.map(category => (
                      <div 
                        key={category.id}
                        className={`rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          selectedCategory === category.id
                            ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                            : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                        } ${category.disabled ? 'opacity-50' : ''}`}
                        style={{ 
                          minHeight: '120px',
                          boxShadow: selectedCategory === category.id ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                          paddingTop: '1rem'
                        }}
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        <div className="flex flex-col items-center justify-center h-full pb-3">
                          <div className="text-3xl mb-3">{category.icon}</div>
                          <div className="text-lg font-semibold text-gray-800 mb-1">{category.name}</div>
                          <div className="text-xs text-gray-600 text-center px-2">{category.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Custom category input when "Other" is selected */}
                  {showCustomInput && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Please specify your business category:
                      </label>
                      <Input
                        label="Please specify your business category:"
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Enter your business category"
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
                
                {/* Waiting list overlay for disabled categories */}
                {showWaitingListOverlay && (
                  <div className="absolute inset-0 bg-white rounded-lg m-6 flex flex-col z-10">
                    {showWaitingListThankYou ? (
                      // Thank you message
                      <div className="flex flex-col items-center justify-center py-8 animate-pop-in">
                        <div className="flex justify-center mb-6">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full opacity-75 animate-pop-in" style={{ backgroundColor: 'rgb(236 254 246)' }}></div>
                            <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(236 254 246)', border: 'solid 1px #85eb68'}}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" style={{ color: '#85eb68' }} />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank You! 🙏</h2>
                        <p className="text-gray-600 mb-8 text-center">
                          Thank you for your interest. We'll notify you once this category becomes available.
                        </p>
                        
                        <div className="flex justify-center space-x-2 mb-8">
                          <div className="text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>🤝</div>
                          <div className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌟</div>
                          <div className="text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>🚀</div>
                          <div className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>💼</div>
                          <div className="text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎉</div>
                        </div>
                        
                        <Button
                          variant="primary"
                          onClick={() => {
                            window.open('https://www.atradezone.ca/offices/', '_blank', 'noopener,noreferrer');
                            handleCloseWaitingListThankYou();
                          }}
                          className="w-full max-w-xs h-10 rounded-full text-base"
                        >
                          Let's Get in Touch
                        </Button>
                      </div>
                    ) : (
                      // Waiting list form
                      <>
                        <div className="flex justify-between items-center mt-3">
                          <SectionHeader 
                            title="Join our waiting list"
                            className="text-lg font-bold"
                          />
                        </div>
                        <div className="h-px bg-[#EAECF0] mt-2 mb-0"></div>
                        <p className="text-gray-600 mb-6 text-sm">
                          Be among the first to know when{' '}
                          <span className="text-[#85eb68] font-medium">
                            {categories.find(cat => cat.id === selectedCategory)?.name || 'these'}
                          </span>{' '}
                          becomes available.
                        </p>
                       
                        <div className="space-y-6 mb-0 flex-grow">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Input
                                label="Business Name"
                                type="text"
                                name="businessName"
                                value={waitingListData.businessName}
                                onChange={handleWaitingListInputChange}
                                placeholder="Enter business name"
                                className="w-full"
                                required
                              />
                            </div>
                            
                            <div>
                              <AutoCompleteSelect
                                label="Business Location"
                                name="businessLocation"
                                value={waitingListData.businessLocation}
                                onChange={(value: string) => setWaitingListData(prev => ({ ...prev, businessLocation: value }))}
                                options={[]}
                                placeholder="Enter business location"
                                className="w-full"
                                required
                                actionButton={{
                                  icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
                                      <path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 1.8.6 3.4 1.6 4.7L12 22l6.4-7.3c1-1.3 1.6-2.9 1.6-4.7z"/>
                                      <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                  ),
                                  onClick: () => {
                                    if (navigator.geolocation) {
                                      // Show loading state
                                      setWaitingListData(prev => ({ ...prev, businessLocation: 'Detecting location...' }));
                                      
                                      navigator.geolocation.getCurrentPosition(
                                        (position) => {
                                          const { latitude, longitude } = position.coords;
                                          // Format the coordinates in a more readable way
                                          setWaitingListData(prev => ({ ...prev, businessLocation: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}` }));
                                        },
                                        (error) => {
                                          console.error('Error getting location:', error);
                                          setWaitingListData(prev => ({ ...prev, businessLocation: '' }));
                                          // Provide more specific error messages based on the error code
                                          let errorMessage = 'Unable to retrieve your location. ';
                                          switch (error.code) {
                                            case error.PERMISSION_DENIED:
                                              errorMessage += 'Location access was denied. Please enable location permissions for this site in your browser settings.';
                                              break;
                                            case error.POSITION_UNAVAILABLE:
                                              errorMessage += 'Location information is unavailable. Please check your device location settings.';
                                              break;
                                            case error.TIMEOUT:
                                              errorMessage += 'The request to get your location timed out. Please try again.';
                                              break;
                                            default:
                                              errorMessage += 'An unknown error occurred. Please check your browser settings and try again.';
                                              break;
                                          }
                                          alert(errorMessage);
                                        },
                                        {
                                          enableHighAccuracy: true,
                                          timeout: 10000,
                                          maximumAge: 0
                                        }
                                      );
                                    } else {
                                      alert('Geolocation is not supported by your browser. Please enter location manually.');
                                    }
                                  },
                                  title: 'Click to detect location'
                                }}
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Input
                                label="Owner Email Address"
                                type="email"
                                name="ownerEmail"
                                value={waitingListData.ownerEmail}
                                onChange={handleWaitingListInputChange}
                                placeholder="Enter owner email address"
                                className="w-full"
                                required
                              />
                            </div>
                            
                            <div>
                              <Input
                                label="Owner Phone Number"
                                type="tel"
                                name="ownerPhoneNumber"
                                value={waitingListData.ownerPhoneNumber}
                                onChange={handleWaitingListInputChange}
                                placeholder="Enter owner phone number"
                                className="w-full"
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Input
                              label="Business Category"
                              type="text"
                              name="businessCategory"
                              value={categories.find(cat => cat.id === selectedCategory)?.name || ''}
                              onChange={() => {}} // Read-only field
                              disabled
                              className="w-full"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-center space-x-3 mt-6">
                          <Button
                            variant="secondary"
                            onClick={handleCancelWaitingList}
                            className="flex-1 h-9 sm:h-10 rounded-full text-sm sm:text-base"
                            style={{ fontFamily: "'Afacad', sans-serif" }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            onClick={handleWaitingListSubmit}
                            disabled={!waitingListData.businessName.trim() || 
                                      !waitingListData.businessLocation.trim() || 
                                      !waitingListData.ownerEmail.trim() || 
                                      !waitingListData.ownerPhoneNumber.trim() || 
                                      !isValidEmail(waitingListData.ownerEmail)}
                            className="flex-1 h-9 sm:h-10 rounded-full text-sm sm:text-base disabled:bg-gray-200 disabled:text-gray-500"
                            style={{ fontFamily: "'Afacad', sans-serif" }}
                          >
                            Submit
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                )}
                
                {/* Sub-options overlay — now outside scrollable area */}
                {showSubOptionsOverlay && (
                  <div className="absolute inset-0 bg-white rounded-lg m-6 flex flex-col z-10">
                    <div className="flex justify-between items-center mt-3">
                      <SectionHeader 
                        title="Please specify your business type"
                        className="text-lg font-bold"
                      />
                    </div>
                    <div className="h-px bg-[#EAECF0] mt-2 mb-0"></div>
                    <p className="text-gray-600 mb-8 text-sm">
                      Select all that apply to your{' '}
                      <span className="text-[#85eb68] font-medium">
                        General Trading
                      </span>{' '}
                      business.
                    </p>
                     
                    <div className="space-y-6 mb-0 flex-grow">
                      {/* Retail option */}
                      <div 
                        className="cursor-pointer"
                        onClick={() => handleSubOptionSelect('retail')}
                      >
                        <StatCard 
                          className={`p-4 rounded-lg border transition-all ${
                            selectedSubOptions.includes('retail')
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-start">
                            <div className={`w-6 h-6 rounded border mr-4 flex items-center justify-center mt-1 ${
                              selectedSubOptions.includes('retail')
                                ? 'bg-emerald-500 border-emerald-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedSubOptions.includes('retail') && (
                                <CheckOutlined className="text-white text-sm" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-gray-800 text-xl">Retail</div>
                              <div className="text-gray-600 mt-2 text-lg">Retail trading services</div>
                            </div>
                          </div>
                        </StatCard>
                      </div>
                        
                      {/* Divider between Retail and Supplier */}
                      <div className="h-px bg-[#EAECF0]"></div>
                        
                      {/* Supplier option */}
                      <div 
                        className="cursor-pointer"
                        onClick={() => handleSubOptionSelect('supplier')}
                      >
                        <StatCard 
                          className={`p-4 rounded-lg border transition-all ${
                            selectedSubOptions.includes('supplier')
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-start">
                            <div className={`w-6 h-6 rounded border mr-4 flex items-center justify-center mt-1 ${
                              selectedSubOptions.includes('supplier')
                                ? 'bg-emerald-500 border-emerald-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedSubOptions.includes('supplier') && (
                                <CheckOutlined className="text-white text-sm" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-gray-800 text-xl">Supplier</div>
                              <div className="text-gray-600 mt-2 text-lg">Product supplier services</div>
                            </div>
                          </div>
                        </StatCard>
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-3 mt-6">
                      <Button
                        variant="secondary"
                        onClick={handleCancelSubOptions}
                        className="flex-1 h-9 sm:h-10 rounded-full text-sm sm:text-base"
                        style={{ fontFamily: "'Afacad', sans-serif" }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleConfirmSubOptions}
                        disabled={selectedSubOptions.length === 0}
                        className="flex-1 h-9 sm:h-10 rounded-full text-sm sm:text-base disabled:bg-gray-200 disabled:text-gray-500"
                        style={{ fontFamily: "'Afacad', sans-serif" }}
                      >
                        Confirm Selection
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Sticky Continue button */}
                <div className="sticky bottom-0 bg-white pt-4">
                  <Button
                    variant="primary"
                    onClick={handleContinue}
                    disabled={
                      !selectedCategory || 
                      (selectedCategory === 'other' && !customCategory.trim()) ||
                      (showSubOptionsOverlay)
                    }
                    className="w-full h-9 sm:h-10 rounded-full text-sm sm:text-base"
                    style={{ fontFamily: "'Afacad', sans-serif" }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
