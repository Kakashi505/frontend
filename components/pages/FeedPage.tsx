'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, Play, Pause, Volume2, VolumeX, Lock, Crown, Verified, Eye, Clock, Filter, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from "framer-motion";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Enhanced Data Structure for MyFans.jp
const feedPosts = [
  {
    id: '1',
    creator: {
      id: 'creator_1',
      username: 'sakura_chan',
      displayName: '桜ちゃん',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVerified: true,
      isSubscribed: false,
      subscriptionPrice: 980,
      followers: 45600,
      category: 'Photography',
      tags: ['portrait', 'nature', 'japan']
    },
    content: {
      type: 'video',
      title: '春の桜セッション',
      description: '東京の中心で美しい春の写真撮影。サブスクライバー限定の特別な裏側コンテンツ。',
      mediaUrl: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=600',
      thumbnail: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '14:32',
      isPremium: true,
      price: 500,
      genre: 'Amateur',
      tags: ['cherry blossom', 'spring', 'tokyo', 'photography'],
      isLegalConsent: true,
      isAgeVerified: true,
      mediaType: 'image'
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
      createdAt: new Date('2025-01-15T10:00:00'),
      updatedAt: new Date('2025-01-15T10:30:00'),
      expiresAt: null,
      location: 'Tokyo, Japan',
      language: 'ja'
    }
  },
  {
    id: '2',
    creator: {
      id: 'creator_2',
      username: 'yuki_san',
      displayName: '雪さん',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVerified: true,
      isSubscribed: true,
      subscriptionPrice: 1200,
      followers: 23400,
      category: 'Cosplay',
      tags: ['cosplay', 'anime', 'gaming']
    },
    content: {
      type: 'gallery',
      title: 'コスプレ撮影の裏側',
      description: '最新のアニメキャラクターのコスプレ撮影。サブスクライバー限定の特別コンテンツ。',
      mediaUrl: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
      thumbnail: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '8:45',
      isPremium: false,
      price: 0,
      genre: 'Cosplay',
      tags: ['cosplay', 'anime', 'behind-the-scenes'],
      isLegalConsent: true,
      isAgeVerified: true,
      mediaType: 'gallery'
    },
    analytics: {
      views: 890,
      likes: 156,
      comments: 34,
      bookmarks: 23,
      shares: 8,
      engagement: 0.72,
      reach: 2100
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
      createdAt: new Date('2025-01-15T08:00:00'),
      updatedAt: new Date('2025-01-15T09:00:00'),
      expiresAt: null,
      location: 'Osaka, Japan',
      language: 'ja'
    }
  }
];

