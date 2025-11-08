'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Leaf, Drumstick, Sparkles, Plus, Minus, X } from 'lucide-react';
import { foodItems, comboOffers } from '@/lib/food-data';
import { CartItem } from '@/types';

export default function MenuPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (item: typeof foodItems[0]) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    let newCart: CartItem[];

    if (existingItem) {
      newCart = cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (id: string, delta: number) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (id: string) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
      return;
    }
    router.push('/checkout');
  };

  const vegItems = foodItems.filter(item => item.category === 'veg');
  const nonVegItems = foodItems.filter(item => item.category === 'non-veg');

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Canteen Menu</h1>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowCart(!showCart)}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Cart
            {getCartItemCount() > 0 && (
              <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                {getCartItemCount()}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="veg">
              <Leaf className="h-4 w-4 mr-2" />
              Vegetarian
            </TabsTrigger>
            <TabsTrigger value="non-veg">
              <Drumstick className="h-4 w-4 mr-2" />
              Non-Veg
            </TabsTrigger>
            <TabsTrigger value="combos">
              <Sparkles className="h-4 w-4 mr-2" />
              Combo Offers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                Combo Offers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comboOffers.map(item => (
                  <FoodCard key={item.id} item={item} onAdd={addToCart} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-600" />
                Vegetarian Dishes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {vegItems.map(item => (
                  <FoodCard key={item.id} item={item} onAdd={addToCart} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Drumstick className="h-6 w-6 text-red-600" />
                Non-Vegetarian Dishes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {nonVegItems.map(item => (
                  <FoodCard key={item.id} item={item} onAdd={addToCart} />
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="veg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vegItems.map(item => (
                <FoodCard key={item.id} item={item} onAdd={addToCart} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="non-veg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nonVegItems.map(item => (
                <FoodCard key={item.id} item={item} onAdd={addToCart} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="combos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comboOffers.map(item => (
                <FoodCard key={item.id} item={item} onAdd={addToCart} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowCart(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-lg p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCart(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">₹{item.price}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="font-semibold">₹{item.price * item.quantity}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Subtotal:</span>
                    <span>₹{getCartTotal()}</span>
                  </div>
                  <Button onClick={handleCheckout} className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FoodCard({ item, onAdd }: { item: typeof foodItems[0]; onAdd: (item: typeof foodItems[0]) => void }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
          {item.category === 'veg' && (
            <Badge variant="outline" className="border-green-600 text-green-600 ml-2">
              <Leaf className="h-3 w-3" />
            </Badge>
          )}
          {item.category === 'non-veg' && (
            <Badge variant="outline" className="border-red-600 text-red-600 ml-2">
              <Drumstick className="h-3 w-3" />
            </Badge>
          )}
        </div>
        {item.offer && (
          <Badge className="bg-yellow-500 text-black w-fit mt-2">
            {item.offer}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pb-3">
        {item.items && (
          <div className="text-sm text-muted-foreground mb-2">
            Includes: {item.items.join(', ')}
          </div>
        )}
        <div className="flex flex-wrap gap-1 mt-2">
          {item.payment_modes.map(mode => (
            <Badge key={mode} variant="secondary" className="text-xs">
              {mode}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-3">
        <span className="text-xl font-bold">₹{item.price}</span>
        <Button onClick={() => onAdd(item)} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
