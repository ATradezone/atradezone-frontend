'use client';

import React, { useState } from 'react';
import { PlusOutlined, SearchOutlined, MedicineBoxOutlined, MinusOutlined } from '@ant-design/icons';
import { Input, AutoCompleteSelect, Button, ActionButtons } from '@/components/ui';
import Select from '@/components/ui/Select';
import Topbar from '@/components/layout/Topbar';
import SectionHeader from '@/components/layout/SectionHeader';
import StatCard from '@/components/ui/StatCard';
import MedicineAutoCompleteSelect from './components/MedicineAutoCompleteSelect';
import OrderReviewModal from './components/OrderReviewModal';
import PatientModal from './components/PatientModal';

// We'll use the existing Product interface and extend it with our additional fields inline

const PharmacyPOSPAGE = () => {
  const [liveMode, setLiveMode] = useState(true);
  const [customerName, setCustomerName] = useState('Walk In Customer');
  const [insuranceId, setInsuranceId] = useState('');
  const [insuranceType, setInsuranceType] = useState('');
  const [progress, setProgress] = useState(0); // Progress percentage
  const [customerSearch, setCustomerSearch] = useState(''); // Empty string represents "Walk In Customer"
  const [productSearch, setProductSearch] = useState('');
  const [isOrderReviewModalOpen, setIsOrderReviewModalOpen] = useState(false);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  
  // Cart state
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [holdedCarts, setHoldedCarts] = useState<any[][]>([]);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  const [currentHoldIndex, setCurrentHoldIndex] = useState<number | null>(null);

  // Product options for autocomplete
  const productOptions = [
    { value: 'product1', label: 'Paracetamol 500mg', price: 5.99 },
    { value: 'product2', label: 'Amoxicillin 250mg', price: 12.5 },
    { value: 'product3', label: 'Vitamin C 1000mg', price: 8.75 },
    { value: 'product4', label: 'Ibuprofen 200mg', price: 4.5 },
    { value: 'product5', label: 'Loratadine 10mg', price: 7.25 },
    { value: 'product6', label: 'Omeprazole 20mg', price: 15.0 },
    { value: 'product7', label: 'Aspirin 81mg', price: 6.5 },
    { value: 'product8', label: 'Metformin 500mg', price: 9.75 },
    { value: 'product9', label: 'Atorvastatin 20mg', price: 18.99 },
    { value: 'product10', label: 'Levothyroxine 50mcg', price: 11.25 },
    { value: 'product11', label: 'Albuterol Inhaler', price: 25.5 },
    { value: 'product12', label: 'Insulin Glargine', price: 85.0 },
    { value: 'product13', label: 'Azithromycin 250mg', price: 13.75 },
    { value: 'product14', label: 'Hydrochlorothiazide 25mg', price: 7.99 },
    { value: 'product15', label: 'Amlodipine 5mg', price: 8.25 },
  ];

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return 'CU';
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  // Get customer name from customer search value
  const getCustomerName = (value: string) => {
    if (value === '' || value === undefined) return 'Walk In Customer';
    
    const customerOption = [
      { value: '', label: 'Walk In Customer' },
      { value: 'customer1', label: 'John Doe' },
      { value: 'customer2', label: 'Jane Smith' },
    ].find(option => option.value === value);
    
    return customerOption ? customerOption.label : value; // Return the value itself if not found in options
  };

  // Calculate progress based on conditions
  const calculateProgress = () => {
    if (cartItems.length > 0) {
      return 75;
    } else if (customerSearch !== undefined) {
      return 35;
    }
    return 0;
  };

  // Update progress state when dependencies change
  React.useEffect(() => {
    setProgress(calculateProgress());
  }, [customerSearch, cartItems.length]);

  // Handle customer search
  const handleCustomerSearch = (value: string) => {
    setCustomerSearch(value);
    setCustomerName(getCustomerName(value));
  };

  // Handle product search and add to cart
  const handleProductSearch = (value: string) => {
    setProductSearch(value);
    
    // If a product is selected (not just typed), add it to cart
    if (value) {
      const selectedProduct = productOptions.find(option => option.value === value);
      if (selectedProduct) {
        addToCart(selectedProduct);
        // Clear the search after adding to cart
        setProductSearch('');
      }
    }
  };

  // Add product to cart
  const addToCart = (product: any) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.name === product.label);
      
      if (existingItemIndex >= 0) {
        // If product exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // If product doesn't exist, add new item at the beginning of the array
        const newItem = {
          id: Date.now(), // Generate unique ID
          name: product.label,
          category: 'Medication', // Default category
          price: product.price,
          quantity: 1
        };
        return [newItem, ...prevItems];
      }
    });
  };

  // Handle cancel/reset
  const handleCancelReset = () => {
    setCustomerName('');
    setInsuranceId('');
    setInsuranceType('');
    setProgress(0);
    setCustomerSearch('');
    setProductSearch('');
  };

  // Handle review & confirm
  const handleReviewConfirm = (): void => {
    // When payment is made, only clear the current cart items
    // If these items were restored from a held cart, remove that specific held cart
    if (currentHoldIndex !== null && holdedCarts[currentHoldIndex]) {
      const updatedHoldedCarts = [...holdedCarts];
      updatedHoldedCarts.splice(currentHoldIndex, 1);
      setHoldedCarts(updatedHoldedCarts);
      // Adjust currentHoldIndex if needed
      if (updatedHoldedCarts.length === 0) {
        setCurrentHoldIndex(null);
      } else if (currentHoldIndex >= updatedHoldedCarts.length) {
        setCurrentHoldIndex(updatedHoldedCarts.length - 1);
      }
    }
    setCartItems([]);
    console.log('Processing payment');
    // Set progress to 100% when payment is complete
    setProgress(100);
  };

  // Cart functions
  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Filter cart items based on search term
  const filteredCartItems = cartItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const discount = 0;
  const grandTotal = subtotal + tax - discount;

  return (
    <>
      {/* Global styles for background */}
      <style jsx global>{`
        html, body {
          background-color: #f9fafd;
          margin: 0;
          padding: 0;
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f9fafd;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 4px;
          border: 2px solid #f9fafd;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
        /* Firefox support for root */
        html {
          scrollbar-color: #d1d5db #f9fafd;
          scrollbar-width: thin;
        }

        /* Custom scrollbar for internal scroll containers */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafd;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 4px;
          border: 2px solid #f9fafd;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
        /* Firefox support for custom scrollbars */
        .custom-scrollbar {
          scrollbar-color: #d1d5db #f9fafd;
          scrollbar-width: thin;
        }
      `}</style>

      <div className="min-h-screen bg-[#f9fafd] p-0">
        <Topbar liveMode={liveMode} setLiveMode={setLiveMode} />
        
        <div className="p-6 space-y-6">
          {/* Section 1: Customer Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Upper Section */}
            <div className="flex mt-0 items-center">
              {/* Left Column (20% width) - Customer Avatar */}
              <div className="w-1/5">
                <div className="flex items-center mb-0 ">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold mr-3">
                    {getInitials(customerName)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Customer Name</div>
                    <div className="text-lg font-semibold" style={{ color: '#6E82A5' }}> {customerName || 'Walk In Customer'}</div>
                  </div>
                </div>
              </div>
              
              {/* Center Column (60% width) - Progress bar in the center */}
              <div className="w-3/5 px-4 mr-8">
                <div className="w-full rounded-full h-8" style={{ backgroundColor: '#F8FAFD', border: '1px solid #EBEEF9' }}>
                  <div 
                    className="h-8 rounded-full relative"
                    style={{ width: `${progress}%`, backgroundColor: '#EBEEF9' }}
                  >
                    <div className="absolute inset-0 flex items-center justify-between px-2">
                      <span className="text-xs font-medium" style={{ color: '#6E82A5' }}>{insuranceId ? `INSURANCE ID: ${insuranceId}` : 'INSURANCE ID: N/A'}</span>
                      <span className="text-xs font-medium" style={{ color: '#6E82A5' }}>{progress}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (20% width) - Customer Avatar */}
              <div className="w-1/5 flex justify-end">
                {/* Customer Avatar */}
                <div className="flex items-center mb-0">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700">Insurance Name</div>
                    <div className="text-lg font-semibold" style={{ color: '#6E82A5' }}>{insuranceType || 'N/A to Walk In Customer'}</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold ml-3">
                    {getInitials(customerName)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Divider - touching edges of the box */}
            <div className="h-px bg-[#EAECF0] mt-6 mb-4 -mx-6"></div>
            
            {/* Lower Section - Customer Dropdown */}
            <div className="mt-6 relative  sticky top-0 z-20">
              <div className="w-full">
                <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="mt-2">
                    <AutoCompleteSelect
                      label=""
                      value={customerSearch}
                      onChange={handleCustomerSearch}
                      options={[
                        { value: '', label: 'Walk In Customer' },
                        { value: 'customer1', label: 'John Doe' },
                        { value: 'customer2', label: 'Jane Smith' },
                      ]}
                      placeholder="Search customer by name or ID"
                      actionButton={{
                        icon: customerSearch ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <PlusOutlined />
                        ),
                        onClick: () => {
                          if (customerSearch) {
                            // Reset to default "Walk In Customer"
                            handleCustomerSearch('');
                          } else {
                            // Open the modal to add a new customer
                            setIsInsuranceModalOpen(false);
                            setTimeout(() => setIsInsuranceModalOpen(true), 0);
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 2: Cart Items Table */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex flex-col flex-grow sticky top-20 z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-grow">
                <div className="flex items-center mt-4">
                  <div 
                    onClick={() => window.open('https://www.atradezone.ca/offices/', '_blank', 'noopener,noreferrer')}
                    className="cursor-pointer"
                  >
                    <img 
                      src="/images/web-favicon.png" 
                      alt="Favicon" 
                      className="jsx-787ca4cb96290ee3 w-12 h-12 mt-0 mr-2 mb-3.5 flex-shrink-0 z-10 border border-[#7d7d7d]"
                    />
                  </div>
                  <SectionHeader title={`Cart Items `} className="mb-0" showDivider={false} />
                </div>
              </div>
              <div className="flex items-center justify-center flex-grow">
                <div className="w-[800px] mr-20 ml-0">
                  <StatCard
                    value=""
                    description=""
                    className="hover:shadow-md transition-shadow"
                  >
                    <div className="mt-2">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <MedicineAutoCompleteSelect
                            label=""
                            value={productSearch}
                            onChange={handleProductSearch}
                            options={productOptions.map(option => ({
                              value: option.value,
                              label: option.label
                            }))}
                            placeholder="Search product name, code, or scan barcode"
                            actionButton={{
                              icon: productSearch ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              ) : (
                                <SearchOutlined />
                              ),
                              onClick: () => {
                                if (productSearch) {
                                  // Reset the product search
                                  handleProductSearch('');
                                } else {
                                  console.log('Search products');
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </StatCard>
                </div>
              </div>
              <div className="flex-grow text-right">
                <div className="text-lg font-medium text-gray-700 inline-block mt-4">
                  Total Items: <span className="font-bold">{cartItems.length}</span>
                </div>
              </div>
            </div>
            <div className="overflow-auto flex-grow custom-scrollbar" style={{ maxHeight: '400px', minHeight: '400px' }}>
              <table className="w-full">
                <thead className="sticky top-0 bg-white z-10 shadow-sm">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-medium" style={{ color: 'rgb(107 114 128)' }}>No.</th>
                    <th className="text-left py-2 text-sm font-medium" style={{ color: 'rgb(107 114 128)' }}>Name</th>
                    <th className="text-left py-2 text-sm font-medium" style={{ color: 'rgb(107 114 128)' }}>Drug Frequency</th>
                    <th className="text-left py-2 text-sm font-medium" style={{ color: 'rgb(107 114 128)' }}>Duration (Days)</th>
                    <th className="text-left py-2 text-sm font-medium" style={{ color: 'rgb(107 114 128)' }}>Quantity</th>
                    <th className="text-left py-2 text-sm font-medium" style={{ color: 'rgb(107 114 128)' }}>Unit Price</th>
                    <th className="text-left py-2 text-sm font-medium" style={{ color: 'rgb(107 114 128)' }}>Sub Total</th>
                    <th className="text-left py-2 text-sm font-medium" style={{ color: 'rgb(107 114 128)' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCartItems.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-0">
                        <div className="flex flex-col items-center justify-center" style={{ minHeight: '250px' }}>
                          <div className="bg-gray-100 rounded-full p-4 mb-4 mt-12">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {searchTerm ? 'No matching items found' : 'Your cart is empty'}
                          </h3>
                          <p className="text-gray-500 text-center max-w-md">
                            {searchTerm 
                              ? 'Try adjusting your search or add products to the cart' 
                              : 'Add products using the search bar above to get started'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredCartItems.map((item: any, index: number) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-3 text-sm" style={{ color: '#757575' }}>{index + 1}</td>
                        <td className="py-3 text-sm" style={{ color: '#757575' }}>{item.name}</td>
                        <td className="py-3 w-2/12">
                          <Select
                            value={item.frequency || ''}
                            onChange={(value: string) => {
                              // Update item with frequency
                              const updatedCart = [...cartItems];
                              const itemIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id);
                              if (itemIndex !== -1) {
                                updatedCart[itemIndex] = { ...updatedCart[itemIndex], frequency: value };
                                setCartItems(updatedCart);
                              }
                            }}
                            options={[
                              { value: '', label: 'Select Frequency' },
                              { value: 'Qd', label: 'Qd' },
                              { value: 'Bid', label: 'Bid' },
                              { value: 'Tid', label: 'Tid' },
                              { value: 'Qid', label: 'Qid' },
                              { value: 'Qhs', label: 'Qhs' },
                              { value: 'Five Times A Day', label: 'Five Times A Day' },
                              { value: 'Q4h', label: 'Q4h' },
                              { value: 'Q6h', label: 'Q6h' },
                              { value: 'Qod', label: 'Qod' },
                              { value: 'Once A Week', label: 'Once A Week' },
                              { value: 'Prn', label: 'Prn' },
                              { value: 'Custom Hours', label: 'Custom Hours' }
                            ]}
                            className="w-full"
                            placeholder="Select Frequency"
                          />
                        </td>
                        <td className="py-3">
                          <input
                            type="number"
                            min="1"
                            value={item.duration || ''}
                            onChange={(e) => {
                              const duration = parseInt(e.target.value) || 0;
                              // Update item with duration
                              const updatedCart = [...cartItems];
                              const itemIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id);
                              if (itemIndex !== -1) {
                                updatedCart[itemIndex] = { ...updatedCart[itemIndex], duration };
                                setCartItems(updatedCart);
                              }
                            }}
                            className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            style={{ color: '#757575' }}
                          />
                        </td>
                        <td className="py-3">
                          <div className="flex items-center">
                            <button
                              className="p-1 rounded-full border border-gray-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(item.id, -1);
                              }}
                            >
                              <MinusOutlined className="text-xs" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => {
                                e.stopPropagation();
                                const newQuantity = parseInt(e.target.value) || 1;
                                updateQuantity(item.id, newQuantity - item.quantity);
                              }}
                              className="mx-2 w-16 ml-4 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-1"
                              onClick={(e) => e.stopPropagation()}
                              onBlur={(e) => {
                                const newQuantity = parseInt(e.target.value) || 1;
                                if (newQuantity < 1) {
                                  updateQuantity(item.id, 1 - item.quantity);
                                }
                              }}
                            />
                            <button
                              className="p-1 rounded-full border border-gray-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(item.id, 1);
                              }}
                            >
                              <PlusOutlined className="text-xs" />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 text-sm" style={{ color: '#757575' }}>${item.price.toFixed(2)}</td>
                        <td className="py-3 text-sm" style={{ color: '#757575' }}>${(item.price * item.quantity).toFixed(2)}</td>
                        <td className="py-3">
                          <ActionButtons
                            onDelete={() => removeFromCart(item.id)}
                            iconOnly={true}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Payment Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 sticky bottom-0 z-20">
            <div className="flex justify-between border-t border-gray-200 px-2 pt-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
              <div className="w-1/2 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-medium" style={{ color: '#757575' }}>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium" style={{ color: '#757575' }}>${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200">
                  <span className="font-semibold" style={{ color: '#757575' }}>Grand Total</span>
                  <span className="font-bold text-lg text-green-600">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="w-1/2 space-y-1 ml-20">
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient co-Payment</span>
                  <span className="font-medium" style={{ color: '#757575' }}>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Insurance co-Payment</span>
                  <span className="font-medium" style={{ color: '#757575' }}>${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200">
                  <span className="font-semibold" style={{ color: '#757575' }}>Grand Total (Comibined)</span>
                  <span className="font-bold text-lg" style={{ color: '#6466f1' }}>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="w-1/2 flex justify-end">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 justify-end">
                    <Button
                      variant="secondary"
                      onClick={() => setCartItems([])}
                    >
                      Empty Cart
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        if (clickTimer) {
                          clearTimeout(clickTimer);
                          setClickTimer(null);
                          // Double click - cycle through held carts
                          if (holdedCarts.length > 0) {
                            // Calculate next index
                            const nextIndex = currentHoldIndex === null ? 0 : 
                                             (currentHoldIndex + 1) % holdedCarts.length;
                            setCartItems([...holdedCarts[nextIndex]]);
                            // Track which cart was restored
                            setCurrentHoldIndex(nextIndex);
                          }
                        } else {
                          // Single click - hold current items as a new order
                          const timer = setTimeout(() => {
                            if (cartItems.length > 0) {
                              setHoldedCarts(prev => [...prev, [...cartItems]]);
                              setCartItems([]);
                            }
                            setClickTimer(null);
                          }, 300);
                          setClickTimer(timer);
                        }
                      }}
                    >
                      Hold Cart {holdedCarts.length > 0 ? `(${holdedCarts.length})` : ''}
                    </Button>
                  </div>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => setIsOrderReviewModalOpen(true)}
                  >
                    Review & Pay Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderReviewModal
        isOpen={isOrderReviewModalOpen}
        onClose={() => setIsOrderReviewModalOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        tax={tax}
        discount={discount}
        grandTotal={grandTotal}
        customerName={customerName}
        insuranceId={insuranceId}
        insuranceType={insuranceType}
        onConfirmPayment={handleReviewConfirm}
      />
      <PatientModal
        isOpen={isInsuranceModalOpen}
        onClose={() => setIsInsuranceModalOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
        productOptions={productOptions}
        onConfirmPatient={(patientData: any) => {
          // Set the insurance ID when patient is confirmed
          if (patientData && patientData.insuranceId) {
            setInsuranceId(patientData.insuranceId);
          }
          // Set the customer name when patient is confirmed
          if (patientData && patientData.patientName) {
            setCustomerName(patientData.patientName);
            // Also set the customer search value to show the patient name directly
            // This will display the patient name in the customer search bar
            setCustomerSearch(patientData.patientName);
          }
          // Set the insurance type when patient is confirmed
          if (patientData && patientData.insuranceType) {
            setInsuranceType(patientData.insuranceType);
          }
        }}
      />
    </>
  );
};

export default PharmacyPOSPAGE;