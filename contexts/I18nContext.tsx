'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Locale = 'en' | 'ja';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.feed': 'Feed',
    'nav.ranking': 'Ranking',
    'nav.messages': 'Messages',
    'nav.account': 'Account',
    'nav.admin': 'Admin',
    'search.placeholder': 'Search creators...',
    'hero.title': 'Connect with Your Favorite Creators',
    'hero.subtitle': 'Discover exclusive content and support amazing creators',
    'creator.followers': 'Followers',
    'creator.posts': 'Posts',
    'creator.subscribe': 'Subscribe',
    'ranking.title': 'Top Creators',
    'messages.title': 'Messages',
    'account.profile': 'Profile',
    'account.settings': 'Settings',
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.feed': 'フィード',
    'nav.ranking': 'ランキング',
    'nav.messages': 'メッセージ',
    'nav.account': 'アカウント',
    'nav.admin': '管理',
    'search.placeholder': 'クリエイターを検索...',
    'hero.title': 'お気に入りのクリエイターとつながろう',
    'hero.subtitle': '独占コンテンツを発見し、素晴らしいクリエイターをサポート',
    'creator.followers': 'フォロワー',
    'creator.posts': '投稿',
    'creator.subscribe': '購読',
    'ranking.title': 'トップクリエイター',
    'messages.title': 'メッセージ',
    'account.profile': 'プロフィール',
    'account.settings': '設定',
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const t = (key: string): string => {
    return translations[locale][key as keyof typeof translations['en']] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}