# Development Scripts

This directory contains scripts to help with development and maintenance of the ATradezone™ Cloud application.

## Layout Pattern Verification Script

The `verify-layout-pattern.js` script checks that all dashboard and settings pages follow the correct layout pattern, ensuring they don't include duplicate layout components.

### Running the Script

```bash
npm run verify-layout
```

This script will:
1. Check all files in `src/app/dashboard` and `src/app/settings` directories
2. Verify that pages don't import or use forbidden layout components directly
3. Report any violations

### What it Checks

The script looks for the following forbidden components:
- MainLayout
- Topbar
- Column1
- Column2
- Column1Skeleton
- Column2Skeleton
- TopbarSkeleton

These components should only be used by the main layout system, not imported directly in individual pages.

### Why This Matters

Following the correct layout pattern ensures:
1. Consistent user experience across all pages
2. Proper separation of concerns between layout and content
3. Easier maintenance and updates to the layout system
4. Better performance by avoiding duplicate components

### Adding New Pages

When creating new pages under `/dashboard` or `/settings`:
1. Only include page-specific content
2. Use the standard wrapper div with classes: `p-6 bg-gray-50 min-h-screen`
3. Run the verification script to ensure compliance