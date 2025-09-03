'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Heart, Eye, MessageCircle, Share2, Star, Search, TrendingUp, Camera, Music, Gamepad2, Palette, Utensils, Dumbbell, BookOpen, Car, Plane, Home, ShoppingBag, ChevronRight, ShoppingCart, Bookmark, Play, Crown, Lock, Megaphone, User, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Custom CSS animations for the hero section
const heroStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
  }
  
  .animate-fade-in-delay {
    animation: fadeIn 0.8s ease-out 0.2s forwards;
    opacity: 0;
  }
  
  .animate-fade-in-delay-2 {
    animation: fadeIn 0.8s ease-out 0.4s forwards;
    opacity: 0;
  }
  
  .animate-fade-in-delay-3 {
    animation: fadeIn 0.8s ease-out 0.6s forwards;
    opacity: 0;
  }
`;

// Enhanced top videos data with OnlyU.jp features
const topVideos = [
  { 
    id: '1', 
    category: '人気', 
    title: '最も視聴されたコンテンツ', 
    views: '2.5M', 
    thumbnail: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator: 'sakura_chan',
    price: 980,
    isPremium: true,
    genre: 'アマチュア',
    tags: ['人気', 'トレンド', 'バイラル']
  },
  { 
    id: '2', 
    category: '新着', 
    title: '最新リリース', 
    views: '890K', 
    thumbnail: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator: 'emma_art',
    price: 500,
    isPremium: false,
    genre: '美女',
    tags: ['新着', 'フレッシュ', 'エクスクルーシブ']
  },
  { 
    id: '3', 
    category: '注目', 
    title: '今話題', 
    views: '1.2M', 
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator: 'alex_fitness',
    price: 750,
    isPremium: true,
    genre: '個人撮影',
    tags: ['トレンド', 'ホット', '注目']
  },
];

// Post library data
const postLibrary = [
  { id: '1', icon: ShoppingCart, label: 'Purchased', count: 12, description: 'Your bought content' },
  { id: '2', icon: Bookmark, label: 'Saved', count: 45, description: 'Bookmarked posts' },
  { id: '3', icon: Heart, label: 'Liked', count: 89, description: 'Posts you loved' },
  { id: '4', icon: Eye, label: 'History', count: 156, description: 'Recently viewed' },
];

// Recommended genres data
const recommendedGenres = [
  { id: '1', name: 'アマチュア', posts: 410177 },
  { id: '2', name: '人妻', posts: 104474 },
  { id: '3', name: '変態', posts: 83925 },
  { id: '4', name: '美女', posts: 85989 },
  { id: '5', name: '個人撮影', posts: 147577 },
  { id: '6', name: '巨乳', posts: 96852 },
  { id: '7', name: 'ホームビデオ', posts: 72199 },
  { id: '8', name: '美乳', posts: 80114 },
];

// Ranking posts data
const rankingPosts = [
  {
    id: '1',
    creator: {
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
      handle: '@sakura_chan',
      displayName: 'Sakura',
      isSubscribed: true,
      planBadge: 'Premium'
    },
    media: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Spring Cherry Blossom Session',
    description: 'Beautiful spring photography session in the heart of Tokyo...',
    price: '$10',
    likes: 1234,
    bookmarks: 89,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: '2',
    creator: {
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
      handle: '@alex_fitness',
      displayName: 'Alex Cooper',
      isSubscribed: false,
      planBadge: null
    },
    media: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Advanced Workout Routine',
    description: 'Complete full-body workout for advanced fitness enthusiasts...',
    price: 'Free',
    likes: 892,
    bookmarks: 67,
    isLiked: true,
    isBookmarked: false
  },
  {
    id: '3',
    creator: {
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
      handle: '@emma_art',
      displayName: 'Emma Rodriguez',
      isSubscribed: true,
      planBadge: 'VIP'
    },
    media: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Digital Art Masterclass',
    description: 'Learn advanced digital painting techniques and creative workflows...',
    price: 'Plan Only',
    likes: 567,
    bookmarks: 34,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: '4',
    creator: {
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
      handle: '@mike_music',
      displayName: 'Mike Johnson',
      isSubscribed: false,
      planBadge: null
    },
    media: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Acoustic Guitar Covers',
    description: 'Beautiful acoustic renditions of classic songs with detailed tutorials...',
    price: '$5',
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
    briefStats: { followers: '45.6K', posts: 234, category: '写真' }
  },
  {
    id: '2',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    displayName: 'アレックス・クーパー',
    briefStats: { followers: '32.1K', posts: 189, category: 'フィットネス' }
  },
  {
    id: '3',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    displayName: 'エマ・ロドリゲス',
    briefStats: { followers: '28.9K', posts: 156, category: 'アート' }
  },
  {
    id: '4',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    displayName: 'マイク・ジョンソン',
    briefStats: { followers: '52.3K', posts: 312, category: '音楽' }
  }
];

// Featured posts data
const featuredPosts = [
  {
    id: '1',
    creator: trendingCreators[0],
    content: '渋谷で素晴らしい写真撮影が完了しました！桜が満開です 🌸 #写真 #日本 #春',
    image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 1234,
    views: 5678,
    comments: 89,
    timestamp: Date.now() - 1000 * 60 * 30,
    category: '写真',
  },
  {
    id: '2',
    creator: trendingCreators[1],
    content: '明日新しいワークアウトルーティンを公開します！強くなりたい人はいますか？💪 #フィットネス #ワークアウト #モチベーション',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 892,
    views: 3456,
    comments: 67,
    timestamp: Date.now() - 1000 * 60 * 60,
    category: 'フィットネス',
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
  const router = useRouter();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentVideoSlide, setCurrentVideoSlide] = useState(0);
  const [currentCreatorSlide, setCurrentCreatorSlide] = useState(0);
  const [currentLibrarySlide, setCurrentLibrarySlide] = useState(0);

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

  const handleStartExploring = () => {
    router.push('/explore');
  };

  return (
    <>
      <style jsx>{heroStyles}</style>
      <div className="min-h-screen bg-white">
      {/* Hero Section with Search & CTA */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 text-white py-16 px-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h1 
              className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => router.push('/')}
            >
              Welcome to <span className="text-yellow-300 drop-shadow-lg">Only-U</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-delay">
              Connect with your favorite creators and discover exclusive content
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 animate-fade-in-delay-2">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 group-focus-within:text-purple-300 transition-colors duration-200" />
                <Input
                  type="text"
                  placeholder="Search creators, content, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-4 text-lg border-2 border-white/30 bg-white/20 text-white placeholder-white/60 focus:border-white/50 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-white/20 rounded-xl backdrop-blur-sm transition-all duration-200 hover:bg-white/25"
                />
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 active:bg-gray-200 px-8 py-3 text-lg font-semibold cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 rounded-xl border-0"
                onClick={handleStartExploring}
              >
                Start Exploring
              </Button>
              <Button 
                size="lg" 
                className="bg-transparent text-white border-2 border-white/50 hover:bg-white/10 hover:border-white px-8 py-3 text-lg font-semibold cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 rounded-xl backdrop-blur-sm"
              >
                Become Creator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Videos Section */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Top Videos</h2>
          
          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
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

          {/* Mobile: Slideshow */}
          <div className="md:hidden">
            <div className="relative">
              {/* Slideshow Container */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentVideoSlide * 100}%)` }}
                >
                  {topVideos.map((video) => (
                    <div key={video.id} className="w-full flex-shrink-0 px-2">
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
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
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentVideoSlide(prev => prev === 0 ? topVideos.length - 1 : prev - 1)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
                aria-label="Previous video"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentVideoSlide(prev => prev === topVideos.length - 1 ? 0 : prev + 1)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
                aria-label="Next video"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-4">
                {topVideos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentVideoSlide ? 'bg-pink-500 w-6' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to video ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post Library Section */}
      <section className="px-4 py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Post Library</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Access all your favorite content, saved posts, and viewing history in one place</p>
          </div>
          
          {/* Desktop: Enhanced Grid Layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-8">
            {postLibrary.map((item) => (
              <div key={item.id} className="group">
                <div className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg">
                  {/* Icon Container */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    {/* Floating Count Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs font-bold">{item.count}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    {item.label}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                  
                  {/* Action Button */}
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    View All
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Beautiful Slideshow */}
          <div className="md:hidden">
            <div className="relative">
              {/* Slideshow Container */}
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentLibrarySlide * 100}%)` }}
                >
                  {postLibrary.map((item) => (
                    <div key={item.id} className="w-full flex-shrink-0 px-3">
                      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Hero Section */}
                        <div className="relative bg-gradient-to-br from-purple-500 to-pink-600 p-6 text-center text-white">
                          {/* Decorative Elements */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-3 left-3 w-16 h-16 border-2 border-white rounded-full"></div>
                            <div className="absolute bottom-3 right-3 w-12 h-12 border border-white rounded-full"></div>
                          </div>
                          
                          {/* Icon */}
                          <div className="relative mx-auto mb-4">
                            <div className="w-20 h-20 rounded-full p-3 bg-white/20 backdrop-blur-sm mx-auto">
                              <item.icon className="w-full h-full text-white" />
                            </div>
                            {/* Count Badge */}
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-purple-600 text-xs font-bold">{item.count}</span>
                            </div>
                          </div>
                          
                          {/* Label */}
                          <h3 className="text-xl font-bold mb-2">{item.label}</h3>
                          <p className="text-sm opacity-90">{item.description}</p>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6">
                          {/* Stats */}
                          <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-gray-900 mb-2">{item.count}</div>
                            <div className="text-sm text-gray-600">Items Available</div>
                          </div>
                          
                          {/* Action Button */}
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                            Browse {item.label}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentLibrarySlide(prev => prev === 0 ? postLibrary.length - 1 : prev - 1)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-3 rounded-full shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 border border-purple-100"
                aria-label="Previous library item"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentLibrarySlide(prev => prev === postLibrary.length - 1 ? 0 : prev + 1)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-3 rounded-full shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 border border-purple-100"
                aria-label="Next library item"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-6">
                {postLibrary.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentLibrarySlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentLibrarySlide 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-6 shadow-md' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to library item ${index + 1}`}
                  />
                ))}
              </div>
            </div>
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
          
          {/* Desktop: Post Cards Grid - Two Columns */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            {rankingPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
                <CardContent className="p-0">
                  {/* Creator Info */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center space-x-4 mb-3">
                      <img 
                        src={post.creator.avatar} 
                        alt={post.creator.displayName}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-lg text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">{post.creator.displayName}</p>
                          {post.creator.planBadge && (
                            <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                              post.creator.planBadge === 'Premium' 
                                ? 'bg-pink-500 text-white'
                                : 'bg-purple-500 text-white'
                            }`}>
                              {post.creator.planBadge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">{post.creator.handle}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Media Thumbnail */}
                  <div className="relative">
                    <img 
                      src={post.media} 
                      alt={post.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                        post.price === 'Free' 
                          ? 'bg-green-500 text-white' 
                          : post.price === 'Plan Only'
                          ? 'bg-purple-500 text-white'
                          : 'bg-pink-500 text-white'
                      }`}>
                        {post.price}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 overflow-hidden text-ellipsis whitespace-nowrap">{post.title}</h3>
                    <p className="text-base text-gray-600 mb-4 overflow-hidden text-ellipsis whitespace-nowrap">{post.description}</p>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center space-x-2 ${
                          post.isLiked ? 'text-red-500' : 'text-gray-600'
                        } hover:text-red-500`}
                      >
                        <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(post.id)}
                        className={`flex items-center space-x-2 ${
                          post.isBookmarked ? 'text-blue-500' : 'text-gray-600'
                        } hover:text-blue-500`}
                      >
                        <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{post.bookmarks}</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-500">
                        <MessageCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile: Slideshow of Ranking Posts */}
          <div className="md:hidden">
            <div className="relative">
              {/* Slideshow Container */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {rankingPosts.map((post) => (
                    <div key={post.id} className="w-full flex-shrink-0 px-2">
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
                        <CardContent className="p-0">
                          {/* Creator Info */}
                          <div className="p-4 pb-2">
                            <div className="flex items-center space-x-3 mb-2">
                              <img 
                                src={post.creator.avatar} 
                                alt={post.creator.displayName}
                                className="w-10 h-10 rounded-full object-cover"
                              />
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
                            <img 
                              src={post.media} 
                              alt={post.title}
                              className="w-full h-40 object-cover"
                            />
                            <div className="absolute top-3 right-3">
                              <span className={`text-xs px-2 py-1 rounded font-medium ${
                                post.price === 'Free' 
                                  ? 'bg-green-500 text-white' 
                                  : post.price === 'Plan Only'
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
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentSlide(prev => prev === 0 ? rankingPosts.length - 1 : prev - 1)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
                aria-label="Previous post"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentSlide(prev => prev === rankingPosts.length - 1 ? 0 : prev + 1)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
                aria-label="Next post"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-4">
                {rankingPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentSlide ? 'bg-pink-500 w-6' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Creators Section */}
      <section className="px-4 py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Creators</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover and connect with the most popular creators on our platform</p>
          </div>
          
          {/* Desktop: Enhanced Grid Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingCreators.map((creator) => (
              <Card key={creator.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 text-center bg-white border-0 shadow-lg">
                <CardContent className="p-0">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Avatar Section */}
                  <div className="relative p-8 pb-6">
                    <div className="relative mx-auto mb-4">
                      <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-500">
                        <img 
                          src={creator.avatar} 
                          alt={creator.displayName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      {/* Online Status Indicator */}
                      <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                    
                    {/* Creator Name */}
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                      {creator.displayName}
                    </h3>
                    
                    {/* Category Badge */}
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full shadow-md">
                      {creator.briefStats.category}
                    </span>
                  </div>
                  
                  {/* Stats Section */}
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded-lg group-hover:bg-purple-50 transition-colors duration-300">
                        <div className="text-2xl font-bold text-gray-900">{creator.briefStats.followers}</div>
                        <div className="text-xs text-gray-600 uppercase tracking-wide">Followers</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg group-hover:bg-pink-50 transition-colors duration-300">
                        <div className="text-2xl font-bold text-gray-900">{creator.briefStats.posts}</div>
                        <div className="text-xs text-gray-600 uppercase tracking-wide">Posts</div>
                      </div>
                    </div>
                    
                    {/* Follow Button */}
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <User className="w-4 h-4 mr-2" />
                      Follow Creator
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile: Compact Slideshow */}
          <div className="md:hidden">
            <div className="relative">
              {/* Slideshow Container */}
              <div className="overflow-hidden rounded-xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentCreatorSlide * 100}%)` }}
                >
                  {trendingCreators.map((creator) => (
                    <div key={creator.id} className="w-full flex-shrink-0 px-3">
                      <Card className="overflow-hidden bg-white border-0 shadow-lg">
                        <CardContent className="p-0">
                          {/* Compact Hero Section */}
                          <div className="relative bg-gradient-to-br from-purple-500 to-pink-600 p-4 text-center text-white">
                            {/* Avatar */}
                            <div className="relative mx-auto mb-3">
                              <div className="w-16 h-16 rounded-full p-1 bg-white/20 backdrop-blur-sm mx-auto">
                                <img 
                                  src={creator.avatar} 
                                  alt={creator.displayName}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              </div>
                              {/* Online Status */}
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                            </div>
                            
                            {/* Creator Info */}
                            <h3 className="text-lg font-bold mb-2 truncate px-2">{creator.displayName}</h3>
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30 truncate max-w-full">
                              {creator.briefStats.category}
                            </span>
                          </div>
                          
                          {/* Compact Stats and Actions */}
                          <div className="p-4">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="text-center p-3 bg-purple-50 rounded-lg">
                                <div className="text-lg font-bold text-purple-600 truncate">{creator.briefStats.followers}</div>
                                <div className="text-xs text-purple-500 uppercase tracking-wide font-medium">Followers</div>
                              </div>
                              <div className="text-center p-3 bg-pink-50 rounded-lg">
                                <div className="text-lg font-bold text-pink-600 truncate">{creator.briefStats.posts}</div>
                                <div className="text-xs text-pink-500 uppercase tracking-wide font-medium">Posts</div>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="space-y-2">
                              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm">
                                <User className="w-3 h-3 mr-2" />
                                Follow
                              </Button>
                              <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 font-medium py-2 rounded-lg transition-all duration-300 text-sm">
                                <MessageCircle className="w-3 h-3 mr-2" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentCreatorSlide(prev => prev === 0 ? trendingCreators.length - 1 : prev - 1)}
                className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 border border-purple-100"
                aria-label="Previous creator"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentCreatorSlide(prev => prev === trendingCreators.length - 1 ? 0 : prev + 1)}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 border border-purple-100"
                aria-label="Next creator"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Compact Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-4">
                {trendingCreators.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCreatorSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentCreatorSlide 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-6 shadow-md' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to creator ${index + 1}`}
                  />
                ))}
              </div>
            </div>
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
              <p className="text-white/80">Access to exclusive photos and videos from your favorite creators</p>
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
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-200 px-8 py-3 text-lg font-semibold">
              View Plans
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-white/70">
            <p>7-day free trial • Cancel anytime • Secure payment with credit cards and Paidy</p>
          </div>
        </div>
      </section>

      {/* Creators Section */}
      <section className="px-4 py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Discover Creators</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Connect with amazing creators and explore their exclusive content</p>
          </div>
          
          {/* Desktop: Enhanced List Layout */}
          <div className="hidden md:block">
            <div className="space-y-4">
              {trendingCreators.map((creator) => (
                <Card key={creator.id} className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-white border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Enhanced Avatar */}
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
                          <img 
                            src={creator.avatar} 
                            alt={creator.displayName}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        {/* Online Status */}
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                      </div>
                      
                      {/* Creator Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                            {creator.displayName}
                          </h3>
                          <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-medium rounded-full border border-purple-200">
                            {creator.briefStats.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-purple-500" />
                            <span className="font-medium">{creator.briefStats.followers} followers</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Camera className="w-4 h-4 text-pink-500" />
                            <span className="font-medium">{creator.briefStats.posts} posts</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Action Buttons */}
                      <div className="flex items-center space-x-3">
                        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          <User className="w-4 h-4 mr-2" />
                          Follow
                        </Button>
                        <Button variant="outline" size="lg" className="border-purple-200 text-purple-600 hover:bg-purple-50 font-medium px-4 py-2 rounded-xl transition-all duration-300">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mobile: Beautiful Slideshow */}
          <div className="md:hidden">
            <div className="relative">
              {/* Slideshow Container */}
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentCreatorSlide * 100}%)` }}
                >
                  {trendingCreators.map((creator) => (
                    <div key={creator.id} className="w-full flex-shrink-0 px-3">
                      <Card className="overflow-hidden bg-white border-0 shadow-xl">
                        <CardContent className="p-0">
                          {/* Hero Section */}
                          <div className="relative bg-gradient-to-br from-purple-500 to-pink-600 p-6 text-center text-white">
                            {/* Decorative Elements */}
                            <div className="absolute inset-0 opacity-10">
                              <div className="absolute top-3 left-3 w-16 h-16 border-2 border-white rounded-full"></div>
                              <div className="absolute bottom-3 right-3 w-12 h-12 border border-white rounded-full"></div>
                            </div>
                            
                            {/* Avatar */}
                            <div className="relative mx-auto mb-4">
                              <div className="w-20 h-20 rounded-full p-2 bg-white/20 backdrop-blur-sm mx-auto">
                                <img 
                                  src={creator.avatar} 
                                  alt={creator.displayName}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              </div>
                              {/* Online Status */}
                              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-md"></div>
                            </div>
                            
                            {/* Creator Info */}
                            <h3 className="text-xl font-bold mb-2 truncate px-2">{creator.displayName}</h3>
                            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30 truncate max-w-full">
                              {creator.briefStats.category}
                            </span>
                          </div>
                          
                          {/* Stats and Actions */}
                          <div className="p-5">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-5">
                              <div className="text-center p-3 bg-purple-50 rounded-xl">
                                <div className="flex items-center justify-center space-x-2 mb-1">
                                  <Users className="w-4 h-4 text-purple-600" />
                                  <span className="text-lg font-bold text-purple-600 truncate">{creator.briefStats.followers}</span>
                                </div>
                                <div className="text-xs text-purple-500 uppercase tracking-wide font-medium">Followers</div>
                              </div>
                              <div className="text-center p-3 bg-pink-50 rounded-xl">
                                <div className="flex items-center justify-center space-x-2 mb-1">
                                  <Camera className="w-4 h-4 text-pink-600" />
                                  <span className="text-lg font-bold text-pink-600 truncate">{creator.briefStats.posts}</span>
                                </div>
                                <div className="text-xs text-pink-500 uppercase tracking-wide font-medium">Posts</div>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="space-y-3">
                              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <User className="w-4 h-4 mr-2" />
                                Follow Creator
                              </Button>
                              <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 font-medium py-3 rounded-xl transition-all duration-300">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Send Message
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentCreatorSlide(prev => prev === 0 ? trendingCreators.length - 1 : prev - 1)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-3 rounded-full shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 border border-purple-100"
                aria-label="Previous creator"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentCreatorSlide(prev => prev === trendingCreators.length - 1 ? 0 : prev + 1)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-3 rounded-full shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 border border-purple-100"
                aria-label="Next creator"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Dots Indicator */}
              <div className="flex justify-center space-x-3 mt-6">
                {trendingCreators.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCreatorSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentCreatorSlide 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8 shadow-lg' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to creator ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
