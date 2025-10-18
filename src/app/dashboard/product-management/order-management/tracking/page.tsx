'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '@/components/reusable';
import ActionButtons from '@/components/reusable/ActionButtons';
import CloseButton from '@/components/ui/CloseButton';
import StatCard from '@/components/ui/StatCard';
import PageTitle from '@/components/ui/PageTitle';
import Button from '@/components/ui/Button';
import { 
  SearchOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  CarOutlined, 
  HomeOutlined, 
  UserOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined,
  FileTextOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  UnorderedListOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

// Add custom styles for animations and scrollbar
const customStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  .animation-delay-200 {
    animation-delay: 0.2s;
  }
  
  .animation-delay-400 {
    animation-delay: 0.4s;
  }
`;

interface OrderItem {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: string;
  total: string;
}

interface OrderStatus {
  id: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  description: string;
}

interface OrderDetails {
  id: number;
  orderNumber: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: string;
  items: OrderItem[];
  statusTimeline: OrderStatus[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  shipping: {
    method: string;
    trackingNumber: string;
    estimatedDelivery: string;
    fromLocation?: {
      name: string;
      address: string;
      coordinates?: { lat: number; lng: number };
    };
    toLocation?: {
      name: string;
      address: string;
      coordinates?: { lat: number; lng: number };
    };
  };
  notes?: {
    supplier?: string;
    customer?: string;
  };
}

// Add state for map modal
interface MapModalState {
  isOpen: boolean;
  origin?: { lat: number; lng: number; name: string };
  destination?: { lat: number; lng: number; name: string };
}

const OrderTrackingPage = () => {
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [mapModal, setMapModal] = useState<MapModalState>({ isOpen: false });

  // Function to open map modal
  const openMapModal = () => {
    if (order?.shipping.fromLocation?.coordinates && order?.shipping.toLocation?.coordinates) {
      setMapModal({
        isOpen: true,
        origin: {
          ...order.shipping.fromLocation.coordinates,
          name: order.shipping.fromLocation.name
        },
        destination: {
          ...order.shipping.toLocation.coordinates,
          name: order.shipping.toLocation.name
        }
      });
    }
  };

  // Function to close map modal
  const closeMapModal = () => {
    setMapModal({ isOpen: false });
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Product Management', href: '/dashboard/product-management' },
    { name: 'Order Management', href: '/dashboard/product-management/order-management' },
    { name: 'Order Tracking', current: true }
  ];

  // Simulate loading order data
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock order data
      const mockOrder: OrderDetails = {
        id: 1,
        orderNumber: '#ORD-001',
        date: '2023-06-15',
        status: 'Shipped',
        total: 'RWF 12,500',
        items: [
          { id: 1, name: 'Paracetamol 500mg', sku: 'PARA-500', quantity: 100, price: 'RWF 250', total: 'RWF 25,000' },
          { id: 2, name: 'Amoxicillin 250mg', sku: 'AMOX-250', quantity: 50, price: 'RWF 300', total: 'RWF 15,000' },
          { id: 3, name: 'Ibuprofen 200mg', sku: 'IBU-200', quantity: 75, price: 'RWF 200', total: 'RWF 15,000' },
        ],
        statusTimeline: [
          { id: 1, status: 'Pending', date: '2023-06-15 09:30', description: 'Order placed successfully' },
          { id: 2, status: 'Processing', date: '2023-06-15 14:15', description: 'Order is being processed' },
          { id: 3, status: 'Shipped', date: '2023-06-16 10:00', description: 'Order has been shipped' },
        ],
        customer: {
          name: 'ABC Pharmacy',
          email: 'info@abcpharmacy.com',
          phone: '+250 788 123 456',
          address: '123 Main Street, Kigali, Rwanda',
        },
        shipping: {
          method: 'Standard Delivery',
          trackingNumber: 'TRK123456789RW',
          estimatedDelivery: '2023-06-20',
          fromLocation: {
            name: 'Manufacturer Warehouse',
            address: '123 Industrial Park, Kigali, Rwanda',
            coordinates: { lat: -1.9441, lng: 30.0619 }
          },
          toLocation: {
            name: 'ABC Pharmacy',
            address: '123 Main Street, Kigali, Rwanda',
            coordinates: { lat: -1.9501, lng: 30.0589 }
          }
        },
        notes: {
          supplier: 'Please handle with care. This order contains fragile items that require special packaging.',
          customer: 'Please deliver between 9 AM - 5 PM. Recipient will be available during these hours.'
        }
      };
      setOrder(mockOrder);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <ClockCircleOutlined className="text-yellow-500" />;
      case 'Processing':
        return <ClockCircleOutlined className="text-blue-500" />;
      case 'Shipped':
        return <CarOutlined className="text-purple-500" />;
      case 'Delivered':
        return <CheckCircleOutlined className="text-green-500" />;
      case 'Cancelled':
        return <ClockCircleOutlined className="text-red-500" />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Stats data based on order
  const stats = order ? [
    { 
      title: "Order Items", 
      value: order.items.length.toString(), 
      icon: <FileTextOutlined className="w-5 h-5 text-[#2463EB]" />, 
      color: "bg-[#F6F9FF] border border-[#DBE9FE]",
      change: "+0%",
      changeColor: "text-gray-500"
    },
    { 
      title: "Order Total", 
      value: order.total, 
      icon: <DollarCircleOutlined className="w-5 h-5 text-green-500" />, 
      color: "bg-green-50",
      change: "+0%",
      changeColor: "text-gray-500"
    },
    { 
      title: "Status", 
      value: order.status, 
      icon: <ExclamationCircleOutlined className="w-5 h-5 text-blue-500" />, 
      color: "bg-blue-50",
      change: "+0%",
      changeColor: "text-gray-500"
    },
    { 
      title: "Tracking Number", 
      value: order.shipping.trackingNumber, 
      icon: <FileTextOutlined className="w-5 h-5 text-yellow-500" />, 
      color: "bg-yellow-50",
      change: "+0%",
      changeColor: "text-gray-500"
    }
  ] : [];

  // Show skeleton while loading
  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="h-8 bg-gray-300 rounded w-48 mb-2 animate-pulse"></div>
            <div className="flex items-center mt-2">
              <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              <div className="mx-2 h-4 bg-gray-300 rounded w-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-px bg-[#DDDDDD] mb-6 mx-1"></div>

        {/* Order Info Skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="h-6 bg-gray-300 rounded w-32 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
            </div>
            <div>
              <div className="h-6 bg-gray-300 rounded w-32 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
            </div>
            <div>
              <div className="h-6 bg-gray-300 rounded w-32 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Status Timeline Skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="h-6 bg-gray-300 rounded w-40 mb-6 animate-pulse"></div>
          
          {/* Map Visualization Skeleton */}
          <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-gray-100 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-48 mx-auto mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-300 rounded w-40 mx-auto mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-300 rounded w-32 mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex animate-pulse">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-4"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-48"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Items Skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="h-6 bg-gray-300 rounded w-32 mb-6 animate-pulse"></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((item) => (
                  <tr key={item} className="border-b border-gray-200">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Order Notes Skeleton */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="h-6 bg-gray-300 rounded w-32 mb-4 animate-pulse"></div>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mt-2 animate-pulse"></div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</div>
          <div className="text-gray-600 mb-6">The requested order could not be found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <style>{customStyles}</style>
      
      {/* Set dynamic page title */}
      <PageTitle title={`Order Tracking - ${order.orderNumber}`} />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-gray-800">Order Tracking</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Icons Container */}
        <div className="flex items-center space-x-2">
          {/* Back to Orders Icon */}
          <div 
            className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
            onClick={() => router.push('/dashboard/product-management/order-management')}
            title="Back to orders"
          >
            <UnorderedListOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
          </div>
          
          {/* Edit Order Icon */}
          <div 
            className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
            onClick={() => console.log('Edit order')}
            title="Edit order"
          >
            <EditOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="h-px bg-[#DDDDDD] mb-0 mx-1"></div>
      
      {/* Order Info and Stats Container */}
      <div className="border-t border-[#dddddd] pt-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          {/* Order Info */}
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div className="flex items-start mb-4 md:mb-0">
              {/* Order Initials */}
              <div className="h-16 w-16 rounded-full flex items-center justify-center text-white font-bold bg-blue-500 text-xl mr-4">
                {order.orderNumber.substring(1, 3)}
              </div>
              
              {/* Order Details */}
              <div>
                <h2 className="text-xl font-bold text-gray-800">{order.orderNumber}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    getStatusColor(order.status)
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FileTextOutlined className="mr-2" />
                    <span>Order Date: {order.date}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarCircleOutlined className="mr-2" />
                    <span>Total: {order.total}</span>
                  </div>
                  <div className="flex items-center">
                    <MailOutlined className="mr-2" />
                    <span>Customer: {order.customer.name}</span>
                  </div>
                  <div className="flex items-center">
                    <PhoneOutlined className="mr-2" />
                    <span>{order.customer.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Divider Line */}
          <div className="h-px bg-[#F2F2F2] mb-6 -mx-6"></div>
          
          {/* Stats Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="p-4 rounded-xl bg-white border border-gray-200 shadow-[-5px_5px_16px_6px_rgba(244,245,247,1)] hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-600">{stat.title}</div>
                    <div className="flex items-baseline">
                      <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                      {stat.change && (
                        <span className={`ml-2 text-xs font-medium ${stat.changeColor}`}>
                          {stat.change}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content grid with Order Status Timeline on right and Chat Box on left */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left side - Chat Box (Order Communication) - Sticky */}
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20 h-fit">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Order Communication</h3>
          </div>
          
          <div className="flex flex-col min-h-[420px] bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-4 custom-scrollbar max-h-96">
              {/* Sample messages - in a real app, these would come from state */}
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  <UserOutlined className="text-blue-600 text-xs" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none p-4 max-w-[85%] shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-800">Hi there! I wanted to check on the status of my order #ORD-001. When can I expect delivery?</p>
                  <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                </div>
              </div>
              
              <div className="flex items-start justify-end">
                <div className="bg-blue-500 rounded-2xl rounded-tr-none p-4 max-w-[85%]">
                  <p className="text-sm text-white">Your order #ORD-001 has been shipped and is currently in transit. Estimated delivery is June 20th.</p>
                  <p className="text-xs text-blue-100 mt-1">10:32 AM</p>
                </div>
                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center ml-3 flex-shrink-0">
                  <span className="text-xs font-bold text-gray-600">S</span>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  <UserOutlined className="text-blue-600 text-xs" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none p-4 max-w-[85%] shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-800">Thank you for the update. I'll be expecting the delivery then.</p>
                  <p className="text-xs text-gray-500 mt-1">10:35 AM</p>
                </div>
              </div>
              
              <div className="flex items-start justify-end">
                <div className="bg-blue-500 rounded-2xl rounded-tr-none p-4 max-w-[85%]">
                  <p className="text-sm text-white">You're welcome! If you have any other questions, feel free to ask.</p>
                  <p className="text-xs text-blue-100 mt-1">10:36 AM</p>
                </div>
                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center ml-3 flex-shrink-0">
                  <span className="text-xs font-bold text-gray-600">S</span>
                </div>
              </div>
            </div>
            
            {/* Chat Input */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-600 transition-colors ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Shipment Route Map, Order Status Timeline, and Order Notes */}
        <div className="flex flex-col h-fit">
          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Shipment Route Map</h3>
            </div>
            <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-gray-500">Interactive shipment tracking map</p>
                <p className="text-sm text-gray-400 mt-1">Visualization of package route from origin to destination</p>
              </div>
            </div>
          </div>
          
          {/* Order Status Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Order Status Timeline</h3>
            </div>
            
            <div className="space-y-6">
              {order.statusTimeline.map((statusItem, index) => (
                <div key={statusItem.id} className="flex group">
                  <div className="flex flex-col items-center mr-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-blue-500 group-hover:scale-110 transition-transform duration-300">
                      {getStatusIcon(statusItem.status)}
                    </div>
                    {index !== order.statusTimeline.length - 1 && (
                      <div className="w-1 h-full bg-gradient-to-b from-blue-500 to-blue-200 mt-2 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-lg text-gray-900">{statusItem.status}</h4>
                      <span 
                        className="text-sm font-medium px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: '#ebfde5',
                          color: '#85ed68',
                          fontWeight: 'bold'
                        }}
                      >
                        {statusItem.date}
                      </span>
                    </div>
                    <div className="flex justify-between items-center" style={{ lineHeight: '0.75rem' }}>
                      <div className="flex space-x-3">
                        {index === 0 && order.shipping.fromLocation && (
                          <div className="flex items-center text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>From: {order.shipping.fromLocation.name}</span>
                          </div>
                        )}
                        {index === order.statusTimeline.length - 1 && order.shipping.toLocation && (
                          <div className="flex items-center text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>To: {order.shipping.toLocation.name}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700">{statusItem.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Notes */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Order Notes</h3>
            </div>
            
            {(order?.notes?.supplier || order?.notes?.customer) ? (
              <div className="space-y-4">
                {order.notes.supplier && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-start">
                      <div className="bg-blue-500 rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-1">Supplier Note</h4>
                        <p className="text-gray-700">{order.notes.supplier}</p>
                      </div>
                    </div>
                  </div>
                )}
                {order.notes.customer && (
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                    <div className="flex items-start">
                      <div className="bg-yellow-500 rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-1">Customer Note</h4>
                        <p className="text-gray-700">{order.notes.customer}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <p className="text-gray-500 italic">No notes available for this order.</p>
              </div>
            )}
          </div>
          
          {/* After Delivery - Now part of the right column */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-6" >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  After Delivery
                </h3>
                <p className="text-gray-600 mt-1">Order Acknowledgment & Goods Received Statement</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-2">Review as</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-yellow-400 hover:text-yellow-500 cursor-pointer transition-colors" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
              I hereby acknowledge that I have received the above products in good condition and in accordance with the purchase order. Any shortages, damages, or discrepancies have been noted at the time of delivery.
            </p>
            
            <div className="flex space-x-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => console.log('Order acknowledged')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Acknowledge
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => console.log('Order rejected')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Reject
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Modal - Enhanced Design with Workspace-style header, footer, and background overlay */}
      {mapModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-sm w-full max-w-6xl max-h-[90vh] flex flex-col border border-gray-200">
            {/* Modal Header - Workspace-style */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-700 z-10 p-5 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-xl mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-[-0.1rem]">Order Route Map</h2>
                    <p className="text-blue-100 mb-[-0.5rem] mt-[-0.1rem]">Tracking order {order?.orderNumber} information</p>
                  </div>
                </div>
                <CloseButton onClick={closeMapModal} size="sm" className="text-white hover:bg-white hover:bg-opacity-20" />
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-5 rounded-b-2xl">
              {/* Route Information */}
              <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl mb-5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Origin</p>
                      <p className="font-medium text-gray-900">{mapModal.origin?.name}</p>
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block h-px bg-gradient-to-r from-red-500 via-blue-500 to-green-500 mx-2"></div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Destination</p>
                      <p className="font-medium text-gray-900">{mapModal.destination?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Visualization Area */}
              <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-6 rounded-xl border border-blue-100">
                <div className="text-center max-w-md">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 border-2 border-solid rounded-xl w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Interactive Route Visualization</h4>
                  <p className="text-gray-700 mb-6">
                    This visualization shows the route from the origin to the destination for your order.
                  </p>
                  
                  {/* Implementation Notes */}
                  <div className="bg-blue-50 rounded-xl p-5 text-left mb-6 border border-blue-100">
                    <h5 className="font-bold text-blue-800 mb-3 flex items-center text-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Implementation Notes
                    </h5>
                    <ul className="text-blue-700 space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Integrate with Google Maps API for live route visualization</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Display real-time tracking information</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Show estimated delivery times based on current location</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Route Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                    <StatCard 
                      title="Distance"
                      value="5.2 km"
                      description="Total route distance"
                      className="rounded-xl shadow-sm border border-gray-200"
                    />
                    <StatCard 
                      title="Estimated Time"
                      value="15 mins"
                      description="Based on current traffic"
                      className="rounded-xl shadow-sm border border-gray-200"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer - Workspace-style */}
            <div className="sticky bottom-0 bg-gradient-to-r from-gray-100 to-gray-200 z-10 p-5 rounded-b-2xl border-t border-gray-200">
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={closeMapModal}
                  className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;