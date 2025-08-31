'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  AlertTriangle, 
  Clock,
  User,
  Calendar,
  Flag
} from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'post' | 'comment' | 'image' | 'video';
  content: string;
  image?: string;
  creator: {
    id: string;
    username: string;
    avatar: string;
    isVerified: boolean;
  };
  reportedBy: string[];
  reportReasons: string[];
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

// Mock data
const mockContentItems: ContentItem[] = [
  {
    id: '1',
    type: 'post',
    content: 'This is a potentially inappropriate post that needs review...',
    creator: {
      id: '1',
      username: 'user123',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVerified: false,
    },
    reportedBy: ['user456', 'user789'],
    reportReasons: ['Inappropriate content', 'Spam'],
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    priority: 'high',
  },
  {
    id: '2',
    type: 'image',
    content: 'Image post with questionable content',
    image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator: {
      id: '2',
      username: 'creator456',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVerified: true,
    },
    reportedBy: ['user123'],
    reportReasons: ['Copyright violation'],
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    priority: 'medium',
  },
  {
    id: '3',
    type: 'comment',
    content: 'Spam comment with links to external sites',
    creator: {
      id: '3',
      username: 'spammer789',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVerified: false,
    },
    reportedBy: ['user456', 'user789', 'user101'],
    reportReasons: ['Spam', 'Inappropriate content'],
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 120),
    priority: 'high',
  },
];

interface ContentReviewQueueProps {
  limit?: number;
}

export function ContentReviewQueue({ limit }: ContentReviewQueueProps) {
  const [contentItems, setContentItems] = useState<ContentItem[]>(mockContentItems);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredItems = contentItems
    .filter(item => {
      if (filter === 'all') return true;
      if (filter === 'pending') return item.status === 'pending';
      if (filter === 'high-priority') return item.priority === 'high';
      return true;
    })
    .slice(0, limit);

  const handleReview = (itemId: string, action: 'approve' | 'reject' | 'flag') => {
    setContentItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'flagged' }
          : item
      )
    );
    setSelectedItem(null);
    setReviewNote('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'flagged': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Content Review Queue</h2>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="high-priority">High Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {/* Content Preview */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority} priority
                    </Badge>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                    <Badge variant="outline">
                      {item.type}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <Image
                      src={item.creator.avatar}
                      alt={item.creator.username}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="font-medium">@{item.creator.username}</span>
                    {item.creator.isVerified && (
                      <Badge variant="secondary" className="text-xs">Verified</Badge>
                    )}
                  </div>

                  <p className="text-gray-700 mb-3">{item.content}</p>

                  {item.image && (
                    <Image
                      src={item.image}
                      alt="Content preview"
                      width={200}
                      height={120}
                      className="rounded-lg object-cover"
                    />
                  )}

                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Flag className="w-4 h-4" />
                      <span>{item.reportedBy.length} reports</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-1">Report reasons:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.reportReasons.map((reason, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {reason}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedItem(item)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Review Content</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Content Details</h4>
                          <p className="text-gray-700">{item.content}</p>
                          {item.image && (
                            <Image
                              src={item.image}
                              alt="Content"
                              width={400}
                              height={300}
                              className="rounded-lg mt-3 object-cover"
                            />
                          )}
                        </div>

                        <div>
                          <label className="text-sm font-medium">Review Note (Optional)</label>
                          <Textarea
                            value={reviewNote}
                            onChange={(e) => setReviewNote(e.target.value)}
                            placeholder="Add a note about your decision..."
                            className="mt-1"
                          />
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleReview(item.id, 'approve')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReview(item.id, 'flag')}
                            variant="outline"
                          >
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Flag
                          </Button>
                          <Button
                            onClick={() => handleReview(item.id, 'reject')}
                            variant="destructive"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {item.status === 'pending' && (
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        onClick={() => handleReview(item.id, 'approve')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleReview(item.id, 'reject')}
                        variant="destructive"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No items to review</h3>
            <p className="text-gray-600">All content has been reviewed and processed.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
