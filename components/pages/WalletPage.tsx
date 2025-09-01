'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Wallet, 
  CreditCard, 
  History, 
  Heart, 
  Bookmark, 
  Eye, 
  Receipt, 
  Download,
  Star,
  Calendar,
  DollarSign,
  TrendingUp,
  Filter,
  Search,
  Clock,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Enhanced mock data with myfans.jp features
const purchaseHistory = [
  {
    id: '1',
    type: 'subscription',
    creator: {
      name: 'Sakura',
      username: 'sakura_chan',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVerified: true,
      category: 'Photography'
    },
    item: 'Premium Subscription (980円/month)',
    amount: 980,
    currency: 'JPY',
    date: '2024-01-15',
    status: 'completed',
    receipt: 'RCPT-001',
    paymentMethod: 'Credit Card',
    transactionFee: 49,
    netAmount: 931
  },
  {
    id: '2',
    type: 'ppv',
    creator: {
      name: 'Alex Cooper',
      username: 'alex_fitness',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    item: 'Workout Video Collection',
    amount: 4.99,
    date: '2024-01-14',
    status: 'completed',
    receipt: 'RCPT-002',
  },
  {
    id: '3',
    type: 'tip',
    creator: {
      name: 'Emma Rodriguez',
      username: 'emma_art',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    item: 'Tip',
    amount: 10.00,
    date: '2024-01-13',
    status: 'completed',
    receipt: 'RCPT-003',
  },
  {
    id: '4',
    type: 'subscription',
    creator: {
      name: 'Mike Johnson',
      username: 'mike_music',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    item: 'VIP Subscription',
    amount: 49.99,
    date: '2024-01-12',
    status: 'pending',
    receipt: 'RCPT-004',
  },
];

const walletStats = {
  balance: 1250.75,
  pending: 89.50,
  totalSpent: 5678.90,
  monthlySpending: 890.25,
};

export function WalletPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'subscription': return <Star className="w-5 h-5 text-purple-600" />;
      case 'ppv': return <Play className="w-5 h-5 text-blue-600" />;
      case 'tip': return <Heart className="w-5 h-5 text-pink-600" />;
      default: return <DollarSign className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
          <p className="text-gray-600">Manage your payments, subscriptions, and saved content</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Wallet className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Balance</p>
                  <p className="text-2xl font-bold text-gray-900">${walletStats.balance}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">${walletStats.totalSpent}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly</p>
                  <p className="text-2xl font-bold text-gray-900">${walletStats.monthlySpending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">${walletStats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Purchase History</h2>
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="subscription">Subscriptions</SelectItem>
                    <SelectItem value="ppv">PPV</SelectItem>
                    <SelectItem value="tip">Tips</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {purchaseHistory.map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getTypeIcon(purchase.type)}
                    </div>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={purchase.creator.avatar}
                        alt={purchase.creator.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{purchase.creator.name}</p>
                        <p className="text-sm text-gray-600">@{purchase.creator.username}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{purchase.item}</p>
                      <p className="text-sm text-gray-600">{formatDate(purchase.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${purchase.amount}</p>
                      <Badge className={getStatusColor(purchase.status)}>
                        {purchase.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
