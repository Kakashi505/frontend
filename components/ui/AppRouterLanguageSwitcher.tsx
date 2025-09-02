'use client';

import { Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useState } from 'react';

export function AppRouterLanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  const handleLanguageChange = (languageCode: 'en' | 'ja') => {
    setLocale(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-[120px]"
        aria-label="Switch Language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code as 'en' | 'ja')}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 ${
                locale === language.code ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
