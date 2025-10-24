import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ConditionalFooter from '@/components/ConditionalFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      
      if (!sessionId) {
        toast({
          title: "Error",
          description: "No session ID found",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      try {
        // Call verification edge function
        const { data, error } = await supabase.functions.invoke('verify-product-payment', {
          body: { sessionId }
        });

        if (error) throw error;

        setOrderDetails(data);
      } catch (error) {
        console.error('Payment verification error:', error);
        toast({
          title: "Verification Issue",
          description: "We're processing your payment. You'll receive a confirmation email shortly.",
        });
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, toast]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {loading ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Verifying your payment...</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" />
                </div>
                <CardTitle className="text-3xl">Payment Successful!</CardTitle>
                <CardDescription className="text-lg">
                  Thank you for your purchase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {orderDetails && (
                  <div className="bg-accent/20 rounded-lg p-6 space-y-3">
                    <h3 className="font-semibold text-lg">Order Summary</h3>
                    {orderDetails.items?.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="font-medium">£{item.price}</span>
                      </div>
                    ))}
                    <div className="pt-3 border-t">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>£{orderDetails.total}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    A confirmation email has been sent to your inbox with all the details.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => navigate('/dashboard')} size="lg">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/products')} size="lg">
                      Browse Products
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <ConditionalFooter />
    </div>
  );
};

export default CheckoutSuccess;
