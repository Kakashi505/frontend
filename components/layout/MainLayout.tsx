'use client';

import { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Header />
      <main className="pt-16 pb-20 px-4 max-w-7xl mx-auto">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
}