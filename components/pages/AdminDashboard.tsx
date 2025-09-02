'use client';

import { useState } from 'react';
import { Shield, Users, TrendingUp, AlertTriangle, CheckCircle, XCircle, Eye, Ban, UserCheck, FileText, Video, Image as ImageIcon, Flag, Settings, Download } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { t } = useLocale();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('dashboard', 'admin')}</h1>
                <p className="text-sm text-gray-600">{t('platform_administration', 'admin')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('total_users', 'admin')}</p>
                  <p className="text-2xl font-bold text-gray-900">15,420</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('total_revenue', 'admin')}</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(12500000)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('violations', 'admin')}</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('system_health', 'admin')}</p>
                  <p className="text-2xl font-bold text-gray-900">99.98%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">{t('overview', 'admin')}</TabsTrigger>
            <TabsTrigger value="content">{t('content_review', 'admin')}</TabsTrigger>
            <TabsTrigger value="takedown">{t('takedown', 'admin')}</TabsTrigger>
            <TabsTrigger value="reports">{t('reports', 'admin')}</TabsTrigger>
            <TabsTrigger value="kyc">{t('kyc_verification', 'admin')}</TabsTrigger>
            <TabsTrigger value="users">{t('user_management', 'admin')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('quick_actions', 'admin')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Eye className="w-6 h-6 mb-2" />
                    <span className="text-sm">{t('review_content', 'admin')}</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <UserCheck className="w-6 h-6 mb-2" />
                    <span className="text-sm">{t('verify_kyc', 'admin')}</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Ban className="w-6 h-6 mb-2" />
                    <span className="text-sm">{t('ban_user', 'admin')}</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Flag className="w-6 h-6 mb-2" />
                    <span className="text-sm">{t('handle_reports', 'admin')}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('content_review_queue', 'admin')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Eye className="w-12 h-12 mx-auto mb-4" />
                  <p>{t('content_review_placeholder', 'admin')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="takedown" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('takedown_requests', 'admin')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Flag className="w-12 h-12 mx-auto mb-4" />
                  <p>{t('takedown_placeholder', 'admin')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('user_reports', 'admin')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
                  <p>{t('reports_placeholder', 'admin')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kyc" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('kyc_age_verification', 'admin')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <UserCheck className="w-12 h-12 mx-auto mb-4" />
                  <p>{t('kyc_placeholder', 'admin')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('user_management', 'admin')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4" />
                  <p>{t('user_management_placeholder', 'admin')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
