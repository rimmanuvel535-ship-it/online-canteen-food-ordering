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
            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-lg">
              <Sparkles className="h-5 w-5 text-[#8B5A2B]" />
              <span className="font-semibold text-[#5D4037]">Fresh & Delicious Food Delivered Fast</span>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/58042079-58a7-40f1-8718-746575bfb1f7/generated_images/friendly-cartoon-cooking-chef-character--62c5240a-20251109070022.jpg"
                  alt="Chef Mascot"
                  fill
                  className="object-contain animate-bounce"
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-[#5D4037] drop-shadow-lg logo-pulse">
                Mad Rascles
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-[#6D4C41] mb-8 font-medium drop-shadow">
              Order your favorite meals from our kitchen. Quick, tasty, and affordable!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu">
                <Button 
                  size="lg" 
                  className="bg-[#8B5A2B] hover:bg-[#6D4C41] text-white text-lg px-8 py-6 rounded-full shadow-xl hover-bounce glow-shadow transition-all"
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
                  className="bg-white/90 hover:bg-white text-[#8B5A2B] border-2 border-white text-lg px-8 py-6 rounded-full shadow-xl hover-bounce transition-all"
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
      <section className="py-12 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border-2 hover:border-[#A0826D] transition-all hover:shadow-lg hover-bounce bg-white">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#A0826D] to-[#C4A484] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#5D4037]">Fast Delivery</h3>
                <p className="text-[#6D4C41]">Get your food delivered in 15-30 minutes</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-[#D4A574] transition-all hover:shadow-lg hover-bounce bg-white">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4A574] to-[#E8C9A0] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#5D4037]">Special Offers</h3>
                <p className="text-[#6D4C41]">Save big with our combo deals and discounts</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-[#8D6E63] transition-all hover:shadow-lg hover-bounce bg-white">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8D6E63] to-[#A1887F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#5D4037]">Fresh Food</h3>
                <p className="text-[#6D4C41]">Made fresh daily with quality ingredients</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 bg-gradient-to-b from-[#FFF8F0] to-[#F5E6D3]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5D4037] mb-4">
              Today's Featured Dishes
            </h2>
            <p className="text-lg text-[#6D4C41]">Our most popular and delicious items</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map(item => (
              <Card 
                key={item!.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-[#A0826D] rounded-2xl bg-white"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={item!.image || '/placeholder-food.jpg'}
                    alt={item!.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="bg-gradient-to-br from-[#E8D5C4] to-[#F5E6D3] pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-[#5D4037]">{item!.name}</CardTitle>
                    {item!.category === 'veg' ? (
                      <Badge className="bg-[#7CB342] text-white">
                        <Leaf className="h-3 w-3 mr-1" />
                        Veg
                      </Badge>
                    ) : (
                      <Badge className="bg-[#8B5A2B] text-white">
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
                <CardFooter className="flex items-center justify-between bg-gradient-to-r from-white to-[#F5E6D3]">
                  <span className="text-2xl font-bold text-[#8B5A2B]">₹{item!.price}</span>
                  <Link href="/menu">
                    <Button className="bg-[#8B5A2B] hover:bg-[#6D4C41] text-white rounded-full">
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
      <section className="py-16 bg-gradient-to-br from-[#F5E6D3] via-[#FFF8F0] to-[#E8D5C4]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C4A484] text-white rounded-full px-6 py-2 mb-4 shadow-lg">
              <Sparkles className="h-5 w-5" />
              <span className="font-bold">Special Combo Deals</span>
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#5D4037] mb-4">
              Save More with Combos
            </h2>
            <p className="text-lg text-[#6D4C41]">Get complete meals at amazing prices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularCombos.map(combo => (
              <Card 
                key={combo.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-[#D4A574] rounded-2xl relative bg-white"
              >
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-[#D4A574] to-[#C4A484] text-white font-bold text-sm px-3 py-1 shadow-lg">
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
                
                <CardHeader className="bg-gradient-to-br from-[#E8D5C4] to-[#D4A574] pt-6">
                  <CardTitle className="text-2xl text-[#5D4037]">{combo.name}</CardTitle>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <div className="mb-4">
                    <p className="text-sm text-[#6D4C41] font-semibold mb-2">Includes:</p>
                    <ul className="space-y-1">
                      {combo.items?.map((item, idx) => (
                        <li key={idx} className="text-sm text-[#5D4037] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B]" />
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
                
                <CardFooter className="flex items-center justify-between bg-gradient-to-r from-white to-[#F5E6D3] pt-4">
                  <span className="text-3xl font-bold text-[#8B5A2B]">₹{combo.price}</span>
                  <Link href="/menu?tab=combos">
                    <Button className="bg-[#7CB342] hover:bg-[#689F38] text-white rounded-full px-6">
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
                className="bg-gradient-to-r from-[#8B5A2B] to-[#A0826D] hover:from-[#6D4C41] hover:to-[#8B5A2B] text-white text-lg px-10 py-6 rounded-full shadow-xl hover-bounce glow-shadow"
              >
                View All Combos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5D4037] mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-[#6D4C41]">Choose from our wide variety of dishes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/menu?tab=veg">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-[#7CB342] rounded-2xl cursor-pointer group">
                <div className="bg-gradient-to-br from-[#7CB342] to-[#9CCC65] p-12 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all" />
                  <Leaf className="h-20 w-20 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-3xl font-bold text-white mb-2">Vegetarian</h3>
                  <p className="text-white/90 text-lg">20+ Delicious Veg Dishes</p>
                  <Badge className="bg-white text-[#7CB342] mt-4 px-4 py-1">
                    Explore Menu →
                  </Badge>
                </div>
              </Card>
            </Link>

            <Link href="/menu?tab=non-veg">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-[#8B5A2B] rounded-2xl cursor-pointer group">
                <div className="bg-gradient-to-br from-[#8B5A2B] to-[#A0826D] p-12 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all" />
                  <Drumstick className="h-20 w-20 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-3xl font-bold text-white mb-2">Non-Vegetarian</h3>
                  <p className="text-white/90 text-lg">20+ Tasty Non-Veg Dishes</p>
                  <Badge className="bg-white text-[#8B5A2B] mt-4 px-4 py-1">
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
          <h2 className="text-4xl md:text-5xl font-bold text-[#5D4037] mb-6 drop-shadow-lg">
            Ready to Order?
          </h2>
          <p className="text-xl text-[#6D4C41] mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who enjoy fresh, delicious meals every day!
          </p>
          <Link href="/menu">
            <Button 
              size="lg"
              className="bg-[#8B5A2B] hover:bg-[#6D4C41] text-white text-xl px-12 py-7 rounded-full shadow-2xl hover-bounce font-bold"
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