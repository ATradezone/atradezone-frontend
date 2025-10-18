'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import StatCard from '@/components/ui/StatCard';
import { Input } from '@/components/ui';
import { 
  UserOutlined, 
  FileTextOutlined, 
  PhoneOutlined, 
  CalendarOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  CreditCardOutlined,
  BankOutlined,
  FileDoneOutlined
} from '@ant-design/icons';

// Define Product interface locally since it's defined in the same file as the page
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface OrderReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  subtotal: number;
  tax: number;
  discount: number;
  grandTotal: number;
  customerName: string;
  insuranceId?: string;
  insuranceType?: string;
  onConfirmPayment: () => void;
}

const OrderReviewModal = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  tax,
  discount,
  grandTotal,
  customerName,
  insuranceId,
  insuranceType,
  onConfirmPayment,
}: OrderReviewModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [tinNumber, setTinNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  // State for multiple payment amounts
  const [paymentAmounts, setPaymentAmounts] = useState({
    mobile: '',
    cash: '',
    card: '',
    bank: '',
    cheque: '',
    credit: ''
  });

  // Calculate total of all payment amounts for validation
  const totalPaymentAmount = Object.values(paymentAmounts).reduce((sum, amount) => {
    const numericAmount = parseFloat(amount) || 0;
    return sum + numericAmount;
  }, 0);

  // Count how many payment methods have values
  const paymentMethodsWithValues = Object.values(paymentAmounts).filter(amount => parseFloat(amount) > 0).length;

  // Validate if payment amounts match grand total and at least one input has a value
  const isPaymentValid = selectedPaymentMethod === 'multiple' ? 
    paymentMethodsWithValues > 0 && Math.abs(totalPaymentAmount - grandTotal) < 0.01 : // Allow for floating point precision issues
    true;

  const handleConfirmPayment = () => {
    // Only proceed if payment is valid for multiple payment method
    if (selectedPaymentMethod === 'multiple' && !isPaymentValid) {
      return;
    }
    onConfirmPayment();
    onClose();
  };

  // Handle phone number change with auto-save
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    // Here you could add logic to save to a database or context if needed
  };

  // Handle TIN number change with auto-save
  const handleTinNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTinNumber(value);
    // Here you could add logic to save to a database or context if needed
  };

  // Handle Company Name change with auto-save
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCompanyName(value);
    // Here you could add logic to save to a database or context if needed
  };

  // Handle payment amount changes for multiple payment method
  const handlePaymentAmountChange = (method: string, value: string) => {
    // Validate that the input is a valid number or empty
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setPaymentAmounts(prev => ({
        ...prev,
        [method]: value
      }));
    }
  };

  // Get current date and time
  const currentDateTime = new Date().toLocaleString();

  // Footer buttons
  const footer = (
    <div className="flex justify-between space-x-3">
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button 
        variant="primary" 
        onClick={handleConfirmPayment}
        disabled={!selectedPaymentMethod || (selectedPaymentMethod === 'multiple' && !isPaymentValid)}
      >
        Confirm Payment
      </Button>
    </div>
  );

  // Payment method options
  const paymentMethods = [
    { 
      id: 'mobile', 
      name: 'Mobile', 
      description: 'Pay with mobile money',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      id: 'cash', 
      name: 'Cash', 
      description: 'Pay with cash',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      id: 'card', 
      name: 'Card', 
      description: 'Pay with credit/debit card',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    { 
      id: 'bank', 
      name: 'Bank', 
      description: 'Pay via bank transfer',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      id: 'cheque', 
      name: 'Cheque', 
      description: 'Pay with cheque',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    { 
      id: 'credit', 
      name: 'Credit', 
      description: 'Pay on credit',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    { 
      id: 'multiple', 
      name: 'Multiple', 
      description: 'Split payment across methods',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Order Review"
      subtitle="Review your order details and confirm payment"
      maxWidth="max-w-6xl"
      footer={footer}
    >
        {/* Scrollable content */}
      <div className="overflow-y-auto max-h-[60vh] pr-2 grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Column - Content without scrolling */}
        <div>
          <div className="space-y-2 p-2">
            {/* Section 1: Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <StatCard 
            title="Billed to"
            icon={<UserOutlined />}
          >
                <div className="mt-2 text-sm text-gray-500 font-medium">
                  {customerName || 'Walk In Customer'}
                </div>
                {/* Show phone number, TIN number, company name, insurance ID, and insurance name below customer name */}
                {((phoneNumber || tinNumber || companyName) || insuranceId || insuranceType) && (
                  <div className="mt-1 text-xs text-gray-600">
                    {insuranceId && (
                      <div>Ins. ID: {insuranceId}</div>
                    )}
                    {insuranceType && (
                      <div>ins. Name: {insuranceType}</div>
                    )}
                    {phoneNumber && (
                      <div>Tel: {phoneNumber}</div>
                    )}
                    {tinNumber && (
                      <div>TIN: {tinNumber}</div>
                    )}
                    {companyName && (
                      <div>Company: {companyName}</div>
                    )}
                  </div>
                )}
              </StatCard>

              {/* Modified Grand Total StatCard to keep label and value together on the same line with specified color */}
              <StatCard>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium" style={{ color: '#757575' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-medium" style={{ color: '#757575' }}>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium" style={{ color: '#757575' }}>${discount.toFixed(2)}</span>
              </div>
              {/* Add divider above Grand Total */}
              <div className="h-px bg-[#EAECF0] my-2"></div>
              {/* Moved Grand Total value to be with the label and applied specified color */}
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600 font-bold">Grand Total:</span>
                <span className="font-bold text-lg" style={{ color: 'rgb(133 237 104)' }}>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </StatCard>

              {/* Phone Number, TIN Number, and Company Name on one line - 33% each */}
              {/* Hide these inputs when a customer is confirmed from PatientModal (when insuranceId exists) */}
              {!insuranceId && (
                <div className="col-span-2 grid grid-cols-3 gap-3">
                  <StatCard 
                    title="Phone Number"
                    icon={<PhoneOutlined />}
                  >
                    <Input
                      type="text"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder="Enter phone number"
                      className="mt-2"
                    />
                  </StatCard>

                  <StatCard 
                    title="TIN Number"
                    icon={<FileTextOutlined />}
                  >
                    <Input
                      type="text"
                      value={tinNumber}
                      onChange={handleTinNumberChange}
                      placeholder="Enter TIN number"
                      className="mt-2"
                    />
                  </StatCard>
                  
                  <StatCard 
                    title="Co. Name"
                    icon={<FileTextOutlined />}
                  >
                    <Input
                      type="text"
                      value={companyName}
                      onChange={handleCompanyNameChange}
                      placeholder="Enter company name"
                      className="mt-2"
                    />
                  </StatCard>
                </div>
              )}
            </div>

            {/* Section 2: Order Summary */}
            <StatCard 
              title="Order Summary"
              icon={<ShoppingCartOutlined />}
            >
              {/* Show item count at the top right corner of the card */}
              <div className="flex justify-end -mt-6 mb-6">
                <div className="text-sm font-normal text-gray-600">:{cartItems.length} Items</div>
              </div>
              <div className="overflow-x-auto mt-2 flex-grow">
                {/* Made the table container scrollable with fixed height for 3 items */}
                <div className="min-h-[160px] max-h-[100px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">No.</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Name</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Quantity</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Unit Price</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Sub Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">${item.price.toFixed(2)}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))
                      ) : (
                        // Empty state with increased height
                        <tr>
                          <td colSpan={5} className="px-3 py-10 text-center text-gray-500">
                            No items in cart
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </StatCard>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-2 p-2">
          {/* Section 2: Payment Methods */}
          <StatCard 
            title="Payment Methods"
            icon={<BankOutlined />}
            className="pr-5"
          >
            <div className="mt-2">
              {/* Removed overflow-y-auto max-h-96 from payment methods container to use modal scrolling instead */}
              <div className="flex-grow py-2 px-2">
                {/* Grid container for payment methods */}
                <div className="grid grid-cols-3 gap-4">
                  {paymentMethods.map(method => (
                    <div 
                      key={method.id}
                      className={`rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative ${
                        selectedPaymentMethod === method.id
                          ? 'border-emerald-500 bg-emerald-100 shadow-lg'
                          : 'border-gray-200 hover:border-emerald-500 hover:bg-emerald-100'
                      }`}
                      style={{ 
                        minHeight: '120px',
                        boxShadow: selectedPaymentMethod === method.id ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        paddingTop: '1rem',
                        backgroundColor: selectedPaymentMethod === method.id ? '#f0f7ff' : 'white'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedPaymentMethod !== method.id) {
                          e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.15)';
                          e.currentTarget.style.backgroundColor = '#d1fae5'; // emerald-100
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedPaymentMethod !== method.id) {
                          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
                          e.currentTarget.style.backgroundColor = 'white';
                        }
                      }}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex flex-col items-center justify-center h-full pb-3">
                        <div className="mb-3">{method.icon}</div>
                        <div className="text-lg font-semibold text-gray-800 mb-1">{method.name}</div>
                        <div className="text-xs text-gray-600 text-center px-2">{method.description}</div>
                      </div>
                      
                      {/* Split Payment Inputs - Show only for 'multiple' payment method, positioned to the right of the box */}
                      {selectedPaymentMethod === 'multiple' && method.id === 'multiple' && (
                        <div className="absolute left-full top-0 ml-2 w-80">
                          <div className="grid grid-cols-2 gap-4 border rounded-xl ml-2 p-0.5" style={{ minHeight: '120px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 25px -5px', backgroundColor: 'rgb(240, 247, 255)' }}>
                            {/* Left column: Mobile, Cash, Card - aligned with Cheque box */}
                            <div className="ml-2 pt-2">
                              <Input
                                type="text"
                                value={paymentAmounts.mobile}
                                onChange={(e) => handlePaymentAmountChange('mobile', e.target.value)}
                                placeholder="Mobile"
                                className="text-xs mb-2"
                                style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
                              />
                              <Input
                                type="text"
                                value={paymentAmounts.cash}
                                onChange={(e) => handlePaymentAmountChange('cash', e.target.value)}
                                placeholder="Cash"
                                className="text-xs mb-2"
                                style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
                              />
                              <Input
                                type="text"
                                value={paymentAmounts.card}
                                onChange={(e) => handlePaymentAmountChange('card', e.target.value)}
                                placeholder="Card"
                                className="text-xs"
                                style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
                              />
                            </div>
                            
                            {/* Right column: Bank, Cheque, Credit - aligned with Credit box */}
                            <div className="mr-2 pt-2 pb-2">
                              <Input
                                type="text"
                                value={paymentAmounts.bank}
                                onChange={(e) => handlePaymentAmountChange('bank', e.target.value)}
                                placeholder="Bank"
                                className="text-xs mb-2"
                                style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
                              />
                              <Input
                                type="text"
                                value={paymentAmounts.cheque}
                                onChange={(e) => handlePaymentAmountChange('cheque', e.target.value)}
                                placeholder="Cheque"
                                className="text-xs mb-2"
                                style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
                              />
                              <Input
                                type="text"
                                value={paymentAmounts.credit}
                                onChange={(e) => handlePaymentAmountChange('credit', e.target.value)}
                                placeholder="Credit"
                                className="text-xs"
                                style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </StatCard>
        </div>
      </div>
    </Modal>
  );
};

export default OrderReviewModal;