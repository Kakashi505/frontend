'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Upload, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Settings,
  Plus,
  Edit,
  Trash2,
  Download,
  BarChart3,
  CreditCard,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Globe,
  Target,
  Zap,
  Crown,
  Star,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  Filter,
  Search,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data for creator dashboard
const creatorStats = {
  totalSubscribers: 1247,
  monthlyRevenue: 125000,
  totalViews: 1250000,
  totalLikes: 89000,
  totalComments: 12000,
  monthlyGrowth: 15.5,
  conversionRate: 8.2,
  averageEngagement: 12.4
};

const recentSubscribers = [
  {
    id: '1',
    username: 'fan_001',
    displayName: 'Alex Johnson',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    plan: 'Premium',
    amount: 980,
    joinedDate: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    username: 'fan_002',
    displayName: 'Sarah Wilson',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    plan: 'VIP',
    amount: 2980,
    joinedDate: '2024-01-14',
    status: 'active'
  },
  {
    id: '3',
    username: 'fan_003',
    displayName: 'Mike Chen',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    plan: 'Basic',
    amount: 480,
    joinedDate: '2024-01-13',
    status: 'active'
  }
];

const uploadQueue = [
  {
    id: '1',
    type: 'video',
    title: 'Morning workout routine',
    thumbnail: 'https://images.pexels.com/photos/4056530/pexels-photo-4056530.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: '125MB',
    duration: '15:30',
    status: 'processing',
    uploadDate: '2024-01-15 10:30',
    progress: 75
  },
  {
    id: '2',
    type: 'image',
    title: 'Sunset photography collection',
    thumbnail: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: '45MB',
    status: 'completed',
    uploadDate: '2024-01-15 09:15',
    progress: 100
  },
  {
    id: '3',
    type: 'video',
    title: 'Cooking tutorial: Japanese curry',
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: '89MB',
    duration: '22:45',
    status: 'queued',
    uploadDate: '2024-01-15 11:00',
    progress: 0
  }
];

const payoutHistory = [
  {
    id: '1',
    amount: 125000,
    status: 'completed',
    date: '2024-01-10',
    method: 'Bank Transfer',
    reference: 'PAY-001-2024',
    fees: 6250,
    netAmount: 118750
  },
  {
    id: '2',
    amount: 98000,
    status: 'pending',
    date: '2024-01-15',
    method: 'Bank Transfer',
    reference: 'PAY-002-2024',
    fees: 4900,
    netAmount: 93100
  },
  {
    id: '3',
    amount: 156000,
    status: 'completed',
    date: '2023-12-25',
    method: 'Bank Transfer',
    reference: 'PAY-003-2023',
    fees: 7800,
    netAmount: 148200
  }
];

const subscriptionPlans = [
  {
    id: '1',
    name: 'Basic',
    price: 480,
    period: 'monthly',
    description: 'Access to basic content and updates',
    features: ['Access to basic posts', 'Monthly Q&A', 'Behind-the-scenes content'],
    isActive: true,
    subscribers: 456,
    revenue: 218880
  },
  {
    id: '2',
    name: 'Premium',
    price: 980,
    period: 'monthly',
    description: 'Full access to all content and exclusive perks',
    features: ['All posts and content', 'Exclusive photoshoots', 'Direct messaging', 'Early access to content', 'Custom requests'],
    isActive: true,
    subscribers: 623,
    revenue: 610540
  },
  {
    id: '3',
    name: 'VIP',
    price: 2980,
    period: 'monthly',
    description: 'Ultimate fan experience with personal interaction',
    features: ['Everything in Premium', 'Personal photo sessions', 'Video calls', 'Priority responses', 'Exclusive merchandise'],
    isActive: true,
    subscribers: 168,
    revenue: 500640
  }
];

const scheduledPosts = [
  {
    id: '1',
    type: 'video',
    title: 'Weekend adventure vlog',
    thumbnail: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
    scheduledDate: '2024-01-20 18:00',
    status: 'scheduled',
    visibility: 'Premium',
    category: 'Lifestyle'
  },
  {
    id: '2',
    type: 'image',
    title: 'New collection preview',
    thumbnail: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
    scheduledDate: '2024-01-22 12:00',
    status: 'scheduled',
    visibility: 'VIP',
    category: 'Fashion'
  },
  {
    id: '3',
    type: 'video',
    title: 'Q&A session with fans',
    thumbnail: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800',
    scheduledDate: '2024-01-25 20:00',
    status: 'draft',
    visibility: 'All',
    category: 'Community'
  }
];

export function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showPlanDialog, setShowPlanDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'queued': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'draft': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Creator Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your content and grow your audience</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" onClick={() => setShowUploadDialog(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Content
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900">{creatorStats.totalSubscribers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+{creatorStats.monthlyGrowth}% this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(creatorStats.monthlyRevenue)}</p>
                  <p className="text-xs text-green-600">+12.5% vs last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{creatorStats.totalViews.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+8.2% this week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-pink-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Engagement Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{creatorStats.averageEngagement}%</p>
                  <p className="text-xs text-green-600">+2.1% vs last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Subscribers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Subscribers</span>
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSubscribers.map((subscriber) => (
                      <div key={subscriber.id} className="flex items-center space-x-3">
                        <div className="relative w-10 h-10">
                          <Image
                            src={subscriber.avatar}
                            alt={subscriber.displayName}
                            fill
                            className="rounded-full object-cover"
                            sizes="(max-width: 425px) 32px,
                                   (max-width: 768px) 40px,
                                   (max-width: 1024px) 48px,
                                   (max-width: 1440px) 56px,
                                   (max-width: 1600px) 64px,
                                   72px"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{subscriber.displayName}</p>
                          <p className="text-sm text-gray-600">@{subscriber.username}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{subscriber.plan}</Badge>
                          <p className="text-sm font-medium text-gray-900">{formatCurrency(subscriber.amount)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setShowUploadDialog(true)}
                    >
                      <Upload className="w-6 h-6 mb-2" />
                      <span className="text-sm">Upload Content</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setShowPlanDialog(true)}
                    >
                      <Plus className="w-6 h-6 mb-2" />
                      <span className="text-sm">Create Plan</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setShowScheduleDialog(true)}
                    >
                      <Calendar className="w-6 h-6 mb-2" />
                      <span className="text-sm">Schedule Post</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                    >
                      <BarChart3 className="w-6 h-6 mb-2" />
                      <span className="text-sm">View Analytics</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Upload Manager</span>
                  <Button onClick={() => setShowUploadDialog(true)}>
                    <Upload className="w-4 h-4 mr-2" />
                    New Upload
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadQueue.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(item.type)}
                        <div className="relative aspect-video w-15 h-10">
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            className="rounded object-cover"
                            sizes="(max-width: 425px) 100px,
                                   (max-width: 768px) 140px,
                                   (max-width: 1024px) 180px,
                                   (max-width: 1440px) 220px,
                                   (max-width: 1600px) 260px,
                                   300px"
                          />
                          {item.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-black/50 rounded-full p-1">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{item.size}</span>
                          {item.duration && <span>{item.duration}</span>}
                          <span>{item.uploadDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        {item.status === 'processing' && (
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        )}
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Engagement Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Views per Post</span>
                      <span className="font-medium">12,450</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Likes per Post</span>
                      <span className="font-medium">890</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Comments per Post</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Share Rate</span>
                      <span className="font-medium">4.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Subscriber Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center bg-gray-50 rounded">
                    <div className="text-center text-gray-500">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                      <p>Growth chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscriber Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search subscribers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {recentSubscribers.map((subscriber) => (
                    <div key={subscriber.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12">
                          <Image
                            src={subscriber.avatar}
                            alt={subscriber.displayName}
                            fill
                            className="rounded-full object-cover"
                            sizes="(max-width: 425px) 32px,
                                   (max-width: 768px) 40px,
                                   (max-width: 1024px) 48px,
                                   (max-width: 1440px) 56px,
                                   (max-width: 1600px) 64px,
                                   72px"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{subscriber.displayName}</p>
                          <p className="text-sm text-gray-600">@{subscriber.username}</p>
                          <p className="text-xs text-gray-500">Joined {formatDate(subscriber.joinedDate)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">{subscriber.plan}</Badge>
                        <span className="font-medium text-gray-900">{formatCurrency(subscriber.amount)}</span>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Subscription Plans */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Subscription Plans</span>
                    <Button size="sm" onClick={() => setShowPlanDialog(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      New Plan
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subscriptionPlans.map((plan) => (
                      <div key={plan.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{plan.name}</h3>
                          <Badge variant="outline">{formatCurrency(plan.price)}/month</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{plan.subscribers} subscribers</span>
                          <span className="font-medium">{formatCurrency(plan.revenue)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payout History */}
              <Card>
                <CardHeader>
                  <CardTitle>Payout History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payoutHistory.map((payout) => (
                      <div key={payout.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{formatCurrency(payout.amount)}</p>
                            <p className="text-sm text-gray-600">{payout.reference}</p>
                          </div>
                          <Badge className={getStatusColor(payout.status)}>
                            {payout.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{formatDate(payout.date)}</span>
                          <span>Net: {formatCurrency(payout.netAmount)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Post Schedule</span>
                  <Button onClick={() => setShowScheduleDialog(true)}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Post
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledPosts.map((post) => (
                    <div key={post.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(post.type)}
                        <div className="relative aspect-video w-20 h-15">
                          <Image
                            src={post.thumbnail}
                            alt={post.title}
                            fill
                            className="rounded object-cover"
                            sizes="(max-width: 425px) 100px,
                                   (max-width: 768px) 140px,
                                   (max-width: 1024px) 180px,
                                   (max-width: 1440px) 220px,
                                   (max-width: 1600px) 260px,
                                   300px"
                          />
                          {post.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-black/50 rounded-full p-1">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{post.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{post.category}</span>
                          <span>{post.visibility}</span>
                          <span>{post.scheduledDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload New Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="text">Text Post</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <Input placeholder="Enter content title" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea placeholder="Enter content description" rows={3} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="subscribers">Subscribers Only</SelectItem>
                    <SelectItem value="premium">Premium Only</SelectItem>
                    <SelectItem value="vip">VIP Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload Content
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Plan Creation Dialog */}
      <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Subscription Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name</label>
              <Input placeholder="e.g., Premium, VIP, Basic" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (JPY)</label>
                <Input placeholder="980" type="number" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billing Period</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea placeholder="Describe what subscribers get with this plan" rows={3} />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowPlanDialog(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Plan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Post Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
              <Input placeholder="Enter post title" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <Textarea placeholder="Enter post content" rows={4} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Date</label>
                <Input type="datetime-local" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="subscribers">Subscribers Only</SelectItem>
                    <SelectItem value="premium">Premium Only</SelectItem>
                    <SelectItem value="vip">VIP Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
                Cancel
              </Button>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
