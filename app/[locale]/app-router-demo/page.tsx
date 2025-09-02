'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { AppRouterLanguageSwitcher } from '@/components/ui/AppRouterLanguageSwitcher';

export default function AppRouterDemoPage() {
  const { t, locale } = useLocale();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌏 App Router i18n Demo
          </h1>
          <p className="text-xl text-gray-600">
            Test the new App Router internationalization system
          </p>
          <div className="mt-4">
            <AppRouterLanguageSwitcher />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Common Translations */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Common Translations
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>OK:</strong> {t('ok', 'common')}</p>
              <p><strong>Cancel:</strong> {t('cancel', 'common')}</p>
              <p><strong>Save:</strong> {t('save', 'common')}</p>
              <p><strong>Loading:</strong> {t('loading', 'common')}</p>
              <p><strong>Error:</strong> {t('error', 'common')}</p>
            </div>
          </div>

          {/* Navigation Translations */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Navigation
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Home:</strong> {t('home', 'navbar')}</p>
              <p><strong>Feed:</strong> {t('feed', 'navbar')}</p>
              <p><strong>Ranking:</strong> {t('ranking', 'navbar')}</p>
              <p><strong>Account:</strong> {t('account', 'navbar')}</p>
              <p><strong>Creator:</strong> {t('creator', 'navbar')}</p>
            </div>
          </div>

          {/* Post Translations */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Post Actions
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Like:</strong> {t('like', 'post')}</p>
              <p><strong>Follow:</strong> {t('follow', 'post')}</p>
              <p><strong>Bookmark:</strong> {t('bookmark', 'post')}</p>
              <p><strong>Comment:</strong> {t('comment', 'post')}</p>
              <p><strong>Share:</strong> {t('share', 'post')}</p>
            </div>
          </div>

          {/* Profile Translations */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Profile
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Followers:</strong> {t('followers', 'profile')}</p>
              <p><strong>Posts:</strong> {t('posts', 'profile')}</p>
              <p><strong>Subscribers:</strong> {t('subscribers', 'profile')}</p>
              <p><strong>About:</strong> {t('about', 'profile')}</p>
              <p><strong>Plans:</strong> {t('plans', 'profile')}</p>
            </div>
          </div>

          {/* Admin Translations */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Admin
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Dashboard:</strong> {t('dashboard', 'admin')}</p>
              <p><strong>Total Users:</strong> {t('total_users', 'admin')}</p>
              <p><strong>Content Review:</strong> {t('content_review', 'admin')}</p>
              <p><strong>User Management:</strong> {t('user_management', 'admin')}</p>
              <p><strong>KYC Verification:</strong> {t('kyc_verification', 'admin')}</p>
            </div>
          </div>

          {/* Auth Translations */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Authentication
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Welcome Back:</strong> {t('welcome_back', 'auth')}</p>
              <p><strong>Sign In:</strong> {t('sign_in', 'auth')}</p>
              <p><strong>Email:</strong> {t('email', 'auth')}</p>
              <p><strong>Password:</strong> {t('password', 'auth')}</p>
              <p><strong>Forgot Password:</strong> {t('forgot_password', 'auth')}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Current Language Information
          </h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Current Language:</strong> {locale}</p>
            <p><strong>Language Name:</strong> {locale === 'ja' ? '日本語' : 'English'}</p>
            <p><strong>Available Languages:</strong> en, ja</p>
            <p><strong>Default Language:</strong> ja</p>
          </div>
        </div>
      </div>
    </div>
  );
}
