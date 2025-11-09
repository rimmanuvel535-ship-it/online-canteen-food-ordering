'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, User, LogOut, UtensilsCrossed, ChefHat, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { authClient, useSession } from '@/lib/auth-client';
import { toast } from 'sonner';

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
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

  const handleLogout = async () => {
    const { error } = await authClient.signOut();
    
    if (error?.code) {
      toast.error('Logout failed. Please try again.');
      return;
    }
    
    localStorage.removeItem('bearer_token');
    refetch();
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
          <UtensilsCrossed className="h-6 w-6" />
          <span>Mad Rascles</span>
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
          
          {session?.user && (
            <Link 
              href="/orders" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/orders' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Orders
            </Link>
          )}

          <Link 
            href="/kitchen" 
            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
              pathname === '/kitchen' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <ChefHat className="h-4 w-4" />
            Kitchen
          </Link>

          <Link 
            href="/admin" 
            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
              pathname === '/admin' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Shield className="h-4 w-4" />
            Admin
          </Link>

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

          {isPending ? (
            <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
          ) : session?.user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{session.user.name}</span>
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