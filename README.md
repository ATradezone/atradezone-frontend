# ATradezone™ Cloud UI - Figma to Next.js Template

A modern, responsive frontend template built with Next.js 15, Ant Design, and Tailwind CSS. Perfect for converting your Figma designs into production-ready React applications.

## ✨ Features

- **Next.js 15** with App Router and TypeScript
- **Ant Design 5** for robust UI components
- **Tailwind CSS** for utility-first styling
- **Responsive Design** with mobile-first approach
- **Component Library** with reusable UI components
- **Type Safety** with full TypeScript support
- **Modern Architecture** with clean code structure
- **Enhanced UI Consistency** with standardized icon styling
- **Improved Component Structure** with better hook organization

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── auth/                     # Authentication pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── reset-password/
│   │   │   └── components/
│   │   ├── dashboard/                # Main dashboard pages
│   │   │   ├── home/
│   │   │   ├── analytics-reports/
│   │   │   ├── business-operations/
│   │   │   ├── distribution-network/
│   │   │   ├── manufacturing/
│   │   │   ├── pharmacy-management/
│   │   │   ├── point-of-sales/
│   │   │   ├── product-management/
│   │   │   └── user-management/
│   │   ├── settings/                 # Settings pages
│   │   │   └── company/
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Landing page
│   ├── components/
│   │   ├── layout/                  # Layout components
│   │   ├── reusable/                # Reusable UI components
│   │   ├── shared/                  # Shared components
│   │   └── ui/                      # UI components (PageTitle, Button, etc.)
│   ├── config/                      # Configuration files
│   ├── context/                     # React context providers
│   ├── hooks/                       # Custom React hooks
│   ├── scripts/                     # Utility scripts
│   ├── styles/                      # Global styles
│   ├── types/                       # TypeScript type definitions
│   └── utils/                       # Utility functions
├── public/                          # Static assets
├── next.config.js                   # Next.js configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Project dependencies
```

## 🎨 Recent Improvements

### 1. UI Consistency Enhancements
- Standardized icon colors across all dashboard pages (`#b7b7b7`)
- Unified search bar styling with consistent spacing and alignment
- Improved component alignment using shared UI components
- Enhanced dropdown menu alignment in topbar (Account and Notification dropdowns)

### 2. Component Architecture Improvements
- Fixed React Hooks order violations for better stability
- Resolved duplicate key errors in Select components
- Enhanced FilterPanel component with proper Input component usage
- Improved error handling in reusable components

### 3. Order Tracking Page Enhancements
- Completely redesigned Order Tracking page with modern UI
- Added interactive chat functionality for order communication
- Implemented sticky chat container for better user experience
- Improved visual hierarchy with consistent spacing and typography
- Enhanced order status timeline with better visual indicators
- Added order route visualization with map integration
- Removed unnecessary hover effects for cleaner interface
- Simplified breadcrumb navigation

### 4. Code Quality Improvements
- Eliminated runtime errors related to function prop validation
- Enhanced type safety with better TypeScript usage
- Improved component reusability and maintainability

## 🎨 Converting Figma to Code

### 1. Component Analysis
- Break down designs into reusable components
- Identify layout patterns and spacing
- Extract colors, typography, and assets

### 2. Choose Components
- Use **Ant Design** for structure (Layout, Menu, Cards, Forms)
- Apply **Tailwind CSS** for custom styling and responsive design
- Combine both for optimal results

### 3. Implementation Pattern
```typescript
interface ComponentProps {
  title: string;
  // ... other props
}

const MyComponent: React.FC<ComponentProps> = ({ title }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all">
      <Title level={3}>{title}</Title>
      {/* Component content */}
    </Card>
  );
};
```

## 🧩 Available Components

### Layout Components
- **Navbar** - Responsive navigation with user menu
- **Sidebar** - Collapsible navigation sidebar
- **Layout** - Main application layout wrapper

### UI Components
- **ProjectCard** - Feature-rich project card with actions
- **StatCard** - Dashboard statistics display
- **Forms** - Complete form examples with validation
- **FilterPanel** - Advanced filtering capabilities
- **Input** - Standardized input fields with validation
- **Select** - Enhanced dropdown components

### Pages
- **Landing Page** - Marketing homepage with hero section
- **Dashboard** - Admin dashboard with statistics
- **Examples** - Component showcase and patterns

## 🎯 Design System

### Colors
- Primary: `#1677ff` (Ant Design Blue)
- Success: `#52c41a` (Green)
- Warning: `#faad14` (Orange)
- Error: `#ff4d4f` (Red)
- Icons: `#b7b7b7` (Standardized icon color)

### Typography
- Headings: Ant Design Typography components
- Body: System font stack with Tailwind utilities
- Responsive scaling with `text-*` classes

### Spacing
- Consistent spacing using Tailwind's 4px scale
- Ant Design's built-in spacing for components
- Responsive spacing with breakpoint prefixes

## 📱 Responsive Breakpoints

```css
sm: 576px   /* Small devices */
md: 768px   /* Medium devices */
lg: 992px   /* Large devices */
xl: 1200px  /* Extra large devices */
```

## 🛠 Development Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📚 Learning Resources

- [Ant Design Docs](https://ant.design/components/overview/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

## 🤝 Best Practices

1. **Component First** - Build reusable, composable components
2. **Type Safety** - Use TypeScript interfaces for all props
3. **Responsive Design** - Mobile-first approach with Tailwind
4. **Performance** - Optimize images and lazy load content
5. **Accessibility** - Leverage Ant Design's built-in a11y features
6. **Consistency** - Maintain UI consistency with shared components
7. **Hook Rules** - Follow React's Rules of Hooks for stability

## 📄 License

MIT License - feel free to use this template for your projects!

## 🆘 Support

Check out the example pages and component documentation for implementation patterns and best practices.

Happy coding! 🎉

git branch naming 

fix: redesign
feature: new fature
chore: stracture 

fx:  fx-login-page 
ft:  ft-login-page
ch: ch-setup-axiosgit

fx:  fx-login-page 
ft:  ft-login-page
ch: ch-setup-axios

git checkout -b"fx-login-page"
Iyaremye Faustin
10:16 AM
"fix:fixing-button-on-login-page"
Iyaremye Faustin
10:23 AM
git switch main
git pull

pull countries once and cash on my side for future us

 { value: 'ram', label: 'RAM-INS-2023-001' },
    { value: 'uap', label: 'UAP-COV-876543' },
    { value: 'old-mutual', label: 'OM-POL-124578' },
    { value: 'sanlam', label: 'SAN-CLI-987654' },
    { value: 'prudential', label: 'PRU-MED-456123' },
    { value: 'heritage', label: 'HER-HEALTH-789456' }

    Pharmacy:  
    Medecine Invetory (Add Medice by Search existing medicine)
    Patients & Vouchers
Sales Invoice & Reports



Remove Retail and Supplier

Let if user select Pharmacy
Let use select Retail or Supplier or Tick both as subcategory

After create account
Send Email verification 
Using email template
Click on link to verify his email
Design page user will be redicted after for successs page

Redirect user to logoin page

Slect categories after onbording

Onboarding
 Subscribe / 14 Days free trial
 Create Business branches
 Manage branches
 Get dashboard
 Access main menu based on business category being selected 
