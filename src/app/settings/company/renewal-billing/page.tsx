'use client';

import React, { useState, useEffect, useRef } from 'react';
import CompanySettingsSidebar from '../../components/CompanySettingsSidebar';
import RenewalBillingSkeleton from './components/RenewalBillingSkeleton';
import StatCard from '@/components/ui/StatCard';
import PageTitle from '@/components/ui/PageTitle';
import { ActionButtons } from '@/components/reusable'; // Import ActionButtons
import { Input } from '@/components/ui';
import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect'; // Import AutoCompleteSelect
import Button from '@/components/ui/Button';
import { GiftOutlined } from '@ant-design/icons';

const RenewalBillingPage = () => {
  const [loading, setLoading] = useState(true);
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mock data for subscriptions
  const [subscriptionsList, setSubscriptionsList] = useState([
    { id: 1, plan: 'Free Trial', status: 'Active', startDate: '2023-01-15', endDate: '2024-01-15', amount: '29.99 Frw', billingCycle: 'Monthly' },
    { id: 2, plan: 'Pro Plan', status: 'Expired', startDate: '2022-06-01', endDate: '2023-06-01', amount: '79.99 Frw', billingCycle: 'Annual' },
    { id: 3, plan: 'Basic Plan', status: 'Expired', startDate: '2021-01-01', endDate: '2022-01-01', amount: '29.99 Frw', billingCycle: 'Monthly' },
    { id: 4, plan: 'Enterprise Plan', status: 'Expired', startDate: '2020-03-15', endDate: '2021-03-15', amount: '99.99 Frw', billingCycle: 'Annual' },
    { id: 5, plan: 'Pro Plan', status: 'Expired', startDate: '2019-05-01', endDate: '2020-05-01', amount: '79.99 Frw', billingCycle: 'Annual' }
  ]);

  // Mock data for payment history
  const [paymentHistoryList, setPaymentHistoryList] = useState([
    { id: 1, date: '2023-08-15', description: 'Free Trial Subscription', amount: '29.99 Frw', status: 'Completed' },
    { id: 2, date: '2023-07-15', description: 'Free Trial Subscription', amount: '29.99 Frw', status: 'Completed' },
    { id: 3, date: '2023-06-15', description: 'Free Trial Subscription', amount: '29.99 Frw', status: 'Completed' },
    { id: 4, date: '2023-05-15', description: 'Free Trial Subscription', amount: '29.99 Frw', status: 'Failed' }
  ]);

  // Mock data for payment methods
  const [paymentMethodsList, setPaymentMethodsList] = useState([
    { id: 1, type: 'Visa', number: '**** **** **** 1234', expiry: '12/25', isDefault: true },
    { id: 2, type: 'Mastercard', number: '**** **** **** 5678', expiry: '06/24', isDefault: false }
  ]);

  // Form data states
  const [planData, setPlanData] = useState({
    selectedPlan: 1
  });

  const [subscriptionData, setSubscriptionData] = useState({
    plan: 'General Trading Plan',
    billingCycle: 'Monthly',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    autoRenew: true,
    notifications: true
  });

  const [paymentMethodData, setPaymentMethodData] = useState({
    type: '',
    number: '',
    expiry: '',
    cvv: '',
    cardNumber: '',
    expiryDate: '',
    cardholderName: '',
    isDefault: false
  });

  // Plan options data
  const planOptions = [
    { 
      id: 1, 
      name: 'Free Trial', 
      price: '0.00 Frw for 14 days', 
      features: [
        'Free for 14 days'
      ] 
    },
    { 
      id: 2, 
      name: 'General Trading Plan', 
      price: '29.99 Frw/month', 
      features: [
        'Up to 1000 products'
      ] 
    },
    { 
      id: 3, 
      name: 'Professional Plan', 
      price: '49.99 Frw/month', 
      features: [
        'Up to 5000 products'
      ] 
    },
    { 
      id: 4, 
      name: 'Enterprise Plan', 
      price: '99.99 Frw/month', 
      features: [
        'Unlimited products'
      ] 
    }
  ];

  // Handle subscription form input changes
  const handleSubscriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setSubscriptionData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle payment method form input changes
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setPaymentMethodData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle plan selection
  const handlePlanSelect = (planId: number) => {
    const selectedPlan = planOptions.find(plan => plan.id === planId);
    if (selectedPlan) {
      setPlanData({
        selectedPlan: planId
      });
    }
  };

  // Handle subscription form submission
  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscription data submitted:', subscriptionData);
    alert('Subscription settings saved successfully!');
  };

  // Handle payment method form submission
  const handlePaymentMethodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment method data submitted:', paymentMethodData);
    alert('Payment method saved successfully!');
    // Reset form
    setPaymentMethodData({
      type: '',
      number: '',
      expiry: '',
      cvv: '',
      cardNumber: '',
      expiryDate: '',
      cardholderName: '',
      isDefault: false
    });
  };

  // Handle plan selection submission
  const handlePlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Plan data submitted:', planData);
    alert('Plan selected successfully!');
  };

  // Handle subscription cancellation
  const handleCancelSubscription = (id: number) => {
    setSubscriptionsList(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: 'Cancelled' } : sub
    ));
    alert('Subscription cancelled successfully!');
  };

  // Handle payment method deletion
  const handleDeletePaymentMethod = (id: number) => {
    setPaymentMethodsList(prev => prev.filter(method => method.id !== id));
    alert('Payment method deleted successfully!');
  };

  // Handle making payment method default
  const handleMakeDefault = (id: number) => {
    setPaymentMethodsList(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    alert('Default payment method updated successfully!');
  };

  // Calculate end date based on start date and billing cycle
  useEffect(() => {
    if (subscriptionData.startDate && subscriptionData.billingCycle) {
      const startDate = new Date(subscriptionData.startDate);
      const endDate = new Date(startDate);
      
      switch (subscriptionData.billingCycle) {
        case 'Monthly':
          endDate.setMonth(startDate.getMonth() + 1);
          break;
        case 'Annual':
          endDate.setFullYear(startDate.getFullYear() + 1);
          break;
        case '6 Months':
          endDate.setMonth(startDate.getMonth() + 6);
          break;
        default:
          break;
      }
      
      // Format date as YYYY-MM-DD for input field
      const formattedEndDate = endDate.toISOString().split('T')[0];
      
      setSubscriptionData(prev => ({
        ...prev,
        endDate: formattedEndDate
      }));
    }
  }, [subscriptionData.startDate, subscriptionData.billingCycle]);

  // Scroll logic
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
      // Update current slide index
      setCurrentSlide(prev => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
      // Update current slide index
      setCurrentSlide(prev => Math.min(planOptions.length - 1, prev + 1));
    }
  };

  // Handle scroll event to update current slide position
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const clientWidth = scrollContainerRef.current.clientWidth;
      
      // Calculate the current slide based on scroll position
      const slideWidth = clientWidth * 0.8; // Approximate slide width (80% of container)
      const newSlide = Math.round(scrollLeft / slideWidth);
      setCurrentSlide(Math.min(planOptions.length - 1, Math.max(0, newSlide)));
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Set dynamic page title */}
      <PageTitle title="Renewal & Billing" />
      {loading ? (
        <RenewalBillingSkeleton />
      ) : (
        <div className="flex h-fit bg-gray-50 rounded-xl">
          {/* Sidebar */}
          <div className="w-50 bg-white border-r border-gray-200 p-33 rounded-xl h-fit sticky top-20">
            <CompanySettingsSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-0.3 overflow-y-auto rounded-r-xl" style={{ marginTop: '0rem', marginLeft: '1.5rem' }}>
            <>
              {/* Subscriptions Section */}
              <div id="subscriptions" className="bg-white rounded-xl p-6 mb-6 pt-0 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
                <div className="flex items-center justify-between mb-0">
                  <div className="flex items-center">
                    <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                    <h2 className="text-lg font-semibold text-gray-800">SUBSCRIPTIONS</h2>
                  </div>
                  <button 
                    onClick={() => window.location.href = '/settings/company/referral-program'}
                    className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 cursor-pointer border-0" 
                    style={{ boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', backgroundColor: 'rgb(255, 255, 255)' }}
                  >
                    <GiftOutlined style={{ color: '#86ee68' }}/>
                    <span className="text-sm font-afacad text-blue-900">ATradezone™ Cloud Walt: </span>
                    <span className="text-sm font-afacad text-blue-900">500 Frw</span>
                  </button>
                </div>
                {/* Full-width divider */}
                <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Current Subscriptions List */}
                  <StatCard title="Current Subscriptions" className="p-4">
                    <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {subscriptionsList.map((subscription, index) => (
                        <div key={subscription.id}>
                          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div>
                              <h3 className="font-medium text-gray-800">{subscription.plan}</h3>
                              <p className="text-sm text-gray-600">{subscription.startDate} to {subscription.endDate}</p>
                              <div className="flex space-x-4 mt-1">
                                <span className="text-xs text-gray-500">{subscription.amount} / {subscription.billingCycle}</span>
                                <span className={`text-xs ${subscription.status === 'Active' ? 'text-green-500' : subscription.status === 'Expired' ? 'text-red-500' : 'text-gray-500'}`}>
                                  {subscription.status}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              {/* Icon-only Cancel button */}
                              {subscription.status === 'Active' && (
                                <ActionButtons
                                  onDelete={() => handleCancelSubscription(subscription.id)}
                                  deleteLabel="Cancel subscription"
                                  onView={undefined}
                                  onEdit={undefined}
                                />
                              )}
                            </div>
                          </div>
                          {/* Divider below each subscription for separation */}
                          {index < subscriptionsList.length - 1 && (
                            <div className="h-px bg-[#EAECF0] my-4"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </StatCard>
                  
                  {/* Subscription Settings Form */}
                  <StatCard title="Subscription Settings" className="p-4">
                    <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                    <form onSubmit={handleSubscriptionSubmit}>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <AutoCompleteSelect
                            label="Select Plan"
                            value={subscriptionData.plan}
                            onChange={(value) => {
                              handleSubscriptionChange({ target: { name: 'plan', value } } as any);
                              // Also update the planData state to keep both in sync
                              const selectedPlan = planOptions.find(plan => 
                                (plan.id === 1 && value === 'Free Trial') || 
                                (plan.id === 2 && value === 'General Trading Plan') || 
                                (plan.id === 3 && value === 'Professional Plan') ||
                                (plan.id === 4 && value === 'Enterprise Plan')
                              );
                              if (selectedPlan) {
                                setPlanData({ selectedPlan: selectedPlan.id });
                              }
                            }}
                            options={[
                              { value: 'General Trading Plan', label: 'General Trading Plan' },
                              { value: 'Professional Plan', label: 'Professional Plan' },
                              { value: 'Enterprise Plan', label: 'Enterprise Plan' }
                            ]}
                          />
                        </div>
                        
                        <div>
                          <AutoCompleteSelect
                            label="Billing Cycle"
                            value={subscriptionData.billingCycle}
                            onChange={(value) => handleSubscriptionChange({ target: { name: 'billingCycle', value } } as any)}
                            options={[
                              { value: 'Monthly', label: 'Monthly' },
                              { value: '6-Months', label: '6 Months' },
                              { value: 'Annual', label: 'Annual' }
                            ]}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <Input
                            label="Start Date"
                            name="startDate"
                            type="date"
                            value={subscriptionData.startDate}
                            onChange={handleSubscriptionChange}
                            disabled
                          />
                        </div>
                        
                        <div>
                          <Input
                            label="End Date (Auto-calculated)"
                            name="endDate"
                            type="date"
                            value={subscriptionData.endDate}
                            disabled
                          />
                        </div>
                      </div>
                      
                      {/* Subscription Settings Overview Box */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Subscription Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Total Amount</span>
                            <span className="text-lg font-bold text-gray-800">
                              {(() => {
                                // Find the selected plan based on the dropdown selection
                                const selectedPlan = planOptions.find(plan => 
                                  (plan.id === 1 && subscriptionData.plan === 'Free Trial') || 
                                  (plan.id === 2 && subscriptionData.plan === 'General Trading Plan') || 
                                  (plan.id === 3 && subscriptionData.plan === 'Professional Plan') ||
                                  (plan.id === 4 && subscriptionData.plan === 'Enterprise Plan')
                                ) || planOptions.find(plan => plan.id === planData.selectedPlan);
                                
                                if (!selectedPlan) return '0.00 Frw';
                                
                                // For Free Trial plan, always show 0.00 Frw
                                if (selectedPlan.id === 1) return '0.00 Frw';
                                
                                // For other plans, adjust based on billing cycle
                                const basePrice = selectedPlan.price.split(' ')[0];
                                if (subscriptionData.billingCycle === 'Annual') {
                                  // Extract numeric value and calculate annual price
                                  const monthlyPrice = parseFloat(basePrice);
                                  const annualPrice = monthlyPrice * 12;
                                  return `${annualPrice.toFixed(2)} Frw`;
                                } else if (subscriptionData.billingCycle === '6-Months') {
                                  // Calculate semi-annual price
                                  const monthlyPrice = parseFloat(basePrice);
                                  const semiAnnualPrice = monthlyPrice * 6;
                                  return `${semiAnnualPrice.toFixed(2)} Frw`;
                                }
                                return `${basePrice} Frw`;
                              })()}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Billing Cycle</span>
                            <span className="text-lg font-bold text-gray-800">
                              {subscriptionData.billingCycle}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Next Renewal</span>
                            <span className="text-lg font-bold text-gray-800">
                              {subscriptionData.endDate || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          name="autoRenew"
                          checked={subscriptionData.autoRenew}
                          onChange={handleSubscriptionChange}
                          className="mr-2"
                        />
                        <label className="text-sm text-gray-700">Auto-renew subscription</label>
                      </div>
                      
                      <div className="flex items-center mb-6">
                        <input
                          type="checkbox"
                          name="notifications"
                          checked={subscriptionData.notifications}
                          onChange={handleSubscriptionChange}
                          className="mr-2"
                        />
                        <label className="text-sm text-gray-700">Send subscription notifications</label>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button
                          variant="primary"
                          type="submit"
                        >
                          Upgrade Plan
                        </Button>
                      </div>
                    </form>
                  </StatCard>
                </div>
              </div>

              {/* Plans & Pricing Section */}
              <div id="plans-pricing" className="bg-white rounded-xl p-6 mb-6 pt-0 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
                <div className="flex items-center mb-0">
                  <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                  <h2 className="text-lg font-semibold text-gray-800">PLANS & PRICING</h2>
                </div>
                {/* Full-width divider */}
                <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
                
                <form onSubmit={handlePlanSubmit}>
                  <div className="relative group">
                    {/* Horizontal scroll container for plans */}
                    <div 
                      ref={scrollContainerRef}
                      className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {planOptions.map((plan, index) => (
                        <div key={plan.id} className="flex-shrink-0 w-full sm:w-4/5 md:w-2/33 lg:w-1/2 xl:w-1/3">
                          <StatCard 
                            className={`p-6 border-2 h-full transition-all duration-300 transform hover:scale-[1.02] relative ${
                              planData.selectedPlan === plan.id 
                                ? 'border-green-500 ring-2 ring-green-200 shadow-lg' 
                                : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                            }`}
                          >
                            {/* Popular plan badge */}
                            {index === 2 && (
                              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                MOST POPULAR
                              </div>
                            )}
                            
                            <div className="text-center mb-6">
                              <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                              <div className="flex justify-center items-baseline">
                                <span className="text-3xl font-extrabold text-gray-900">{plan.price.split(' ')[0]}</span>
                                <span className="">
                                  {plan.price.includes('for 14 days') 
                                    ? ' Frw for 14 days' 
                                    : plan.price.includes('/month') 
                                      ? ' Frw/month' 
                                      : ' Frw'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="h-px bg-gradient-to-r from-green-400 to-blue-500 my-6"></div>
                            
                            <ul className="space-y-4 mb-8">
                              {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                                    <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <span className="text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <button
                              type="button"
                              onClick={() => handlePlanSelect(plan.id)}
                              className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 ${
                                planData.selectedPlan === plan.id
                                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform hover:scale-[1.02]'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-500 hover:text-white hover:shadow-md'
                              }`}
                            >
                              {planData.selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
                            </button>
                          </StatCard>
                        </div>
                      ))}
                    </div>
                    
                    {/* Navigation arrows */}
                    <button
                      type="button"
                      onClick={scrollLeft}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-0 shadow-lg hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 z-10"
                      aria-label="Scroll left"
                    >
                      <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={scrollRight}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-0 shadow-lg hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 z-10"
                      aria-label="Scroll right"
                    >
                      <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Slide indicators */}
                    <div className="flex justify-center mt-6 space-x-2">
                      {planOptions.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (scrollContainerRef.current) {
                              const scrollPosition = (scrollContainerRef.current.scrollWidth / planOptions.length) * index;
                              scrollContainerRef.current.scrollTo({
                                left: scrollPosition,
                                behavior: 'smooth'
                              });
                              setCurrentSlide(index);
                            }
                          }}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentSlide === index ? 'bg-green-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>    
                  <div className="flex justify-end mt-8">
                    <Button
                      variant="primary"
                      type="submit"
                      className="px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Update Plan
                    </Button>
                  </div>
                </form>
              </div>

              {/* Payment History Section */}
              <div id="payment-history" className="bg-white rounded-xl p-6 mb-6 pt-0 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
                <div className="flex items-center mb-0">
                  <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                  <h2 className="text-lg font-semibold text-gray-800">PAYMENT HISTORY</h2>
                </div>
                {/* Full-width divider */}
                <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
                
                <StatCard title="Recent Payments" className="p-4">
                  <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paymentHistoryList.map((payment) => (
                          <tr key={payment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                payment.status === 'Completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </StatCard>
              </div>

              {/* Payment Methods Section */}
              <div id="payment-methods" className="bg-white rounded-xl p-6 mb-6 pt-0 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
                <div className="flex items-center mb-0">
                  <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                  <h2 className="text-lg font-semibold text-gray-800">PAYMENT METHODS</h2>
                </div>
                {/* Full-width divider */}
                <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Saved Payment Methods */}
                  <StatCard title="Saved Payment Methods" className="p-4">
                    <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {paymentMethodsList.map((method) => (
                        <div key={method.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-800">{method.type}</h3>
                            <p className="text-sm text-gray-600">{method.number}</p>
                            <p className="text-xs text-gray-500">Expires {method.expiry}</p>
                            {method.isDefault && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            {/* Icon-only "Make Default" and "Delete" buttons */}
                            {!method.isDefault && (
                              <ActionButtons
                                onEdit={() => handleMakeDefault(method.id)}
                                editLabel="Make default payment method"
                                onView={undefined}
                                onDelete={undefined}
                              />
                            )}
                            <ActionButtons
                              onDelete={() => handleDeletePaymentMethod(method.id)}
                              deleteLabel="Delete payment method"
                              onView={undefined}
                              onEdit={undefined}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </StatCard>
                  
                  {/* Add New Payment Method Form */}
                  <StatCard title="Add New Payment Method" className="p-4">
                    <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                    <form onSubmit={handlePaymentMethodSubmit}>
                      <div className="mb-4" >
                        <Input
                          label="Card Number"
                          name="cardNumber"
                          value={paymentMethodData.cardNumber}
                          onChange={handlePaymentMethodChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div >
                          <Input
                            label="Expiry Date"
                            name="expiryDate"
                            value={paymentMethodData.expiryDate}
                            onChange={handlePaymentMethodChange}
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        
                        <div>
                          <Input
                            label="CVV"
                            name="cvv"
                            value={paymentMethodData.cvv}
                            onChange={handlePaymentMethodChange}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    
                      <div className="mb-4" >
                        <Input
                          label="Cardholder Name"
                          name="cardholderName"
                          value={paymentMethodData.cardholderName}
                          onChange={handlePaymentMethodChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div className="flex items-center mb-6">
                        <input
                          type="checkbox"
                          name="isDefault"
                          checked={paymentMethodData.isDefault}
                          onChange={handlePaymentMethodChange}
                          className="mr-2"
                        />
                        <label className="text-sm text-gray-700">Set as default payment method</label>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button
                          variant="primary"
                          type="submit"
                        >
                          Add Payment Method
                        </Button>
                      </div>
                    </form>
                  </StatCard>
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenewalBillingPage;