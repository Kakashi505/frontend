'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Phone, Twitter, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export function LoginPage() {
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTwitterLoading, setIsTwitterLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage('ログイン成功！リダイレクト中...');
    } catch (error) {
      setErrors({ general: 'ログインに失敗しました。認証情報を確認してください。' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCodeSent) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsCodeSent(true);
        setSuccessMessage('認証コードを送信しました！');
      } catch (error) {
        setErrors({ phoneNumber: 'コードの送信に失敗しました。' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSuccessMessage('電話認証が成功しました！');
      } catch (error) {
        setErrors({ verificationCode: '無効なコードです。' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTwitterLogin = async () => {
    setIsTwitterLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccessMessage('Twitter認証が成功しました！');
    } catch (error) {
      setErrors({ general: 'Twitterログインに失敗しました。' });
    } finally {
      setIsTwitterLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Lock className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">おかえりなさい</h1>
          <p className="text-gray-600">OnlyUアカウントにサインイン</p>
        </div>

        {/* Main Login Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Sign In</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Twitter Login Button */}
            <Button
              onClick={handleTwitterLogin}
              disabled={isTwitterLoading}
              className="w-full bg-black hover:bg-gray-800 text-white py-3 h-12 text-base font-medium"
            >
              {isTwitterLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Twitter className="w-5 h-5" />
                  <span>Continue with Twitter</span>
                </div>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or continue with</span>
              </div>
            </div>

            {/* Login Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'email' | 'phone')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>メール</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>電話</span>
                </TabsTrigger>
              </TabsList>

              {/* Email Login Tab */}
              <TabsContent value="email" className="space-y-4">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="メールアドレスを入力"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      パスワード
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="パスワードを入力"
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-600">ログイン情報を保存</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      パスワードを忘れた？
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 h-12 text-base font-medium"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>サインイン中...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>サインイン</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Phone Login Tab */}
              <TabsContent value="phone" className="space-y-4">
                <form onSubmit={handlePhoneVerification} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      電話番号
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+81-XX-XXXX-XXXX または 0XX-XXXX-XXXX"
                        className="pl-10"
                        disabled={isCodeSent}
                      />
                    </div>
                  </div>

                  {isCodeSent && (
                    <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-2">
                          認証コード
                        </label>
                      <Input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="6桁のコードを入力"
                        maxLength={6}
                      />
                                              <p className="text-xs text-gray-500 mt-1">
                          認証コードを電話番号に送信しました
                        </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 h-12 text-base font-medium"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{isCodeSent ? '認証中...' : 'コード送信中...'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>{isCodeSent ? '認証してサインイン' : '認証コードを送信'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Success/Error Messages */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 text-sm">{successMessage}</span>
              </motion.div>
            )}

            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2"
              >
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800 text-sm">{errors.general}</span>
              </motion.div>
            )}

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                アカウントをお持ちでないですか？{' '}
                <Link
                  href="/signup"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  ここでサインアップ
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            サインインすることで、{' '}
            <Link href="/terms" className="text-purple-600 hover:text-purple-700">
              利用規約
            </Link>{' '}
            と{' '}
            <Link href="/privacy" className="text-purple-600 hover:text-purple-700">
              プライバシーポリシー
            </Link>
            に同意したことになります
          </p>
        </div>
      </motion.div>
    </div>
  );
}
