'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Clock, CheckCircle, ChefHat, LogOut, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface OrderItem {
  id: number;
  orderId: number;
  foodItemId: number;
  quantity: number;
  price: number;
  createdAt: string;
}

interface Order {
  id: number;
  userId: number;
  customerName: string;
  phone: string;
  deliveryAddress: string;
  paymentMode: string;
  subtotal: number;
  gst: number;
  total: number;
  status: string;
  orderTime: string;
  estimatedDelivery: string;
  createdAt: string;
  items: OrderItem[];
}

export default function KitchenPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  useEffect(() => {
    const kitchenAuth = localStorage.getItem('kitchen_auth');
    if (kitchenAuth === 'true') {
      setIsAuthenticated(true);
      fetchOrders();
    }
    setIsLoading(false);
  }, []);

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const response = await fetch('/api/orders/kitchen');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        toast.error('Failed to load orders');
      }
    } catch (error) {
      toast.error('Error loading orders');
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Password: kitchen123
    if (password === 'kitchen123') {
      localStorage.setItem('kitchen_auth', 'true');
      setIsAuthenticated(true);
      toast.success('Welcome to Kitchen Dashboard');
      fetchOrders();
    } else {
      toast.error('Invalid password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('kitchen_auth');
    setIsAuthenticated(false);
    setPassword('');
    toast.success('Logged out successfully');
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        toast.success(`Order ${orderId} status updated to ${newStatus}`);
        fetchOrders();
      } else {
        toast.error('Failed to update order status');
      }
    } catch (error) {
      toast.error('Error updating order status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'preparing':
        return 'bg-blue-500';
      case 'ready':
        return 'bg-green-500';
      case 'delivered':
        return 'bg-gray-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Kitchen Dashboard</CardTitle>
            <p className="text-sm text-muted-foreground">Enter password to access</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter kitchen password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <Button type="submit" className="w-full">
                Access Kitchen Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Kitchen Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage incoming orders</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchOrders} variant="outline" size="icon">
              <RefreshCw className={`h-4 w-4 ${isLoadingOrders ? 'animate-spin' : ''}`} />
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">
                {orders.filter(o => o.status === 'pending').length}
              </div>
              <p className="text-sm text-muted-foreground">Pending Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'preparing').length}
              </div>
              <p className="text-sm text-muted-foreground">Preparing</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'ready').length}
              </div>
              <p className="text-sm text-muted-foreground">Ready</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-gray-600">
                {orders.filter(o => o.status === 'delivered').length}
              </div>
              <p className="text-sm text-muted-foreground">Delivered</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Active Orders</h2>
          {isLoadingOrders ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : orders.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No orders available
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id} className="border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.orderTime).toLocaleString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="font-medium">Customer: {order.customerName}</p>
                      <p className="text-sm text-muted-foreground">Phone: {order.phone}</p>
                      <p className="text-sm text-muted-foreground">
                        Payment: {order.paymentMode}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">Items:</p>
                      <ul className="space-y-1">
                        {order.items.map((item) => (
                          <li key={item.id} className="text-sm flex justify-between">
                            <span>Item #{item.foodItemId} × {item.quantity}</span>
                            <span className="font-medium">₹{item.price}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2 border-t flex justify-between font-bold">
                        <span>Total</span>
                        <span>₹{order.total}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {order.status === 'pending' && (
                        <Button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Start Preparing
                        </Button>
                      )}
                      {order.status === 'preparing' && (
                        <Button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Ready
                        </Button>
                      )}
                      {order.status === 'ready' && (
                        <Button
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="bg-gray-500 hover:bg-gray-600"
                        >
                          Mark as Delivered
                        </Button>
                      )}
                      {order.status !== 'cancelled' && order.status !== 'delivered' && (
                        <Button
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          variant="destructive"
                        >
                          Cancel Order
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
