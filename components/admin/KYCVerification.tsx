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
  UserCheck, 
  UserX, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Calendar,
  Shield,
  AlertTriangle,
  FileText,
  Download
} from 'lucide-react';

interface KYCApplication {
  id: string;
  userId: string;
  username: string;
  email: string;
  avatar: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  type: 'age_verification' | 'identity_verification' | 'creator_verification';
  priority: 'low' | 'medium' | 'high';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  documents: {
    type: string;
    filename: string;
    url: string;
    uploadedAt: Date;
  }[];
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    country: string;
    phoneNumber?: string;
  };
  notes?: string;
  rejectionReason?: string;
}

// Mock data
const mockKYCApplications: KYCApplication[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'john_doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'pending',
    type: 'age_verification',
    priority: 'high',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    documents: [
      {
        type: 'Government ID',
        filename: 'passport_john_doe.pdf',
        url: '/documents/passport_john_doe.pdf',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
      {
        type: 'Selfie with ID',
        filename: 'selfie_john_doe.jpg',
        url: '/documents/selfie_john_doe.jpg',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
    ],
    personalInfo: {
      fullName: 'John Doe',
      dateOfBirth: '1995-03-15',
      country: 'United States',
      phoneNumber: '+1-555-0123',
    },
  },
  {
    id: '2',
    userId: 'user2',
    username: 'creator_emma',
    email: 'emma@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'under_review',
    type: 'creator_verification',
    priority: 'medium',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    reviewedAt: new Date(Date.now() - 1000 * 60 * 30),
    reviewedBy: 'admin_sarah',
    documents: [
      {
        type: 'Business License',
        filename: 'business_license_emma.pdf',
        url: '/documents/business_license_emma.pdf',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
      },
      {
        type: 'Tax Documents',
        filename: 'tax_docs_emma.pdf',
        url: '/documents/tax_docs_emma.pdf',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
      },
    ],
    personalInfo: {
      fullName: 'Emma Rodriguez',
      dateOfBirth: '1990-07-22',
      country: 'Canada',
      phoneNumber: '+1-555-0456',
    },
    notes: 'Documents appear legitimate, need to verify business registration',
  },
  {
    id: '3',
    userId: 'user3',
    username: 'teen_user',
    email: 'teen@example.com',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'rejected',
    type: 'age_verification',
    priority: 'high',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    reviewedBy: 'admin_sarah',
    documents: [
      {
        type: 'School ID',
        filename: 'school_id_teen.pdf',
        url: '/documents/school_id_teen.pdf',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
    ],
    personalInfo: {
      fullName: 'Alex Johnson',
      dateOfBirth: '2008-11-10',
      country: 'United States',
    },
    rejectionReason: 'User is under 18 years old. Age verification failed.',
  },
];

export function KYCVerification() {
  const [applications, setApplications] = useState<KYCApplication[]>(mockKYCApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<KYCApplication | null>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || app.status === filter || app.type === filter;
    return matchesSearch && matchesFilter;
  });

  const handleApprove = (applicationId: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId
          ? {
              ...app,
              status: 'approved',
              reviewedAt: new Date(),
              reviewedBy: 'current_admin',
              notes: reviewNote,
            }
          : app
      )
    );
    setSelectedApplication(null);
    setReviewNote('');
  };

  const handleReject = (applicationId: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId
          ? {
              ...app,
              status: 'rejected',
              reviewedAt: new Date(),
              reviewedBy: 'current_admin',
              rejectionReason,
            }
          : app
      )
    );
    setSelectedApplication(null);
    setRejectionReason('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'age_verification': return 'bg-purple-100 text-purple-800';
      case 'identity_verification': return 'bg-blue-100 text-blue-800';
      case 'creator_verification': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">KYC Verification</h2>
          <p className="text-gray-600">Manage age verification and identity verification applications</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter applications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="age_verification">Age Verification</SelectItem>
              <SelectItem value="identity_verification">Identity Verification</SelectItem>
              <SelectItem value="creator_verification">Creator Verification</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Stats */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>KYC Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Total Applications</span>
                <Badge variant="secondary">{applications.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Pending Review</span>
                <Badge className="bg-orange-100 text-orange-800">
                  {applications.filter(a => a.status === 'pending').length}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Under Review</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {applications.filter(a => a.status === 'under_review').length}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Approved</span>
                <Badge className="bg-green-100 text-green-800">
                  {applications.filter(a => a.status === 'approved').length}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Rejected</span>
                <Badge className="bg-red-100 text-red-800">
                  {applications.filter(a => a.status === 'rejected').length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <div className="lg:col-span-3 space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Image
                    src={application.avatar}
                    alt={application.username}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">@{application.username}</h3>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={getTypeColor(application.type)}>
                        {application.type.replace('_', ' ')}
                      </Badge>
                      <Badge className={getPriorityColor(application.priority)}>
                        {application.priority} priority
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{application.email}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <strong>Name:</strong> {application.personalInfo.fullName}
                      </div>
                      <div>
                        <strong>Age:</strong> {calculateAge(application.personalInfo.dateOfBirth)} years
                      </div>
                      <div>
                        <strong>Country:</strong> {application.personalInfo.country}
                      </div>
                      <div>
                        <strong>Documents:</strong> {application.documents.length}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Submitted {application.submittedAt.toLocaleDateString()}</span>
                      </div>
                      {application.reviewedAt && (
                        <div className="flex items-center space-x-1">
                          <UserCheck className="w-4 h-4" />
                          <span>Reviewed {application.reviewedAt.toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {application.rejectionReason && (
                      <div className="mt-2 p-2 bg-red-50 rounded text-sm">
                        <strong>Rejection Reason:</strong> {application.rejectionReason}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Review KYC Application</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Personal Information</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div><strong>Full Name:</strong> {application.personalInfo.fullName}</div>
                              <div><strong>Date of Birth:</strong> {application.personalInfo.dateOfBirth}</div>
                              <div><strong>Age:</strong> {calculateAge(application.personalInfo.dateOfBirth)} years</div>
                              <div><strong>Country:</strong> {application.personalInfo.country}</div>
                              {application.personalInfo.phoneNumber && (
                                <div><strong>Phone:</strong> {application.personalInfo.phoneNumber}</div>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Documents</h4>
                            <div className="space-y-2">
                              {application.documents.map((doc, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <div>
                                    <div className="font-medium">{doc.type}</div>
                                    <div className="text-sm text-gray-600">{doc.filename}</div>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(doc.url, '_blank')}
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    View
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {application.status === 'pending' && (
                            <>
                              <div>
                                <label className="text-sm font-medium">Review Notes (Optional)</label>
                                <Textarea
                                  value={reviewNote}
                                  onChange={(e) => setReviewNote(e.target.value)}
                                  placeholder="Add notes about your review..."
                                  className="mt-1"
                                />
                              </div>

                              <div className="flex space-x-2">
                                <Button
                                  onClick={() => handleApprove(application.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="destructive">
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Reject
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Reject Application</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <label className="text-sm font-medium">Rejection Reason</label>
                                        <Textarea
                                          value={rejectionReason}
                                          onChange={(e) => setRejectionReason(e.target.value)}
                                          placeholder="Enter reason for rejection..."
                                          className="mt-1"
                                        />
                                      </div>
                                      <Button
                                        onClick={() => handleReject(application.id)}
                                        variant="destructive"
                                        className="w-full"
                                      >
                                        Reject Application
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {application.status === 'pending' && (
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(application.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(application.id)}
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
      </div>

      {filteredApplications.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <UserCheck className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No KYC applications</h3>
            <p className="text-gray-600">All applications have been processed.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
