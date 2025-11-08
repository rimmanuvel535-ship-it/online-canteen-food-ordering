'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, LogOut, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { User as UserType } from '@/types';

export const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<UserType | null>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    const cart = localStorage.getItem('cart');
    if (cart) {
      const items = JSON.parse(cart);
      const count = items.reduce((acc: number, item: any) => acc + item.quantity, 0);
      setCartCount(count);
    }

    const handleStorage = () => {
      const cart = localStorage.getItem('cart');
      if (cart) {
        const items = JSON.parse(cart);
        const count = items.reduce((acc: number, item: any) => acc + item.quantity, 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('cartUpdated', handleStorage);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('cartUpdated', handleStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
          <UtensilsCrossed className="h-6 w-6" />
          <span>Canteen Online</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link 
            href="/menu" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === '/menu' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Menu
          </Link>
          
          {user && (
            <Link 
              href="/orders" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/orders' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Orders
            </Link>
          )}

          <Link href="/checkout" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
