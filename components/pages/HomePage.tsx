'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Eye, MessageCircle, Share2, Star, Search, TrendingUp, Camera, Music, Gamepad2, Palette, Utensils, Dumbbell, BookOpen, Car, Plane, Home, ShoppingBag, ChevronRight } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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

// Trending creators data
const trendingCreators = [
  {
    id: '1',
    username: 'sakura_chan',
    displayName: 'Sakura',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    followers: 45600,
    posts: 234,
    isVerified: true,
    category: 'Photography',
    trending: '+12%',
  },
  {
    id: '2',
    username: 'alex_fitness',
    displayName: 'Alex Cooper',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    followers: 32100,
    posts: 189,
    isVerified: true,
    category: 'Fitness',
    trending: '+8%',
  },
  {
    id: '3',
    username: 'emma_art',
    displayName: 'Emma Rodriguez',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    followers: 28900,
    posts: 156,
    isVerified: false,
    category: 'Art',
    trending: '+15%',
  },
  {
    id: '4',
    username: 'mike_music',
    displayName: 'Mike Johnson',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    followers: 52300,
    posts: 312,
    isVerified: true,
    category: 'Music',
    trending: '+20%',
  },
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

  const toggleLike = (postId: string) => {
    setLikedPosts(prev =>
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
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="text-yellow-300">Only-U</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Connect with your favorite creators and discover exclusive content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
              Start Exploring
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search creators, content, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 text-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-200"
            />
          </div>
        </div>
      </section>

      {/* Trending Creators Section */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Trending Creators</h2>
            <div className="flex items-center space-x-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Trending Now</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCreators.map((creator) => (
              <Card key={creator.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src={creator.avatar}
                      alt={creator.displayName}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{creator.displayName}</h3>
                        {creator.isVerified && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">@{creator.username}</p>
                      <p className="text-xs text-purple-600 font-medium">{creator.category}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{creator.followers.toLocaleString()} followers</span>
                    <span className="text-green-600 font-medium">{creator.trending}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Follow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Posts</h2>
          <div className="space-y-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="p-6 pb-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Image
                        src={post.creator.avatar}
                        alt={post.creator.displayName}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{post.creator.displayName}</h4>
                          {post.creator.isVerified && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>@{post.creator.username}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(post.timestamp)}</span>
                          <span>•</span>
                          <span className="text-purple-600 font-medium">{post.category}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-4 text-lg">{post.content}</p>
                  </div>
                  
                  {post.image && (
                    <Image
                      src={post.image}
                      alt="Post content"
                      width={800}
                      height={400}
                      className="w-full h-80 object-cover"
                    />
                  )}
                  
                  <div className="p-6 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center space-x-2 ${
                            likedPosts.includes(post.id) ? 'text-red-500' : 'text-gray-600'
                          } hover:text-red-500`}
                        >
                          <Heart className={`w-5 h-5 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                          <span className="font-medium">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                        </Button>
                        
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Eye className="w-5 h-5" />
                          <span className="font-medium">{post.views.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MessageCircle className="w-5 h-5" />
                          <span className="font-medium">{post.comments}</span>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Genres Section */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-2 mb-8">
            <Star className="w-6 h-6 text-gray-600" />
            <h2 className="text-3xl font-bold text-gray-900">Recommended genres</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedGenres.map((genre) => (
              <Card key={genre.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
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
          
          <div className="text-center pt-6">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
              See more genres <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
