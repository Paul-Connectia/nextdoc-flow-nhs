import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { calculateSessionPrice, formatPrice } from '@/config/platformFees';
import { getPricingBandForTier } from '@/config/mentorPricing';
import { Clock, Sparkles, ChevronDown } from 'lucide-react';

interface MentorPricingModalProps {
  mentor: {
    id?: string;
    name: string;
    tier: 'associate' | 'senior' | 'principal';
    hourlyRate?: number;
    image?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSelectSession: (duration: 30 | 60, pricing: any) => void;
}

export const MentorPricingModal: React.FC<MentorPricingModalProps> = ({
  mentor,
  isOpen,
  onClose,
  onSelectSession
}) => {
  const tierBand = getPricingBandForTier(mentor.tier);
  const hourlyRate = mentor.hourlyRate || tierBand.default;

  const pricing30 = calculateSessionPrice(hourlyRate, 30);
  const pricing60 = calculateSessionPrice(hourlyRate, 60);

  const SessionCard = ({ 
    duration, 
    pricing, 
    recommended = false 
  }: { 
    duration: 30 | 60; 
    pricing: any; 
    recommended?: boolean;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
        {recommended && (
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="w-3 h-3" />
              Best Value
            </Badge>
          </div>
        )}
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold">{duration} Minute Session</h3>
          </div>
          
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-primary">
              {formatPrice(pricing.total)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              All fees included
            </p>
          </div>

          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center">
              <span>View price breakdown</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 text-sm mt-4 pt-4 border-t">
              <div className="flex justify-between text-muted-foreground">
                <span>Mentor Fee:</span>
                <span>{formatPrice(pricing.mentorFee)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Service Fee (20%):</span>
                <span>{formatPrice(pricing.platformFee)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground pt-2 border-t">
                <span>Subtotal:</span>
                <span>{formatPrice(pricing.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>VAT (20%):</span>
                <span>{formatPrice(pricing.vat)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total:</span>
                <span className="text-primary">{formatPrice(pricing.total)}</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full" 
            size="lg"
            onClick={() => onSelectSession(duration, pricing)}
          >
            Book {duration} Min Session
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Book Session with {mentor.name}
          </DialogTitle>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="capitalize">
              {mentor.tier} Mentor
            </Badge>
            <span className="text-sm text-muted-foreground">
              {formatPrice(hourlyRate)}/hour
            </span>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <SessionCard duration={30} pricing={pricing30} />
          <SessionCard duration={60} pricing={pricing60} recommended />
        </div>

        <div className="text-xs text-muted-foreground text-center mt-4 pb-2">
          All prices include VAT and service fees. No hidden charges.
        </div>

        <Button variant="ghost" onClick={onClose} className="w-full">
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};
