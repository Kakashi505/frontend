'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const feedPosts = [
  {
    id: '1',
    creator: {
      username: 'yuki_model',
      displayName: 'Yuki Tanaka',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVerified: true,
      tier: 'premium',
    },
    content: 'Behind the scenes from today\'s fashion shoot! Loving this new collection 💫',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 2341,
    comments: 156,
    shares: 43,
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    isPremium: true,
  },
  {
    id: '2',
    creator: {
      username: 'chef_marcus',
      displayName: 'Marcus Johnson',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVerified: true,
      tier: 'standard',
    },
    content: 'New recipe tutorial is live! Making authentic ramen from scratch 🍜',
    image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 1876,
    comments: 234,
    shares: 67,
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    isPremium: false,
  },
  {
    id: '3',
    creator: {
      username: 'luna_music',
      displayName: 'Luna Park',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVerified: false,
      tier: 'basic',
    },
    content: 'Acoustic session in the studio tonight. What song should I cover next? 🎵',
    image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 943,
    comments: 89,
    shares: 21,
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    isPremium: false,
  },
];

export function FeedPage() {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'subscribed' | 'premium'>('all');

  const toggleLike = (postId: string) => {
    setLikedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const filteredPosts = feedPosts.filter(post => {
    if (filterType === 'subscribed') return true; // Mock: show all as subscribed
    if (filterType === 'premium') return post.isPremium;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Filter Section */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Your Feed</h1>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <div className="flex space-x-1">
            {[
              { key: 'all', label: 'All' },
              { key: 'subscribed', label: 'Subscribed' },
              { key: 'premium', label: 'Premium' },
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={filterType === filter.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilterType(filter.key as any)}
                className={filterType === filter.key ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              {/* Post Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.creator.avatar}
                      alt={post.creator.displayName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{post.creator.displayName}</h3>
                        {post.creator.isVerified && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        {post.isPremium && (
                          <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">@{post.creator.username}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {post.creator.tier}
                  </Badge>
                </div>
                <p className="text-gray-800">{post.content}</p>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="relative">
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-80 object-cover"
                  />
                  {post.isPremium && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-medium">
                        Premium Content
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Post Actions */}
              <div className="p-6 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center space-x-2 ${
                        likedPosts.includes(post.id) ? 'text-red-500' : 'text-gray-600'
                      } hover:text-red-500 transition-colors`}
                    >
                      <Heart className={`w-5 h-5 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                      <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:text-green-500">
                      <Share2 className="w-5 h-5" />
                      <span>{post.shares}</span>
                    </Button>
                  </div>
                  
                  <span className="text-sm text-gray-500">
                    {new Date(post.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}