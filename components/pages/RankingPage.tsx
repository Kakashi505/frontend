'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Heart, MessageCircle, ArrowRight, Play, Users, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import React from 'react';

// Genre data for filtering
const genres = [
  { id: 'all', name: 'All Genres', icon: '🌟' },
  { id: 'free', name: 'Free', icon: '🆓' },
  { id: 'premium', name: 'Premium', icon: '💎' },
  { id: 'adult-services', name: 'Adult Services', icon: '💋' },
  { id: 'no-panties', name: 'No Panties', icon: '👙' },
  { id: 'ntr', name: 'NTR/Cheating', icon: '💔' },
  { id: 'spa', name: 'Spa', icon: '💆' },
  { id: 'chubby', name: 'Chubby', icon: '🥰' },
  { id: 'butt', name: 'Butt', icon: '🍑' }
];

// Sample data for posts and creators
const samplePosts = [
  {
    id: '1',
    isNew: true,
    rank: 1,
    thumbnail: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '2:00:00',
    creator: 'Creator Name',
    title: '【今だけ80%OFF】ハマり過ぎて毎日やりたくなっちゃう特別配信',
    timeAgo: '2 hours ago',
    likes: 1234,
    comments: 89,
    views: '45.2K',
    category: 'Special'
  },
  {
    id: '2',
    isNew: false,
    rank: 2,
    thumbnail: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '1:59:31',
    creator: 'Creator Name',
    title: '【限定配信】見逃し厳禁！特別な内容をお届け',
    timeAgo: '4 hours ago',
    likes: 892,
    comments: 67,
    views: '32.1K',
    category: 'Limited'
  },
  {
    id: '3',
    isNew: false,
    rank: 3,
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '17:34',
    creator: 'Creator Name',
    title: '【新作】待望の新コンテンツが登場',
    timeAgo: '1 day ago',
    likes: 585,
    comments: 234,
    views: '28.9K',
    category: 'New'
  },
  {
    id: '4',
    isNew: false,
    rank: 4,
    thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '12:34',
    creator: 'Creator Name',
    title: '【人気】多くのファンに愛されるコンテンツ',
    timeAgo: '2 days ago',
    likes: 156,
    comments: 89,
    views: '15.7K',
    category: 'Popular'
  }
];

const sampleCreators = [
  {
    id: '1',
    rank: 1,
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Creator Name 1',
    followers: '45.2K',
    posts: 156,
    monthlyEarnings: '¥89,200',
    category: 'Premium'
  },
  {
    id: '2',
    rank: 2,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Creator Name 2',
    followers: '32.1K',
    posts: 89,
    monthlyEarnings: '¥67,800',
    category: 'Free'
  },
  {
    id: '3',
    rank: 3,
    avatar: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Creator Name 3',
    followers: '28.9K',
    posts: 67,
    monthlyEarnings: '¥54,300',
    category: 'Premium'
  },
  {
    id: '4',
    rank: 4,
    avatar: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Creator Name 4',
    followers: '15.7K',
    posts: 45,
    monthlyEarnings: '¥32,100',
    category: 'Free'
  }
];

