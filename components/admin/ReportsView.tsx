'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Flag, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Calendar,
  User,
  MessageSquare,
  ExternalLink,
  Clock,
  Shield
} from 'lucide-react';

interface Report {
  id: string;
  type: 'content' | 'user' | 'spam' | 'harassment' | 'copyright' | 'other';
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  reporter: {
    id: string;
    username: string;
    avatar: string;
  };
  reportedContent?: {
    id: string;
    type: 'post' | 'comment' | 'image' | 'video';
    content: string;
    creator: {
      username: string;
      avatar: string;
    };
    url: string;
  };
  reportedUser?: {
    id: string;
    username: string;
    avatar: string;
  };
  reason: string;
  description: string;
  evidence?: string[];
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  resolution?: string;
  actionTaken?: string;
}

// Mock data
const mockReports: Report[] = [
  {
    id: '1',
    type: 'harassment',
    status: 'pending',
    priority: 'high',
    reporter: {
      id: 'reporter1',
      username: 'victim_user',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    reportedUser: {
      id: 'harasser1',
      username: 'harasser123',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    reason: 'Harassment and bullying',
    description: 'This user has been sending me threatening messages and commenting inappropriate things on my posts.',
    evidence: ['screenshot1.png', 'messages.pdf'],
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '2',
    type: 'content',
    status: 'investigating',
    priority: 'medium',
    reporter: {
      id: 'reporter2',
      username: 'content_mod',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    reportedContent: {
      id: 'content1',
      type: 'post',
      content: 'This post contains inappropriate content that violates community guidelines...',
      creator: {
        username: 'user456',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      url: '/content/123',
    },
    reason: 'Inappropriate content',
    description: 'This post contains explicit content that is not suitable for our platform.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    assignedTo: 'admin_sarah',
  },
  {
    id: '3',
    type: 'spam',
    status: 'resolved',
    priority: 'low',
    reporter: {
      id: 'reporter3',
      username: 'community_user',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    reportedContent: {
      id: 'content2',
      type: 'comment',
      content: 'Check out this amazing deal! Click here for free money!',
      creator: {
        username: 'spammer789',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      url: '/content/456',
    },
    reason: 'Spam',
    description: 'This user is posting spam comments with suspicious links.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    resolution: 'Content removed, user warned',
    actionTaken: 'Comment deleted and user received warning',
  },
  {
    id: '4',
    type: 'copyright',
    status: 'pending',
    priority: 'urgent',
    reporter: {
      id: 'reporter4',
      username: 'copyright_holder',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    reportedContent: {
      id: 'content3',
      type: 'image',
      content: 'Image post with copyrighted material',
      creator: {
        username: 'user789',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      url: '/content/789',
    },
    reason: 'Copyright infringement',
    description: 'This image is using my copyrighted artwork without permission.',
    evidence: ['copyright_registration.pdf', 'original_artwork.jpg'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
];

interface ReportsViewProps {
  limit?: number;
}

export function ReportsView({ limit }: ReportsViewProps) {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [resolution, setResolution] = useState('');
  const [actionTaken, setActionTaken] = useState('');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.reporter.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || report.status === filter || report.type === filter;
    return matchesSearch && matchesFilter;
  }).slice(0, limit);

  const handleResolve = (reportId: string) => {
    setReports(prev =>
      prev.map(report =>
        report.id === reportId
          ? {
              ...report,
              status: 'resolved',
              updatedAt: new Date(),
              resolution,
              actionTaken,
            }
          : report
      )
    );
    setSelectedReport(null);
    setResolution('');
    setActionTaken('');
  };

  const handleDismiss = (reportId: string) => {
    setReports(prev =>
      prev.map(report =>
        report.id === reportId
          ? {
              ...report,
              status: 'dismissed',
              updatedAt: new Date(),
              resolution: 'Report dismissed',
              actionTaken: 'No action taken',
            }
          : report
      )
    );
  };

  const handleInvestigate = (reportId: string) => {
    setReports(prev =>
      prev.map(report =>
        report.id === reportId
          ? {
              ...report,
              status: 'investigating',
              updatedAt: new Date(),
              assignedTo: 'current_admin',
            }
          : report
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'dismissed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'harassment': return 'bg-red-100 text-red-800';
      case 'content': return 'bg-yellow-100 text-yellow-800';
      case 'spam': return 'bg-purple-100 text-purple-800';
      case 'copyright': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Reports Management</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter reports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="copyright">Copyright</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className={getPriorityColor(report.priority)}>
                      {report.priority} priority
                    </Badge>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                    <Badge className={getTypeColor(report.type)}>
                      {report.type}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <Image
                      src={report.reporter.avatar}
                      alt={report.reporter.username}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="font-medium">@{report.reporter.username}</span>
                    <span className="text-gray-500">reported</span>
                    {report.reportedUser && (
                      <>
                        <span className="text-gray-500">user</span>
                        <span className="font-medium">@{report.reportedUser.username}</span>
                      </>
                    )}
                    {report.reportedContent && (
                      <>
                        <span className="text-gray-500">content by</span>
                        <span className="font-medium">@{report.reportedContent.creator.username}</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-semibold mb-2">{report.reason}</h3>
                  <p className="text-gray-700 mb-3">{report.description}</p>

                  {report.reportedContent && (
                    <div className="bg-gray-50 p-3 rounded mb-3">
                      <p className="text-sm text-gray-600 mb-1">Reported Content:</p>
                      <p className="text-sm">{report.reportedContent.content}</p>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{report.createdAt.toLocaleDateString()}</span>
                    </div>
                    {report.assignedTo && (
                      <div className="flex items-center space-x-1">
                        <Shield className="w-4 h-4" />
                        <span>Assigned to {report.assignedTo}</span>
                      </div>
                    )}
                  </div>

                  {report.evidence && report.evidence.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-1">Evidence:</p>
                      <div className="flex flex-wrap gap-1">
                        {report.evidence.map((evidence, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {evidence}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {report.resolution && (
                    <div className="p-2 bg-green-50 rounded text-sm">
                      <strong>Resolution:</strong> {report.resolution}
                      {report.actionTaken && (
                        <div className="mt-1">
                          <strong>Action:</strong> {report.actionTaken}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedReport(report)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Review Report</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Report Details</h4>
                          <div className="space-y-2 text-sm">
                            <div><strong>Reporter:</strong> @{report.reporter.username}</div>
                            <div><strong>Type:</strong> {report.type}</div>
                            <div><strong>Reason:</strong> {report.reason}</div>
                            <div><strong>Description:</strong> {report.description}</div>
                            <div><strong>Created:</strong> {report.createdAt.toLocaleDateString()}</div>
                          </div>
                        </div>

                        {report.reportedContent && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Reported Content</h4>
                            <div className="space-y-2 text-sm">
                              <div><strong>Creator:</strong> @{report.reportedContent.creator.username}</div>
                              <div><strong>Type:</strong> {report.reportedContent.type}</div>
                              <div><strong>Content:</strong> {report.reportedContent.content}</div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => window.open(report.reportedContent!.url, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Content
                            </Button>
                          </div>
                        )}

                        {report.status === 'pending' && (
                          <>
                            <div>
                              <label className="text-sm font-medium">Resolution Notes</label>
                              <Textarea
                                value={resolution}
                                onChange={(e) => setResolution(e.target.value)}
                                placeholder="Add resolution notes..."
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Action Taken</label>
                              <Textarea
                                value={actionTaken}
                                onChange={(e) => setActionTaken(e.target.value)}
                                placeholder="Describe action taken..."
                                className="mt-1"
                              />
                            </div>

                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleInvestigate(report.id)}
                                variant="outline"
                              >
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                Investigate
                              </Button>
                              <Button
                                onClick={() => handleResolve(report.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Resolve
                              </Button>
                              <Button
                                onClick={() => handleDismiss(report.id)}
                                variant="destructive"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Dismiss
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  {report.status === 'pending' && (
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        onClick={() => handleInvestigate(report.id)}
                        variant="outline"
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleResolve(report.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDismiss(report.id)}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {report.reportedContent && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(report.reportedContent!.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Flag className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No reports found</h3>
            <p className="text-gray-600">All reports have been processed.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
