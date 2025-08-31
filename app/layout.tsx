import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { I18nProvider } from '@/contexts/I18nContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MyFans - Connect with Your Favorite Creators',
  description: 'The ultimate platform for creators and fans to connect and share exclusive content.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <AuthProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}