// Global currency conversion system for international accessibility
export interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number; // Rate relative to GBP
  locale: string;
}

// Base currency rates (would be updated via API in production)
const CURRENCY_RATES: Record<string, CurrencyInfo> = {
  GBP: { code: 'GBP', symbol: '£', rate: 1, locale: 'en-GB' },
  USD: { code: 'USD', symbol: '$', rate: 1.27, locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', rate: 1.16, locale: 'de-DE' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.90, locale: 'en-AU' },
  CAD: { code: 'CAD', symbol: 'C$', rate: 1.71, locale: 'en-CA' },
  INR: { code: 'INR', symbol: '₹', rate: 106.50, locale: 'en-IN' },
  NGN: { code: 'NGN', symbol: '₦', rate: 1595.00, locale: 'en-NG' },
  PKR: { code: 'PKR', symbol: 'Rs', rate: 351.00, locale: 'en-PK' },
  BDT: { code: 'BDT', symbol: '৳', rate: 152.00, locale: 'bn-BD' },
  PHP: { code: 'PHP', symbol: '₱', rate: 71.50, locale: 'en-PH' }
};

// Detect user's preferred currency based on location
export const detectUserCurrency = (): string => {
  // Check localStorage first
  const saved = localStorage.getItem('preferred-currency');
  if (saved && CURRENCY_RATES[saved]) return saved;

  // Try to detect from browser locale
  const locale = navigator.language || 'en-GB';
  
  if (locale.includes('US')) return 'USD';
  if (locale.includes('IN')) return 'INR';
  if (locale.includes('AU')) return 'AUD';
  if (locale.includes('CA')) return 'CAD';
  if (locale.includes('PK')) return 'PKR';
  if (locale.includes('BD')) return 'BDT';
  if (locale.includes('NG')) return 'NGN';
  if (locale.includes('PH')) return 'PHP';
  if (locale.includes('DE') || locale.includes('FR') || locale.includes('ES') || locale.includes('IT')) return 'EUR';

  return 'GBP'; // Default
};

// Convert price from GBP to target currency
export const convertPrice = (gbpPrice: number, targetCurrency: string): number => {
  const currency = CURRENCY_RATES[targetCurrency];
  if (!currency) return gbpPrice;
  
  return Math.round(gbpPrice * currency.rate * 100) / 100;
};

// Format price with currency symbol and locale
export const formatPrice = (price: number, currency: string): string => {
  const currencyInfo = CURRENCY_RATES[currency] || CURRENCY_RATES['GBP'];
  
  return new Intl.NumberFormat(currencyInfo.locale, {
    style: 'currency',
    currency: currencyInfo.code,
    minimumFractionDigits: currency === 'INR' || currency === 'PKR' || currency === 'BDT' || currency === 'NGN' ? 0 : 2
  }).format(price);
};

// Get display price with automatic currency conversion
export const getDisplayPrice = (gbpPrice: number, targetCurrency?: string): { price: number; formatted: string; currency: string } => {
  const currency = targetCurrency || detectUserCurrency();
  const convertedPrice = convertPrice(gbpPrice, currency);
  
  return {
    price: convertedPrice,
    formatted: formatPrice(convertedPrice, currency),
    currency
  };
};

// Save user's preferred currency
export const setPreferredCurrency = (currency: string): void => {
  if (CURRENCY_RATES[currency]) {
    localStorage.setItem('preferred-currency', currency);
  }
};

// Get list of supported currencies
export const getSupportedCurrencies = (): CurrencyInfo[] => {
  return Object.values(CURRENCY_RATES);
};