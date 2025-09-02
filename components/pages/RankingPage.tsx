'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import React from 'react';

// Ranking sections data
const rankingSections = [
  {
    id: 'overall',
    title: '総合ランキング',
    icon: '🏆',
    posts: [
      {
        id: '1',
        isNew: true,
        rank: 1,
        thumbnail: '/api/placeholder/300/200',
        duration: '1:26:22',
        creator: 'Creator Name',
        title: '9/1まで500円OFF!! 【不倫奥さん】挑山さ〇か似',
        timeAgo: '15時間前',
        likes: 2,
        comments: 3
      },
      {
        id: '2',
        isNew: false,
        rank: 2,
        thumbnail: '/api/placeholder/300/200',
        duration: '00:45',
        creator: 'Creator Name',
        title: '【スカートめくり】スカートの奥について',
        timeAgo: '8時間前',
        likes: 4,
        comments: 0
      },
      {
        id: '3',
        isNew: false,
        rank: 3,
        thumbnail: '/api/placeholder/300/200',
        duration: '17:34',
        creator: 'Creator Name',
        title: '【学生】見えち奥美と女子',
        timeAgo: '3 months ago',
        likes: 585,
        comments: 234
      },
      {
        id: '4',
        isNew: false,
        rank: 4,
        thumbnail: '/api/placeholder/300/200',
        duration: '12:34',
        creator: 'Creator Name',
        title: '【温泉】混浴で見つけた美しい奥さん',
        timeAgo: '1 day ago',
        likes: 156,
        comments: 89
      }
    ]
  },
  {
    id: 'butt',
    title: 'Butt Ranking',
    icon: '🍑',
    posts: [
      {
        id: '5',
        isNew: true,
        rank: 1,
        thumbnail: '/api/placeholder/300/200',
        duration: '2:15:30',
        creator: 'Creator Name',
        title: '【美尻】完璧な形の尻',
        timeAgo: '2 hours ago',
        likes: 12,
        comments: 5
      },
      {
        id: '6',
        isNew: false,
        rank: 2,
        thumbnail: '/api/placeholder/300/200',
        duration: '45:20',
        creator: 'Creator Name',
        title: '【尻コキ】最高の体験',
        timeAgo: '6 hours ago',
        likes: 8,
        comments: 2
      }
    ]
  },
  {
    id: 'adult-services',
    title: 'Adult Services Ranking',
    icon: '💋',
    posts: [
      {
        id: '7',
        isNew: true,
        rank: 1,
        thumbnail: '/api/placeholder/300/200',
        duration: '1:05:15',
        creator: 'Creator Name',
        title: '【出張】高級エステサロン',
        timeAgo: '1 hour ago',
        likes: 25,
        comments: 12
      }
    ]
  },
  {
    id: 'no-panties',
    title: 'No Panties Ranking',
    icon: '👙',
    posts: [
      {
        id: '8',
        isNew: true,
        rank: 1,
        thumbnail: '/api/placeholder/300/200',
        duration: '33:45',
        creator: 'Creator Name',
        title: '【ノーパン】スカートの中身',
        timeAgo: '4 hours ago',
        likes: 18,
        comments: 7
      }
    ]
  },
  {
    id: 'ntr',
    title: 'NTR/Cheating Ranking',
    icon: '💔',
    posts: [
      {
        id: '9',
        isNew: true,
        rank: 1,
        thumbnail: '/api/placeholder/300/200',
        duration: '1:12:30',
        creator: 'Creator Name',
        title: '【NTR】妻の秘密',
        timeAgo: '5 hours ago',
        likes: 32,
        comments: 15
      }
    ]
  },
  {
    id: 'spa',
    title: 'Spa Ranking',
    icon: '💆',
    posts: [
      {
        id: '10',
        isNew: true,
        rank: 1,
        thumbnail: '/api/placeholder/300/200',
        duration: '55:20',
        creator: 'Creator Name',
        title: '【スパ】リラクゼーション',
        timeAgo: '3 hours ago',
        likes: 14,
        comments: 6
      }
    ]
  },
  {
    id: 'chubby',
    title: 'Chubby Ranking',
    icon: '🥰',
    posts: [
      {
        id: '11',
        isNew: true,
        rank: 1,
        thumbnail: '/api/placeholder/300/200',
        duration: '1:08:45',
        creator: 'Creator Name',
        title: '【ぽっちゃり】愛らしい体型',
        timeAgo: '7 hours ago',
        likes: 22,
        comments: 9
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
      className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 flex-shrink-0 w-[85%] xs:w-[70%] sm:w-[45%] md:w-[30%] lg:w-[23%] xl:w-[20%] 2xl:w-[18%]"
    >
      {/* NEW Badge */}
      {post.isNew && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            NEW
          </span>
        </div>
      )}

      {/* Ranking Badge */}
      <div className="absolute top-2 right-2 z-10">
        <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
          #{post.rank}
        </span>
      </div>

      {/* Thumbnail */}
      <div className="relative h-40 bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-2xl">🎬</span>
          </div>
        </div>
        
        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {post.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">
          {post.creator}
        </h3>
        <p className="text-gray-600 text-xs mb-2 line-clamp-2 leading-relaxed">
          {post.title}
        </p>
        
        {/* Bottom Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{post.timeAgo}</span>
          <div className="flex items-center space-x-2">
            <span className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{post.likes}</span>
            </span>
            <span className="flex items-center space-x-1">
              <MessageCircle className="w-3 h-3" />
              <span>{post.comments}</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Ranking Section Component
function RankingSection({ section }: { section: any }) {
  const [scrollPosition, setScrollPosition] = useState(0);
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
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-4">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{section.icon}</span>
          <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
        </div>
        <button className="text-pink-500 text-sm hover:text-pink-600 transition-colors">
          View more
        </button>
      </div>

      {/* Posts Carousel */}
      <div className="relative">
        {/* Left Arrow */}
        {scrollPosition > 0 && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 rounded-full shadow-md flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Posts Container */}
        <div
          ref={containerRef}
          className="flex space-x-4 px-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {section.posts.map((post: any, index: number) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 rounded-full shadow-md flex items-center justify-center hover:bg-white transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
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
          <RankingSection key={section.id} section={section} />
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
      <div className="fixed right-4 top-1/2 -translate-y-1/2 space-y-2 z-50">
        <button className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-medium hover:bg-gray-700 transition-colors">
          Copy
        </button>
        <button className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-medium hover:bg-gray-700 transition-colors">
          Capture
        </button>
        <button className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-medium hover:bg-gray-700 transition-colors">
          AIOCR
        </button>
      </div>
    </div>
  );
}