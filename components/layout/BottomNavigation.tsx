'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Users, Trophy, MessageCircle, User } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, key: 'nav.home' },
  { href: '/feed', icon: Users, key: 'nav.feed' },
  { href: '/ranking', icon: Trophy, key: 'nav.ranking' },
  { href: '/messages', icon: MessageCircle, key: 'nav.messages' },
  { href: '/account', icon: User, key: 'nav.account' },
];

export function BottomNavigation() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-purple-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map(({ href, icon: Icon, key }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex flex-col items-center justify-center space-y-1 px-2 py-1 rounded-lg transition-all duration-200',
                  isActive
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50/50'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive && 'scale-110')} />
                <span className="text-xs font-medium">{t(key)}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}