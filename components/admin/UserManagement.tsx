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
  Users, 
  UserX, 
  UserCheck, 
  Search, 
  Filter,
  Calendar,
  AlertTriangle,
  Shield,
  Eye,
  Ban,
  Unlock,
  Flag
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: 'user' | 'creator' | 'admin';
  status: 'active' | 'suspended' | 'banned' | 'pending';
  isVerified: boolean;
  followers: number;
  following: number;
  posts: number;
  joinedAt: Date;
  lastActive: Date;
  violations: number;
  warnings: number;
  banReason?: string;
  banExpiry?: Date;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'user',
    status: 'active',
    isVerified: false,
    followers: 1250,
    following: 45,
    posts: 23,
    joinedAt: new Date('2023-01-15'),
    lastActive: new Date(Date.now() - 1000 * 60 * 30),
    violations: 0,
    warnings: 1,
  },
  {
    id: '2',
    username: 'spammer123',
    email: 'spam@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'user',
    status: 'banned',
    isVerified: false,
    followers: 0,
    following: 0,
    posts: 156,
    joinedAt: new Date('2023-03-20'),
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    violations: 5,
    warnings: 3,
    banReason: 'Multiple spam violations',
    banExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  },
  {
    id: '3',
    username: 'creator_emma',
    email: 'emma@example.com',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'creator',
    status: 'suspended',
    isVerified: true,
    followers: 28900,
    following: 156,
    posts: 89,
    joinedAt: new Date('2022-08-10'),
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2),
    violations: 2,
    warnings: 1,
    banReason: 'Copyright violation',
    banExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: '4',
    username: 'admin_sarah',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'admin',
    status: 'active',
    isVerified: true,
    followers: 500,
    following: 200,
    posts: 12,
    joinedAt: new Date('2022-01-01'),
    lastActive: new Date(Date.now() - 1000 * 60 * 10),
    violations: 0,
    warnings: 0,
  },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [banReason, setBanReason] = useState('');
  const [banDuration, setBanDuration] = useState('7');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || user.status === filter || user.role === filter;
    return matchesSearch && matchesFilter;
  });

  const handleBanUser = (userId: string) => {
    const duration = parseInt(banDuration);
    const expiryDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * duration);
    
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? {
              ...user,
              status: 'banned',
              banReason,
              banExpiry: expiryDate,
            }
          : user
      )
    );
    setSelectedUser(null);
    setBanReason('');
  };

  const handleUnbanUser = (userId: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? {
              ...user,
              status: 'active',
              banReason: undefined,
              banExpiry: undefined,
            }
          : user
      )
    );
  };

  const handleSuspendUser = (userId: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? {
              ...user,
              status: 'suspended',
              banReason: 'Temporary suspension',
              banExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
            }
          : user
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      case 'banned': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'creator': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-gray-600">Manage user accounts, bans, and suspensions</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="banned">Banned</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
              <SelectItem value="creator">Creators</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Stats */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Total Users</span>
                <Badge variant="secondary">{users.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Active Users</span>
                <Badge className="bg-green-100 text-green-800">
                  {users.filter(u => u.status === 'active').length}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Suspended</span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {users.filter(u => u.status === 'suspended').length}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Banned</span>
                <Badge className="bg-red-100 text-red-800">
                  {users.filter(u => u.status === 'banned').length}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Creators</span>
                <Badge variant="outline">
                  {users.filter(u => u.role === 'creator').length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <div className="lg:col-span-3 space-y-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Image
                    src={user.avatar}
                    alt={user.username}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">@{user.username}</h3>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                      {user.isVerified && (
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{user.followers} followers</span>
                      <span>{user.posts} posts</span>
                      <span>Joined {user.joinedAt.toLocaleDateString()}</span>
                      {user.violations > 0 && (
                        <span className="text-red-600">{user.violations} violations</span>
                      )}
                    </div>

                    {user.banReason && (
                      <div className="mt-2 p-2 bg-red-50 rounded text-sm">
                        <strong>Ban Reason:</strong> {user.banReason}
                        {user.banExpiry && (
                          <span className="ml-2 text-gray-600">
                            (Expires: {user.banExpiry.toLocaleDateString()})
                          </span>
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
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>User Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Image
                              src={user.avatar}
                              alt={user.username}
                              width={64}
                              height={64}
                              className="rounded-full"
                            />
                            <div>
                              <h3 className="font-semibold">@{user.username}</h3>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Role:</strong> {user.role}
                            </div>
                            <div>
                              <strong>Status:</strong> {user.status}
                            </div>
                            <div>
                              <strong>Followers:</strong> {user.followers}
                            </div>
                            <div>
                              <strong>Posts:</strong> {user.posts}
                            </div>
                            <div>
                              <strong>Violations:</strong> {user.violations}
                            </div>
                            <div>
                              <strong>Warnings:</strong> {user.warnings}
                            </div>
                          </div>

                          {user.banReason && (
                            <div className="p-3 bg-red-50 rounded">
                              <strong>Ban Reason:</strong> {user.banReason}
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {user.status === 'active' && (
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSuspendUser(user.id)}
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                            >
                              <Ban className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Ban User</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Ban Reason</label>
                                <Textarea
                                  value={banReason}
                                  onChange={(e) => setBanReason(e.target.value)}
                                  placeholder="Enter reason for ban..."
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Duration (days)</label>
                                <Select value={banDuration} onValueChange={setBanDuration}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1 day</SelectItem>
                                    <SelectItem value="7">7 days</SelectItem>
                                    <SelectItem value="30">30 days</SelectItem>
                                    <SelectItem value="90">90 days</SelectItem>
                                    <SelectItem value="permanent">Permanent</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button
                                onClick={() => handleBanUser(user.id)}
                                variant="destructive"
                                className="w-full"
                              >
                                Ban User
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}

                    {(user.status === 'banned' || user.status === 'suspended') && (
                      <Button
                        size="sm"
                        onClick={() => handleUnbanUser(user.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Unlock className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
