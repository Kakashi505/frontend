'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Locale = 'en' | 'ja';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, namespace?: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  children: ReactNode;
  locale: string;
}

export function LocaleProvider({ children, locale: initialLocale }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale as Locale);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLocaleState(initialLocale as Locale);
  }, [initialLocale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    
    // Set cookie for future requests
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    // Navigate to new locale path
    const currentPath = pathname;
    const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const t = (key: string, namespace?: string): string => {
    try {
      // Import the appropriate translation file based on namespace and locale
      const translations = getTranslations(locale, namespace);
      return translations[key] || key;
    } catch (error) {
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

// Simple translation function - in a real app, you'd load these dynamically
function getTranslations(locale: string, namespace?: string): Record<string, string> {
  const namespaceMap: Record<string, Record<string, Record<string, string>>> = {
    en: {
      common: {
        ok: 'OK',
        cancel: 'Cancel',
        save: 'Save',
        confirm: 'Confirm',
        close: 'Close',
        loading: 'Loading...',
        error: 'An error occurred',
        not_found: 'Not found',
      },
      navbar: {
        home: 'Home',
        feed: 'Feed',
        ranking: 'Ranking',
        account: 'Account',
        creator: 'Creator',
        wallet: 'Wallet',
        search_placeholder: 'Search creators...',
      },
      post: {
        like: 'Like',
        follow: 'Follow',
        bookmark: 'Bookmark',
        comment: 'Comment',
        share: 'Share',
        free: 'Free',
        premium: 'Premium',
        plan_only: 'Plan only',
      },
      profile: {
        followers: 'followers',
        posts: 'posts',
        subscribers: 'subscribers',
        about: 'About',
        plans: 'Plans',
      },
      admin: {
        dashboard: 'Admin Dashboard',
        total_users: 'Total Users',
        content_review: 'Content Review',
        user_management: 'User Management',
        kyc_verification: 'KYC Verification',
      },
      auth: {
        welcome_back: 'Welcome Back',
        sign_in: 'Sign In',
        email: 'Email',
        password: 'Password',
        forgot_password: 'Forgot password?',
      },
    },
    ja: {
      common: {
        ok: 'OK',
        cancel: 'キャンセル',
        save: '保存',
        confirm: '確認',
        close: '閉じる',
        loading: '読み込み中...',
        error: 'エラーが発生しました',
        not_found: '見つかりませんでした',
      },
      navbar: {
        home: 'ホーム',
        feed: 'フィード',
        ranking: 'ランキング',
        account: 'アカウント',
        creator: 'クリエイター',
        wallet: 'ウォレット',
        search_placeholder: 'クリエイターを検索...',
      },
      post: {
        like: 'いいね',
        follow: 'フォロー',
        bookmark: 'ブックマーク',
        comment: 'コメント',
        share: 'シェア',
        free: '無料',
        premium: 'プレミアム',
        plan_only: 'プランのみ',
      },
      profile: {
        followers: 'フォロワー',
        posts: '投稿',
        subscribers: '購読者',
        about: 'プロフィール',
        plans: 'プラン',
      },
      admin: {
        dashboard: '管理者ダッシュボード',
        total_users: '総ユーザー数',
        content_review: 'コンテンツ審査',
        user_management: 'ユーザー管理',
        kyc_verification: '本人確認',
      },
      auth: {
        welcome_back: 'おかえりなさい',
        sign_in: 'サインイン',
        email: 'メール',
        password: 'パスワード',
        forgot_password: 'パスワードを忘れた？',
      },
    },
  };

  if (namespace) {
    return namespaceMap[locale]?.[namespace] || {};
  }

  // Return all translations for the locale if no namespace specified
  const allTranslations: Record<string, string> = {};
  Object.values(namespaceMap[locale] || {}).forEach(ns => {
    Object.assign(allTranslations, ns);
  });
  return allTranslations;
}
