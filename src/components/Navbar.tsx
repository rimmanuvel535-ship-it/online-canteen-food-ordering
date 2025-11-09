'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    const { authClient } = await import('@/lib/auth-client');
    const { error } = await authClient.signOut();
    if (error?.code) {
      toast.error(error.code);
    } else {
      localStorage.removeItem('bearer_token');
      toast.success('Signed out successfully');
      router.push('/');
      router.refresh();
    }
  };

  if (!mounted) return null;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6F61] to-[#FF9A9E] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-bold text-[#222222] font-['Poppins']">
              Canteen Online
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/menu"
              className="text-[#555555] hover:text-[#FF5722] font-medium transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/menu?tab=combos"
              className="text-[#555555] hover:text-[#FF5722] font-medium transition-colors"
            >
              Offers
            </Link>

            {session?.user ? (
              <>
                <Link href="/admin">
                  <Button
                    variant="ghost"
                    className="text-[#555555] hover:text-[#FF5722] hover:bg-transparent"
                  >
                    <User className="h-5 w-5 mr-2" />
                    {session.user.name}
                  </Button>
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-[#555555] hover:text-[#FF5722] hover:bg-transparent"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#222222]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200">
            <Link
              href="/menu"
              className="block text-[#555555] hover:text-[#FF5722] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="/menu?tab=combos"
              className="block text-[#555555] hover:text-[#FF5722] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Offers
            </Link>
            {session?.user ? (
              <>
                <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-[#555555] hover:text-[#FF5722] hover:bg-transparent"
                  >
                    <User className="h-5 w-5 mr-2" />
                    {session.user.name}
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-[#555555] hover:text-[#FF5722] hover:bg-transparent"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}