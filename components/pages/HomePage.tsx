'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Eye, MessageCircle, Share2, Star } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const featuredCreators = [
  {
    id: '1',
    username: 'sakura_chan',
    displayName: 'Sakura',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    followers: 45600,
    posts: 234,
    isVerified: true,
    category: 'Photography',
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
  },
];

const recentPosts = [
  {
    id: '1',
    creator: featuredCreators[0],
    content: 'Just finished an amazing photoshoot in Shibuya! The cherry blossoms are in full bloom 🌸',
    image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 1234,
    views: 5678,
    comments: 89,
    timestamp: Date.now() - 1000 * 60 * 30,
  },
  {
    id: '2',
    creator: featuredCreators[1],
    content: 'New workout routine dropping tomorrow! Who\'s ready to get stronger? 💪',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 892,
    views: 3456,
    comments: 67,
    timestamp: Date.now() - 1000 * 60 * 60,
  },
  {
    id: '3',
    creator: featuredCreators[2],
    content: 'Working on a new digital art piece inspired by cyberpunk aesthetics ✨',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 567,
    views: 2134,
    comments: 34,
    timestamp: Date.now() - 1000 * 60 * 120,
  },
];

export function HomePage() {
  const { t } = useI18n();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const toggleLike = (postId: string) => {
    setLikedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          {t('hero.title')}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
      </div>

      {/* Featured Creators */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Creators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCreators.map((creator) => (
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
                  <span>{creator.followers.toLocaleString()} {t('creator.followers')}</span>
                  <span>{creator.posts} {t('creator.posts')}</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  {t('creator.subscribe')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
        <div className="space-y-6">
          {recentPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-6 pb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Image
                      src={post.creator.avatar}
                      alt={post.creator.displayName}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">{post.creator.displayName}</h4>
                        {post.creator.isVerified && (
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">@{post.creator.username}</p>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-4">{post.content}</p>
                </div>
                
                {post.image && (
                  <Image
                    src={post.image}
                    alt="Post content"
                    width={800}
                    height={256}
                    className="w-full h-64 object-cover"
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
                        <Heart className={`w-4 h-4 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                        <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                      </Button>
                      
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Eye className="w-4 h-4" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
