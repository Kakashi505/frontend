'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Eye, MessageCircle, Share2, Star, Search, TrendingUp, Camera, Music, Gamepad2, Palette, Utensils, Dumbbell, BookOpen, Car, Plane, Home, ShoppingBag, ChevronRight, ShoppingCart, Bookmark, Play, Crown, Lock, Megaphone, User } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Enhanced top videos data with myfans.jp features
const topVideos = [
  { 
    id: '1', 
    category: 'Popular', 
    title: 'Most Viewed Content', 
    views: '2.5M', 
    thumbnail: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator: 'sakura_chan',
    price: 980,
    isPremium: true,
    genre: 'Amateur',
    tags: ['popular', 'trending', 'viral']
  },
  { 
    id: '2', 
    category: 'New', 
    title: 'Latest Releases', 
    views: '890K', 
    thumbnail: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator: 'emma_art',
    price: 500,
    isPremium: false,
    genre: 'Beautiful Woman',
    tags: ['new', 'fresh', 'exclusive']
  },
  { 
    id: '3', 
    category: 'Most Attention', 
    title: 'Trending Now', 
    views: '1.2M', 
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator: 'alex_fitness',
    price: 750,
    isPremium: true,
    genre: 'Personal Filming',
    tags: ['trending', 'hot', 'attention']
  },
];

// Post library data
const postLibrary = [
  { id: '1', icon: ShoppingCart, label: 'Purchased', count: 12 },
  { id: '2', icon: Bookmark, label: 'Saved', count: 45 },
  { id: '3', icon: Heart, label: 'Liked', count: 89 },
  { id: '4', icon: Eye, label: 'Viewing History', count: 156 },
];

// Recommended genres data
const recommendedGenres = [
  { id: '1', name: 'Amateur', posts: 410177 },
  { id: '2', name: 'Married Woman', posts: 104474 },
  { id: '3', name: 'Pervert', posts: 83925 },
  { id: '4', name: 'Beautiful Woman', posts: 85989 },
  { id: '5', name: 'Personal Filming', posts: 147577 },
  { id: '6', name: 'Large Breasts', posts: 96852 },
  { id: '7', name: 'Home Video', posts: 72199 },
  { id: '8', name: 'Beautiful Breasts', posts: 80114 },
];

// Ranking posts data
const rankingPosts = [
  {
    id: '1',
    creator: {
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      handle: '@sakura_chan',
      displayName: 'Sakura',
      isSubscribed: true,
      planBadge: 'Premium'
    },
    media: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Spring Cherry Blossom Session',
    description: 'Beautiful spring photoshoot in the heart of Tokyo...',
    price: '¥100',
    likes: 1234,
    bookmarks: 89,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: '2',
    creator: {
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      handle: '@alex_fitness',
      displayName: 'Alex Cooper',
      isSubscribed: false,
      planBadge: null
    },
    media: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Advanced Workout Routine',
    description: 'Complete full-body workout for advanced fitness...',
    price: 'Free',
    likes: 892,
    bookmarks: 67,
    isLiked: true,
    isBookmarked: false
  },
  {
    id: '3',
    creator: {
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
      handle: '@emma_art',
      displayName: 'Emma Rodriguez',
      isSubscribed: true,
      planBadge: 'VIP'
    },
    media: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Digital Art Masterclass',
    description: 'Learn advanced digital painting techniques...',
    price: 'Plan only',
    likes: 567,
    bookmarks: 34,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: '4',
    creator: {
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      handle: '@mike_music',
      displayName: 'Mike Johnson',
      isSubscribed: false,
      planBadge: null
    },
    media: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Acoustic Guitar Cover',
    description: 'Beautiful acoustic rendition of classic songs...',
    price: '¥50',
    likes: 2341,
    bookmarks: 156,
    isLiked: true,
    isBookmarked: false
  }
];

// Trending creators data
const trendingCreators = [
  {
    id: '1',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    displayName: 'Sakura',
    briefStats: { followers: '45.6K', posts: 234, category: 'Photography' }
  },
  {
    id: '2',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    displayName: 'Alex Cooper',
    briefStats: { followers: '32.1K', posts: 189, category: 'Fitness' }
  },
  {
    id: '3',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    displayName: 'Emma Rodriguez',
    briefStats: { followers: '28.9K', posts: 156, category: 'Art' }
  },
  {
    id: '4',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    displayName: 'Mike Johnson',
    briefStats: { followers: '52.3K', posts: 312, category: 'Music' }
  }
];

