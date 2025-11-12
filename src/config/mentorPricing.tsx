export interface PricingBand {
    min: number;
    max: number;
    default: number;
    currency: string;
  }
  
  export interface MentorTierPricing {
    associate: PricingBand;
    senior: PricingBand;
    principal: PricingBand;
  }
  
  export const MENTOR_TIER_PRICING: MentorTierPricing = {
    associate: {
      min: 20,
      max: 60,
      default: 40,
      currency: 'GBP'
    },
    senior: {
      min: 80,
      max: 120,
      default: 100,
      currency: 'GBP'
    },
    principal: {
      min: 120,
      max: 200,
      default: 150,
      currency: 'GBP'
    }
  };
  
  export const PRICING_VERSION = 'pricing_band_v1.0';
  
  export function getPricingBandForTier(tier: 'associate' | 'senior' | 'principal'): PricingBand {
    return MENTOR_TIER_PRICING[tier];
  }
  
  export function formatCurrency(amount: number): string {
    return `£${amount.toFixed(2)}`;
  }
  
  export function validateRateForTier(
    rate: number, 
    tier: 'associate' | 'senior' | 'principal'
  ): { valid: boolean; error?: string } {
    const band = getPricingBandForTier(tier);
    
    if (rate < band.min) {
      return { 
        valid: false, 
        error: `Minimum for your tier is £${band.min}.` 
      };
    }
    
    if (rate > band.max) {
      return { 
        valid: false, 
        error: `Maximum for your tier is £${band.max}. You can reduce your fee anytime later from your dashboard.` 
      };
    }
    
    return { valid: true };
  }
  