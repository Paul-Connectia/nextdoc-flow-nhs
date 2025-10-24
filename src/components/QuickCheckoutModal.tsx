import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CartItem } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface QuickCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: CartItem;
}

export const QuickCheckoutModal: React.FC<QuickCheckoutModalProps> = ({
  isOpen,
  onClose,
  item
}) => {
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleQuickCheckout = async () => {
    if (!item) return;

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
          items: [{
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            type: item.type
          }]
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
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      setProcessing(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Checkout</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Summary */}
          <div className="border rounded-lg p-4 bg-accent/20">
            <h4 className="font-semibold">{item.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-2xl font-bold">£{item.price}</span>
              <Badge variant="outline">
                {item.type === 'subscription' ? 'Monthly' : 'One-time'}
              </Badge>
            </div>
          </div>

          {/* Checkout Actions */}
          <div className="space-y-4">
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <Lock className="h-4 w-4 mr-2" />
              <span>Secure payment powered by Stripe</span>
            </div>

            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleQuickCheckout}
                className="flex-1"
                disabled={processing}
              >
                {processing ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};