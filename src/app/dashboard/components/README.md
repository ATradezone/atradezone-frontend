# Dashboard Components

This directory contains reusable components specific to the dashboard feature.

## Components

### WorkspaceOverviewModal
- **Location**: `WorkspaceOverviewModal.tsx`
- **Purpose**: Displays workspace overview information in a modal
- **Usage**: Imported and used in the Topbar component
- **Features**:
  - Shows workspace statistics
  - Displays user status information
  - Provides visual charts for data representation
  - Responsive design with sticky header

## Benefits of Colocation

By moving dashboard-specific components to this directory, we achieve:

1. **Better Organization**: Components are grouped by feature
2. **Easier Maintenance**: All dashboard components are in one place
3. **Clearer Structure**: The component hierarchy reflects the feature structure
4. **Reduced Dependencies**: Global component directories are less cluttered

## Usage

To use the WorkspaceOverviewModal component:

```typescript
import WorkspaceOverviewModal from '@/app/dashboard/components/WorkspaceOverviewModal';

// In your component
<WorkspaceOverviewModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
/>
```

## Future Expansion

This directory can be expanded to include other dashboard-specific components such as:
- Dashboard widgets
- Chart components
- Data visualization components
- Dashboard layout components