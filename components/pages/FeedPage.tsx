'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Plus, Share2, MoreHorizontal, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";

// --------------------
// Data
// --------------------
const feedVideos = [
  {
    id: '1',
    creator: 'Mionya♡School teacher',
    description: 'I told you to hold back...♡ I gave you a realistic footjob wit...',
    tags: ['Footjob', 'Erotic clothing', 'Beautiful breasts'],
    likes: 14,
    comments: 3,
    bookmarks: 6,
    duration: '0:52',
    timeAgo: '2 days ago',
    isPremium: true,
  }
];

// --------------------
// Components
// --------------------
function FeedNavigation({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
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

      {/* CTA Button */}
      <div className="mb-6">
        <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 sm:py-4 px-6 rounded-2xl text-lg font-medium flex items-center justify-center gap-3 shadow-lg">
          <Play className="w-5 h-5" />
          <span>Watch the full version (14 minutes)</span>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Details */}
      <div>
        <h3 className="text-xl lg:text-2xl font-semibold mb-2 text-gray-900">{video.creator}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{video.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {video.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm rounded-full shadow-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Sample</span>
          <div className="flex items-center gap-2">
            <span>0:00 / {video.duration}</span>
            <span>•</span>
            <span>{video.timeAgo}</span>
          </div>
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
        <motion.span className="text-xs text-gray-900" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}>
          Swipe
        </motion.span>
        <motion.div className="w-px h-4 bg-gray-300 mt-1" initial={{ scaleY: 0.6, opacity: 0.5 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }} />
      </div>

      {/* Buttons */}
      <SidebarButton icon={<Plus className="text-white" />} bg="gradient" />
      <SidebarButton
        icon={<Heart className={`${liked ? 'text-white fill-current' : 'text-gray-600'}`} />}
        active={liked}
        onClick={() => toggleLike(video.id)}
        count={video.likes}
      />
      <SidebarButton icon={<MessageCircle className="text-gray-600" />} count={video.comments} />
      <SidebarButton
        icon={<Bookmark className={`${bookmarked ? 'text-white fill-current' : 'text-gray-600'}`} />}
        active={bookmarked}
        onClick={() => toggleBookmark(video.id)}
        count={video.bookmarks}
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

  const toggleLike = (id: string) =>
    setLikedVideos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const toggleBookmark = (id: string) =>
    setBookmarkedVideos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div className="bg-white text-gray-900 container mx-auto">
      <FeedNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        <div className="flex-1 px-4 py-6">
          {feedVideos.map(video => (
            <FeedVideoCard key={video.id} video={video} />
          ))}
        </div>
        {feedVideos.map(video => (
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
