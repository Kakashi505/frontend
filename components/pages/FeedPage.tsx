'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Bookmark, Plus, Share2, MoreHorizontal, Play, ArrowRight, Eye, TrendingUp, Clock, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// --------------------
// Enhanced Data Structure for OnlyU.jp
// --------------------
const feedVideos = [
  {
    id: '1',
    creator: {
      id: 'creator_1',
      username: 'sakura_chan',
      displayName: 'Sakura',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVerified: true,
      isSubscribed: false,
      subscriptionPrice: 980,
      followers: 45600,
      category: 'Photography',
      tags: ['portrait', 'nature', 'japan']
    },
    content: {
      type: 'video', // image, video, text, gallery
      title: 'Spring Cherry Blossom Session',
      description: 'Beautiful spring photoshoot in the heart of Tokyo. Exclusive behind-the-scenes content for subscribers only.',
      mediaUrl: '/api/placeholder/400/600',
      thumbnail: '/api/placeholder/400/600',
      duration: '14:32',
      isPremium: true,
      price: 500, // Pay-per-view price in yen
      genre: 'Amateur',
      tags: ['cherry blossom', 'spring', 'tokyo', 'photography'],
      isLegalConsent: true,
      isAgeVerified: true
    },
    analytics: {
      views: 1250,
      likes: 89,
      comments: 23,
      bookmarks: 12,
      shares: 5,
      engagement: 0.68,
      reach: 3400
    },
    interaction: {
      isLiked: false,
      isBookmarked: false,
      isCommented: false,
      isShared: false,
      canTip: true,
      canMessage: true
    },
    metadata: {
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      updatedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      expiresAt: null, // For time-limited content
      location: 'Tokyo, Japan',
      language: 'ja'
    }
  }
];

// --------------------
// Enhanced Components
// --------------------
function FeedNavigation({ activeTab, setActiveTab }: { activeTab: 'recommendation' | 'following', setActiveTab: React.Dispatch<React.SetStateAction<'recommendation' | 'following'>> }) {
  return (
    <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 xl:px-8 py-3 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
        <button
          onClick={() => setActiveTab('recommendation')}
          className={`text-xs sm:text-sm lg:text-base transition-colors ${
            activeTab === 'recommendation' ? 'text-gray-500' : 'text-gray-900'
          }`}
        >
          Recommendation
        </button>
        <button
          onClick={() => setActiveTab('following')}
          className={`text-xs sm:text-sm lg:text-base transition-colors ${
            activeTab === 'following' ? 'text-purple-600' : 'text-gray-500'
          }`}
        >
          Following
        </button>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
        <IconButton icon={<Share2 />} />
        <IconButton icon={<MoreHorizontal />} />
      </div>
    </div>
  );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors">
      {icon}
    </button>
  );
}

