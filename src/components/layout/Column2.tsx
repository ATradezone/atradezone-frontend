'use client';

import React, { useState } from 'react';
import { 
  DashboardOutlined, 
  BarChartOutlined, 
  FileTextOutlined, 
  ControlOutlined,
  RightOutlined,
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
  GiftOutlined,
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
  FileProtectOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FilePptOutlined,
  FileUnknownOutlined,
  FileImageOutlined,
  FileZipOutlined,
  FileMarkdownOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  FileSyncOutlined,
  FileExclamationOutlined,
  ExceptionOutlined,
  FileSearchOutlined,
  BuildOutlined
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import { User2Icon } from 'lucide-react';

interface SubMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: SubMenuItem[];
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  section: string;
  subItems?: SubMenuItem[];
}

const Column2 = () => {
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set(['business-operations']));
  const [isBillingHovered, setIsBillingHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Helper functions for menu expansion
  const isMenuExpanded = (menuId: string): boolean => expandedMenus.has(menuId);
  
  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev);
      
      // Check if the menu being toggled is a parent menu (has subItems)
      const isParentMenu = menuSections.some(section => 
        section.items.some(item => item.id === menuId && item.subItems)
      );
      
      if (newSet.has(menuId)) {
        // If the menu is already expanded, collapse it
        newSet.delete(menuId);
      } else {
        // If the menu is collapsed
        if (isParentMenu) {
          // If it's a parent menu, close other parent menus but keep submenus open
          menuSections.forEach(section => {
            section.items.forEach(item => {
              // Close other parent menus that have subItems
              if (item.id !== menuId && item.subItems) {
                newSet.delete(item.id);
              }
            });
          });
        }
        // Expand the clicked menu
        newSet.add(menuId);
      }
      return newSet;
    });
  };
  
  // Determine active menu based on pathname
  const getActiveMenuId = (): string => {
    // More specific paths first
    if (pathname?.includes('/business-operations') && pathname?.includes('/inventory-stock') && pathname?.includes('/inventory')) return 'inventory';
    if (pathname?.includes('/business-operations') && pathname?.includes('/inventory-stock') && pathname?.includes('/stock-count')) return 'stock-count';
    if (pathname?.includes('/business-operations') && pathname?.includes('/inventory-stock') && pathname?.includes('/stock-transfer')) return 'stock-transfer';
    if (pathname?.includes('/business-operations') && pathname?.includes('/inventory-stock')) return 'inventory-stock';
    if (pathname?.includes('/business-operations') && pathname?.includes('/sales-management') && pathname?.includes('/manage-sales')) return 'manage-sales';
    if (pathname?.includes('/business-operations') && pathname?.includes('/sales-management') && pathname?.includes('/manage-quotation')) return 'manage-quotation';
    if (pathname?.includes('/business-operations') && pathname?.includes('/sales-management')) return 'sales-management';
    if (pathname?.includes('/business-operations') && pathname?.includes('/procurement-supplies') && pathname?.includes('/manage-purchases')) return 'manage-purchases';
    if (pathname?.includes('/business-operations') && pathname?.includes('/procurement-supplies') && pathname?.includes('/manage-importations')) return 'manage-importations';
    if (pathname?.includes('/business-operations') && pathname?.includes('/procurement-supplies')) return 'procurement-supplies';
    if (pathname?.includes('/business-operations') && pathname?.includes('/financial-management') && pathname?.includes('/income')) return 'income';
    if (pathname?.includes('/business-operations') && pathname?.includes('/financial-management') && pathname?.includes('/expenses')) return 'expenses';
    if (pathname?.includes('/business-operations') && pathname?.includes('/financial-management')) return 'financial-management';
    if (pathname?.includes('/manufacturing') && pathname?.includes('/production-planning')) return 'production-planning';
    if (pathname?.includes('/manufacturing') && pathname?.includes('/quality-control')) return 'quality-control';
    if (pathname?.includes('/manufacturing') && pathname?.includes('/inventory-management')) return 'inventory-management';
    if (pathname?.includes('/manufacturing') && pathname?.includes('/production-reports')) return 'production-reports';
    if (pathname?.includes('/manufacturing')) return 'manufacturing';
    if (pathname?.includes('/pos-menu')) return 'pos-menu';
    if (pathname?.includes('/point-of-sales') && pathname?.includes('/pos-orders')) return 'pos-orders';
    if (pathname?.includes('/point-of-sales') && pathname?.includes('/print-barcodes')) return 'print-barcodes';
    if (pathname?.includes('/analytics-reports') && pathname?.includes('/transactions')) return 'transactions';
    if (pathname?.includes('/analytics-reports') && pathname?.includes('/income-summary')) return 'income-summary';
    if (pathname?.includes('/analytics-reports') && pathname?.includes('/expense-summary')) return 'expense-summary';
    if (pathname?.includes('/analytics-reports') && pathname?.includes('/invoice-summary')) return 'invoice-summary';
    if (pathname?.includes('/analytics-reports') && pathname?.includes('/purchase-report')) return 'purchase-report';
    if (pathname?.includes('/analytics-reports') && pathname?.includes('/sales-vs-purchase')) return 'sales-vs-purchase';
    if (pathname?.includes('/analytics-reports') && pathname?.includes('/tax-summary')) return 'tax-summary';
    if (pathname?.includes('/analytics-reports') && pathname?.includes('/profits-loss')) return 'profits-loss';
    if (pathname?.includes('/pharmacy-management') && pathname?.includes('/patients-vouchers')) return 'patients-vouchers';
    if (pathname?.includes('/pharmacy-management') && pathname?.includes('/sales-invoice-reports')) return 'sales-invoice-reports';
    if (pathname?.includes('/distribution-network') && pathname?.includes('/product-catalogues')) return 'product-catalogues';
    if (pathname?.includes('/distribution-network') && pathname?.includes('/analytics-reports')) return 'analytics-reports';
    if (pathname?.includes('/suppliers') && !pathname?.includes('/user-management')) return 'supplier-profiles';
    if (pathname?.includes('/inventory')) return 'medicines-inventory';
    if (pathname?.includes('/patients')) return 'patients-vouchers';
    if (pathname?.includes('/sales')) return 'sales-invoice';
    if (pathname?.includes('/catalogues')) return 'product-catalogues';
    if (pathname?.includes('/orders')) return 'orders-management';
    if (pathname?.includes('/customers')) return 'customers-profiles';
    if (pathname?.includes('/analytics')) return 'analytics-reports';
    if (pathname?.includes('/users')) return 'users-roles';
    if (pathname?.includes('/user-management') && pathname?.includes('/manage-suppliers')) return 'manage-suppliers';
    if (pathname?.includes('/user-management')) return 'user-management';
    if (pathname?.includes('/business')) return 'business-operations';
    if (pathname?.includes('/pos')) return 'point-of-sales';
    if (pathname?.includes('/product-management') && pathname?.includes('/all-products')) return 'all-products';
    if (pathname?.includes('/product-management') && pathname?.includes('/order-management')) return 'order-management';
    if (pathname?.includes('/product-management') && pathname?.includes('/manage-categories')) return 'manage-categories';
    if (pathname?.includes('/product-management') && pathname?.includes('/products-variations')) return 'products-variations';
    if (pathname?.includes('/product-management')) return 'product-management';
    // Default to dashboard
    return 'dashboard';
  };
  
  const activeMenuId: string = getActiveMenuId();
  
  // Effect to close parent menus based on navigation changes
  React.useEffect(() => {
    // Close all parent menus when on dashboard
    if (pathname === '/dashboard') {
      setExpandedMenus(prev => {
        const newSet = new Set(prev);
        menuSections.forEach(section => {
          section.items.forEach(item => {
            if (item.subItems) {
              newSet.delete(item.id);
            }
          });
        });
        return newSet;
      });
      return;
    }
    
    // Close parent menus when another parent menu is active
    // Find the active parent menu
    const activeParentMenuId = menuSections.flatMap(section => 
      section.items.filter(item => 
        item.id === activeMenuId || 
        (item.subItems && item.subItems.some(subItem => subItem.id === activeMenuId))
      )
    ).map(item => item.id)[0];
    
    // Close all other parent menus, but keep open parent menus that have expanded submenus
    if (activeParentMenuId) {
      setExpandedMenus(prev => {
        const newSet = new Set(prev);
        menuSections.forEach(section => {
          section.items.forEach(item => {
            // Only close parent menus that don't have expanded submenus
            if (item.subItems && item.id !== activeParentMenuId) {
              // Check if this parent menu has any expanded submenus
              let hasExpandedSubmenus = false;
              
              // Check level 1 submenus
              if (item.subItems) {
                for (const subItem of item.subItems) {
                  if (newSet.has(subItem.id)) {
                    hasExpandedSubmenus = true;
                    break;
                  }
                  // Check level 2 submenus
                  if ((subItem as SubMenuItem).subItems) {
                    for (const subSubItem of (subItem as SubMenuItem).subItems!) {
                      if (newSet.has(subSubItem.id)) {
                        hasExpandedSubmenus = true;
                        break;
                      }
                    }
                    if (hasExpandedSubmenus) break;
                  }
                }
              }
              
              // Only close the parent menu if it doesn't have expanded submenus
              if (!hasExpandedSubmenus) {
                newSet.delete(item.id);
              }
            }
          });
        });
        return newSet;
      });
    }
  }, [pathname, activeMenuId]);
  
  // Navigation handler
  const navigateToPage = (id: string) => {
    switch (id) {
      case 'dashboard':
        router.push('/dashboard');
        break;
      case 'business-operations':
        router.push('/dashboard/business-operations');
        break;
      case 'point-of-sales':
        router.push('/dashboard/point-of-sales');
        break;
      case 'analytics-reports':
        router.push('/dashboard/analytics-reports');
        break;
      case 'pharmacy-management':
        router.push('/dashboard/pharmacy-management');
        break;
      case 'distribution-network':
        router.push('/dashboard/distribution-network');
        break;
      case 'supplier-profiles':
        router.push('/dashboard/suppliers');
        break;
      case 'manage-suppliers':
        router.push('/dashboard/user-management/manage-suppliers');
        break;
      case 'users-roles':
        router.push('/dashboard/user-management/users-roles');
        break;
      case 'manage-customers':
        router.push('/dashboard/user-management/manage-customers');
        break;
      case 'medicines-inventory':
        router.push('/dashboard/inventory/medicines');
        break;
      case 'patients-vouchers':
        router.push('/dashboard/pharmacy-management/patients-vouchers');
        break;
      case 'sales-invoice-reports':
        router.push('/dashboard/pharmacy-management/sales-invoice-reports');
        break;
      case 'product-catalogues':
        router.push('/dashboard/distribution-network/product-catalogues');
        break;
      case 'analytics-reports':
        router.push('/dashboard/distribution-network/analytics-reports');
        break;
      case 'orders-management':
        router.push('/dashboard/orders');
        break;
      case 'customers-profiles':
        router.push('/dashboard/customers/profiles');
        break;
      case 'all-products':
        router.push('/dashboard/product-management/all-products');
        break;
      case 'order-management':
        router.push('/dashboard/product-management/order-management');
        break;
      case 'manage-categories':
        router.push('/dashboard/product-management/manage-categories');
        break;
      case 'products-variations':
        router.push('/dashboard/product-management/products-variations');
        break;
      case 'sales-management':
        router.push('/dashboard/business-operations/sales-management');
        break;
      case 'procurement-supplies':
        router.push('/dashboard/business-operations/procurement-supplies');
        break;
      case 'inventory-stock':
        router.push('/dashboard/business-operations/inventory-stock');
        break;
      case 'inventory':
        router.push('/dashboard/business-operations/inventory-stock/inventory');
        break;
      case 'stock-count':
        router.push('/dashboard/business-operations/inventory-stock/stock-count');
        break;
      case 'stock-transfer':
        router.push('/dashboard/business-operations/inventory-stock/stock-transfer');
        break;
      case 'financial-management':
        router.push('/dashboard/business-operations/financial-management');
        break;
        case 'manage-sales':
        router.push('/dashboard/business-operations/sales-management/manage-sales');
        break;
      case 'manage-quotation':
        router.push('/dashboard/business-operations/sales-management/manage-quotation');
        break;
      case 'manage-purchases':
        router.push('/dashboard/business-operations/procurement-supplies/manage-purchases');
        break;
      case 'manage-importations':
        router.push('/dashboard/business-operations/procurement-supplies/manage-importations');
        break;
      case 'income':
        router.push('/dashboard/business-operations/financial-management/income');
        break;
      case 'expenses':
        router.push('/dashboard/business-operations/financial-management/expenses');
        break;
      case 'production-planning':
        router.push('/dashboard/manufacturing/production-planning');
        break;
      case 'quality-control':
        router.push('/dashboard/manufacturing/quality-control');
        break;
      case 'inventory-management':
        router.push('/dashboard/manufacturing/inventory-management');
        break;
      case 'production-reports':
        router.push('/dashboard/manufacturing/production-reports');
        break;
      case 'pos-menu':
        router.push('/pos-menu');
        break;
      case 'pos-orders':
        router.push('/dashboard/point-of-sales/pos-orders');
        break;
      case 'print-barcodes':
        router.push('/dashboard/point-of-sales/print-barcodes');
        break;
      case 'transactions':
        router.push('/dashboard/analytics-reports/transactions');
        break;
      case 'income-summary':
        router.push('/dashboard/analytics-reports/income-summary');
        break;
      case 'expense-summary':
        router.push('/dashboard/analytics-reports/expense-summary');
        break;
      case 'invoice-summary':
        router.push('/dashboard/analytics-reports/invoice-summary');
        break;
      case 'purchase-report':
        router.push('/dashboard/analytics-reports/purchase-report');
        break;
      case 'sales-vs-purchase':
        router.push('/dashboard/analytics-reports/sales-vs-purchase');
        break;
      case 'tax-summary':
        router.push('/dashboard/analytics-reports/tax-summary');
        break;
      case 'profits-loss':
        router.push('/dashboard/analytics-reports/profits-loss');
        break;
      default:
        console.log(`Navigate to page for ${id}`);
    }
  };
  
  // Helper function to render submenus recursively
  const renderSubMenu = (subItems: SubMenuItem[], parentActiveId: string, level: number = 1) => {
    if (!subItems || subItems.length === 0) return null;
    
    return (
      <ul className={`space-y-1 border-l-2 pl-2.5 ${level > 1 ? 'ml-0 mt-1 mb-1' : ''}`} 
          style={{ borderLeftColor: '#DDDDDD' }}>
        {subItems.map((subItem) => {
          const isSubItemActive: boolean = activeMenuId === subItem.id;
          const hasSubItems: boolean = !!subItem.subItems && subItem.subItems.length > 0;
          const isExpanded: boolean = isMenuExpanded(subItem.id);
          
          // Click handler for submenu items
          const handleSubItemClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            
            if (hasSubItems) {
              // Toggle expansion for items with subitems
              toggleMenu(subItem.id);
            } else {
              // Navigate to the page for leaf items
              navigateToPage(subItem.id);
            }
          };
          
          return (
            <React.Fragment key={subItem.id}>
              <li 
                className="p-2 hover:bg-white rounded-full cursor-pointer flex items-center justify-between"
                style={{ 
                  color: isSubItemActive ? '#85EC68' : '#8094AE',
                  fontWeight: isSubItemActive ? 'bold' : 'normal',
                  backgroundColor: 'transparent'
                }}
                onClick={handleSubItemClick}
              >
                <div className="flex items-center">
                  <span className="mr-2" style={{ color: isSubItemActive ? '#85EC68' : '#8094AE' }}>
                    {subItem.icon}
                  </span>
                  <span className={`text-sm ${level > 1 ? 'text-xs' : ''}`}>{subItem.label}</span>
                </div>
                
                {hasSubItems && (
                  <RightOutlined 
                    className={`text-gray-400 text-xs transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                    style={{ fontSize: '0.6rem', color: isSubItemActive ? '#85EC68' : '#8094AE' }} 
                  />
                )}
              </li>
              
              {/* Render nested submenus recursively */}
              {hasSubItems && isExpanded && (
                <div className={`${level > 2 ? 'ml-1' : level > 1 ? 'ml-2' : 'ml-4 mt-1 mb-1'}`}>
                  {renderSubMenu(subItem.subItems!, subItem.id, level + 1)}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    );
  };

  // Menu items data
  const menuSections = [
    {
      title: "G E N E R A L",
      items: [
        { id: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, section: "general" },
        { 
          id: "user-management", 
          label: "User Management", 
          icon: <UserOutlined />, 
          section: "general",
          subItems: [
            { id: "users-roles", label: "Users & Roles", icon: <TeamOutlined /> },
            { id: "manage-suppliers", label: "Manage Suppliers", icon: <ShopOutlined /> },
            { id: "manage-customers", label: "Manage Customers", icon: <UserOutlined /> },
          ]
        },
        { 
          id: "product-management", 
          label: "Product Management", 
          icon: <ShoppingOutlined />, 
          section: "general",
          subItems: [
            { id: "all-products", label: "All Products", icon: <AppstoreOutlined /> },
            { id: "order-management", label: "Order Management", icon: <ContainerOutlined /> },
            { id: "manage-categories", label: "Manage Categories", icon: <TagsOutlined /> },
            { id: "products-variations", label: "Products Variations", icon: <FileTextOutlined /> },
          ]
        },
        { 
          id: "business-operations", 
          label: "Business Operations", 
          icon: <ControlOutlined />, 
          section: "general",
          subItems: [
            { 
              id: "inventory-stock", 
              label: "Inventory & Stock", 
              icon: <DatabaseOutlined />,
              subItems: [
                { id: "inventory", label: "Inventory", icon: <UnorderedListOutlined /> },
                { id: "stock-count", label: "Stock Count", icon: <StockOutlined /> },
                { id: "stock-transfer", label: "Stock Transfer", icon: <ExportOutlined /> },
              ]
            },
            { 
              id: "sales-management", 
              label: "Sales Management", 
              icon: <ShoppingCartOutlined />, 
              subItems: [
                { id: "manage-sales", label: "Manage Sales", icon: <ProfileOutlined /> },
                { id: "manage-quotation", label: "Manage Quotation", icon: <FileTextOutlined /> },
              ]
            },
            { 
              id: "procurement-supplies", 
              label: "Procurement & Supplies", 
              icon: <ShoppingCartOutlined />, 
              subItems: [
                { id: "manage-purchases", label: "Manage Purchases", icon: <ShoppingCartOutlined /> },
                { id: "manage-importations", label: "Manage Imports", icon: <ImportOutlined /> },
              ]
            },
            { 
              id: "financial-management", 
              label: "Financial Management", 
              icon: <DollarOutlined />, 
              subItems: [
                { id: "income", label: "Manage Income", icon: <BankOutlined /> },
                { id: "expenses", label: "Manage Expenses", icon: <AccountBookOutlined /> },
              ]
            },
          ]
        },
        { 
          id: "point-of-sales", 
          label: "Point of Sales (POS)", 
          icon: <CalculatorOutlined />, 
          section: "general",
          subItems: [
            { id: "pos-menu", label: "POS Menu", icon: <MenuOutlined /> },
            { id: "pos-orders", label: "POS Orders", icon: <OrderedListOutlined /> },
            { id: "print-barcodes", label: "Print Barcodes", icon: <PrinterOutlined /> },
          ]
        },
        { 
          id: "analytics-reports", 
          label: "Analytics & Reports", 
          icon: <BarChartOutlined />, 
          section: "general",
          subItems: [
            { id: "transactions", label: "Transactions", icon: <TransactionOutlined /> },
            { id: "income-summary", label: "Income Summary", icon: <FundOutlined /> },
            { id: "expense-summary", label: "Expense Summary", icon: <AccountBookOutlined /> },
            { id: "invoice-summary", label: "Invoice Summary", icon: <FileTextOutlined /> },
            { id: "purchase-report", label: "Purchase Report", icon: <ShoppingCartOutlined /> },
            { id: "sales-vs-purchase", label: "Sales Vs Purchase", icon: <LineChartOutlined /> },
            { id: "tax-summary", label: "Tax Summary", icon: <AuditOutlined /> },
            { id: "profits-loss", label: "Profits & Loss", icon: <PieChartOutlined /> },
          ]
        },
      ]
    },
    {
      title: "E - P H A R M A C Y ™",
      items: [
        { 
          id: "pharmacy-management", 
          label: "Pharmacy Management", 
          icon: <MedicineBoxOutlined />, 
          section: "epharmacy",
          subItems: [
            { id: "patients-vouchers", label: "Patients & Vouchers", icon: <UserOutlined /> },
            { id: "sales-invoice-reports", label: "Sales Invoice & Reports", icon: <FileTextOutlined /> },
          ]
        },
      ]
    }

    ,
    {
      title: "D - S U P P L Y  C H A I N ™",
      items: [
        { 
          id: "distribution-network", 
          label: "Distribution Network", 
          icon: <ExportOutlined />, 
          section: "supply-chain",
          subItems: [
            { id: "product-catalogues", label: "Product Catalogues", icon: <FileTextOutlined /> },
            { id: "analytics-reports", label: "Analytics & Reports", icon: <AreaChartOutlined /> },
          ]
        },
      ]
    },
    {
      title: "M - A N U F A C T U R I N G",
      items: [
        { 
          id: "manufacturing", 
          label: "Manufacturing Corner", 
          icon: <BuildOutlined />, 
          section: "manufacturing",
          subItems: [
            { id: "production-planning", label: "Production Planning", icon: <ControlOutlined /> },
            { id: "quality-control", label: "Quality Control", icon: <AuditOutlined /> },
            { id: "inventory-management", label: "Inventory Management", icon: <DatabaseOutlined /> },
            { id: "production-reports", label: "Production Reports", icon: <FileTextOutlined /> },
          ]
        },
      ]
    }
  ];

  return (
    <div 
      className="w-64 bg-[#F8FAFD] border-r border-[#EAECF0] sticky top-0 h-screen flex flex-col"
      style={{ backgroundColor: '#F8FAFD', borderRight: '1px solid #EAECF0' }}
    >
      {/* Sticky logo area */}
      <div 
        className="flex-shrink-0"
        style={{ backgroundColor: '#F8FAFD', minHeight: '4rem', paddingLeft: '1rem', paddingRight: '0rem', paddingTop: '0rem', paddingBottom: '0rem' }}
      >
        <div className="flex items-center h-full cursor-pointer" onClick={() => router.push('/dashboard')}>
          <img 
            src="/images/atradezone-logo-big-size.png" 
            alt="ATradezone™ Cloud logo" 
            className="h-10 w-auto"
          />
        </div>
      </div>
      
      {/* Scrollable menu area */}
      <div className="flex-1 overflow-y-auto p-4">
        {menuSections.map((section, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold mb-2 uppercase" style={{ color: '#8094AE', letterSpacing: '1px', borderBottom: '1px solid #D3E2FD', paddingBottom: '8px' }}>
              {section.title}
            </h2>
            <ul className="space-y-1" style={{ marginLeft: '-3rem'}}>
              {section.items.map((item) => {
                // Check if this menu item or any of its subitems is active
                const isMenuItemActive: boolean = activeMenuId === item.id;
                const isSubItemActive: boolean = !!(item as MenuItem).subItems?.some(subItem => activeMenuId === subItem.id);
                const isActive: boolean = isMenuItemActive || isSubItemActive;
                
                // Determine if the menu should be expanded
                const shouldMenuBeExpanded: boolean = isMenuExpanded(item.id) || isSubItemActive;
                
                // Navigation handler for main menu items
                const handleMenuClick = () => {
                  // Handle expand/collapse for items with subitems
                  if ((item as MenuItem).subItems) {
                    // Toggle expansion for menus with subitems
                    toggleMenu(item.id);
                  } else {
                    // Navigate to the page for items without subitems
                    navigateToPage(item.id);
                  }
                };
                
                return (
                  <React.Fragment key={item.id}>
                    <li 
                      className={`p-2 rounded-full cursor-pointer flex items-center justify-between ${isActive ? 'bg-[#EAFCE5]' : 'hover:bg-white group'}`} 
                      style={{ 
                        color: isActive ? '#85EC68' : '#8094AE', 
                        fontWeight: isActive ? 'bold' : 'normal'
                      }}
                      onMouseEnter={(e) => {
                        // Check if this is a parent menu with active submenu
                        const hasActiveSubmenu = (item as MenuItem).subItems?.some(subItem => activeMenuId === subItem.id);
                        if (hasActiveSubmenu) {
                          e.currentTarget.style.backgroundColor = '#ffffff';
                          // Update icon and expand indicator color
                          const iconElement = e.currentTarget.querySelector('.mr-2');
                          if (iconElement) {
                            (iconElement as HTMLElement).style.color = '#6E82A5';
                          }
                          const expandIcon = e.currentTarget.querySelector('.anticon');
                          if (expandIcon) {
                            (expandIcon as HTMLElement).style.color = '#6E82A5';
                          }
                        } else {
                          // When parent menu is active, change hover color to #85ed68
                          if (isActive) {
                            e.currentTarget.style.color = '#85ed68';
                          } else {
                            e.currentTarget.style.fontWeight = 'bold';
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        // Reset background color on mouse leave
                        e.currentTarget.style.backgroundColor = '';
                        // Reset icon and expand indicator color
                        const iconElement = e.currentTarget.querySelector('.mr-2');
                        if (iconElement) {
                          const isMenuItemActiveInner = activeMenuId === item.id;
                          const isSubItemActiveInner = !!(item as MenuItem).subItems?.some(subItem => activeMenuId === subItem.id);
                          const isActiveInner = isMenuItemActiveInner || isSubItemActiveInner;
                          (iconElement as HTMLElement).style.color = isActiveInner ? '#85EC68' : '#8094AE';
                        }
                        const expandIcon = e.currentTarget.querySelector('.anticon');
                        if (expandIcon) {
                          const isMenuItemActiveInner = activeMenuId === item.id;
                          const isSubItemActiveInner = !!(item as MenuItem).subItems?.some(subItem => activeMenuId === subItem.id);
                          const isActiveInner = isMenuItemActiveInner || isSubItemActiveInner;
                          (expandIcon as HTMLElement).style.color = isActiveInner ? '#85EC68' : '#8094AE';
                        }
                        e.currentTarget.style.fontWeight = isActive ? 'bold' : 'normal';
                        e.currentTarget.style.color = isActive ? '#85EC68' : '#8094AE';
                      }}
                      onClick={handleMenuClick}
                    >
                      <div className="flex items-center">
                        <span 
                          className="mr-2" 
                          style={{ color: isActive ? '#85EC68' : '#8094AE' }}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {(item as MenuItem).subItems && (
                        <RightOutlined 
                          className={`text-gray-400 text-xs transition-transform ${isMenuExpanded(item.id) ? 'rotate-90' : ''}`} 
                          style={{ fontSize: '0.6rem', color: isActive ? '#85EC68' : '#8094AE' }} 
                        />
                      )}
                    </li>
                    {/* Render submenu directly under its parent */}
                    {(item as MenuItem).subItems && shouldMenuBeExpanded && (
                      <div className="ml-4 mt-1 mb-1">
                        {renderSubMenu((item as MenuItem).subItems!, item.id, 1)}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      
      {/* Renewal & Billing Section - Fixed at bottom */}
      <div className="bg-gray-50 p-4 rounded-lg flex-shrink-0 ml-10" style={{ borderRadius: '10px', boxShadow: 'rgb(220, 234, 255) 0px 0px 5px 1px', marginLeft: '10px', marginRight: '15px', marginBottom: '13px' }}> 
        <button 
          className={`w-full py-2 px-6 rounded-full font-bold text-center transition-all duration-300 text-sm ${
            isBillingHovered 
              ? 'bg-white shadow-lg transform -translate-y-1' 
              : 'bg-white shadow-sm'
          }`}
          style={{ color: '#8094AE', border: 'none', backgroundColor: '#ffffff', boxShadow: 'rgb(220, 234, 255) 0px -2px 10px 1px', paddingTop: '0.5rem', paddingBottom: '0.3rem' }}
          onMouseEnter={() => setIsBillingHovered(true)}
          onMouseLeave={() => setIsBillingHovered(false)}
          onClick={() => {
            router.push('/settings/company/renewal-billing');
          }}
        >
          RENEWAL & BILLING
        </button>
        
        {/* Copyright Text */}
        <div className="mt-4 text-center text-xs" style={{ color: '#8094AE' }}>
          <span 
            className="cursor-pointer hover:underline" 
            onClick={() => router.push('https://www.atradezone.ca')}
            style={{ color: '#8094AE', textDecoration: 'none' }}
          >
            © 2025 ATradezone, Inc.
          </span> 
          <span style={{ color: '#8094AE' }}> | </span>
          <span 
            className="cursor-pointer hover:underline" 
            onClick={() => router.push('https://www.atradezone.ca/legal')}
            style={{ color: '#8094AE', textDecoration: 'none' }}
          >
            Legal
          </span>
        </div>
      </div>
    </div>
  );
};

export default Column2;