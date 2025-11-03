// Global type definitions for Google Analytics gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set' | 'js',
      action: string,
      params?: GtagParams
    ) => void;
  }
}

interface GtagParams {
  // Common share properties
  method?: string;
  content_type?: string;
  item_id?: string;
  // Product comparison specific
  products_count?: number;
  success?: boolean;
  // E-commerce properties
  currency?: string;
  value?: number;
  items?: GtagItem[];
  // Page view properties
  page_title?: string;
  // Allow any additional properties
  [key: string]: unknown;
}

interface GtagItem {
  item_id?: string;
  item_name?: string;
  price?: number;
  quantity?: number;
  [key: string]: unknown;
}

export {};
