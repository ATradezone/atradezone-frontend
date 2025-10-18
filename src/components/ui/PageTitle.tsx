'use client';

import { useEffect } from 'react';
import { generatePageTitle } from '@/utils/pageTitle';

interface PageTitleProps {
  title: string;
}

/**
 * Component to set the page title dynamically
 * Usage: <PageTitle title="Dashboard" />
 */
export default function PageTitle({ title }: PageTitleProps) {
  useEffect(() => {
    // Set the document title when the component mounts
    if (typeof document !== 'undefined') {
      document.title = generatePageTitle(title);
    }
  }, [title]);

  // This component doesn't render anything
  return null;
}

// Explicitly export the type for better TypeScript support
export type { PageTitleProps };