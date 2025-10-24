import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { detectUserCurrency, getSupportedCurrencies, setPreferredCurrency, type CurrencyInfo } from '@/lib/currency';

interface CurrencySelectorProps {
  onCurrencyChange?: (currency: string) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ onCurrencyChange }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>(detectUserCurrency());
  const [isOpen, setIsOpen] = useState(false);
  
  const currencies = getSupportedCurrencies();

  useEffect(() => {
    setSelectedCurrency(detectUserCurrency());
  }, []);

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    setPreferredCurrency(currency);
    onCurrencyChange?.(currency);
    setIsOpen(false);
  };

  const selectedCurrencyInfo = currencies.find(c => c.code === selectedCurrency);

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
        <SelectTrigger className="w-auto min-w-[80px] h-8 text-xs border-none bg-transparent">
          <SelectValue>
            <span className="font-medium">
              {selectedCurrencyInfo?.symbol} {selectedCurrencyInfo?.code}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {currencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              <span className="flex items-center gap-2">
                <span className="font-medium">{currency.symbol}</span>
                <span>{currency.code}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};