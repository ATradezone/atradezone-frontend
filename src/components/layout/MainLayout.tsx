'use client';

import React, { useState, useEffect } from 'react';
import Column1 from './Column1';
import Column2 from './Column2';
import Topbar from './Topbar';
import Column1Skeleton from './Column1Skeleton';
import Column2Skeleton from './Column2Skeleton';
import TopbarSkeleton from './TopbarSkeleton';
import { usePathname } from 'next/navigation';
import PageTitle from '@/components/ui/PageTitle';

interface MainLayoutProps {
  children: React.ReactNode;
}

// Map of route paths to page titles
const routeTitles: Record<string, string> = {
  '/': 'Home',
  '/login': 'Sign In',
  '/register': 'Sign Up',
  '/reset-password': 'Reset Password',
  '/dashboard': 'Dashboard',
  '/dashboard/home': 'Home',
  '/dashboard/user-management': 'User Management',
  '/dashboard/user-management/manage-customers': 'Manage Customers',
  '/dashboard/user-management/manage-suppliers': 'Manage Suppliers',
  '/dashboard/user-management/users-roles': 'Users & Roles',
  '/dashboard/user-management/customer-setup': 'Customer Setup',
  '/dashboard/product-management': 'Product Management',
  '/dashboard/product-management/all-products': 'All Products',
  '/dashboard/product-management/manage-categories': 'Manage Categories',
  '/dashboard/product-management/order-management': 'Order Management',
  '/dashboard/product-management/products-variations': 'Product Variations',
  '/dashboard/point-of-sales': 'Point of Sales',
  '/pos-menu': 'POS Menu',
  '/dashboard/point-of-sales/pos-orders': 'POS Orders',
  '/dashboard/point-of-sales/print-barcodes': 'Print Barcodes',
  '/dashboard/pharmacy-management': 'Pharmacy Management',
  '/dashboard/pharmacy-management/patients-vouchers': 'Patients Vouchers',
  '/dashboard/pharmacy-management/sales-invoice-reports': 'Sales Invoice Reports',
  '/dashboard/distribution-network': 'Distribution Network',
  '/dashboard/distribution-network/product-catalogues': 'Product Catalogues',
  '/dashboard/distribution-network/analytics-reports': 'Analytics Reports',
  '/dashboard/business-operations': 'Business Operations',
  '/dashboard/business-operations/financial-management': 'Financial Management',
  '/dashboard/business-operations/financial-management/expenses': 'Expenses',
  '/dashboard/business-operations/financial-management/income': 'Income',
  '/dashboard/business-operations/inventory-stock': 'Inventory Stock',
  '/dashboard/business-operations/inventory-stock/inventory': 'Inventory',
  '/dashboard/business-operations/inventory-stock/stock-count': 'Stock Count',
  '/dashboard/business-operations/inventory-stock/stock-transfer': 'Stock Transfer',
  '/dashboard/business-operations/procurement-supplies': 'Procurement Supplies',
  '/dashboard/business-operations/sales-management': 'Sales Management',
  '/dashboard/manufacturing': 'Manufacturing',
  '/dashboard/manufacturing/production-planning': 'Production Planning',
  '/dashboard/manufacturing/quality-control': 'Quality Control',
  '/dashboard/manufacturing/inventory-management': 'Inventory Management',
  '/dashboard/manufacturing/production-reports': 'Production Reports',
  '/dashboard/analytics-reports': 'Analytics & Reports',
  '/dashboard/analytics-reports/transactions': 'Transactions',
  '/dashboard/analytics-reports/income-summary': 'Income Summary',
  '/dashboard/analytics-reports/expense-summary': 'Expense Summary',
  '/dashboard/analytics-reports/invoice-summary': 'Invoice Summary',
  '/dashboard/analytics-reports/purchase-report': 'Purchase Report',
  '/dashboard/analytics-reports/sales-vs-purchase': 'Sales vs Purchase',
  '/dashboard/analytics-reports/tax-summary': 'Tax Summary',
  '/dashboard/analytics-reports/profits-loss': 'Profits & Loss',
  '/dashboard/test-title': 'Test Dynamic Title',
  '/settings/company': 'Company Settings',
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const [liveMode, setLiveMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Show the layout columns on dashboard pages and settings pages
  const isDashboard = pathname?.includes('/dashboard') || pathname?.includes('/settings');

  // Get page title based on current route
  const getPageTitle = (): string => {
    if (!pathname) return 'Dashboard';
    
    // Check for exact match
    if (routeTitles[pathname]) {
      return routeTitles[pathname];
    }
    
    // Check for partial matches (for dynamic routes)
    const matchedRoute = Object.keys(routeTitles).find(route => 
      pathname.startsWith(route)
    );
    
    return matchedRoute ? routeTitles[matchedRoute] : 'Dashboard';
  };

  // Simulate loading state for a short duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!isDashboard) {
    // Set dynamic page title for non-dashboard pages
    return (
      <>
        <PageTitle title={getPageTitle()} />
        {children}
      </>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Set dynamic page title */}
      <PageTitle title={getPageTitle()} />
      
      {loading ? <Column1Skeleton /> : <Column1 />}
      {loading ? <Column2Skeleton /> : <Column2 />}
      
      {/* Column 3: Main Content */}
      <div 
        className="flex-1 bg-[#F8FAFD] ml-0 mr-0 overflow-y-auto"
        style={{ backgroundColor: '#F8FAFD', marginLeft: '0rem', marginRight: '0rem' }}
      >
        {loading ? <TopbarSkeleton /> : <Topbar liveMode={liveMode} setLiveMode={setLiveMode} />}
        <main className="p-[0px] px-[0px]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;