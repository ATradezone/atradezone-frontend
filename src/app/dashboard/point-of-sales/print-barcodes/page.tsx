'use client';

import { useState, useEffect } from 'react';
import { Breadcrumb, Search, StatCard, GenericTable, ActionButtons } from '@/components/reusable';
import { BarcodeOutlined, ShoppingOutlined, PlusOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import Button from '@/components/ui/Button';

interface Product {
  id: number;
  name: string;
  barcode: string;
  category: string;
  price: number;
}

interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: string;
}

const PrintBarcodesPage = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [printQuantity, setPrintQuantity] = useState<{[key: number]: number}>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for products
  const products: Product[] = [
    { id: 1, name: 'Paracetamol 500mg', barcode: '123456789012', category: 'Pain Relief', price: 5.99 },
    { id: 2, name: 'Amoxicillin 250mg', barcode: '234567890123', category: 'Antibiotics', price: 12.5 },
    { id: 3, name: 'Vitamin C 1000mg', barcode: '345678901234', category: 'Vitamins', price: 8.75 },
    { id: 4, name: 'Loratadine 10mg', barcode: '456789012345', category: 'Allergy', price: 7.25 },
    { id: 5, name: 'Omeprazole 20mg', barcode: '567890123456', category: 'Digestive Health', price: 9.99 },
    { id: 6, name: 'Ibuprofen 200mg', barcode: '678901234567', category: 'Pain Relief', price: 6.5 },
    { id: 7, name: 'Cetirizine 10mg', barcode: '789012345678', category: 'Allergy', price: 6.75 },
    { id: 8, name: 'Metformin 500mg', barcode: '890123456789', category: 'Diabetes', price: 15.25 },
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Show skeleton while loading
  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="h-8 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
            <div className="flex items-center mt-2">
              <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              <div className="mx-2 h-4 bg-gray-300 rounded w-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
            </div>
          </div>
          
          {/* Add New Item Icon Skeleton */}
          <div className="h-8 w-8 bg-gray-300 rounded-[0.45rem] animate-pulse"></div>
        </div>

        {/* Divider Line */}
        <div className="h-px bg-[#DDDDDD] mb-0 mx-1"></div>
        
        {/* Search Bar and Stats Boxes Container */}
        <div className="border-t border-[#dddddd] pt-6">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            {/* Search Bar Skeleton */}
            <div className="relative mb-6 mr-0">
              <div className="flex items-center px-4 py-3 bg-gray-200 rounded-lg animate-pulse">
                <div className="h-5 w-5 bg-gray-300 rounded-full mr-2"></div>
                <div className="h-4 flex-1 bg-gray-300 rounded"></div>
                <div className="h-5 w-5 bg-gray-300 rounded-full ml-2"></div>
              </div>
            </div>
            
            {/* Divider Line */}
            <div className="h-px bg-[#F2F2F2] mb-6 -mx-6"></div>
            
            {/* Stats Boxes Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="p-4 rounded-xl bg-white border border-gray-200 shadow-[-5px_5px_16px_6px_rgba(244,245,247,1)] animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#F6F9FF] border border-[#DBE9FE]">
                      <div className="h-5 w-5 bg-gray-300 rounded"></div>
                    </div>
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-xl overflow-hidden" style={{ borderRadius: '20px 20px 0px 0px' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-4 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[...Array(5)].map((_, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-4 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-8 bg-gray-300 rounded w-20 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-gray-300 rounded-lg animate-pulse"></div>
                        <div className="h-8 w-8 bg-gray-300 rounded-lg animate-pulse"></div>
                        <div className="h-8 w-8 bg-gray-300 rounded-lg animate-pulse"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Skeleton */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleSelectProduct = (id: number) => {
    setSelectedProducts(prev => 
      prev.includes(id) 
        ? prev.filter(productId => productId !== id) 
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(product => product.id));
    }
  };

  const handlePrintQuantityChange = (id: number, quantity: number) => {
    setPrintQuantity(prev => ({
      ...prev,
      [id]: quantity
    }));
  };

  const handlePrintBarcodes = () => {
    console.log('Printing barcodes for products:', selectedProducts);
    // In a real application, this would trigger the barcode printing functionality
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const sortedProducts = [...paginatedProducts];
  if (sortConfig !== null) {
    sortedProducts.sort((a, b) => {
      if (a[sortConfig.key as keyof Product] < b[sortConfig.key as keyof Product]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof Product] > b[sortConfig.key as keyof Product]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const columns = [
    {
      key: 'selection',
      title: 'Selection',
      render: (_: unknown, record: Product) => (
        <input
          type="checkbox"
          checked={selectedProducts.includes(record.id)}
          onChange={() => handleSelectProduct(record.id)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
      ),
    },
    {
      key: 'name',
      title: 'Product Name',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      ),
    },
    {
      key: 'barcode',
      title: 'Barcode',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      ),
    },
    {
      key: 'category',
      title: 'Category',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      ),
    },
    {
      key: 'price',
      title: 'Price ($)',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm font-medium text-gray-900">${value.toFixed(2)}</div>
      ),
    },
    {
      key: 'printQuantity',
      title: 'Print Quantity',
      render: (_: unknown, record: Product) => (
        <input
          type="number"
          min="1"
          defaultValue="1"
          onChange={(e) => handlePrintQuantityChange(record.id, parseInt(e.target.value) || 1)}
          className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: unknown, record: Product) => (
        <ActionButtons 
          onView={() => console.log('View', record.id)}
          onEdit={() => console.log('Edit', record.id)}
          onDelete={() => console.log('Delete', record.id)}
        />
      ),
    },
  ];

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Point of Sales', href: '/dashboard/point-of-sales' },
    { name: 'Print Barcodes', current: true }
  ];

  const statCards: StatCard[] = [
    { 
      title: "Total Products", 
      value: products.length.toString(), 
      description: "All products in inventory",
      icon: <ShoppingOutlined />,
      color: "bg-[#F6F9FF] border border-[#DBE9FE]"
    },
    { 
      title: "Selected", 
      value: selectedProducts.length.toString(), 
      description: "Products to print",
      trend: "up" as const,
      trendValue: "5%",
      icon: <BarcodeOutlined />,
      color: "bg-green-50"
    },
    { 
      title: "Categories", 
      value: "8", 
      description: "Product categories",
      icon: <ShoppingOutlined />,
      color: "bg-purple-50"
    },
    { 
      title: "Avg. Price", 
      value: "$9.87", 
      description: "Average product price",
      trend: "down" as const,
      trendValue: "2%",
      icon: <ShoppingOutlined />,
      color: "bg-blue-50"
    },
  ];

  // Handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Print Barcodes</h1>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        {/* Add New Item Icon */}
        <div 
          className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
          style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)' }}
          onClick={() => console.log('Add new item')}
          title="Add new item"
        >
          <PlusOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
        </div>
      </div>

      {/* Divider Line */}
      <div className="h-px bg-[#DDDDDD] mb-0 mx-1"></div>
      
      {/* Search Bar and Stats Boxes Container */}
      <div className="border-t border-[#dddddd] pt-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          {/* Search Bar */}
          <div className="relative mb-6 mr-0" style={{marginRight: '2.7rem' }}>
            <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ border: '1px solid #E5E7EB', backgroundColor: '#f8fafd', borderRadius: '0.5rem' }}
            />
            
            <FilterOutlined 
              className="absolute right-[-1.7rem] top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
              onClick={() => {
                console.log('Filter clicked');
              }}
            />
          </div>
          
          {/* Divider Line */}
          <div className="h-px bg-[#F2F2F2] mb-6 -mx-6"></div>
          
          {/* Stats Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {statCards.map((card, index) => (
              <div key={index} className="p-4 rounded-xl bg-white border border-gray-200 shadow-[-5px_5px_16px_6px_rgba(244,245,247,1)]">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${card.color || 'bg-[#F6F9FF] border border-[#DBE9FE]'}`}>
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">{card.title}</div>
                    <div className="text-xl font-bold text-gray-800">{card.value}</div>
                    <div className="flex items-center mt-1">
                      {card.trend && (
                        <>
                          {card.trend === 'up' ? (
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          )}
                          <span className={`text-xs ml-1 ${card.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                            {card.trendValue}
                          </span>
                        </>
                      )}
                      <span className="text-xs text-gray-500 ml-2">{card.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <GenericTable 
          data={sortedProducts}
          columns={columns}
          sortConfig={sortConfig}
          onSort={handleSort}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: goToPage,
            itemsPerPage,
            totalItems: filteredProducts.length
          }}
        />
        <div className="px-6 py-4 border-t border-[#F2F2F2] flex items-center justify-between bg-[#F1F4F9] rounded-b-xl">
          <div></div>
          <div className="flex space-x-1">
            <Button variant="secondary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </Button>
            <Button 
              variant="primary"
              onClick={handlePrintBarcodes}
              disabled={selectedProducts.length === 0}
            >
              <BarcodeOutlined className="mr-2" />
              Print Selected Barcodes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintBarcodesPage;