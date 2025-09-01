'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Star, 
  Heart, 
  Eye, 
  MessageCircle, 
  Share2, 
  Lock, 
  Grid3X3, 
  List, 
  DollarSign,
  Gift,
  Send,
  Bookmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

// Types
interface Post {
  id: string;
  type: 'image' | 'gallery' | 'video';
  content: string;
  image?: string;
  images?: string[];
  likes: number;
  views: number;
  comments: number;
  timestamp: number;
  isLocked: boolean;
  price?: number;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
}

interface Creator {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  coverImage: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  earnings: number;
  isVerified: boolean;
  category: string;
  tags: string[];
  location: string;
  joinedDate: string;
  isSubscribed: boolean;
  subscriptionPlans: SubscriptionPlan[];
  postList: Post[];
}

// Mock creator data
const creatorData: Creator = {
  id: '1',
  username: 'sakura_chan',
  displayName: 'Sakura',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
  coverImage: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
  bio: 'Professional photographer capturing life\'s beautiful moments. Specializing in portrait, nature, and street photography. Based in Tokyo, Japan. 📸✨',
  followers: 45600,
  following: 234,
  posts: 234,
  earnings: 12500,
  isVerified: true,
  category: 'Photography',
  tags: ['portrait', 'nature', 'street', 'japan', 'tokyo'],
  location: 'Tokyo, Japan',
  joinedDate: '2022-03-15',
  isSubscribed: false,
  subscriptionPlans: [
    {
      id: '1',
      name: 'Basic',
      price: 9.99,
      period: 'monthly',
      description: 'Access to basic content and updates',
      features: ['Access to basic posts', 'Monthly Q&A', 'Behind-the-scenes content'],
      isPopular: false,
    },
    {
      id: '2',
      name: 'Premium',
      price: 19.99,
      period: 'monthly',
      description: 'Full access to all content and exclusive perks',
      features: ['All posts and content', 'Exclusive photoshoots', 'Direct messaging', 'Early access to content', 'Custom requests'],
      isPopular: true,
    },
    {
      id: '3',
      name: 'VIP',
      price: 49.99,
      period: 'monthly',
      description: 'Ultimate fan experience with personal interaction',
      features: ['Everything in Premium', 'Personal photo sessions', 'Video calls', 'Priority responses', 'Exclusive merchandise'],
      isPopular: false,
    },
  ],
  postList: [
    {
      id: '1',
      type: 'image',
      content: 'Just finished an amazing photoshoot in Shibuya! The cherry blossoms are in full bloom 🌸',
      image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 1234,
      views: 5678,
      comments: 89,
      timestamp: Date.now() - 1000 * 60 * 30,
      isLocked: false,
    },
    {
      id: '2',
      type: 'gallery',
      content: 'New collection: Urban Portraits 📸',
      images: [
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      likes: 892,
      views: 3456,
      comments: 67,
      timestamp: Date.now() - 1000 * 60 * 60 * 2,
      isLocked: true,
      price: 2.99,
    },
  ],
};

export function CreatorProfilePage({ username }: { username: string }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [tipAmount, setTipAmount] = useState(5);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const creator = creatorData; // In real app, fetch by username

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderPost = (post: Post) => {
    if (viewMode === 'grid') {
      return (
        <Card key={post.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
          <div className="relative">
            {post.type === 'image' && post.image && (
              <Image
                src={post.image}
                alt="Post content"
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
            )}
            {post.type === 'gallery' && post.images && (
              <div className="relative">
                <Image
                  src={post.images[0]}
                  alt="Post content"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {post.images.length} photos
                </div>
              </div>
            )}
            
            {post.isLocked && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <Lock className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-sm">${post.price}</div>
                </div>
              </div>
            )}
          </div>
          
          <CardContent className="p-3">
            <p className="text-sm text-gray-700 line-clamp-2">{post.content}</p>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>{formatTimeAgo(post.timestamp)}</span>
              <div className="flex items-center space-x-2">
                <Heart className="w-3 h-3" />
                <span>{post.likes}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    } else {
      return (
        <Card key={post.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                {post.type === 'image' && post.image && (
                  <Image
                    src={post.image}
                    alt="Post content"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover rounded"
                  />
                )}
                {post.type === 'gallery' && post.images && (
                  <Image
                    src={post.images[0]}
                    alt="Post content"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover rounded"
                  />
                )}
                
                {post.isLocked && (
                  <div className="absolute inset-0 bg-black/50 rounded flex items-center justify-center">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <p className="text-gray-800 mb-2">{post.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{formatTimeAgo(post.timestamp)}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-80">
        <Image
          src={creator.coverImage}
          alt={creator.displayName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Profile Info */}
      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Image
              src={creator.avatar}
              alt={creator.displayName}
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-white shadow-lg"
            />
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{creator.displayName}</h1>
                {creator.isVerified && (
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                )}
                <Badge variant="outline" className="text-purple-600 border-purple-600">
                  {creator.category}
                </Badge>
              </div>
              
              <p className="text-gray-600 mb-2">@{creator.username}</p>
              <p className="text-gray-700 mb-4">{creator.bio}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {creator.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                <span>📍 {creator.location}</span>
                <span>📅 Joined {formatDate(creator.joinedDate)}</span>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{creator.followers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{creator.following}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{creator.posts}</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">${creator.earnings.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Earnings</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                {creator.isSubscribed ? 'Subscribed' : 'Subscribe'}
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Gift className="w-4 h-4" />
                    <span>Tip</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send a Tip to {creator.displayName}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {[5, 10, 25, 50, 100, 200].map((amount) => (
                        <Button
                          key={amount}
                          variant={tipAmount === amount ? "default" : "outline"}
                          onClick={() => setTipAmount(amount)}
                          className="flex items-center space-x-2"
                        >
                          <DollarSign className="w-4 h-4" />
                          <span>{amount}</span>
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-600" />
                      <Input
                        type="number"
                        value={tipAmount}
                        onChange={(e) => setTipAmount(Number(e.target.value))}
                        placeholder="Custom amount"
                        min="1"
                      />
                    </div>
                    <Button className="w-full">Send Tip</Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="flex items-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Message</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Posts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Posts Library */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Posts</h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {creator.postList.map(renderPost)}
                </div>
              ) : (
                <div className="space-y-4">
                  {creator.postList.map(renderPost)}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Subscription Plans */}
          <div className="space-y-6">
            {/* Subscription Plans */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Subscription Plans</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {creator.subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      plan.isPopular 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    } ${selectedPlan === plan.id ? 'ring-2 ring-purple-500' : ''}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                      {plan.isPopular && (
                        <Badge className="bg-purple-600 text-white">Popular</Badge>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      ${plan.price}
                      <span className="text-sm font-normal text-gray-600">/{plan.period}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{plan.description}</p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Gift className="w-4 h-4 mr-2" />
                  Send Tip
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
