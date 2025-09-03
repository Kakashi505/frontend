'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Heart, MessageCircle, ArrowRight, Play, Users, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import React from 'react';

// Ranking sections data
const rankingSections = [
  {
    id: 'overall',
    title: 'Overall Ranking',
    icon: '🏆',
    posts: [
      {
        id: '1',
        isNew: true,
        rank: 1,
        thumbnail: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '1:26:22',
        creator: 'Sakura Chan',
        title: 'Spring Cherry Blossom Photography Session',
        timeAgo: '15 hours ago',
        likes: 1234,
        comments: 89,
        views: '45.2K',
        category: 'Photography'
      },
      {
        id: '2',
        isNew: false,
        rank: 2,
        thumbnail: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '00:45',
        creator: 'Alex Fitness',
        title: 'Advanced Workout Routine for Beginners',
        timeAgo: '8 hours ago',
        likes: 892,
        comments: 67,
        views: '32.1K',
        category: 'Fitness'
      },
      {
        id: '3',
        isNew: false,
        rank: 3,
        thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '17:34',
        creator: 'Emma Art',
        title: 'Digital Art Masterclass: Cyberpunk Style',
        timeAgo: '3 months ago',
        likes: 585,
        comments: 234,
        views: '28.9K',
        category: 'Art'
      },
      {
        id: '4',
        isNew: false,
        rank: 4,
        thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '12:34',
        creator: 'Mike Music',
        title: 'Acoustic Guitar Covers Collection',
        timeAgo: '1 day ago',
        likes: 156,
        comments: 89,
        views: '15.7K',
        category: 'Music'
      }
    ]
  },
  {
    id: 'butt',
    title: 'Beauty & Fashion',
    icon: '✨',
    posts: [
      {
        id: '5',
        isNew: true,
        rank: 1,
        thumbnail: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '2:15:30',
        creator: 'Beauty Guru',
        title: 'Complete Makeup Tutorial for Beginners',
        timeAgo: '2 hours ago',
        likes: 1256,
        comments: 89,
        views: '67.3K',
        category: 'Beauty'
      },
      {
        id: '6',
        isNew: false,
        rank: 2,
        thumbnail: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '45:20',
        creator: 'Style Master',
        title: 'Fashion Trends 2024: What to Wear',
        timeAgo: '6 hours ago',
        likes: 892,
        comments: 45,
        views: '42.1K',
        category: 'Fashion'
      }
    ]
  },
  {
    id: 'adult-services',
    title: 'Lifestyle & Wellness',
    icon: '🌿',
    posts: [
      {
        id: '7',
        isNew: true,
        rank: 1,
        thumbnail: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '1:05:15',
        creator: 'Wellness Coach',
        title: 'Mindfulness Meditation Guide',
        timeAgo: '1 hour ago',
        likes: 2341,
        comments: 156,
        views: '89.2K',
        category: 'Wellness'
      }
    ]
  },
  {
    id: 'no-panties',
    title: 'Travel & Adventure',
    icon: '✈️',
    posts: [
      {
        id: '8',
        isNew: true,
        rank: 1,
        thumbnail: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '33:45',
        creator: 'Travel Pro',
        title: 'Hidden Gems in Tokyo: Local Guide',
        timeAgo: '4 hours ago',
        likes: 1876,
        comments: 234,
        views: '56.7K',
        category: 'Travel'
      }
    ]
  },
  {
    id: 'ntr',
    title: 'Food & Cooking',
    icon: '🍳',
    posts: [
      {
        id: '9',
        isNew: true,
        rank: 1,
        thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '1:12:30',
        creator: 'Chef Master',
        title: 'Authentic Japanese Ramen Recipe',
        timeAgo: '5 hours ago',
        likes: 3241,
        comments: 189,
        views: '78.9K',
        category: 'Cooking'
      }
    ]
  },
  {
    id: 'spa',
    title: 'Technology & Innovation',
    icon: '🚀',
    posts: [
      {
        id: '10',
        isNew: true,
        rank: 1,
        thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '55:20',
        creator: 'Tech Guru',
        title: 'AI in 2024: What You Need to Know',
        timeAgo: '3 hours ago',
        likes: 1456,
        comments: 89,
        views: '34.2K',
        category: 'Technology'
      }
    ]
  },
  {
    id: 'chubby',
    title: 'Gaming & Entertainment',
    icon: '🎮',
    posts: [
      {
        id: '11',
        isNew: true,
        rank: 1,
        thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '1:08:45',
        creator: 'Gaming Pro',
        title: 'Top 10 Games of 2024',
        timeAgo: '7 hours ago',
        likes: 2234,
        comments: 156,
        views: '67.8K',
        category: 'Gaming'
      }
    ]
  }
];

