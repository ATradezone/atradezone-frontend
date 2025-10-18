import { useEffect } from 'react';
import { setPageTitle } from '@/utils/pageTitle';

/**
 * Hook to set the page title dynamically
 * 
 * @param title - The page title to set
 */
export function usePageTitle(title: string): void {
  useEffect(() => {
    setPageTitle(title);
  }, [title]);
}
