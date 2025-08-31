'use client';

import { useState } from 'react';
import { Crown, TrendingUp, Star, Users } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const rankingData = [
  {
    id: '1',
    rank: 1,
    creator: {
      username: 'sakura_chan',
      displayName: 'Sakura',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Photography',
      isVerified: true,
    },
    followers: 156789,
    growth: '+12.5%',
    revenue: '$45,230',
    posts: 234,
  },
  {
    id: '2',
    rank: 2,
    creator: {
      username: 'alex_fitness',
      displayName: 'Alex Cooper',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fitness',
      isVerified: true,
    },
    followers: 134567,
    growth: '+8.3%',
    revenue: '$38,920',
    posts: 189,
  },
  {
    id: '3',
    rank: 3,
    creator: {
      username: 'chef_marcus',
      displayName: 'Marcus Johnson',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Cooking',
      isVerified: true,
    },
    followers: 98432,
    growth: '+15.7%',
    revenue: '$29,840',
    posts: 156,
  },
  {
    id: '4',
    rank: 4,
    creator: {
      username: 'emma_art',
      displayName: 'Emma Rodriguez',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Art',
      isVerified: false,
    },
    followers: 87654,
    growth: '+6.2%',
    revenue: '$24,560',
    posts: 143,
  },
  {
    id: '5',
    rank: 5,
    creator: {
      username: 'luna_music',
      displayName: 'Luna Park',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Music',
      isVerified: false,
    },
    followers: 76543,
    growth: '+4.8%',
    revenue: '$21,340',
    posts: 167,
  },
];

const categories = ['All', 'Photography', 'Fitness', 'Art', 'Music', 'Cooking', 'Gaming'];

export function RankingPage() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <div className="w-5 h-5 bg-gray-400 rounded-full" />;
    if (rank === 3) return <div className="w-5 h-5 bg-amber-600 rounded-full" />;
    return <span className="w-5 h-5 text-center text-sm font-bold text-gray-600">{rank}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          {t('ranking.title')}
        </h1>
        <p className="text-gray-600">Discover the most popular creators on the platform</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-purple-600 hover:bg-purple-700' : ''}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
            <div className="flex gap-2">
              {[
                { key: 'weekly', label: 'Weekly' },
                { key: 'monthly', label: 'Monthly' },
                { key: 'yearly', label: 'Yearly' },
              ].map((option) => (
                <Button
                  key={option.key}
                  variant={timeframe === option.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeframe(option.key as any)}
                  className={timeframe === option.key ? 'bg-purple-600 hover:bg-purple-700' : ''}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rankings */}
      <div className="space-y-4">
        {rankingData.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                {/* Rank */}
                <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-full">
                  {getRankIcon(item.rank)}
                </div>

                {/* Creator Info */}
                <div className="flex items-center space-x-4 flex-1">
                  <img
                    src={item.creator.avatar}
                    alt={item.creator.displayName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.creator.displayName}</h3>
                      {item.creator.isVerified && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                      <Badge variant="outline" className="text-xs">
                        {item.creator.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">@{item.creator.username}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center space-x-8 text-sm">
                  <div className="text-center">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="font-semibold">{item.followers.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-500">Followers</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-green-600">{item.growth}</span>
                    </div>
                    <p className="text-gray-500">Growth</p>
                  </div>
                  <div className="text-center">
                    <span className="font-semibold text-purple-600">{item.revenue}</span>
                    <p className="text-gray-500">Revenue</p>
                  </div>
                </div>

                {/* Action */}
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Follow
                </Button>
              </div>

              {/* Mobile Stats */}
              <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-around text-sm">
                  <div className="text-center">
                    <span className="font-semibold block">{item.followers.toLocaleString()}</span>
                    <span className="text-gray-500">Followers</span>
                  </div>
                  <div className="text-center">
                    <span className="font-semibold block text-green-600">{item.growth}</span>
                    <span className="text-gray-500">Growth</span>
                  </div>
                  <div className="text-center">
                    <span className="font-semibold block text-purple-600">{item.revenue}</span>
                    <span className="text-gray-500">Revenue</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}