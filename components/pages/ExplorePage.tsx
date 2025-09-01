'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  ShoppingCart, 
  Star, 
  Heart, 
  Bookmark, 
  Eye, 
  Play, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock trending content data
const trendingContent = [
  {
    id: '1',
    title: 'Currently attracting the most attention',
    badge: 'TOP 5',
    type: 'trending',
    image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
    updatedDate: '8/18',
  },
  {
    id: '2',
    title: 'Super popular!',
    badge: 'TOP 5',
    type: 'popular',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
    updatedDate: '8/18',
  },
  {
    id: '3',
    title: 'NEW',
    badge: 'Play',
    type: 'new',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    updatedDate: '8/18',
  },
];

// Mock post library data
const postLibrary = [
  {
    id: '1',
    icon: ShoppingCart,
    label: 'Purchased',
    count: 0,
  },
  {
    id: '2',
    icon: Bookmark,
    label: 'Saved',
    count: 0,
  },
  {
    id: '3',
    icon: Heart,
    label: 'Liked',
    count: 0,
  },
  {
    id: '4',
    icon: Eye,
    label: 'Viewing history',
    count: 0,
  },
];

// Mock recommended genres data
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

export function ExplorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Trending Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trendingContent.map((content) => (
          <Card key={content.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-500 text-white text-xs">
                  {content.title}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-purple-600 text-white text-xs">
                  {content.badge}
                </Badge>
              </div>
              
              {/* Updated date */}
              <div className="absolute bottom-4 left-4">
                <span className="text-white text-sm">Updated on {content.updatedDate}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Post Library Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">Post library</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {postLibrary.map((item) => (
            <Card key={item.id} className="p-6 text-center hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-gray-100 rounded-full">
                  <item.icon className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{item.count}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Genres Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">Recommended genres</h2>
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
        
        <div className="text-center pt-4">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white">
            See more genres <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