// Post Card Component
function PostCard({ post, index }: { post: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group h-full flex flex-col"
    >
      {/* NEW Badge */}
      {post.isNew && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
            NEW
          </span>
        </div>
      )}

      {/* Ranking Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg">
          #{post.rank}
        </span>
      </div>

      {/* Thumbnail */}
      <div className="relative h-40 sm:h-44 md:h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden rounded-t-xl">
        <img 
          src={post.thumbnail} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <Play className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        {/* Duration */}
        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {post.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        {/* Creator Info */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{post.creator.charAt(0)}</span>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm truncate">
            {post.creator}
          </h3>
        </div>
        
        {/* Title */}
        <p className="text-gray-800 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed font-medium flex-1">
          {post.title}
        </p>
        
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200">
            {post.category}
          </span>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-3">
          <div className="text-center p-1.5 sm:p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Eye className="w-3 h-3 text-purple-500" />
              <span className="text-xs font-bold text-gray-700">{post.views}</span>
            </div>
            <div className="text-xs text-gray-500">Views</div>
          </div>
          <div className="text-center p-1.5 sm:p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Heart className="w-3 h-3 text-pink-500" />
              <span className="text-xs font-bold text-gray-700">{post.likes}</span>
            </div>
            <div className="text-xs text-gray-500">Likes</div>
          </div>
          <div className="text-center p-1.5 sm:p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <MessageCircle className="w-3 h-3 text-blue-500" />
              <span className="text-xs font-bold text-gray-700">{post.comments}</span>
            </div>
            <div className="text-xs text-gray-500">Comments</div>
          </div>
        </div>
        
        {/* Bottom Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{post.timeAgo}</span>
          </div>
          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs px-3 py-1 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            Watch Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Creator Card Component
function CreatorCard({ creator, index }: { creator: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group h-full flex flex-col"
    >
      {/* Ranking Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg">
          #{creator.rank}
        </span>
      </div>

      {/* Avatar */}
      <div className="relative h-40 sm:h-44 md:h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden rounded-t-xl">
        <img 
          src={creator.avatar} 
          alt={creator.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full border border-white/30">
            {creator.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        {/* Creator Name */}
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-2 truncate">
          {creator.name}
        </h3>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-3">
          <div className="text-center p-1.5 sm:p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Users className="w-3 h-3 text-purple-500" />
              <span className="text-xs font-bold text-gray-700">{creator.followers}</span>
            </div>
            <div className="text-xs text-gray-500">Followers</div>
          </div>
          <div className="text-center p-1.5 sm:p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span className="text-xs font-bold text-gray-700">{creator.posts}</span>
            </div>
            <div className="text-xs text-gray-500">Posts</div>
          </div>
          <div className="text-center p-1.5 sm:p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Heart className="w-3 h-3 text-pink-500" />
              <span className="text-xs font-bold text-gray-700">{creator.monthlyEarnings}</span>
            </div>
            <div className="text-xs text-gray-500">Earnings</div>
          </div>
        </div>
        
        {/* Action Button */}
        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-auto">
          Follow Creator
        </Button>
      </div>
    </motion.div>
  );
}

// Main Ranking Page Component
export function RankingPage() {
  const [primaryTab, setPrimaryTab] = useState<'post' | 'creator'>('post');
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'monthly' | 'all-time'>('daily');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const currentData = primaryTab === 'post' ? samplePosts : sampleCreators;
  const CardComponent = primaryTab === 'post' ? PostCard : CreatorCard;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Primary Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex px-4 py-3">
          <button
            onClick={() => setPrimaryTab('post')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              primaryTab === 'post' 
                ? 'text-gray-900 border-b-2 border-pink-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            投稿 (Posts)
          </button>
          <button
            onClick={() => setPrimaryTab('creator')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              primaryTab === 'creator' 
                ? 'text-gray-900 border-b-2 border-pink-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            クリエイター (Creators)
          </button>
        </div>

        {/* Secondary Tabs */}
        <div className="flex px-4 pb-3 space-x-1">
          {[
            { key: 'daily', label: 'Daily' },
            { key: 'weekly', label: 'Weekly' },
            { key: 'monthly', label: 'Monthly' },
            { key: 'all-time', label: 'All time' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setTimeFilter(tab.key as any)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                timeFilter === tab.key
                  ? 'bg-pink-500 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Genre Filter */}
        <div className="px-4 pb-3">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`px-3 py-1 text-xs rounded-full transition-colors whitespace-nowrap ${
                  selectedGenre === genre.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{genre.icon}</span>
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 px-4 mt-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg shadow-lg">
              {primaryTab === 'post' ? '📱' : '👤'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {primaryTab === 'post' ? 'Top Posts' : 'Top Creators'}
              </h2>
              <p className="text-sm text-gray-600">{currentData.length} {primaryTab === 'post' ? 'posts' : 'creators'} available</p>
            </div>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium">
            View All
          </button>
        </div>

        {/* Responsive Grid Layout */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
            {currentData.map((item: any, index: number) => (
              <CardComponent key={item.id} post={primaryTab === 'post' ? item : undefined} creator={primaryTab === 'creator' ? item : undefined} index={index} />
            ))}
          </div>
        </div>

        {/* "All genres are here" Button */}
        <div className="px-4 mb-8 mt-8">
          <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-medium flex items-center justify-center space-x-2">
            <span>All genres are here</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
