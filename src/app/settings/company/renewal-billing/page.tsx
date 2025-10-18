'use client';

import React, { useState, useEffect } from 'react';
import CompanySettingsSidebar from '../../components/CompanySettingsSidebar';
import RenewalBillingSkeleton from './components/RenewalBillingSkeleton';
import StatCard from '@/components/ui/StatCard';
import PageTitle from '@/components/ui/PageTitle';
import { ActionButtons } from '@/components/reusable'; // Import ActionButtons
import { Input } from '@/components/ui';
import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect'; // Import AutoCompleteSelect
import Button from '@/components/ui/Button';

const RenewalBillingPage = () => {
  const [loading, setLoading] = useState(true);
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Form state for subscriptions
  const [subscriptionData, setSubscriptionData] = useState({
    plan: 'Basic',
    billingCycle: 'Monthly',
    startDate: '',
    endDate: '',
    autoRenew: true,
    notifications: true
  });

  // Form state for payment methods
  const [paymentMethodData, setPaymentMethodData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    isDefault: false
  });

  // Form state for plans
  const [planData, setPlanData] = useState({
    selectedPlan: 'Basic',
    features: [] as string[]
  });

  // Sample subscriptions data
  const [subscriptionsList, setSubscriptionsList] = useState([
    { id: 1, plan: 'Basic Plan', status: 'Active', startDate: '2023-01-15', endDate: '2024-01-15', amount: '$29.99', billingCycle: 'Monthly' },
    { id: 2, plan: 'Premium Plan', status: 'Expired', startDate: '2022-06-01', endDate: '2023-06-01', amount: '$99.99', billingCycle: 'Annual' },
    { id: 3, plan: 'Pro Plan', status: 'Active', startDate: '2023-03-10', endDate: '2023-09-10', amount: '$59.99', billingCycle: 'Semi-Annual' }
  ]);

  // Sample payment history data
  const [paymentHistoryList, setPaymentHistoryList] = useState([
    { id: 1, date: '2023-08-15', description: 'Basic Plan Subscription', amount: '$29.99', status: 'Completed' },
    { id: 2, date: '2023-07-15', description: 'Basic Plan Subscription', amount: '$29.99', status: 'Completed' },
    { id: 3, date: '2023-06-15', description: 'Basic Plan Subscription', amount: '$29.99', status: 'Completed' },
    { id: 4, date: '2023-05-15', description: 'Basic Plan Subscription', amount: '$29.99', status: 'Failed' }
  ]);

  // Sample payment methods data
  const [paymentMethodsList, setPaymentMethodsList] = useState([
    { id: 1, type: 'Visa', number: '**** **** **** 1234', expiry: '12/25', isDefault: true },
    { id: 2, type: 'Mastercard', number: '**** **** **** 5678', expiry: '06/24', isDefault: false }
  ]);

  // Plan options
  const planOptions = [
    { 
      id: 'basic', 
      name: 'Basic Plan', 
      price: '$29.99/month', 
      features: ['Up to 100 products', 'Basic reporting', 'Email support', '1 user'] 
    },
    { 
      id: 'pro', 
      name: 'Pro Plan', 
      price: '$59.99/month', 
      features: ['Up to 1000 products', 'Advanced reporting', 'Priority support', '5 users', 'API access'] 
    },
    { 
      id: 'enterprise', 
      name: 'Enterprise Plan', 
      price: '$99.99/month', 
      features: ['Unlimited products', 'Custom reporting', '24/7 dedicated support', 'Unlimited users', 'API access', 'Custom integrations'] 
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
  const handlePlanSelect = (planId: string) => {
    const selectedPlan = planOptions.find(plan => plan.id === planId);
    if (selectedPlan) {
      setPlanData({
        selectedPlan: planId,
        features: selectedPlan.features
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
      cardNumber: '',
      expiryDate: '',
      cvv: '',
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
        case 'Semi-Annual':
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
                <div className="flex items-center mb-0">
                  <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                  <h2 className="text-lg font-semibold text-gray-800">SUBSCRIPTIONS</h2>
                </div>
                {/* Full-width divider */}
                <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Current Subscriptions List */}
                  <StatCard title="Current Subscriptions" className="p-4">
                    <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {subscriptionsList.map((subscription) => (
                        <div key={subscription.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
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
                      ))}
                    </div>
                  </StatCard>
                  
                  {/* Subscription Settings Form */}
                  <StatCard title="Subscription Settings" className="p-4">
                    <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                    <form onSubmit={handleSubscriptionSubmit}>
                      <AutoCompleteSelect
                        label="Plan"
                        value={subscriptionData.plan}
                        onChange={(value) => handleSubscriptionChange({ target: { name: 'plan', value } } as any)}
                        options={[
                          { value: 'Basic', label: 'Basic Plan' },
                          { value: 'Pro', label: 'Pro Plan' },
                          { value: 'Enterprise', label: 'Enterprise Plan' }
                        ]}
                      />
                      
                      <AutoCompleteSelect
                        label="Billing Cycle"
                        value={subscriptionData.billingCycle}
                        onChange={(value) => handleSubscriptionChange({ target: { name: 'billingCycle', value } } as any)}
                        options={[
                          { value: 'Monthly', label: 'Monthly' },
                          { value: 'Annual', label: 'Annual' },
                          { value: 'Semi-Annual', label: 'Semi-Annual' }
                        ]}
                      />
                      
                      <div className="mb-4" >
                        <Input
                          label="Start Date"
                          name="startDate"
                          type="date"
                          value={subscriptionData.startDate}
                          onChange={handleSubscriptionChange}
                        />
                      </div>
                      
                      <div className="mb-4" >
                        <Input
                          label="End Date (Auto-calculated)"
                          name="endDate"
                          type="date"
                          value={subscriptionData.endDate}
                          disabled
                        />
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
                          Save Settings
                        </Button>
                      </div>
                    </form>
                  </StatCard>
                </div>
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

              {/* Plans & Pricing Section */}
              <div id="plans-pricing" className="bg-white rounded-xl p-6 mb-6 pt-0 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
                <div className="flex items-center mb-0">
                  <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                  <h2 className="text-lg font-semibold text-gray-800">PLANS & PRICING</h2>
                </div>
                {/* Full-width divider */}
                <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
                
                <form onSubmit={handlePlanSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {planOptions.map((plan) => (
                      <StatCard 
                        key={plan.id} 
                        className={`p-6 border-2 ${
                          planData.selectedPlan === plan.id 
                            ? 'border-green-500 ring-2 ring-green-200' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="h-px bg-[#EAECF0] my-4 -mx-6"></div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{plan.name}</h3>
                        <p className="text-2xl font-bold text-gray-900 mb-4">{plan.price}</p>
                        <ul className="space-y-2 mb-6">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={() => handlePlanSelect(plan.id)}
                          className={`w-full py-2 px-4 rounded-lg font-medium ${
                            planData.selectedPlan === plan.id
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {planData.selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                        </button>
                      </StatCard>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      variant="primary"
                      type="submit"
                    >
                      Update Plan
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

export default RenewalBillingPage;