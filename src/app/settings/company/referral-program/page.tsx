'use client';

import React, { useState, useEffect } from 'react';
import StatCard from '@/components/reusable/StatCard';
import CompanySettingsSidebar from '../../components/CompanySettingsSidebar';
import ReferralProgramSkeleton from './components/ReferralProgramSkeleton';
import { GiftOutlined } from '@ant-design/icons';
import PageTitle from '@/components/ui/PageTitle';

import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui';

const ReferralProgramPage = () => {
  const [loading, setLoading] = useState(true);
  
  // State for Guide Line section
  const [guideLine, setGuideLine] = useState({
    step1: 'Share your referral link with friends and colleagues',
    step2: 'They sign up and subscribe to a plan after 14 Days Free Trial',
    step3: 'You earn credits for each successful referral up to $200.00',
    step4: 'Apply credits to your next renewal for discounts or request withdrawal'
  });

  // State for My Earnings section
  const [earnings, setEarnings] = useState({
    totalEarned: 1250,
    pending: 350,
    redeemed: 900,
    referrals: 12
  });

  // State for PayOut section
  const [payout, setPayout] = useState({
    method: 'Mobile Money',
    amount: 500,
    date: '2023-06-15'
  });

  // State for referral link
  const [referralLink, setReferralLink] = useState('https://atradezone.ca/deal/?abc123xyz');
  const [copySuccess, setCopySuccess] = useState('');

  const [isEditingPayout, setIsEditingPayout] = useState(false);
  const [editedPaymentMethod, setEditedPaymentMethod] = useState('Mobile Money');

  const [isEditingGuideLine, setIsEditingGuideLine] = useState(false);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle form submissions
  const handleGuideLineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingGuideLine(false);
    // Save logic would go here
  };

  const handlePayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPayout(prev => ({
      ...prev,
      method: editedPaymentMethod
    }));
    setIsEditingPayout(false);
    // Save logic would go here
  };

  // Function to copy referral link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch(err => {
        setCopySuccess('Failed to copy');
        console.error('Failed to copy: ', err);
      });
  };

  if (loading) {
    return <ReferralProgramSkeleton />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Set dynamic page title */}
      <PageTitle title="Referral Program" />
      <div className="flex h-fit bg-gray-50 rounded-xl">
        {/* Sidebar */}
        <div className="w-50 bg-white border-r border-gray-200 p-33 rounded-xl h-fit sticky top-20">
          <CompanySettingsSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-0.3 overflow-y-auto rounded-r-xl" style={{ marginTop: '0rem', marginLeft: '1.5rem' }}>
          <div className="max-w-6xl mx-auto">
            {/* Guide Line Section */}
            <div id="guideline" className="bg-white rounded-xl p-6 mb-6 pt-0 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                <h2 className="text-lg font-semibold text-gray-800">GUIDE LINE</h2>
              </div>
              {/* Full-width divider */}
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              
              {isEditingGuideLine ? (
                <form onSubmit={handleGuideLineSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Step 1</label>
                      <input
                        type="text"
                        value={guideLine.step1}
                        onChange={(e) => setGuideLine({...guideLine, step1: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Step 2</label>
                      <input
                        type="text"
                        value={guideLine.step2}
                        onChange={(e) => setGuideLine({...guideLine, step2: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Step 3</label>
                      <input
                        type="text"
                        value={guideLine.step3}
                        onChange={(e) => setGuideLine({...guideLine, step3: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Step 4</label>
                      <input
                        type="text"
                        value={guideLine.step4}
                        onChange={(e) => setGuideLine({...guideLine, step4: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        variant="primary"
                        type="submit"
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setIsEditingGuideLine(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <StatCard 
                      title="Step 1" 
                      description={guideLine.step1}
                      className="p-4"
                    />
                    <StatCard 
                      title="Step 2" 
                      description={guideLine.step2}
                      className="p-4"
                    />
                    <StatCard 
                      title="Step 3" 
                      description={guideLine.step3}
                      className="p-4"
                    />
                    <StatCard 
                      title="Step 4" 
                      description={guideLine.step4}
                      className="p-4"
                    />
                  </div>
                  
                  {/* Referral Link Section */}
                  <StatCard title="Ready? Let's Grow Together!" className="p-4 mt-4">
                    <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <div className="relative">
                          <Input
                            value={referralLink}
                            disabled
                            className="w-full"
                          />
                          {copySuccess && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              <span className="text-xs text-green-600">{copySuccess}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                        <Button
                          variant="secondary"
                          onClick={copyToClipboard}
                          className="whitespace-nowrap sm:rounded-tr-none sm:rounded-br-none"
                        >
                          {copySuccess ? 'Copied!' : 'Copy Link'}
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: 'Join me on ATradezone™ Cloud',
                                text: 'Sign up and get started with ATradezone™ Cloud services.',
                                url: referralLink,
                              }).catch(console.error);
                            } else {
                              // Fallback for browsers that don't support Web Share API
                              alert('Web Share API is not supported in your browser. Please copy the link and share it manually.');
                            }
                          }}
                          className="whitespace-nowrap sm:rounded-tl-none sm:rounded-bl-none"
                        >
                          Share with Friends
                        </Button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Share this link with friends and colleagues to earn referral credits
                    </p>
                  </StatCard>
                </div>
              )}
            </div>

            {/* My Earnings Section */}
            <div id="earnings" className="bg-white rounded-xl p-6 mb-6 pt-0 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
              <div className="flex items-center justify-between mb-0">
                <div className="flex items-center">
                  <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                  <h2 className="text-lg font-semibold text-gray-800">MY EARNINGS</h2>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full" style={{ boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', backgroundColor: 'rgb(255, 255, 255)' }}>
                  <GiftOutlined style={{ color: '#86ee68' }}/>
                  <span className="text-sm font-afacad text-blue-900">ATradezone™ Cloud Walt: </span>
                  <span className="text-sm font-afacad text-blue-900">500 Frw</span>
                </div>
              </div>
              {/* Full-width divider */}
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <StatCard 
                  title="Total Earned" 
                  value={`${earnings.totalEarned} Frw`} 
                  description="Total credits earned from referrals"
                  className="p-4"
                />
                <StatCard 
                  title="Pending" 
                  value={`${earnings.pending} Frw`} 
                  description="Credits awaiting confirmation"
                  className="p-4"
                />
                <StatCard 
                  title="Redeemed" 
                  value={`${earnings.redeemed} Frw`} 
                  description="Credits already applied to your account"
                  className="p-4"
                />
                <StatCard 
                  title="Referrals" 
                  value={earnings.referrals.toString()} 
                  description="Number of successful referrals"
                  className="p-4"
                />
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-800 mb-3">Recent Referrals</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Smith</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john@example.com</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-12</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">150 Frw</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sarah Johnson</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">sarah@example.com</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-18</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">100 Frw</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Michael Brown</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">michael@example.com</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-06-02</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">200 Frw</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* PayOut Section */}
            <div id="payout" className="bg-white rounded-xl p-6 mb-6 pt-0 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                <h2 className="text-lg font-semibold text-gray-800">PAYOUT</h2>
              </div>
              {/* Full-width divider */}
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              
              {isEditingPayout ? (
                <form onSubmit={handlePayoutSubmit}>
                  <div className="space-y-4">
                    <AutoCompleteSelect
                      label="Payment Method"
                      value={editedPaymentMethod}
                      onChange={setEditedPaymentMethod}
                      options={[
                        { value: 'Mobile Money', label: 'Mobile Money' },
                        { value: 'Bank Transfer', label: 'Bank Transfer' },
                        { value: 'PayPal', label: 'PayPal' },
                        { value: 'Credit Card', label: 'Credit Card' }
                      ]}
                    />
                    <div className="flex space-x-3">
                      <Button
                        variant="primary"
                        type="submit"
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setIsEditingPayout(false);
                          setEditedPaymentMethod(payout.method); // Reset to original value
                        }}
                      >
                        Cancel
                      </Button>
                    </div>

                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard title="Payment Method" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <p className="text-lg font-medium text-gray-900">{payout.method}</p>
                    </StatCard>
                    <StatCard title="Amount" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <p className="text-lg font-medium text-gray-900">{payout.amount} Frw</p>
                    </StatCard>
                    <StatCard title="Next Payout Date" className="p-4">
                      <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                      <p className="text-lg font-medium text-gray-900">{payout.date}</p>
                    </StatCard>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-md font-medium text-gray-800 mb-3">Payout History</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Method</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-05-15</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bank Transfer</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">300 Frw</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Completed
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-04-15</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bank Transfer</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">250 Frw</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Completed
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button
                      variant="primary"
                      onClick={() => setIsEditingPayout(true)}
                    >
                      Edit Payout Info.
                    </Button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgramPage;