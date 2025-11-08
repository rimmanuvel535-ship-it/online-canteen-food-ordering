'use client';

import { FoodItem } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Leaf } from 'lucide-react';
import Image from 'next/image';

interface FoodCardProps {
  item: FoodItem;
  onAddToCart: (item: FoodItem) => void;
}

export const FoodCard = ({ item, onAddToCart }: FoodCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-video bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://placehold.co/400x300/e5e5e5/666666?text=${encodeURIComponent(item.name)}`;
          }}
        />
        {item.offer && (
          <Badge className="absolute right-2 top-2 bg-destructive">
            {item.offer}
          </Badge>
        )}
        <Badge 
          className="absolute left-2 top-2" 
          variant={item.category === 'veg' ? 'secondary' : 'default'}
        >
          {item.category === 'veg' ? (
            <>
              <Leaf className="mr-1 h-3 w-3" /> Veg
            </>
          ) : (
            'Non-Veg'
          )}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">₹{item.price}</span>
          {item.type === 'combo' && (
            <Badge variant="outline">Combo</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => onAddToCart(item)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
