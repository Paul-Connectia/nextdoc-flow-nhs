import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ConditionalFooter from '@/components/ConditionalFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, Mail } from 'lucide-react';

const CheckoutCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                <XCircle className="h-10 w-10 text-orange-600 dark:text-orange-500" />
              </div>
              <CardTitle className="text-3xl">Payment Cancelled</CardTitle>
              <CardDescription className="text-lg">
                Your payment was not completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-accent/20 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold">What happened?</h3>
                <p className="text-muted-foreground">
                  You cancelled the payment process or closed the checkout window. 
                  No charges have been made to your account.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-center text-muted-foreground">
                  Your items are still in your cart if you'd like to try again.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => navigate(-1)} size="lg">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Cart
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/products')} size="lg">
                    Browse Products
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Having trouble? We're here to help.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="mailto:support@nextdoc.co.uk">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Support
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <ConditionalFooter />
    </div>
  );
};

export default CheckoutCancel;
