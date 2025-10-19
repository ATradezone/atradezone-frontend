'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import Button from '@/components/ui/Button';
import CloseButton from '@/components/ui/CloseButton';
import SectionHeader from '@/components/layout/SectionHeader';
import StatCard from '@/components/ui/StatCard';
import PageTitle from '@/components/ui/PageTitle';
import AuthBranding from '@/app/auth/components/AuthBranding';
import OnboardingSkeleton from './components/OnboardingSkeleton';
import { Validation } from '@/components/shared';

export default function Onboarding() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubOptions, setSelectedSubOptions] = useState<string[]>([]); // For Trading sub-options
  const [customCategory, setCustomCategory] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [showSubOptionsOverlay, setShowSubOptionsOverlay] = useState<boolean>(false); // To show/hide sub-options overlay
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    // Redirect to the renewal-billing page
    router.push('/settings/company/renewal-billing');
  };

  const categories = [
    { 
      id: 'general-trading', 
      name: 'General Trading', 
      description: 'General trading services and product distribution',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 w-8 h-8">
          <path d="M14 11V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5"/>
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
      id: 'developer', 
      name: 'Developer', 
      description: 'Integrate with our EBM API for custom solutions',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 w-8 h-8">
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
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
    }
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
      {/* Set dynamic page title */}
      <PageTitle title="Business Category Selection" />
      
      {/* Left Side - Branding */}
      <AuthBranding />
      
      {/* Right Side - Category Selection */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-20 bg-white min-h-screen lg:min-h-0">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-6 sm:mb-8">
            <img 
              src="/images/atradezone-logo-big-size.png" 
              alt="ATradezone Logo" 
              className="h-10 sm:h-12 w-auto object-contain mx-auto mb-2"
            />
          </div>
          
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
             {businessName || 'There'}, welcome aboard! <br />
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
                    }`}
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
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter your business category"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-50 transition-all"
                  />
                </div>
              )}
            </div>
            
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
      </div>
    </div>
  );
}