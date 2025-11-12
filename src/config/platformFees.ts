export const PLATFORM_FEE_PERCENTAGE = 0.20; // 20%
export const VAT_PERCENTAGE = 0.20; // 20%

export interface PriceBreakdown {
  mentorFee: number;
  platformFee: number;
  subtotal: number;
  vat: number;
  total: number;
  currency: string;
}

export function calculateSessionPrice(
  hourlyRate: number,
  durationMinutes: number,
  currency: string = 'GBP'
): PriceBreakdown {
  const mentorFee = (hourlyRate * durationMinutes) / 60;
  const platformFee = mentorFee * PLATFORM_FEE_PERCENTAGE;
  const subtotal = mentorFee + platformFee;
  const vat = subtotal * VAT_PERCENTAGE;
  const total = subtotal + vat;

  return {
    mentorFee: Number(mentorFee.toFixed(2)),
    platformFee: Number(platformFee.toFixed(2)),
    subtotal: Number(subtotal.toFixed(2)),
    vat: Number(vat.toFixed(2)),
    total: Number(total.toFixed(2)),
    currency
  };
}

export function formatPrice(amount: number, currency: string = 'GBP'): string {
  const symbol = currency === 'GBP' ? '£' : '$';
  return `${symbol}${amount.toFixed(2)}`;
}