// Featured posts data
const featuredPosts = [
  {
    id: '1',
    creator: trendingCreators[0],
    content: 'Just finished an amazing photoshoot in Shibuya! The cherry blossoms are in full bloom 🌸 #photography #japan #spring',
    image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 1234,
    views: 5678,
    comments: 89,
    timestamp: Date.now() - 1000 * 60 * 30,
    category: 'Photography',
  },
  {
    id: '2',
    creator: trendingCreators[1],
    content: 'New workout routine dropping tomorrow! Who\'s ready to get stronger? 💪 #fitness #workout #motivation',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 892,
    views: 3456,
    comments: 67,
    timestamp: Date.now() - 1000 * 60 * 60,
    category: 'Fitness',
  },
  {
    id: '3',
    creator: trendingCreators[2],
    content: 'Working on a new digital art piece inspired by cyberpunk aesthetics ✨ #art #digitalart #cyberpunk',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 567,
    views: 2134,
    comments: 34,
    timestamp: Date.now() - 1000 * 60 * 120,
    category: 'Art',
  },
  {
    id: '4',
    creator: trendingCreators[3],
    content: 'New acoustic cover of "Bohemian Rhapsody" - hope you like it! 🎸 #music #cover #acoustic',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 2341,
    views: 8923,
    comments: 156,
    timestamp: Date.now() - 1000 * 60 * 45,
    category: 'Music',
  },
];

export function HomePage() {
  const { t } = useI18n();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);

  const tabs = ['All', 'Popular', 'Premium', 'Live'];

  const toggleLike = (postId: string) => {
    setLikedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleBookmark = (postId: string) => {
    setBookmarkedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Search & CTA */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to <span className="text-yellow-300">Only-U</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Connect with your favorite creators and discover exclusive content
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search creators, content, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-4 text-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/70 focus:border-white focus:bg-white/20 focus:ring-white/20"
                />
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                Start Exploring
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold">
                Become Creator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Videos Carousel */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Top Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {video.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">
                        {video.views}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Post Library */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Post Library</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {postLibrary.map((item) => (
              <div key={item.id} className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl mx-auto mb-3 flex items-center justify-center shadow-md">
                  <item.icon className="w-8 h-8 text-pink-500" />
                </div>
                <div className="text-sm text-gray-700 mb-1">{item.label}</div>
                <div className="text-lg font-bold text-gray-900">{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Genres */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Recommended Genres</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedGenres.map((genre) => (
              <Card key={genre.id} className="p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{genre.name}</p>
                    <p className="text-sm text-gray-600">{genre.posts.toLocaleString()} posts</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center pt-8">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg">
              See more genres <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Ranking Section */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Ranking</h2>
          
          {/* Tabs */}
          <div className="flex justify-center space-x-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Post Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rankingPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
                <CardContent className="p-0">
                  {/* Creator Info */}
                  <div className="p-4 pb-2">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 text-sm">👤</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">{post.creator.displayName}</p>
                          {post.creator.planBadge && (
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              post.creator.planBadge === 'Premium' 
                                ? 'bg-pink-500 text-white'
                                : 'bg-purple-500 text-white'
                            }`}>
                              {post.creator.planBadge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">{post.creator.handle}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Media Thumbnail */}
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-lg">📷</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        post.price === 'Free' 
                          ? 'bg-green-500 text-white' 
                          : post.price === 'Plan only'
                          ? 'bg-purple-500 text-white'
                          : 'bg-pink-500 text-white'
                      }`}>
                        {post.price}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 overflow-hidden text-ellipsis whitespace-nowrap">{post.description}</p>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center space-x-1 ${
                          post.isLiked ? 'text-red-500' : 'text-gray-600'
                        } hover:text-red-500`}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-xs">{post.likes}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(post.id)}
                        className={`flex items-center space-x-1 ${
                          post.isBookmarked ? 'text-blue-500' : 'text-gray-600'
                        } hover:text-blue-500`}
                      >
                        <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                        <span className="text-xs">{post.bookmarks}</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-500">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Creators Carousel */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Trending Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCreators.map((creator) => (
              <Card key={creator.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center bg-white">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-gray-500 text-2xl">👤</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{creator.displayName}</h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <p>{creator.briefStats.followers} followers</p>
                    <p>{creator.briefStats.posts} posts</p>
                    <p className="text-pink-500 font-medium">{creator.briefStats.category}</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 rounded-lg">
                    Follow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Premium Access Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="max-w-6xl mx-auto text-center text-white">
          <div className="flex items-center justify-center mb-6">
            <Crown className="w-12 h-12 mr-3" />
            <h2 className="text-3xl font-bold">Premium Access</h2>
          </div>
          <p className="text-xl mb-8">Unlock exclusive content and get access to all premium features with our flexible subscription plans.</p>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Exclusive Content</h3>
              <p className="text-white/80">Access to premium videos, photos, and behind-the-scenes content</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">High Quality</h3>
              <p className="text-white/80">4K Ultra HD videos and high-resolution photos</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Direct Messages</h3>
              <p className="text-white/80">Connect directly with your favorite creators</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold">
              View Plans
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-white/70">
            <p>7-day free trial • Cancel anytime • Secure payment with credit cards and Paidy</p>
          </div>
        </div>
      </section>

      {/* Creators Section */}
      <section className="px-4 py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Creators</h2>
          <div className="space-y-3">
            {trendingCreators.map((creator) => (
              <Card key={creator.id} className="overflow-hidden hover:shadow-md transition-all duration-300 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 text-sm">👤</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 mb-1 overflow-hidden text-ellipsis whitespace-nowrap">{creator.displayName}</h3>
                      <p className="text-xs text-gray-500 mb-1">{creator.briefStats.category}</p>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span>{creator.briefStats.followers} followers</span>
                        <span>{creator.briefStats.posts} posts</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 text-sm">
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
