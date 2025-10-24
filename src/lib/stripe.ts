
// Stripe configuration
export const STRIPE_PUBLISHABLE_KEY = ""; // Removed live key from codebase. Store as Supabase secret if needed.

// Price IDs for subscription tiers (you'll need to create these in your Stripe dashboard)
export const STRIPE_PRICE_IDS = {
  core: 'price_core_monthly', // Replace with your actual Core price ID
  elite: 'price_elite_monthly' // Replace with your actual Elite price ID
};

// Helper function to format currency
export const formatPrice = (amount: number, currency: string = 'GBP') => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount / 100);
};
