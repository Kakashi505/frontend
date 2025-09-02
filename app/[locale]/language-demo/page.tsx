import { AppRouterDemoPage } from '@/components/demos/AppRouterDemoPage';

export default function LanguageDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌏 Language Switcher Demo
          </h1>
          <p className="text-xl text-gray-600">
            Test the language switching functionality between English and Japanese
          </p>
        </div>
        
        <AppRouterDemoPage />
        
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Use the Language Switcher
          </h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-lg">1. Language Switcher Component</h3>
              <p>Use the <code className="bg-gray-100 px-2 py-1 rounded">LanguageSwitcher</code> component in your header or navigation.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">2. Translation Hook</h3>
              <p>Use the <code className="bg-gray-100 px-2 py-1 rounded">useI18n()</code> hook to access translations.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">3. Translation Function</h3>
              <p>Call <code className="bg-gray-100 px-2 py-1 rounded">t('translation.key')</code> to get translated text.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">4. Language State</h3>
              <p>Access <code className="bg-gray-100 px-2 py-1 rounded">locale</code> to check current language.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
