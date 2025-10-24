import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, X, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';

export const CartIcon = () => {
  const { totalItems, isOpen, setIsOpen } = useCart();
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <CartContent />
    </Sheet>
  );
};

const CartContent = () => {
  const { items, removeFromCart, clearCart, totalPrice } = useCart();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setProcessing(true);
    
    try {
      // Check if user is authenticated
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to complete your purchase.",
          variant: "destructive",
        });
        setProcessing(false);
        return;
      }

      // Call edge function to create Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-product-checkout', {
        body: { 
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            type: item.type
          }))
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to create checkout session');
      }

      if (!data?.checkoutUrl) {
        throw new Error('No checkout URL received');
      }

      // Redirect to Stripe checkout
      window.location.href = data.checkoutUrl;
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Failed",
        description: error instanceof Error ? error.message : "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
      setProcessing(false);
    }
  };

  return (
    <SheetContent className="w-full sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
      </SheetHeader>
      
      <div className="flex flex-col h-full">
        <div className="flex-1 py-6">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-2">Add some products to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    )}
                    <div className="flex items-center mt-2">
                      <span className="font-semibold">£{item.price}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          £{item.originalPrice}
                        </span>
                      )}
                      <Badge variant="outline" className="ml-2">
                        {item.type === 'subscription' ? 'Monthly' : 'One-time'}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="border-t pt-6 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>£{totalPrice}</span>
            </div>
            
            <div className="space-y-2">
              <Button onClick={handleCheckout} className="w-full" size="lg" disabled={processing}>
                <CreditCard className="h-4 w-4 mr-2" />
                {processing ? "Processing..." : "Secure Checkout"}
              </Button>
              <Button variant="outline" onClick={clearCart} className="w-full" disabled={processing}>
                Clear Cart
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Secure payment powered by Stripe
            </p>
          </div>
        )}
      </div>
    </SheetContent>
  );
};