'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Trash2, 
  AlertTriangle, 
  FileText, 
  User, 
  Calendar,
  ExternalLink,
  Download,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface TakedownRequest {
  id: string;
  type: 'copyright' | 'dmca' | 'inappropriate' | 'legal' | 'other';
  status: 'pending' | 'approved' | 'rejected' | 'in_progress';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  requester: {
    name: string;
    email: string;
    organization?: string;
    isVerified: boolean;
  };
  content: {
    id: string;
    type: 'post' | 'image' | 'video' | 'comment';
    url: string;
    creator: {
      username: string;
      avatar: string;
    };
    preview?: string;
  };
  reason: string;
  evidence?: string[];
  createdAt: Date;
  deadline?: Date;
  notes?: string;
}

// Mock data
const mockTakedownRequests: TakedownRequest[] = [
  {
    id: '1',
    type: 'copyright',
    status: 'pending',
    priority: 'high',
    requester: {
      name: 'John Smith',
      email: 'john.smith@company.com',
      organization: 'TechCorp Inc.',
      isVerified: true,
    },
    content: {
      id: 'content1',
      type: 'image',
      url: '/content/123',
      creator: {
        username: 'user123',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      preview: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    reason: 'Copyright infringement - unauthorized use of company logo',
    evidence: ['evidence1.pdf', 'copyright_registration.pdf'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: '2',
    type: 'dmca',
    status: 'in_progress',
    priority: 'urgent',
    requester: {
      name: 'Sarah Johnson',
      email: 'sarah@musiclabel.com',
      organization: 'MusicLabel Records',
      isVerified: true,
    },
    content: {
      id: 'content2',
      type: 'video',
      url: '/content/456',
      creator: {
        username: 'creator789',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    },
    reason: 'DMCA takedown - unauthorized distribution of copyrighted music',
    evidence: ['dmca_notice.pdf', 'music_copyright.pdf'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    notes: 'Content has been temporarily removed pending review',
  },
  {
    id: '3',
    type: 'inappropriate',
    status: 'pending',
    priority: 'medium',
    requester: {
      name: 'Mike Wilson',
      email: 'mike@example.com',
      isVerified: false,
    },
    content: {
      id: 'content3',
      type: 'post',
      url: '/content/789',
      creator: {
        username: 'user456',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    },
    reason: 'Inappropriate content violating community guidelines',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
];

export function TakedownTools() {
  const [requests, setRequests] = useState<TakedownRequest[]>(mockTakedownRequests);
  const [selectedRequest, setSelectedRequest] = useState<TakedownRequest | null>(null);
  const [filter, setFilter] = useState('all');
  const [adminNote, setAdminNote] = useState('');

  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    if (filter === 'pending') return request.status === 'pending';
    if (filter === 'urgent') return request.priority === 'urgent';
    if (filter === 'copyright') return request.type === 'copyright';
    return true;
  });

  const handleAction = (requestId: string, action: 'approved' | 'rejected' | 'in_progress') => {
    setRequests(prev =>
      prev.map(request =>
        request.id === requestId
          ? { ...request, status: action, notes: adminNote }
          : request
      )
    );
    setSelectedRequest(null);
    setAdminNote('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'copyright': return <FileText className="w-4 h-4" />;
      case 'dmca': return <AlertTriangle className="w-4 h-4" />;
      case 'inappropriate': return <Trash2 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Takedown Tools</h2>
          <p className="text-gray-600">Manage content removal requests and legal takedowns</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter requests" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requests</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="copyright">Copyright</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Takedown Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Pending Requests</span>
                <Badge variant="secondary">{requests.filter(r => r.status === 'pending').length}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Urgent Requests</span>
                <Badge variant="destructive">{requests.filter(r => r.priority === 'urgent').length}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Copyright Claims</span>
                <Badge variant="outline">{requests.filter(r => r.type === 'copyright').length}</Badge>
              </div>
              <div className="flex justify-between">
                <span>DMCA Notices</span>
                <Badge variant="outline">{requests.filter(r => r.type === 'dmca').length}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      {getTypeIcon(request.type)}
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority} priority
                      </Badge>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant="outline">
                        {request.type.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{request.requester.name}</span>
                      {request.requester.organization && (
                        <Badge variant="secondary" className="text-xs">
                          {request.requester.organization}
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-700 mb-3">{request.reason}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{request.createdAt.toLocaleDateString()}</span>
                      </div>
                      {request.deadline && (
                        <div className="flex items-center space-x-1">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Deadline: {request.deadline.toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {request.evidence && request.evidence.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Evidence:</p>
                        <div className="flex flex-wrap gap-1">
                          {request.evidence.map((evidence, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Download className="w-3 h-3 mr-1" />
                              {evidence}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {request.content.preview && (
                      <Image
                        src={request.content.preview}
                        alt="Content preview"
                        width={120}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRequest(request)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Review Takedown Request</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Request Details</h4>
                            <div className="space-y-2 text-sm">
                              <div><strong>Requester:</strong> {request.requester.name} ({request.requester.email})</div>
                              <div><strong>Type:</strong> {request.type.toUpperCase()}</div>
                              <div><strong>Priority:</strong> {request.priority}</div>
                              <div><strong>Reason:</strong> {request.reason}</div>
                              {request.deadline && (
                                <div><strong>Deadline:</strong> {request.deadline.toLocaleDateString()}</div>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium">Admin Note</label>
                            <Textarea
                              value={adminNote}
                              onChange={(e) => setAdminNote(e.target.value)}
                              placeholder="Add notes about your decision..."
                              className="mt-1"
                            />
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleAction(request.id, 'approved')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve Takedown
                            </Button>
                            <Button
                              onClick={() => handleAction(request.id, 'in_progress')}
                              variant="outline"
                            >
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              Mark In Progress
                            </Button>
                            <Button
                              onClick={() => handleAction(request.id, 'rejected')}
                              variant="destructive"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(request.content.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Content
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No takedown requests</h3>
            <p className="text-gray-600">All requests have been processed.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
