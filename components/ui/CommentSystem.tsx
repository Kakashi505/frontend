'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Heart, Flag, MoreHorizontal, Send, User, Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  isCreator: boolean;
  rank: 'user' | 'subscriber' | 'premium' | 'vip';
  isVerified: boolean;
  isModerated: boolean;
  replyTo?: string;
  replies: Comment[];
}

interface CommentSystemProps {
  postId: string;
  initialComments?: Comment[];
  onCommentSubmit?: (comment: Comment) => void;
  onCommentLike?: (commentId: string) => void;
  onCommentReport?: (commentId: string, reason: string) => void;
  isSubscribed: boolean;
  canComment: boolean;
  maxComments?: number;
}

export function CommentSystem({
  postId,
  initialComments = [],
  onCommentSubmit,
  onCommentLike,
  onCommentReport,
  isSubscribed,
  canComment,
  maxComments = 50
}: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'mostLiked'>('newest');
  const [isLoading, setIsLoading] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new comments arrive
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  // Simulate real-time comment updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This would be replaced with actual WebSocket or polling logic
      // For now, just simulate new comments occasionally
      if (Math.random() < 0.1 && comments.length < maxComments) {
        const newComment: Comment = {
          id: `comment_${Date.now()}`,
          userId: `user_${Math.floor(Math.random() * 1000)}`,
          username: `user${Math.floor(Math.random() * 1000)}`,
          displayName: `User ${Math.floor(Math.random() * 1000)}`,
          avatar: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=400`,
          content: 'Great content! Thanks for sharing! 👍',
          timestamp: new Date(),
          likes: Math.floor(Math.random() * 10),
          isLiked: false,
          isCreator: false,
          rank: Math.random() > 0.7 ? 'premium' : 'user',
          isVerified: Math.random() > 0.8,
          isModerated: false,
          replies: []
        };
        setComments(prev => [newComment, ...prev]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [comments.length, maxComments]);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !canComment) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const comment: Comment = {
      id: `comment_${Date.now()}`,
      userId: 'current_user',
      username: 'current_user',
      displayName: 'You',
      avatar: '/assets/default-avatar.png',
      content: newComment.trim(),
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      isCreator: false,
      rank: isSubscribed ? 'subscriber' : 'user',
      isVerified: false,
      isModerated: false,
      replyTo: replyTo || undefined,
      replies: []
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    setReplyTo(null);
    setIsLoading(false);

    onCommentSubmit?.(comment);
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
        : comment
    ));
    onCommentLike?.(commentId);
  };

  const handleReportComment = (commentId: string) => {
    const reason = prompt('Please specify the reason for reporting this comment:');
    if (reason) {
      onCommentReport?.(commentId, reason);
      // Mark as reported locally
      setComments(prev => prev.map(comment => 
        comment.id === commentId ? { ...comment, isModerated: true } : comment
      ));
    }
  };

  const getRankIcon = (rank: Comment['rank']) => {
    switch (rank) {
      case 'vip': return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'premium': return <Star className="w-4 h-4 text-purple-500" />;
      case 'subscriber': return <Star className="w-4 h-4 text-blue-500" />;
      default: return null;
    }
  };

  const getRankLabel = (rank: Comment['rank']) => {
    switch (rank) {
      case 'vip': return 'VIP';
      case 'premium': return 'Premium';
      case 'subscriber': return 'Subscriber';
      default: return 'User';
    }
  };

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.timestamp.getTime() - a.timestamp.getTime();
      case 'oldest':
        return a.timestamp.getTime() - b.timestamp.getTime();
      case 'mostLiked':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const displayedComments = showAllComments ? sortedComments : sortedComments.slice(0, 10);

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="space-y-4">
      {/* Comment Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Comments ({comments.length})
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="mostLiked">Most Liked</option>
          </select>
        </div>
      </div>

      {/* Comment Input */}
      {canComment && (
        <div className="space-y-3">
          {replyTo && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Replying to comment</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyTo(null)}
                className="h-6 px-2 text-xs"
              >
                Cancel
              </Button>
            </div>
          )}
          
          <div className="flex space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/assets/default-avatar.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                className="rounded-full"
              />
            </div>
            <Button
              onClick={handleSubmitComment}
              disabled={isLoading || !newComment.trim()}
              className="rounded-full px-4"
            >
              {isLoading ? '...' : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        <AnimatePresence>
          {displayedComments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`bg-white rounded-lg p-4 border ${
                comment.isModerated ? 'border-red-200 bg-red-50' : 'border-gray-200'
              }`}
            >
              <div className="flex space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.displayName[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  {/* Comment Header */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">{comment.displayName}</span>
                    {comment.isVerified && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                        Verified
                      </Badge>
                    )}
                    {getRankIcon(comment.rank)}
                    <Badge variant="outline" className="text-xs">
                      {getRankLabel(comment.rank)}
                    </Badge>
                    {comment.isCreator && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                        Creator
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(comment.timestamp)}
                    </span>
                  </div>

                  {/* Comment Content */}
                  <p className="text-gray-800 mb-3">{comment.content}</p>

                  {/* Comment Actions */}
                  <div className="flex items-center space-x-4 text-sm">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className={`flex items-center space-x-1 transition-colors ${
                        comment.isLiked ? 'text-pink-500' : 'text-gray-500 hover:text-pink-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                      <span>{comment.likes}</span>
                    </button>
                    
                    <button
                      onClick={() => setReplyTo(comment.id)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-purple-500 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                    
                    <button
                      onClick={() => handleReportComment(comment.id)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Flag className="w-4 h-4" />
                      <span>Report</span>
                    </button>
                  </div>

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="mt-3 pl-4 border-l-2 border-gray-200 space-y-2">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="bg-gray-50 rounded p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">{reply.displayName}</span>
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(reply.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Comments */}
      {comments.length > 10 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllComments(!showAllComments)}
            className="rounded-full"
          >
            {showAllComments ? 'Show Less' : `Show ${comments.length - 10} More Comments`}
          </Button>
        </div>
      )}

      {/* Auto-update indicator */}
      <div className="text-center text-sm text-gray-500">
        <span className="inline-flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Comments update automatically</span>
        </span>
      </div>

      <div ref={commentsEndRef} />
    </div>
  );
}