// Post Card Component
function PostCard({ post, index }: { post: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex-shrink-0 w-[85%] xs:w-[70%] sm:w-[45%] md:w-[30%] lg:w-[23%] xl:w-[20%] 2xl:w-[18%] group"
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
      <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden rounded-t-xl">
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
      <div className="p-4">
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
        <p className="text-gray-800 text-sm mb-3 line-clamp-2 leading-relaxed font-medium">
          {post.title}
        </p>
        
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200">
            {post.category}
          </span>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Eye className="w-3 h-3 text-purple-500" />
              <span className="text-xs font-bold text-gray-700">{post.views}</span>
            </div>
            <div className="text-xs text-gray-500">Views</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Heart className="w-3 h-3 text-pink-500" />
              <span className="text-xs font-bold text-gray-700">{post.likes}</span>
            </div>
            <div className="text-xs text-gray-500">Likes</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <MessageCircle className="w-3 h-3 text-blue-500" />
              <span className="text-xs font-bold text-gray-700">{post.comments}</span>
            </div>
            <div className="text-xs text-gray-500">Comments</div>
          </div>
        </div>
        
        {/* Bottom Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
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

// Ranking Section Component
function RankingSection({ section, sectionIndex }: { section: any, sectionIndex: number }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg shadow-lg">
            {section.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
            <p className="text-sm text-gray-600">{section.posts.length} posts available</p>
          </div>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium">
          View All
        </button>
      </div>

      {/* Desktop: Horizontal Scroll */}
      <div className="hidden md:block relative">
        {/* Left Arrow */}
        {scrollPosition > 0 && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 border border-gray-200"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Posts Container */}
        <div
          ref={containerRef}
          className="flex space-x-6 px-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {section.posts.map((post: any, index: number) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 border border-gray-200"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Mobile: Slideshow */}
      <div className="md:hidden">
        <div className="relative">
          {/* Slideshow Container */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {section.posts.map((post: any, index: number) => (
                <div key={post.id} className="w-full flex-shrink-0 px-3">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Hero Section */}
                    <div className="relative bg-gradient-to-br from-purple-500 to-pink-600 p-6 text-center text-white">
                      {/* Decorative Elements */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-3 left-3 w-16 h-16 border-2 border-white rounded-full"></div>
                        <div className="absolute bottom-3 right-3 w-12 h-12 border border-white rounded-full"></div>
                      </div>
                      
                      {/* Thumbnail */}
                      <div className="relative mx-auto mb-4">
                        <div className="w-24 h-24 rounded-full p-2 bg-white/20 backdrop-blur-sm mx-auto overflow-hidden">
                          <img 
                            src={post.thumbnail} 
                            alt={post.title}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Creator Info */}
                      <h3 className="text-lg font-bold mb-2 truncate px-2">{post.creator}</h3>
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30 truncate max-w-full">
                        {post.category}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      {/* Title */}
                      <h4 className="font-semibold text-gray-900 mb-3 text-center line-clamp-2 leading-relaxed">
                        {post.title}
                      </h4>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-2 bg-purple-50 rounded-lg">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Eye className="w-3 h-3 text-purple-600" />
                            <span className="text-sm font-bold text-purple-600 truncate">{post.views}</span>
                          </div>
                          <div className="text-xs text-purple-500 font-medium">Views</div>
                        </div>
                        <div className="text-center p-2 bg-pink-50 rounded-lg">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Heart className="w-3 h-3 text-pink-600" />
                            <span className="text-sm font-bold text-pink-600 truncate">{post.likes}</span>
                          </div>
                          <div className="text-xs text-pink-500 font-medium">Likes</div>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <MessageCircle className="w-3 h-3 text-blue-600" />
                            <span className="text-sm font-bold text-blue-600 truncate">{post.comments}</span>
                          </div>
                          <div className="text-xs text-blue-500 font-medium">Comments</div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
                        </Button>
                        <div className="flex items-center justify-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide(prev => prev === 0 ? section.posts.length - 1 : prev - 1)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-3 rounded-full shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 border border-purple-100"
            aria-label="Previous post"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrentSlide(prev => prev === section.posts.length - 1 ? 0 : prev + 1)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 p-3 rounded-full shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 border border-purple-100"
            aria-label="Next post"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {section.posts.map((post: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-6 shadow-md' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to post ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Ranking Page Component
export function RankingPage() {
  const [primaryTab, setPrimaryTab] = useState<'post' | 'creator'>('post');
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'monthly' | 'all-time'>('daily');

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
            Post
          </button>
          <button
            onClick={() => setPrimaryTab('creator')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              primaryTab === 'creator' 
                ? 'text-gray-900 border-b-2 border-pink-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Creator
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
      </div>

      {/* Main Content */}
      <div className="pb-20">
        {/* Ranking Sections */}
        {rankingSections.map((section, index) => (
          <RankingSection key={section.id} section={section} sectionIndex={index} />
        ))}

        {/* "All genres are here" Button */}
        <div className="px-4 mb-8">
          <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-medium flex items-center justify-center space-x-2">
            <span>All genres are here</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Floating Buttons */}
      {/* <div className="fixed right-4 top-1/2 -translate-y-1/2 space-y-2 z-50">
        <button className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-medium hover:bg-gray-700 transition-colors">
          Copy
        </button>
        <button className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-medium hover:bg-gray-700 transition-colors">
          Capture
        </button>
        <button className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-medium hover:bg-gray-700 transition-colors">
          AIOCR
        </button>
      </div> */}
    </div>
  );
}