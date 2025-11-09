'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, User, LogOut, ShoppingCart } from 'lucide-react';
import { authClient, useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error?.code) {
      toast.error('Failed to sign out');
    } else {
      localStorage.removeItem('bearer_token');
      refetch();
      toast.success('Signed out successfully');
      router.push('/');
    }
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="rounded-full bg-gradient-to-br from-[#FF6F61] to-[#FF9A9E] p-2">
              <UtensilsCrossed className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-[#222222]">Canteen Bites</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-[#555555] hover:text-[#FF5722] transition-colors font-medium">
              Home
            </Link>
            <Link href="/menu" className="text-[#555555] hover:text-[#FF5722] transition-colors font-medium">
              Menu
            </Link>
            <Link href="/orders" className="text-[#555555] hover:text-[#FF5722] transition-colors font-medium">
              Orders
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
            ) : session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{session.user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-[#555555] hover:text-[#FF5722]">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
