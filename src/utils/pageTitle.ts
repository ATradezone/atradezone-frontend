import { siteConfig } from '@/config/site';

/**
 * Generates a dynamic page title following the format:
 * "Company Name : Page Title"
 * 
 * @param pageTitle - The specific page title
 * @returns Formatted page title string
 */
export function generatePageTitle(pageTitle: string): string {
  return `${siteConfig.name} : ${pageTitle}`;
}

/**
 * Sets the document title dynamically
 * 
 * @param pageTitle - The specific page title
 */
export function setPageTitle(pageTitle: string): void {
  if (typeof document !== 'undefined') {
    document.title = generatePageTitle(pageTitle);
  }
}