'use client';

import { useI18n } from '@/contexts/I18nContext';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export function I18nUsageExample() {
  const { t, locale } = useI18n();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Language Example
        </h2>
        <LanguageSwitcher />
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">
            {t('nav.home')} - {t('nav.feed')} - {t('nav.ranking')}
          </h3>
          <p className="text-gray-600">
            {t('hero.subtitle')}
          </p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">
            {t('creator.dashboard.overview')} - {t('creator.dashboard.analytics')}
          </h3>
          <p className="text-blue-600">
            {t('creator.dashboard.total_subscribers')}: 1,247
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">
            {t('admin.dashboard')} - {t('admin.overview')}
          </h3>
          <p className="text-green-600">
            {t('admin.total_users')}: 15,420
          </p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">
            {t('auth.welcome_back')}
          </h3>
          <p className="text-purple-600">
            {t('auth.signin_account')}
          </p>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Current Language: {locale === 'ja' ? '日本語' : 'English'}</p>
          <p>Use the language switcher above to change languages!</p>
        </div>
      </div>
    </div>
  );
}
