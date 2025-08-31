'use client';

import { useState } from 'react';
import { 
  Settings, 
  Globe, 
  MessageSquare, 
  Bell, 
  Users, 
  UserX, 
  Info, 
  FileText, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  User,
  CreditCard,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function AccountPage() {
  const { user, logout } = useAuth();
  const { t, locale, setLocale } = useI18n();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [messageRejectionEnabled, setMessageRejectionEnabled] = useState(false);

  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your account</h1>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          Login
        </Button>
      </div>
    );
  }

  // Mock data for announcements
  const announcements = [
    {
      id: '1',
      title: 'クレジットカード決済使用時に遷移する決済システム画面について',
      type: 'payment'
    },
    {
      id: '2', 
      title: '利用規約改定のお知らせ',
      type: 'terms'
    }
  ];

  // Mock data for follow list
  const followList = [
    { id: '1', username: 'creator_emma', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400', isVerified: true },
    { id: '2', username: 'photographer_john', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', isVerified: false },
    { id: '3', username: 'artist_sarah', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', isVerified: true },
  ];

  // Mock data for block list
  const blockList = [
    { id: '1', username: 'spammer123', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400', blockedAt: '2024-01-15' },
    { id: '2', username: 'harasser456', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', blockedAt: '2024-01-10' },
  ];

  const handleLogout = () => {
    logout();
  };

  const handleLanguageChange = (newLocale: 'en' | 'ja') => {
    setLocale(newLocale);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-xl font-bold">{user.username}</h1>
                {user.isVerified && (
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-white/80 text-sm">{user.email}</p>
              <p className="text-white/60 text-xs">{user.followers} followers • {user.following} following</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Announcements Section */}
      <div className="space-y-2">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Info className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-700">{announcement.title}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Settings Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Language Settings</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{locale === 'ja' ? '日本語' : 'English'}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message Rejection Settings */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Message Rejection Settings</span>
              </div>
              <Switch
                checked={messageRejectionEnabled}
                onCheckedChange={setMessageRejectionEnabled}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Settings */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Notification Settings</span>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Follow List */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Follow List</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{followList.length}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Block List */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <UserX className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Block List</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{blockList.length}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* About myfans Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">About myfans</h2>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <div className="space-y-0">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100">
                <span className="text-gray-900">Terms of Use</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100">
                <span className="text-gray-900">Privacy Policy</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100">
                <span className="text-gray-900">Legal Notice</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="text-gray-900">Help</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Other reasons Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Other reasons</h2>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <div className="space-y-0">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100">
                <span className="text-gray-900">Account Switching</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <div 
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer text-red-600"
                onClick={handleLogout}
              >
                <span>Logout</span>
                <LogOut className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Language Selection Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="hidden">
            <Button variant="outline">Open Language Dialog</Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Language Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Language</label>
              <Select value={locale} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                                 <SelectContent>
                   <SelectItem value="en">English</SelectItem>
                   <SelectItem value="ja">日本語</SelectItem>
                 </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Follow List Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="hidden">
            <Button variant="outline">Open Follow List</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Follow List</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {followList.map((follow) => (
              <div key={follow.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <img
                  src={follow.avatar}
                  alt={follow.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">@{follow.username}</span>
                    {follow.isVerified && (
                      <Badge variant="secondary" className="text-xs">Verified</Badge>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Unfollow
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Block List Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="hidden">
            <Button variant="outline">Open Block List</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Block List</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {blockList.map((blocked) => (
              <div key={blocked.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <img
                  src={blocked.avatar}
                  alt={blocked.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">@{blocked.username}</span>
                    <span className="text-xs text-gray-500">Blocked {blocked.blockedAt}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Unblock
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}