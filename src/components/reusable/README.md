# Reusable Components

This directory contains reusable components that can be used across the application.

## GenericTable Component

The `GenericTable` component is a flexible, reusable table component that can be used to display any type of data with pagination, sorting, and customizable columns.

### Usage

1. Import the component:
```typescript
import GenericTable from '@/components/reusable/GenericTable';
```

2. Define your data interface:
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}
```

3. Create your data:
```typescript
const products: Product[] = [
  { id: 1, name: 'Product 1', price: 100, category: 'Category 1' },
  { id: 2, name: 'Product 2', price: 200, category: 'Category 2' },
];
```

4. Define columns:
```typescript
const columns = [
  {
    key: 'name',
    title: 'Product Name',
    sortable: true,
    render: (value: string) => (
      <div className="text-sm text-gray-900">{value}</div>
    )
  },
  {
    key: 'price',
    title: 'Price',
    sortable: true,
    render: (value: number) => (
      <div className="text-sm font-medium text-gray-900">
        {value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </div>
    )
  }
];
```

5. Use the component:
```typescript
<GenericTable
  data={products}
  columns={columns}
  loading={false}
  onSort={(key) => console.log('Sort by:', key)}
  sortConfig={sortConfig}
  pagination={{
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page) => console.log('Go to page:', page)
  }}
/>
```

## Pre-built Table Components

We also provide pre-built table components for specific use cases:

1. `TransactionsTable` - For displaying financial transactions
2. `InventoryTable` - For displaying inventory items

These components wrap the GenericTable with specific data types and column configurations.