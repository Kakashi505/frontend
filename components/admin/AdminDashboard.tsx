'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/I18nContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  Flag, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { ContentReviewQueue } from './ContentReviewQueue';
import { TakedownTools } from './TakedownTools';
import { UserManagement } from './UserManagement';
import { KYCVerification } from './KYCVerification';
import { ReportsView } from './ReportsView';

export function AdminDashboard() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced admin stats with OnlyU.jp features
  const adminStats = {
    pendingReviews: 23,
    pendingReports: 15,
    pendingKYC: 8,
    bannedUsers: 12,
    takedownRequests: 5,
    // Additional OnlyU.jp metrics
    totalRevenue: 12500000, // 12.5M JPY
    activeCreators: 1247,
    totalSubscribers: 45678,
    contentViolations: 3,
    paymentIssues: 2,
    systemHealth: 'excellent',
    lastBackup: '2024-01-15 02:00',
    uptime: '99.9%'
  };

  // Check if user has admin access
  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage platform content, users, and moderation</p>
        </div>
        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
          Admin Access
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold text-orange-600">{adminStats.pendingReviews}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Flag className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Pending Reports</p>
                <p className="text-2xl font-bold text-red-600">{adminStats.pendingReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Pending KYC</p>
                <p className="text-2xl font-bold text-blue-600">{adminStats.pendingKYC}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Banned Users</p>
                <p className="text-2xl font-bold text-gray-600">{adminStats.bannedUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Takedown Requests</p>
                <p className="text-2xl font-bold text-yellow-600">{adminStats.takedownRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Review</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="kyc">KYC Verification</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Recent Content Reviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ContentReviewQueue limit={5} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Flag className="w-5 h-5" />
                  <span>Recent Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ReportsView limit={5} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <ContentReviewQueue />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="kyc">
          <KYCVerification />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
