'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Locale = 'en' | 'ja' | 'ko' | 'zh';

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
  ko: {
    'nav.home': '홈',
    'nav.feed': '피드',
    'nav.ranking': '랭킹',
    'nav.messages': '메시지',
    'nav.account': '계정',
    'search.placeholder': '크리에이터 검색...',
    'hero.title': '좋아하는 크리에이터와 연결하세요',
    'hero.subtitle': '독점 콘텐츠를 발견하고 놀라운 크리에이터를 지원하세요',
    'creator.followers': '팔로워',
    'creator.posts': '게시물',
    'creator.subscribe': '구독',
    'ranking.title': '톱 크리에이터',
    'messages.title': '메시지',
    'account.profile': '프로필',
    'account.settings': '설정',
  },
  zh: {
    'nav.home': '首页',
    'nav.feed': '动态',
    'nav.ranking': '排行榜',
    'nav.messages': '消息',
    'nav.account': '账户',
    'search.placeholder': '搜索创作者...',
    'hero.title': '与您喜爱的创作者联系',
    'hero.subtitle': '发现独家内容并支持优秀创作者',
    'creator.followers': '粉丝',
    'creator.posts': '帖子',
    'creator.subscribe': '订阅',
    'ranking.title': '顶级创作者',
    'messages.title': '消息',
    'account.profile': '个人资料',
    'account.settings': '设置',
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