import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CurrencySelector } from '@/components/CurrencySelector';
import { getDisplayPrice } from '@/lib/currency';

interface PriceDisplayProps {
  gbpPrice: number;
  className?: string;
  showCurrencySelector?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  gbpPrice, 
  className = '', 
  showCurrencySelector = true,
  size = 'md'
}) => {
  const [currentCurrency, setCurrentCurrency] = useState<string>('GBP');
  const [priceData, setPriceData] = useState(getDisplayPrice(gbpPrice));

  useEffect(() => {
    setPriceData(getDisplayPrice(gbpPrice, currentCurrency));
  }, [gbpPrice, currentCurrency]);

  const handleCurrencyChange = (currency: string) => {
    setCurrentCurrency(currency);
  };

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl', 
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`font-bold text-primary ${sizeClasses[size]}`}>
        {priceData.formatted}
      </span>
      {showCurrencySelector && (
        <CurrencySelector onCurrencyChange={handleCurrencyChange} />
      )}
    </div>
  );
};