'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, TrendingUp, Clock, ShoppingCart, Leaf, Drumstick } from 'lucide-react';
import { foodItems, comboOffers } from '@/lib/food-data';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Get featured items
  const featuredItems = [
    foodItems.find(item => item.id === 'v1'), // Paneer Butter Masala
    foodItems.find(item => item.id === 'nv1'), // Chicken Biryani
    foodItems.find(item => item.id === 'v7'), // Veg Thali
    foodItems.find(item => item.id === 'nv6'), // Butter Chicken
  ].filter(Boolean);

  const popularCombos = comboOffers.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="canteen-gradient relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-lg">
              <Sparkles className="h-5 w-5 text-[#FF6F61]" />
              <span className="font-semibold text-gray-800">Fresh & Delicious Food Delivered Fast</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg logo-pulse">
              Canteen Bites
            </h1>
            
            <p className="text-xl md:text-2xl text-white/95 mb-8 font-medium drop-shadow">
              Order your favorite meals from our canteen. Quick, tasty, and affordable!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu">
                <Button 
                  size="lg" 
                  className="bg-[#FF5722] hover:bg-[#E64A19] text-white text-lg px-8 py-6 rounded-full shadow-xl hover-bounce glow-shadow transition-all"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/menu?tab=combos">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/90 hover:bg-white text-[#FF5722] border-2 border-white text-lg px-8 py-6 rounded-full shadow-xl hover-bounce transition-all"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  View Combo Offers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border-2 hover:border-[#FF6F61] transition-all hover:shadow-lg hover-bounce">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF6F61] to-[#FF9A9E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#222222]">Fast Delivery</h3>
                <p className="text-[#555555]">Get your food delivered in 15-30 minutes</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-[#FFC107] transition-all hover:shadow-lg hover-bounce">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFC107] to-[#FFD54F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#222222]">Special Offers</h3>
                <p className="text-[#555555]">Save big with our combo deals and discounts</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-[#4CAF50] transition-all hover:shadow-lg hover-bounce">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4CAF50] to-[#81C784] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#222222]">Fresh Food</h3>
                <p className="text-[#555555]">Made fresh daily with quality ingredients</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 bg-gradient-to-b from-white to-[#FAD0C4]/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-4">
              Today's Featured Dishes
            </h2>
            <p className="text-lg text-[#555555]">Our most popular and delicious items</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map(item => (
              <Card 
                key={item!.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-[#FF6F61] rounded-2xl"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={item!.image || '/placeholder-food.jpg'}
                    alt={item!.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="bg-gradient-to-br from-[#FF9A9E] to-[#FAD0C4] pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-[#222222]">{item!.name}</CardTitle>
                    {item!.category === 'veg' ? (
                      <Badge className="bg-[#4CAF50] text-white">
                        <Leaf className="h-3 w-3 mr-1" />
                        Veg
                      </Badge>
                    ) : (
                      <Badge className="bg-[#FF5722] text-white">
                        <Drumstick className="h-3 w-3 mr-1" />
                        Non-Veg
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item!.payment_modes.slice(0, 2).map(mode => (
                      <Badge key={mode} variant="secondary" className="text-xs">
                        {mode}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between bg-gradient-to-r from-white to-[#FAD0C4]/30">
                  <span className="text-2xl font-bold text-[#FF5722]">₹{item!.price}</span>
                  <Link href="/menu">
                    <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-full">
                      Order Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Combo Offers Section */}
      <section className="py-16 bg-gradient-to-br from-[#FFC107]/20 via-white to-[#FF9A9E]/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFC107] to-[#FF9800] text-white rounded-full px-6 py-2 mb-4 shadow-lg">
              <Sparkles className="h-5 w-5" />
              <span className="font-bold">Special Combo Deals</span>
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-4">
              Save More with Combos
            </h2>
            <p className="text-lg text-[#555555]">Get complete meals at amazing prices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularCombos.map(combo => (
              <Card 
                key={combo.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-[#FFC107] rounded-2xl relative"
              >
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-[#FFC107] to-[#FF9800] text-[#222222] font-bold text-sm px-3 py-1 shadow-lg">
                    ⭐ {combo.offer}
                  </Badge>
                </div>
                
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={combo.image || '/placeholder-food.jpg'}
                    alt={combo.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <CardHeader className="bg-gradient-to-br from-[#FFD54F] to-[#FFC107] pt-6">
                  <CardTitle className="text-2xl text-[#222222]">{combo.name}</CardTitle>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <div className="mb-4">
                    <p className="text-sm text-[#555555] font-semibold mb-2">Includes:</p>
                    <ul className="space-y-1">
                      {combo.items?.map((item, idx) => (
                        <li key={idx} className="text-sm text-[#444444] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F61]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {combo.payment_modes.slice(0, 3).map(mode => (
                      <Badge key={mode} variant="outline" className="text-xs">
                        {mode}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="flex items-center justify-between bg-gradient-to-r from-white to-[#FFD54F]/30 pt-4">
                  <span className="text-3xl font-bold text-[#FF5722]">₹{combo.price}</span>
                  <Link href="/menu?tab=combos">
                    <Button className="bg-[#8BC34A] hover:bg-[#7CB342] text-white rounded-full px-6">
                      Order Combo
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/menu?tab=combos">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#FF5722] to-[#FF9800] hover:from-[#E64A19] hover:to-[#F57C00] text-white text-lg px-10 py-6 rounded-full shadow-xl hover-bounce glow-shadow"
              >
                View All Combos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-[#555555]">Choose from our wide variety of dishes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/menu?tab=veg">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-[#4CAF50] rounded-2xl cursor-pointer group">
                <div className="bg-gradient-to-br from-[#4CAF50] to-[#81C784] p-12 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all" />
                  <Leaf className="h-20 w-20 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-3xl font-bold text-white mb-2">Vegetarian</h3>
                  <p className="text-white/90 text-lg">20+ Delicious Veg Dishes</p>
                  <Badge className="bg-white text-[#4CAF50] mt-4 px-4 py-1">
                    Explore Menu →
                  </Badge>
                </div>
              </Card>
            </Link>

            <Link href="/menu?tab=non-veg">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-[#FF5722] rounded-2xl cursor-pointer group">
                <div className="bg-gradient-to-br from-[#FF5722] to-[#FF8A65] p-12 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all" />
                  <Drumstick className="h-20 w-20 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-3xl font-bold text-white mb-2">Non-Vegetarian</h3>
                  <p className="text-white/90 text-lg">20+ Tasty Non-Veg Dishes</p>
                  <Badge className="bg-white text-[#FF5722] mt-4 px-4 py-1">
                    Explore Menu →
                  </Badge>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="canteen-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Ready to Order?
          </h2>
          <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who enjoy fresh, delicious meals every day!
          </p>
          <Link href="/menu">
            <Button 
              size="lg"
              className="bg-white text-[#FF5722] hover:bg-white/90 text-xl px-12 py-7 rounded-full shadow-2xl hover-bounce font-bold"
            >
              Start Ordering Now
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}