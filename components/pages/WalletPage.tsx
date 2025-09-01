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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data
const purchaseHistory = [
  {
    id: '1',
    type: 'subscription',
    creator: {
      name: 'Sakura',
      username: 'sakura_chan',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    item: 'Premium Subscription',
    amount: 19.99,
    date: '2024-01-15',
    status: 'completed',
    receipt: 'RCPT-001',
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

const savedItems = [
  {
    id: '1',
    type: 'post',
    creator: {
      name: 'Sakura',
      username: 'sakura_chan',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    content: 'Cherry blossom photography collection',
    image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
    savedDate: '2024-01-15',
    isLocked: false,
  },
  {
    id: '2',
    type: 'post',
    creator: {
      name: 'Alex Cooper',
      username: 'alex_fitness',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    content: 'Advanced workout routine',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
    savedDate: '2024-01-14',
    isLocked: true,
    price: 2.99,
  },
  {
    id: '3',
    type: 'creator',
    creator: {
      name: 'Emma Rodriguez',
      username: 'emma_art',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    content: 'Digital art portfolio',
    savedDate: '2024-01-13',
    isLocked: false,
  },
];

const likedItems = [
  {
    id: '1',
    type: 'post',
    creator: {
      name: 'Sakura',
      username: 'sakura_chan',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    content: 'Sunset photography tips',
    image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
    likedDate: '2024-01-15',
    likes: 1234,
  },
  {
    id: '2',
    type: 'post',
    creator: {
      name: 'Alex Cooper',
      username: 'alex_fitness',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    content: 'Morning workout motivation',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
    likedDate: '2024-01-14',
    likes: 892,
  },
];

const watchHistory = [
  {
    id: '1',
    type: 'video',
    creator: {
      name: 'Sakura',
      username: 'sakura_chan',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    content: 'Photography tutorial: Golden hour',
    thumbnail: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
    watchedDate: '2024-01-15',
    duration: '15:30',
    progress: 100,
  },
  {
    id: '2',
    type: 'video',
    creator: {
      name: 'Alex Cooper',
      username: 'alex_fitness',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    content: 'Full body workout routine',
    thumbnail: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
    watchedDate: '2024-01-14',
    duration: '45:20',
    progress: 75,
  },
];

const walletStats = {
  totalSpent: 85.96,
  thisMonth: 24.98,
  credits: 150.00,
  pending: 49.99,
};

export function WalletPage() {
  const [activeTab, setActiveTab] = useState('purchases');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'subscription':
        return <TrendingUp className="w-4 h-4" />;
      case 'ppv':
        return <Eye className="w-4 h-4" />;
      case 'tip':
        return <Heart className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Wallet & Purchases</h1>
        <p className="text-lg text-gray-600">Manage your spending, view history, and track your activity</p>
      </div>

      {/* Wallet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Wallet className="w-6 h-6 text-purple-600" />
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
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">${walletStats.thisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Credits</p>
                <p className="text-2xl font-bold text-gray-900">${walletStats.credits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
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
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="purchases" className="flex items-center space-x-2">
                <History className="w-4 h-4" />
                <span>Purchases</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center space-x-2">
                <Bookmark className="w-4 h-4" />
                <span>Saved</span>
              </TabsTrigger>
              <TabsTrigger value="liked" className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Liked</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Watch History</span>
              </TabsTrigger>
              <TabsTrigger value="receipts" className="flex items-center space-x-2">
                <Receipt className="w-4 h-4" />
                <span>Receipts</span>
              </TabsTrigger>
            </TabsList>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex-1">
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>
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
          </Tabs>
        </CardHeader>

        <CardContent>
          <TabsContent value="purchases" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  {item.image && (
                    <div className="relative">
                      <Image
                        src={item.image}
                        alt={item.content}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      {item.isLocked && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-red-500 text-white">${item.price}</Badge>
                        </div>
                      )}
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Image
                        src={item.creator.avatar}
                        alt={item.creator.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{item.creator.name}</p>
                        <p className="text-sm text-gray-600">@{item.creator.username}</p>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-2">{item.content}</p>
                    <p className="text-sm text-gray-500">Saved {formatDate(item.savedDate)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="liked" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {likedItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.content}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Image
                        src={item.creator.avatar}
                        alt={item.creator.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{item.creator.name}</p>
                        <p className="text-sm text-gray-600">@{item.creator.username}</p>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-2">{item.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Liked {formatDate(item.likedDate)}</span>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {watchHistory.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="relative">
                  <Image
                    src={item.thumbnail}
                    alt={item.content}
                    width={120}
                    height={80}
                    className="rounded object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-2">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Image
                      src={item.creator.avatar}
                      alt={item.creator.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.creator.name}</p>
                      <p className="text-sm text-gray-600">@{item.creator.username}</p>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-1">{item.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Watched {formatDate(item.watchedDate)}</span>
                    <span>{item.duration}</span>
                    <span>{item.progress}% complete</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="receipts" className="space-y-4">
            {purchaseHistory.map((purchase) => (
              <Card key={purchase.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Receipt #{purchase.receipt}</h3>
                    <p className="text-sm text-gray-600">{formatDate(purchase.date)}</p>
                  </div>
                  <Badge className={getStatusColor(purchase.status)}>
                    {purchase.status}
                  </Badge>
                </div>
                
                <div className="space-y-3">
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
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{purchase.item}</span>
                      <span className="font-semibold">${purchase.amount}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total</span>
                      <span>${purchase.amount}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipt
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
}
