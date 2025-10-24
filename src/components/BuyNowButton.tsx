import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart, CartItem } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { QuickCheckoutModal } from '@/components/QuickCheckoutModal';
import { ShoppingCart, Zap } from 'lucide-react';
import { getDisplayPrice } from '@/lib/currency';

interface BuyNowButtonProps {
  item: CartItem;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  showIcon?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const BuyNowButton: React.FC<BuyNowButtonProps> = ({
  item,
  variant = 'default',
  size = 'default',
  showIcon = true,
  className,
  children
}) => {
  const [showQuickCheckout, setShowQuickCheckout] = useState(false);
  const { toast } = useToast();

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setShowQuickCheckout(true);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleBuyNow}
        className={className}
      >
        {showIcon && <Zap className="h-4 w-4 mr-2" />}
        {children || 'Buy Now'}
      </Button>
      
      <QuickCheckoutModal
        isOpen={showQuickCheckout}
        onClose={() => setShowQuickCheckout(false)}
        item={item}
      />
    </>
  );
};

export const AddToCartButton: React.FC<BuyNowButtonProps> = ({
  item,
  variant = 'outline',
  size = 'default',
  showIcon = true,
  className,
  children
}) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(item);
    
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleAddToCart}
      className={className}
    >
      {showIcon && <ShoppingCart className="h-4 w-4 mr-2" />}
      {children || 'Add to Cart'}
    </Button>
  );
};