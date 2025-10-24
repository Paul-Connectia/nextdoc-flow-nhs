import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BuyNowButton } from '@/components/BuyNowButton';

interface CrossSellItem {
  id: string;
  name: string;
  price: number;
  description: string;
  badge?: string;
  path: string;
  type: 'one-time';
}

interface CrossSellWidgetProps {
  currentProduct?: string;
  maxItems?: number;
}

const crossSellProducts: CrossSellItem[] = [
  {
    id: 'cv-booster-cross',
    name: 'CV Booster™',
    price: 49,
    description: 'AI-powered NHS CV optimization',
    badge: 'Popular',
    path: '/cvbooster',
    type: 'one-time'
  },
  {
    id: 'interviewsim-cross',
    name: 'InterviewSim™',
    price: 39,
    description: 'AI interview practice platform',
    path: '/interviewsim',
    type: 'one-time'
  },
  {
    id: 'gapmap-cross',
    name: 'GapMap™',
    price: 29,
    description: 'Career pathway visualization',
    path: '/gapmap',
    type: 'one-time'
  },
  {
    id: 'sponsormatch-cross',
    name: 'SponsorMatch™',
    price: 29,
    description: 'NHS trust matching system',
    path: '/sponsormatch',
    type: 'one-time'
  }
];

export const CrossSellWidget: React.FC<CrossSellWidgetProps> = ({ currentProduct, maxItems = 2 }) => {
  const relevantProducts = crossSellProducts
    .filter(product => product.id !== currentProduct)
    .slice(0, maxItems);

  if (relevantProducts.length === 0) return null;

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Complete Your NHS Journey</h3>
        </div>
        
        <div className="grid gap-4">
          {relevantProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-background rounded-lg border">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{product.name}</span>
                  {product.badge && (
                    <Badge variant="secondary" className="text-xs">{product.badge}</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link to={product.path}>
                  <Button variant="outline" size="sm">
                    View
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
                <BuyNowButton
                  item={product}
                  variant="default"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Add £{product.price}
                </BuyNowButton>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/products">
            <Button variant="ghost" size="sm" className="text-primary">
              View All Products
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};