function FeedVideoCard({ video }: { video: typeof feedVideos[0] }) {
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  return (
    <div className="mb-6 sm:mb-8 lg:mb-10">
      {/* Thumbnail */}
      <div className="relative mb-4">
        <div className="w-full h-64 sm:h-80 lg:h-96 xl:h-[28rem] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden shadow-lg">
          <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gray-300 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-20 bg-gray-400 rounded-lg"></div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-200">
              <Play className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Creator Info & Analytics Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={video.creator.avatar} 
            alt={video.creator.displayName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">{video.creator.displayName}</h3>
              {video.creator.isVerified && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500">{video.creator.category} • {video.creator.followers.toLocaleString()} followers</p>
          </div>
        </div>
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
        >
          {showAnalytics ? 'Hide' : 'Show'} Analytics
        </button>
      </div>

      {/* Analytics Panel */}
      {showAnalytics && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 rounded-lg p-4 mb-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Eye className="w-4 h-4 text-blue-500" />
                <span className="font-semibold">{video.analytics.views}</span>
              </div>
              <span className="text-gray-500">Views</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="font-semibold">{(video.analytics.engagement * 100).toFixed(1)}%</span>
              </div>
              <span className="text-gray-500">Engagement</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="font-semibold">{video.analytics.reach}</span>
              </div>
              <span className="text-gray-500">Reach</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <MessageCircle className="w-4 h-4 text-purple-500" />
                <span className="font-semibold">{video.analytics.comments}</span>
              </div>
              <span className="text-gray-500">Comments</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* CTA Button */}
      <div className="mb-6">
        <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 sm:py-4 px-6 rounded-2xl text-lg font-medium flex items-center justify-center gap-3 shadow-lg">
          <Play className="w-5 h-5" />
          <span>Watch the full version ({video.content.duration})</span>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Details */}
      <div>
        <h3 className="text-xl lg:text-2xl font-semibold mb-2 text-gray-900">{video.content.title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{video.content.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {video.content.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm rounded-full shadow-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Content Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Badge variant="outline" className="text-xs">
                {video.content.genre}
              </Badge>
            </span>
            <span className="flex items-center space-x-1">
              <Badge variant="outline" className="text-xs">
                {video.content.price}円
              </Badge>
            </span>
          </div>
          <span>{video.metadata.createdAt.toLocaleDateString()}</span>
        </div>

        {/* Legal & Age Verification */}
        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
          {video.content.isLegalConsent && (
            <span className="flex items-center space-x-1">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Legal Consent
              </Badge>
            </span>
          )}
          {video.content.isAgeVerified && (
            <span className="flex items-center space-x-1">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Age Verified
              </Badge>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function FeedSidebar({
  video,
  liked,
  bookmarked,
  toggleLike,
  toggleBookmark
}: {
  video: typeof feedVideos[0],
  liked: boolean,
  bookmarked: boolean,
  toggleLike: (id: string) => void,
  toggleBookmark: (id: string) => void
}) {
  return (
    <div className="lg:w-20 w-full flex flex-row lg:flex-col items-center justify-center lg:justify-start py-6 space-x-4 lg:space-x-0 lg:space-y-6 border-t lg:border-t-0 lg:border-l border-gray-200 bg-gray-50/50">
      {/* Swipe Indicator */}
      <div className="hidden lg:flex flex-col items-center mb-8">
        <motion.span 
          className="text-xs text-gray-900" 
          initial={{ opacity: 0, y: -5 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        >
          Swipe
        </motion.span>
        <motion.div 
          className="w-px h-4 bg-gray-300 mt-1" 
          initial={{ scaleY: 0.6, opacity: 0.5 }} 
          animate={{ scaleY: 1, opacity: 1 }} 
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }} 
        />
      </div>

      {/* Buttons */}
      <SidebarButton icon={<Plus className="text-white" />} bg="gradient" />
      <SidebarButton
        icon={<Heart className={`${liked ? 'text-white fill-current' : 'text-gray-600'}`} />}
        active={liked}
        onClick={() => toggleLike(video.id)}
        count={video.analytics.likes}
      />
      <SidebarButton icon={<MessageCircle className="text-gray-600" />} count={video.analytics.comments} />
      <SidebarButton
        icon={<Bookmark className={`${bookmarked ? 'text-white fill-current' : 'text-gray-600'}`} />}
        active={bookmarked}
        onClick={() => toggleBookmark(video.id)}
        count={video.analytics.bookmarks}
      />
    </div>
  );
}

function SidebarButton({ icon, count, active, onClick, bg }: {
  icon: React.ReactNode,
  count?: number,
  active?: boolean,
  onClick?: () => void,
  bg?: 'gradient'
}) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <button
        onClick={onClick}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg 
          ${bg === 'gradient' ? 'bg-gradient-to-br from-pink-500 to-purple-600' :
          active ? 'bg-pink-500' : 'bg-white hover:bg-gray-100 border border-gray-200'}
        `}
      >
        {icon}
      </button>
      {count !== undefined && <span className="text-xs text-gray-500">{count}</span>}
    </div>
  );
}

// --------------------
// Main Page
// --------------------
export function FeedPage() {
  const [activeTab, setActiveTab] = useState<'recommendation' | 'following'>('following');
  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const toggleLike = (id: string) =>
    setLikedVideos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const toggleBookmark = (id: string) =>
    setBookmarkedVideos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  // Filter videos based on search and genre
  const filteredVideos = feedVideos.filter(video => {
    const matchesSearch = searchQuery === '' || 
      video.content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.creator.displayName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = selectedGenre === 'all' || video.content.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="bg-white text-gray-900 container mx-auto">
      <FeedNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Search and Filter Bar */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search content, creators, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Genres</option>
              <option value="Amateur">Amateur</option>
              <option value="Married Woman">Married Woman</option>
              <option value="Beautiful Woman">Beautiful Woman</option>
              <option value="Personal Filming">Personal Filming</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        <div className="flex-1 px-4 py-6">
          {filteredVideos.map(video => (
            <FeedVideoCard key={video.id} video={video} />
          ))}
        </div>
        {filteredVideos.map(video => (
          <FeedSidebar
            key={video.id}
            video={video}
            liked={likedVideos.includes(video.id)}
            bookmarked={bookmarkedVideos.includes(video.id)}
            toggleLike={toggleLike}
            toggleBookmark={toggleBookmark}
          />
        ))}
      </div>
    </div>
  );
}
