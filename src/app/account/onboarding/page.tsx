'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Button from '@/components/ui/Button';
import PageTitle from '@/components/ui/PageTitle';
import AuthBranding from '@/app/auth/components/AuthBranding';
import OnboardingSkeleton from './components/OnboardingSkeleton';
import { Validation } from '@/components/shared';

export default function Onboarding() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customCategory, setCustomCategory] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
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
    
    if (categoryId === 'other') {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      setCustomCategory('');
    }
  };

  const handleContinue = () => {
    if (selectedCategory) {
      // If "Other" is selected, use the custom category name
      const categoryToSend = selectedCategory === 'other' ? customCategory : selectedCategory;
      // Redirect to the register page with the selected category as a query parameter
      router.push(`/auth/register?userCategory=${encodeURIComponent(categoryToSend)}&businessName=${encodeURIComponent(businessName)}&email=${encodeURIComponent(email)}`);
    }
  };

  const categories = [
    { 
      id: 'retail', 
      name: 'Retail', 
      description: 'Manage inventory, sales, and customer relationships',
      icon: '🏪'
    },
    { 
      id: 'supplier', 
      name: 'Supplier', 
      description: 'Supply products to retailers and businesses',
      icon: '📦'
    },
    { 
      id: 'healthcare', 
      name: 'Healthcare', 
      description: 'Medical services, clinics, and health providers',
      icon: '🏥'
    },
    { 
      id: 'manufacturing', 
      name: 'Manufacturing', 
      description: 'Production and manufacturing operations',
      icon: '🏭'
    },
    { 
      id: 'developer', 
      name: 'Developer', 
      description: 'Integrate with our EBM API for custom solutions',
      icon: '💻'
    },
    { 
      id: 'business-partner', 
      name: 'Business Partner', 
      description: 'Strategic partnerships and collaborations',
      icon: '🤝'
    },
    { 
      id: 'other', 
      name: 'Other', 
      description: 'Specify your own business category',
      icon: '📝'
    }
  ];

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
          
          <div 
            className="p-4 sm:p-6 rounded-[15px] sm:rounded-[20px] border border-[#e1e1e1] flex flex-col"
            style={{
              boxShadow: '-5px 5px 50px -5px #e1e1e1'
            }}
          >
            {/* Scrollable categories container */}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
              )}
            </div>
            
            {/* Sticky Continue button */}
            <div className="sticky bottom-0 bg-white pt-4">
              <Button
                variant="primary"
                onClick={handleContinue}
                disabled={!selectedCategory || (selectedCategory === 'other' && !customCategory.trim())}
                className={`w-full h-12 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-[1.02] ${
                  selectedCategory && (selectedCategory !== 'other' || customCategory.trim())
                    ? 'hover:opacity-90 cursor-pointer shadow-lg' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
              </Button>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Already have an account?{' '}
              <span 
                className="text-emerald-600 hover:text-[#29DB5C] font-medium transition-colors cursor-pointer" 
                onClick={() => router.push('/auth/login')}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
