'use client';

import { useState } from 'react';
import { Search, Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/contexts/I18nContext';

const conversations = [
  {
    id: '1',
    creator: {
      username: 'sakura_chan',
      displayName: 'Sakura',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      isOnline: true,
      isVerified: true,
      isSubscribed: true,
      subscriptionPlan: 'Premium',
      category: 'Photography',
      canTip: true,
      tipAmounts: [100, 500, 1000, 2000]
    },
    lastMessage: 'Thank you so much for your support! 💕',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unread: 2,
    messageType: 'text',
    isPremium: false
  },
  {
    id: '2',
    creator: {
      username: 'alex_fitness',
      displayName: 'Alex Cooper',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      isOnline: false,
    },
    lastMessage: 'New workout plan is ready for you!',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unread: 0,
  },
  {
    id: '3',
    creator: {
      username: 'luna_music',
      displayName: 'Luna Park',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
      isOnline: true,
    },
    lastMessage: 'Which song would you like me to cover next?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    unread: 1,
  },
];

const messages = [
  {
    id: '1',
    senderId: 'sakura_chan',
    content: 'Hi! Thanks for subscribing to my content! 😊',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    isFromCreator: true,
  },
  {
    id: '2',
    senderId: 'user',
    content: 'Thank you for the amazing content! I love your photography style.',
    timestamp: new Date(Date.now() - 1000 * 60 * 50),
    isFromCreator: false,
  },
  {
    id: '3',
    senderId: 'sakura_chan',
    content: 'That means so much to me! I have some exclusive behind-the-scenes content coming soon.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    isFromCreator: true,
  },
  {
    id: '4',
    senderId: 'sakura_chan',
    content: 'Thank you so much for your support! 💕',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    isFromCreator: true,
  },
];

export function MessagesPage() {
  const { t } = useI18n();
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Mock send message logic
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.creator.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.creator.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Conversations List */}
      <div className="w-80 flex flex-col bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{t('messages.title')}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation.id === conversation.id ? 'bg-purple-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={conversation.creator.avatar}
                    alt={conversation.creator.displayName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.creator.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">
                      {conversation.creator.displayName}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {conversation.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                    {conversation.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col bg-white shadow-sm">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={selectedConversation.creator.avatar}
                alt={selectedConversation.creator.displayName}
                className="w-10 h-10 rounded-full object-cover"
              />
              {selectedConversation.creator.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{selectedConversation.creator.displayName}</h3>
              <p className="text-sm text-gray-500">
                {selectedConversation.creator.isOnline ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isFromCreator ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.isFromCreator
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.isFromCreator ? 'text-gray-500' : 'text-purple-100'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button variant="ghost" size="sm">
              <Smile className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}