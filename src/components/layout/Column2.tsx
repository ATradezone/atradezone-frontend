'use client';

import React, { useState } from 'react';
import { 
  DashboardOutlined, 
  BarChartOutlined, 
  FileTextOutlined, 
  ControlOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  DatabaseOutlined,
  DollarOutlined,
  StockOutlined,
  PrinterOutlined,
  TransactionOutlined,
  ProfileOutlined,
  ContainerOutlined,
  BankOutlined,
  ImportOutlined,
  ExportOutlined,
  LineChartOutlined,
  PieChartOutlined,
  AreaChartOutlined,
  FundOutlined,
  AccountBookOutlined,
  AuditOutlined,
  CalculatorOutlined,
  TagsOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  MenuOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  BuildOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const Column2 = () => {
  const [openKeys, setOpenKeys] = useState<string[]>(['business-operations']);
  const [isBillingHovered, setIsBillingHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const navigationMap: Record<string, string> = {
    'dashboard': '/dashboard',
    'business-operations': '/dashboard/business-operations',
    'point-of-sales': '/dashboard/point-of-sales',
    'analytics-reports': '/dashboard/analytics-reports',
    'pharmacy-management': '/dashboard/pharmacy-management',
    'distribution-network': '/dashboard/distribution-network',
    'supplier-profiles': '/dashboard/suppliers',
    'manage-suppliers': '/dashboard/user-management/manage-suppliers',
    'users-roles': '/dashboard/user-management/users-roles',
    'manage-customers': '/dashboard/user-management/manage-customers',
    'medicines-inventory': '/dashboard/inventory/medicines',
    'patients-vouchers': '/dashboard/pharmacy-management/patients-vouchers',
    'sales-invoice-reports': '/dashboard/pharmacy-management/sales-invoice-reports',
    'product-catalogues': '/dashboard/distribution-network/product-catalogues',
    'orders-management': '/dashboard/orders',
    'customers-profiles': '/dashboard/customers/profiles',
    'all-products': '/dashboard/product-management/all-products',
    'order-management': '/dashboard/product-management/order-management',
    'manage-categories': '/dashboard/product-management/manage-categories',
    'products-variations': '/dashboard/product-management/products-variations',
    'sales-management': '/dashboard/business-operations/sales-management',
    'procurement-supplies': '/dashboard/business-operations/procurement-supplies',
    'inventory-stock': '/dashboard/business-operations/inventory-stock',
    'inventory': '/dashboard/business-operations/inventory-stock/inventory',
    'stock-count': '/dashboard/business-operations/inventory-stock/stock-count',
    'stock-transfer': '/dashboard/business-operations/inventory-stock/stock-transfer',
    'financial-management': '/dashboard/business-operations/financial-management',
    'manage-sales': '/dashboard/business-operations/sales-management/manage-sales',
    'manage-quotation': '/dashboard/business-operations/sales-management/manage-quotation',
    'manage-purchases': '/dashboard/business-operations/procurement-supplies/manage-purchases',
    'manage-importations': '/dashboard/business-operations/procurement-supplies/manage-importations',
    'income': '/dashboard/business-operations/financial-management/income',
    'expenses': '/dashboard/business-operations/financial-management/expenses',
    'production-planning': '/dashboard/manufacturing/production-planning',
    'quality-control': '/dashboard/manufacturing/quality-control',
    'inventory-management': '/dashboard/manufacturing/inventory-management',
    'production-reports': '/dashboard/manufacturing/production-reports',
    'pos-menu': '/pos-menu',
    'pos-orders': '/dashboard/point-of-sales/pos-orders',
    'print-barcodes': '/dashboard/point-of-sales/print-barcodes',
    'transactions': '/dashboard/analytics-reports/transactions',
    'income-summary': '/dashboard/analytics-reports/income-summary',
    'expense-summary': '/dashboard/analytics-reports/expense-summary',
    'invoice-summary': '/dashboard/analytics-reports/invoice-summary',
    'purchase-report': '/dashboard/analytics-reports/purchase-report',
    'sales-vs-purchase': '/dashboard/analytics-reports/sales-vs-purchase',
    'tax-summary': '/dashboard/analytics-reports/tax-summary',
    'profits-loss': '/dashboard/analytics-reports/profits-loss',
    'super-admin-dashboard': '/dashboard/super-admin',
    'companies': '/dashboard/super-admin/companies',
    'subscriptions': '/dashboard/super-admin/subscriptions',
    'users': '/dashboard/super-admin/users',
    'modules': '/dashboard/super-admin/modules',
    'reports': '/dashboard/super-admin/reports',
    'distribution-analytics-reports': '/dashboard/distribution-network/analytics-reports',
  };

  const pathPatterns: Array<{ pattern: string[], key: string }> = [
    { pattern: ['/dashboard/super-admin', '/companies'], key: 'companies' },
    { pattern: ['/dashboard/super-admin', '/subscriptions'], key: 'subscriptions' },
    { pattern: ['/dashboard/super-admin', '/users'], key: 'users' },
    { pattern: ['/dashboard/super-admin', '/modules'], key: 'modules' },
    { pattern: ['/dashboard/super-admin', '/reports'], key: 'reports' },
    { pattern: ['/dashboard/super-admin'], key: 'super-admin-dashboard' },
    
    { pattern: ['/business-operations', '/inventory-stock', '/inventory'], key: 'inventory' },
    { pattern: ['/business-operations', '/inventory-stock', '/stock-count'], key: 'stock-count' },
    { pattern: ['/business-operations', '/inventory-stock', '/stock-transfer'], key: 'stock-transfer' },
    { pattern: ['/business-operations', '/inventory-stock'], key: 'inventory-stock' },
    
    { pattern: ['/business-operations', '/sales-management', '/manage-sales'], key: 'manage-sales' },
    { pattern: ['/business-operations', '/sales-management', '/manage-quotation'], key: 'manage-quotation' },
    { pattern: ['/business-operations', '/sales-management'], key: 'sales-management' },
    
    { pattern: ['/business-operations', '/procurement-supplies', '/manage-purchases'], key: 'manage-purchases' },
    { pattern: ['/business-operations', '/procurement-supplies', '/manage-importations'], key: 'manage-importations' },
    { pattern: ['/business-operations', '/procurement-supplies'], key: 'procurement-supplies' },
    
    { pattern: ['/business-operations', '/financial-management', '/income'], key: 'income' },
    { pattern: ['/business-operations', '/financial-management', '/expenses'], key: 'expenses' },
    { pattern: ['/business-operations', '/financial-management'], key: 'financial-management' },
    
    { pattern: ['/manufacturing', '/production-planning'], key: 'production-planning' },
    { pattern: ['/manufacturing', '/quality-control'], key: 'quality-control' },
    { pattern: ['/manufacturing', '/inventory-management'], key: 'inventory-management' },
    { pattern: ['/manufacturing', '/production-reports'], key: 'production-reports' },
    { pattern: ['/manufacturing'], key: 'manufacturing' },
    
    { pattern: ['/pos-menu'], key: 'pos-menu' },
    { pattern: ['/point-of-sales', '/pos-orders'], key: 'pos-orders' },
    { pattern: ['/point-of-sales', '/print-barcodes'], key: 'print-barcodes' },
    
    { pattern: ['/analytics-reports', '/transactions'], key: 'transactions' },
    { pattern: ['/analytics-reports', '/income-summary'], key: 'income-summary' },
    { pattern: ['/analytics-reports', '/expense-summary'], key: 'expense-summary' },
    { pattern: ['/analytics-reports', '/invoice-summary'], key: 'invoice-summary' },
    { pattern: ['/analytics-reports', '/purchase-report'], key: 'purchase-report' },
    { pattern: ['/analytics-reports', '/sales-vs-purchase'], key: 'sales-vs-purchase' },
    { pattern: ['/analytics-reports', '/tax-summary'], key: 'tax-summary' },
    { pattern: ['/analytics-reports', '/profits-loss'], key: 'profits-loss' },
    
    { pattern: ['/distribution-network', '/product-catalogues'], key: 'product-catalogues' },
    { pattern: ['/distribution-network', '/analytics-reports'], key: 'distribution-analytics-reports' },
    
    { pattern: ['/pharmacy-management', '/patients-vouchers'], key: 'patients-vouchers' },
    { pattern: ['/pharmacy-management', '/sales-invoice-reports'], key: 'sales-invoice-reports' },
    
    { pattern: ['/suppliers'], key: 'supplier-profiles' },
    { pattern: ['/inventory'], key: 'medicines-inventory' },
    { pattern: ['/patients'], key: 'patients-vouchers' },
    { pattern: ['/sales'], key: 'sales-invoice' },
    { pattern: ['/catalogues'], key: 'product-catalogues' },
    { pattern: ['/orders'], key: 'orders-management' },
    { pattern: ['/customers'], key: 'customers-profiles' },
    { pattern: ['/analytics'], key: 'analytics-reports' },
    { pattern: ['/users'], key: 'users-roles' },
    { pattern: ['/user-management', '/manage-suppliers'], key: 'manage-suppliers' },
    { pattern: ['/user-management'], key: 'user-management' },
    
    { pattern: ['/business'], key: 'business-operations' },
    { pattern: ['/pos'], key: 'point-of-sales' },
    
    { pattern: ['/product-management', '/all-products'], key: 'all-products' },
    { pattern: ['/product-management', '/order-management'], key: 'order-management' },
    { pattern: ['/product-management', '/manage-categories'], key: 'manage-categories' },
    { pattern: ['/product-management', '/products-variations'], key: 'products-variations' },
    { pattern: ['/product-management'], key: 'product-management' },
  ];

  const getActiveMenuKey = (): string => {
    for (const { pattern, key } of pathPatterns) {
      if (key === 'supplier-profiles' && pathname?.includes('/user-management')) {
        continue;
      }
      if (pattern.every(part => pathname?.includes(part))) {
        return key;
      }
    }
    return 'dashboard';
  };
  
  const activeMenuKey: string = getActiveMenuKey();
  
  const navigateToPage = (key: string) => {
    const path = navigationMap[key];
    if (path) {
      router.push(path);
    }
  };
  
  const onClick: MenuProps['onClick'] = (e) => {
    navigateToPage(e.key as string);
  };
  
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys as string[]);
  };
  
  const menuItems: MenuItem[] = [
    getItem('G E N E R A L', 'general-section', null, [
      getItem('Dashboard', 'dashboard', <DashboardOutlined />),
      getItem('User Management', 'user-management', <UserOutlined />, [
        getItem('Users & Roles', 'users-roles', <TeamOutlined />),
        getItem('Manage Suppliers', 'manage-suppliers', <ShopOutlined />),
        getItem('Manage Customers', 'manage-customers', <UserOutlined />),
      ]),
      getItem('Product Management', 'product-management', <ShoppingOutlined />, [
        getItem('All Products', 'all-products', <AppstoreOutlined />),
        getItem('Order Management', 'order-management', <ContainerOutlined />),
        getItem('Manage Categories', 'manage-categories', <TagsOutlined />),
        getItem('Products Variations', 'products-variations', <FileTextOutlined />),
      ]),
      getItem('Business Operations', 'business-operations', <ControlOutlined />, [
        getItem('Inventory & Stock', 'inventory-stock', <DatabaseOutlined />, [
          getItem('Inventory', 'inventory', <UnorderedListOutlined />),
          getItem('Stock Count', 'stock-count', <StockOutlined />),
          getItem('Stock Transfer', 'stock-transfer', <ExportOutlined />),
        ]),
        getItem('Sales Management', 'sales-management', <ShoppingCartOutlined />, [
          getItem('Manage Sales', 'manage-sales', <ProfileOutlined />),
          getItem('Manage Quotation', 'manage-quotation', <FileTextOutlined />),
        ]),
        getItem('Procurement & Supplies', 'procurement-supplies', <ShoppingCartOutlined />, [
          getItem('Manage Purchases', 'manage-purchases', <ShoppingCartOutlined />),
          getItem('Manage Imports', 'manage-importations', <ImportOutlined />),
        ]),
        getItem('Financial Management', 'financial-management', <DollarOutlined />, [
          getItem('Manage Income', 'income', <BankOutlined />),
          getItem('Manage Expenses', 'expenses', <AccountBookOutlined />),
        ]),
      ]),
      getItem('Point of Sales (POS)', 'point-of-sales', <CalculatorOutlined />, [
        getItem('POS Menu', 'pos-menu', <MenuOutlined />),
        getItem('POS Orders', 'pos-orders', <OrderedListOutlined />),
        getItem('Print Barcodes', 'print-barcodes', <PrinterOutlined />),
      ]),
      getItem('Analytics & Reports', 'analytics-reports', <BarChartOutlined />, [
        getItem('Transactions', 'transactions', <TransactionOutlined />),
        getItem('Income Summary', 'income-summary', <FundOutlined />),
        getItem('Expense Summary', 'expense-summary', <AccountBookOutlined />),
        getItem('Invoice Summary', 'invoice-summary', <FileTextOutlined />),
        getItem('Purchase Report', 'purchase-report', <ShoppingCartOutlined />),
        getItem('Sales Vs Purchase', 'sales-vs-purchase', <LineChartOutlined />),
        getItem('Tax Summary', 'tax-summary', <AuditOutlined />),
        getItem('Profits & Loss', 'profits-loss', <PieChartOutlined />),
      ]),
    ], 'group'),
    
    getItem('E - P H A R M A C Y ™', 'epharmacy-section', null, [
      getItem('Pharmacy Management', 'pharmacy-management', <MedicineBoxOutlined />, [
        getItem('Patients & Vouchers', 'patients-vouchers', <UserOutlined />),
        getItem('Sales Invoice & Reports', 'sales-invoice-reports', <FileTextOutlined />),
      ]),
    ], 'group'),
    
    getItem('S U P P L Y  C H A I N ™', 'supply-chain-section', null, [
      getItem('Distribution Network', 'distribution-network', <ExportOutlined />, [
        getItem('Product Catalogues', 'product-catalogues', <FileTextOutlined />),
        getItem('Analytics & Reports', 'distribution-analytics-reports', <AreaChartOutlined />),
      ]),
    ], 'group'),
    
    getItem('M A N U F A C T U R I N G', 'manufacturing-section', null, [
      getItem('Manufacturing Corner', 'manufacturing', <BuildOutlined />, [
        getItem('Production Planning', 'production-planning', <ControlOutlined />),
        getItem('Quality Control', 'quality-control', <AuditOutlined />),
        getItem('Inventory Management', 'inventory-management', <DatabaseOutlined />),
        getItem('Production Reports', 'production-reports', <FileTextOutlined />),
      ]),
    ], 'group'),
    
    getItem('S U P E R   A D M I N', 'super-admin-section', null, [
      getItem('Dashboard', 'super-admin-dashboard', <DashboardOutlined />),
      getItem('Companies', 'companies', <ShopOutlined />),
      getItem('Subscriptions', 'subscriptions', <FileTextOutlined />),
      getItem('Users', 'users', <UserOutlined />),
      getItem('Modules', 'modules', <AppstoreOutlined />),
      getItem('Reports', 'reports', <BarChartOutlined />),
    ], 'group'),
  ];

  return (
    <div 
      className="w-64 bg-[#F8FAFD] sticky top-0 h-screen flex flex-col"
      style={{
        borderRight: '1px solid #e9eef6',
        boxSizing: 'border-box',
        marginLeft: '0.1rem',
        paddingRight: '0.1rem',
      }}
    >
      <div className="flex-shrink-0" style={{ minHeight: '4rem', paddingLeft: '1rem' }}>
        <div className="flex items-center h-full cursor-pointer" onClick={() => router.push('/dashboard')}>
          <img 
            src="/images/atradezone-logo-big-size.png" 
            alt="ATradezone™ Cloud logo" 
            className="h-10 w-auto"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-0">
        <Menu
          mode="inline"
          openKeys={openKeys}
          selectedKeys={[activeMenuKey]}
          onOpenChange={onOpenChange}
          onClick={onClick}
          items={menuItems}
          className="custom-menu"
          inlineIndent={16}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            paddingLeft: '0.5rem',
            paddingRight: '0.0rem',
            width: '100%',
            boxSizing: 'border-box',
            overflowX: 'hidden',
          }}
        />
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg flex-shrink-0 ml-10" style={{ 
        borderRadius: '10px', 
        boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', 
        marginLeft: '10px', 
        marginRight: '10px', 
        marginBottom: '12px' 
      }}> 
        <button 
          className={`w-full py-2 px-6 rounded-full font-bold text-center transition-all duration-300 text-sm ${
            isBillingHovered 
              ? 'bg-white shadow-lg transform -translate-y-1' 
              : 'bg-white shadow-sm'
          }`}
          style={{ 
            color: '#8094AE', 
            border: 'none', 
            backgroundColor: '#ffffff', 
            boxShadow: 'rgb(220, 234, 255) 0px -2px 10px 1px', 
            paddingTop: '0.5rem', 
            paddingBottom: '0.3rem' 
          }}
          onMouseEnter={() => setIsBillingHovered(true)}
          onMouseLeave={() => setIsBillingHovered(false)}
          onClick={() => router.push('/settings/company/renewal-billing')}
        >
          RENEWAL & BILLING
        </button>
        
        <div className="mt-4 text-center text-xs" style={{ color: '#8094AE' }}>
          <span 
            className="cursor-pointer hover:underline" 
            onClick={() => router.push('https://www.atradezone.ca  ')}
            style={{ color: '#8094AE', textDecoration: 'none' }}
          >
            © {new Date().getFullYear()} ATradezone™ Cloud, Inc.
          </span>
        </div>
      </div>
      
      <style jsx global>{`
        /* Ensure Afacad font is used everywhere */
        .custom-menu .ant-menu,
        .custom-menu .ant-menu * {
          font-family: var(--font-primary, sans-serif) !important;
        }

        .custom-menu .ant-menu-item,
        .custom-menu .ant-menu-submenu-title {
          border-radius: 9999px !important;
          margin-bottom: 4px !important;
          padding-left: 8px !important;
          padding-right: 12px !important;
          color: #8094AE !important;
          font-weight: normal !important;
          font-size: medium !important;
          height: 36px !important;
          line-height: 36px !important;
          display: flex !important;
          align-items: center !important;
          position: relative !important;
          min-width: 200px !important;
        }

        .custom-menu .ant-menu-item:hover,
        .custom-menu .ant-menu-submenu-title:hover {
          background-color: #ffffff !important;
          color: #8094AE !important;
          font-weight: bold !important;
        }

        .custom-menu .ant-menu-item-selected,
        .custom-menu .ant-menu-submenu-selected > .ant-menu-submenu-title {
          background-color: #EAFCE5 !important;
          color: #85EC68 !important;
          font-weight: bold !important;
        }

        .custom-menu .ant-menu-submenu-arrow {
          color: #8094AE !important;
        }

        .custom-menu .ant-menu-submenu-selected > .ant-menu-submenu-title > .ant-menu-submenu-arrow {
          color: #85EC68 !important;
        }

        .custom-menu .ant-menu-sub {
          background-color: transparent !important;
          padding-right: 16.3px !important;
          border: 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }

        /* Level 2: first submenu items */
        .custom-menu .ant-menu-sub > .ant-menu-item,
        .custom-menu .ant-menu-sub > .ant-menu-submenu > .ant-menu-submenu-title {
          margin-left: 20.5px !important;
          padding-left: 15px !important;
          border-left: 1px solid #e9eef6 !important;
          border-radius: 0 !important;
          background-color: transparent !important;
          height: 30px !important;
          line-height: 30px !important;
          font-size: 14.5px !important;
        }

        .custom-menu .ant-menu-sub > .ant-menu-item:hover,
        .custom-menu .ant-menu-sub > .ant-menu-submenu:hover > .ant-menu-submenu-title {
          border-left-color: #85EC68 !important;
          color: #8094AE !important;
        }

        .custom-menu .ant-menu-sub > .ant-menu-item-selected {
          border-left-color: #85EC68 !important;
          color: #85EC68 !important;
        }

        /* Level 3: nested inside submenu */
        .custom-menu .ant-menu-sub .ant-menu-sub .ant-menu-item,
        .custom-menu .ant-menu-sub .ant-menu-sub .ant-menu-submenu-title {
          margin-left: 43.5px !important;
          padding-left: 17px !important;
          border-left: 1px solid #e9eef6 !important;
          font-size: 14px !important;
          color: #8094AE !important;
          border-radius: 0 !important;
          height: 30px !important;
          line-height: 30px !important;
        }

        .custom-menu .ant-menu-sub .ant-menu-sub .ant-menu-item:hover {
          border-left-color: #85EC68 !important;
          color: #6b7280 !important;
        }

        .custom-menu .ant-menu-sub .ant-menu-sub .ant-menu-item-selected {
          color: #85EC68 !important;
          border-left-color: #85EC68 !important;
        }

        .custom-menu .ant-menu-item-group-title {
          color: #8094AE !important;
          letter-spacing: 1px !important;
          border-bottom: 1px solid #e9eef6 !important;
          padding-bottom: 8px !important;
          margin: 12px 10px 22px 5px !important;
          font-size: 1.06rem !important;
          text-transform: uppercase !important;
          font-weight: bold !important;
          padding-left: 0.5rem !important;
        }

        .custom-menu .ant-menu-inline .ant-menu-item::after,
        .custom-menu .ant-menu-inline .ant-menu-submenu-title::after {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default Column2;