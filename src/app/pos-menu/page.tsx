'use client';

import React, { useState, useEffect } from 'react';
import { PlusOutlined, SearchOutlined, MinusOutlined } from '@ant-design/icons';
import { Input, AutoCompleteSelect, Button, ActionButtons } from '@/components/ui';
import Topbar from '@/components/layout/Topbar';
import SectionHeader from '@/components/layout/SectionHeader';
import StatCard from '@/components/ui/StatCard';
import CustomerModal from '@/app/dashboard/user-management/components/CustomerModal';
import OrderReviewModal from './components/OrderReviewModal';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface Category {
  id: number;
  name: string;
}

const POSMenuPage = () => {
  const [liveMode, setLiveMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [holdedCarts, setHoldedCarts] = useState<Product[][]>([]);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  const [currentHoldIndex, setCurrentHoldIndex] = useState<number | null>(null);
  const productsPerPage = 12;

  const [categories] = useState<Category[]>([
    { id: 1, name: 'All Categories' },
    { id: 2, name: 'Pain Relief' },
    { id: 3, name: 'Antibiotics' },
    { id: 4, name: 'Vitamins' },
    { id: 5, name: 'Allergy' },
    { id: 6, name: 'Digestive Health' },
    { id: 7, name: 'Diabetes' },
    { id: 8, name: 'Blood Pressure' },
    { id: 9, name: 'Cholesterol' },
    { id: 10, name: 'Antidepressant' },
    { id: 11, name: 'Asthma' },
    { id: 12, name: 'Thyroid' },
    { id: 13, name: 'Skin Care' },
    { id: 14, name: 'Eye Care' },
    { id: 15, name: 'First Aid' },
  ]);

  const [products] = useState<Product[]>([
    { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', price: 5.99, quantity: 1 },
    { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotics', price: 12.5, quantity: 1 },
    { id: 3, name: 'Vitamin C 1000mg', category: 'Vitamins', price: 8.75, quantity: 1 },
    { id: 4, name: 'Loratadine 10mg', category: 'Allergy', price: 7.25, quantity: 1 },
    { id: 5, name: 'Omeprazole 20mg', category: 'Digestive Health', price: 9.99, quantity: 1 },
    { id: 6, name: 'Ibuprofen 200mg', category: 'Pain Relief', price: 6.5, quantity: 1 },
    { id: 7, name: 'Cetirizine 10mg', category: 'Allergy', price: 6.75, quantity: 1 },
    { id: 8, name: 'Metformin 500mg', category: 'Diabetes', price: 15.25, quantity: 1 },
    { id: 9, name: 'Aspirin 100mg', category: 'Pain Relief', price: 4.5, quantity: 1 },
    { id: 10, name: 'Azithromycin 250mg', category: 'Antibiotics', price: 14.75, quantity: 1 },
    { id: 11, name: 'Vitamin D3 1000IU', category: 'Vitamins', price: 9.25, quantity: 1 },
    { id: 12, name: 'Fexofenadine 180mg', category: 'Allergy', price: 8.5, quantity: 1 },
    // Adding 12 more mock products
    { id: 13, name: 'Atorvastatin 20mg', category: 'Cholesterol', price: 11.5, quantity: 1 },
    { id: 14, name: 'Levothyroxine 50mcg', category: 'Thyroid', price: 8.99, quantity: 1 },
    { id: 15, name: 'Amlodipine 5mg', category: 'Blood Pressure', price: 7.75, quantity: 1 },
    { id: 16, name: 'Losartan 50mg', category: 'Blood Pressure', price: 9.25, quantity: 1 },
    { id: 17, name: 'Sertraline 50mg', category: 'Antidepressant', price: 13.5, quantity: 1 },
    { id: 18, name: 'Escitalopram 10mg', category: 'Antidepressant', price: 14.25, quantity: 1 },
    { id: 19, name: 'Montelukast 10mg', category: 'Asthma', price: 10.75, quantity: 1 },
    { id: 20, name: 'Albuterol Inhaler', category: 'Asthma', price: 25.99, quantity: 1 },
    { id: 21, name: 'Fluticasone Nasal Spray', category: 'Allergy', price: 18.5, quantity: 1 },
    { id: 22, name: 'Budesonide Inhaler', category: 'Asthma', price: 22.75, quantity: 1 },
    { id: 23, name: 'Doxycycline 100mg', category: 'Antibiotics', price: 11.25, quantity: 1 },
    { id: 24, name: 'Clindamycin 300mg', category: 'Antibiotics', price: 16.5, quantity: 1 },
  ]);

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [customer, setCustomer] = useState('');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isOrderReviewModalOpen, setIsOrderReviewModalOpen] = useState(false);

  // Add search functionality
  useEffect(() => {
    const handlePageSearch = (event: CustomEvent) => {
      const term = event.detail.term;
      handleSearchProduct(term);
    };

    window.addEventListener('pageSearch', handlePageSearch as EventListener);
    
    return () => {
      window.removeEventListener('pageSearch', handlePageSearch as EventListener);
    };
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 1 || product.category === categories.find(c => c.id === activeCategory)?.name;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter cart items based on search term
  const filteredCartItems = cartItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

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

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const discount = 0;
  const grandTotal = subtotal + tax - discount;

  const handleCustomerChange = (value: string) => {
    setCustomer(value);
  };

  const handleSearchProduct = (value: string) => {
    setSearchTerm(value);
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const handlePayment = (): void => {
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
  };

  const handleCreateCustomer = (customerData: {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    tinNumber: string;
  }) => {
    // Here you would typically make an API call to create the customer
    console.log('Creating customer:', customerData);
    // For now, we'll just close the modal
    setIsCustomerModalOpen(false);
    // You might want to add the new customer to the customer list here
  };

  return (
    <>
      {/* Global styles for background and scrollbar */}
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
        <div className="flex gap-6 p-6">
          {/* Left Column */}
          <div className="w-7/12">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-20 z-10">
              <SectionHeader title="Categories" className="mb-0" showDivider={true} />
              <div className="flex items-start">
                <div 
                  onClick={() => window.open('https://www.atradezone.ca/offices/', '_blank', 'noopener,noreferrer')}
                  className="cursor-pointer"
                >
                  <img 
                    src="/images/web-favicon.png" 
                    alt="Favicon" 
                    className="jsx-787ca4cb96290ee3 w-12 h-12 mt-0 mr-2 flex-shrink-0 z-10 border border-[#7d7d7d]"
                  />
                </div>
                <div className="flex overflow-x-auto pb-2 gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`px-4 py-2 mt-2 rounded-full whitespace-nowrap flex items-center border border-[#7d7d7d] text-md ${
                        activeCategory === category.id
                          ? (category.id === 1 
                              ? 'text-[#86ee68] border border-[#86ee68] font-bold bg-transparent' 
                              : 'text-[rgb(133,237,104)] border border-[rgb(133,237,104)] font-bold bg-transparent')
                          : 'bg-white text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                      style={{ fontFamily: 'Afacad, sans-serif' }}
                    >
                      {category.id === 1 && (
                        <img 
                          src="/images/web-favicon.png" 
                          alt="Favicon" 
                          className="w-4 h-4 mr-2 hidden"
                        />
                      )}
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20 z-5">
              <SectionHeader title={`Products: ${categories.find(c => c.id === activeCategory)?.name || 'All Categories'}`} className="mb-0" showDivider={true} />
              <div className="grid grid-cols-4 gap-4">
                {filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map(product => (
                  <div 
                    key={product.id} 
                    className="cursor-pointer"
                    onClick={() => addToCart(product)}
                  >
                    <StatCard
                      title={product.name}
                      value={`$${product.price.toFixed(2)}`}
                      description={product.category}
                      className="hover:shadow-md transition-shadow"
                    >
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium" style={{ color: '#757575' }}>Stock:</span> {product.quantity} available
                      </div>
                    </StatCard>
                  </div>
                ))}
              </div>
              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex items-center flex-1 mx-4">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-gray-700 mx-4 whitespace-nowrap">
                    Page {currentPage} of {Math.ceil(filteredProducts.length / productsPerPage)}
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                
                <Button
                  variant="secondary"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredProducts.length / productsPerPage)))}
                  disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-5/12 flex flex-col">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-20 z-10">
              <div className="space-y-4 ">
                <AutoCompleteSelect
                  label="Customer"
                  value={customer}
                  onChange={handleCustomerChange}
                  options={[
                    { value: '', label: 'Walk In Customer' },
                    { value: 'customer1', label: 'Two Customers' },
                  ]}
                  placeholder="Select customer"
                  actionButton={{
                    icon: customer ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <PlusOutlined />
                    ),
                    onClick: () => {
                      if (customer) {
                        // Reset to default "Walk In Customer"
                        handleCustomerChange('');
                      } else {
                        // Open the modal to add a new customer
                        setIsCustomerModalOpen(true);
                      }
                    }
                  }}
                />
                
                <Input
                  label="Search Product"
                  placeholder="Search product name/ Item Code/ Scan bar code"
                  value={searchTerm}
                  onChange={(e) => handleSearchProduct(e.target.value)}
                />
              </div>
            </div>

            {/* Section 2: Cart Items Table */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex flex-col flex-grow sticky top-0 z-10">
              <div className="pb-4">
                <SectionHeader title={`Cart Items (${cartItems.length})`} className="mb-0" showDivider={true} />
              </div>
              <div className="overflow-auto flex-grow custom-scrollbar" style={{ maxHeight: '200px' }}>
                <table className="w-full">
                  <thead className="sticky top-0 bg-white z-10 shadow-sm">
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-sm font-medium" style={{ color: 'rgb(107 114 128)' }}>No.</th>
                      <th className="text-left py-2 text-sm font-medium" style={{ color: 'rgb(107 114 128)' }}>Name</th>
                      <th className="text-left py-2 text-sm font-medium" style={{ color: 'rgb(107 114 128)' }}>Quantity</th>
                      <th className="text-left py-2 text-sm font-medium" style={{ color: 'rgb(107 114 128)' }}>Unit Price</th>
                      <th className="text-left py-2 text-sm font-medium" style={{ color: 'rgb(107 114 128)' }}>Sub Total</th>
                      <th className="text-left py-2 text-sm font-medium" style={{ color: 'rgb(107 114 128)' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCartItems.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-10 text-gray-500">
                          {searchTerm ? 'No matching items in cart' : 'No items in cart'}
                        </td>
                      </tr>
                    ) : (
                      filteredCartItems.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="py-3 text-sm" style={{ color: '#757575' }}>{index + 1}</td>
                          <td className="py-3 text-sm" style={{ color: '#757575' }}>{item.name}</td>
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
                                className="mx-2 w-16 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-1"
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

            {/* Payment Summary - Moved outside of Cart Items section */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky bottom-0 z-20">
              <div className="grid grid-cols-2 gap-6 border-t border-gray-200 px-2 pt-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="font-medium" style={{ color: '#757575' }}>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium" style={{ color: '#757575' }}>${discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="font-semibold" style={{ color: '#757575' }}>Grand Total</span>
                      <span className="font-bold text-lg text-green-600">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={emptyCart}
                    >
                      Empty Cart
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1"
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
                    className="w-full mt-3"
                    onClick={() => setIsOrderReviewModalOpen(true)}
                  >
                    Review & Pay Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Removed separate Section 3 div */}
          </div>
        </div>
      </div>
      <CustomerModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onSubmit={handleCreateCustomer}
      />
      <OrderReviewModal
        isOpen={isOrderReviewModalOpen}
        onClose={() => setIsOrderReviewModalOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        tax={tax}
        discount={discount}
        grandTotal={grandTotal}
        customerName={customer}
        onConfirmPayment={handlePayment}
      />
    </>
  );
};

export default POSMenuPage;