// Media Carousel Component
function MediaCarousel({ media, isPremium, onSubscribe }: { 
  media: { url: string, type: string }[], 
  isPremium: boolean,
  onSubscribe: () => void 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  return (
    <div className="relative w-full h-[70vh] bg-black rounded-xl overflow-hidden">
      <div className="relative w-full h-full">
        <img 
          src={media[currentIndex].url} 
          alt="Post media"
          className="w-full h-full object-cover"
        />
        
        {isPremium && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white">
              <Lock className="w-16 h-16 mx-auto mb-4 text-pink-400" />
              <h3 className="text-2xl font-bold mb-2">プレミアムコンテンツ</h3>
              <p className="text-lg mb-6 opacity-90">サブスクライブして完全版を視聴</p>
              <Button 
                onClick={onSubscribe}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
              >
                購読する
              </Button>
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 flex items-center space-x-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        {media.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {media.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Feed Post Card Component
function FeedPostCard({ post, onLike, onBookmark, onComment, onShare }: { 
  post: typeof feedPosts[0],
  onLike: (id: string) => void,
  onBookmark: (id: string) => void,
  onComment: (id: string) => void,
  onShare: (id: string) => void
}) {
  const [isLiked, setIsLiked] = useState(post.interaction.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.interaction.isBookmarked);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(post.id);
  };

  const handleSubscribe = () => {
    console.log('Subscribe to:', post.creator.username);
  };

  const media = [{ url: post.content.mediaUrl, type: post.content.mediaType }];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <img 
            src={post.creator.avatar} 
            alt={post.creator.displayName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">{post.creator.displayName}</h3>
              {post.creator.isVerified && (
                <Verified className="w-4 h-4 text-blue-500" />
              )}
              {post.creator.isSubscribed && (
                <Crown className="w-4 h-4 text-yellow-500" />
              )}
            </div>
            <p className="text-sm text-gray-500">{post.creator.category}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <MediaCarousel 
        media={media} 
        isPremium={post.content.isPremium} 
        onSubscribe={handleSubscribe}
      />

      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors ${
              isLiked ? 'text-pink-500' : 'text-gray-500 hover:text-pink-500'
            }`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{post.analytics.likes}</span>
          </button>
          
          <button
            onClick={() => onComment(post.id)}
            className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm font-medium">{post.analytics.comments}</span>
          </button>
          
          <button
            onClick={handleBookmark}
            className={`flex items-center space-x-2 transition-colors ${
              isBookmarked ? 'text-purple-500' : 'text-gray-500 hover:text-purple-500'
            }`}
          >
            <Bookmark className={`w-6 h-6 ${isBookmarked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{post.analytics.bookmarks}</span>
          </button>
        </div>
        
        <button
          onClick={() => onShare(post.id)}
          className="text-gray-500 hover:text-green-500 transition-colors"
        >
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      <div className="px-4 pb-4">
        <h4 className="font-semibold text-gray-900 mb-2">{post.content.title}</h4>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.content.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {post.content.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{post.metadata.createdAt.toLocaleDateString('ja-JP')}</span>
          {post.content.isPremium && (
            <span className="flex items-center space-x-1 text-purple-600">
              <Lock className="w-3 h-3" />
              <span>プレミアム</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Right Sidebar Component
function RightSidebar() {
  return (
    <div className="hidden lg:block w-80 p-6 bg-gray-50">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">おすすめクリエイター</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <img 
                src={`https://images.pexels.com/photos/${2070033 + i}/pexels-photo-${2070033 + i}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                alt="Creator"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">クリエイター{i}</h4>
                <p className="text-sm text-gray-500">フォロワー: {1000 * i}</p>
              </div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                フォロー
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">トレンドタグ</h3>
        <div className="flex flex-wrap gap-2">
          {['#桜', '#春', '#東京', '#写真', '#コスプレ', '#アニメ'].map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full shadow-sm hover:bg-purple-50 cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-4 text-white text-center">
        <h4 className="font-semibold mb-2">プレミアム会員</h4>
        <p className="text-sm opacity-90 mb-3">特別コンテンツを無制限で視聴</p>
        <Button className="bg-white text-purple-600 hover:bg-gray-100 w-full">
          今すぐ始める
        </Button>
      </div>
    </div>
  );
}

// Main FeedPage Component
export function FeedPage() {
  const [posts, setPosts] = useState(feedPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);

  const loadMorePosts = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPosts = [...posts, ...feedPosts.map((post, index) => ({ ...post, id: `${post.id}_${posts.length + index}` }))];
    setPosts(newPosts);
    
    if (newPosts.length > 20) {
      setHasMore(false);
    }
    setLoading(false);
  };

  const handleLike = (id: string) => {
    setLikedPosts(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleBookmark = (id: string) => {
    setBookmarkedPosts(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleComment = (id: string) => {
    console.log('Comment on post:', id);
  };

  const handleShare = (id: string) => {
    console.log('Share post:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex max-w-7xl mx-auto">
        <div className="flex-1 px-4 py-6">
          <div className="max-w-md mx-auto space-y-6">
            {posts.map((post, index) => (
              <div key={post.id}>
                <FeedPostCard
                  post={post}
                  onLike={handleLike}
                  onBookmark={handleBookmark}
                  onComment={handleComment}
                  onShare={handleShare}
                />
              </div>
            ))}
            
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <p className="mt-2 text-gray-500">読み込み中...</p>
              </div>
            )}
            
            {hasMore && !loading && (
              <div className="text-center py-8">
                <Button 
                  onClick={loadMorePosts}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full"
                >
                  もっと見る
                </Button>
              </div>
            )}
            
            {!hasMore && (
              <div className="text-center py-8 text-gray-500">
                <p>すべての投稿を表示しました</p>
              </div>
            )}
          </div>
        </div>

        <RightSidebar />
      </div>
    </div>
  );
}
