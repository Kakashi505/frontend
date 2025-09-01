'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Phone, Twitter, User, Calendar, CheckCircle, AlertCircle, ArrowRight, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export function SignUpPage() {
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTwitterLoading, setIsTwitterLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  
  const [isCreatorAccount, setIsCreatorAccount] = useState(false);
  const [creatorCategory, setCreatorCategory] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptCreatorTerms, setAcceptCreatorTerms] = useState(false);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  const creatorCategories = [
    'Amateur', 'Married Woman', 'Beautiful Woman', 'Personal Filming',
    'Large Breasts', 'Home Video', 'Beautiful Breasts', 'Student',
    'Office Lady', 'Mature', 'Cosplay', 'Fetish', 'Other'
  ];

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccessMessage('Account created successfully! Please check your email for verification.');
    } catch (error) {
      setErrors({ general: 'Sign up failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCodeSent) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsCodeSent(true);
        setSuccessMessage('Verification code sent to your phone!');
      } catch (error) {
        setErrors({ phoneNumber: 'Failed to send verification code.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSuccessMessage('Phone verification successful! Account created.');
      } catch (error) {
        setErrors({ verificationCode: 'Invalid verification code.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTwitterSignUp = async () => {
    setIsTwitterLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccessMessage('Twitter account connected! Please complete your profile.');
    } catch (error) {
      setErrors({ general: 'Twitter sign up failed. Please try again.' });
    } finally {
      setIsTwitterLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'email') {
      handleEmailSignUp(e);
    } else {
      handlePhoneSignUp(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <User className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join OnlyU</h1>
          <p className="text-gray-600">Create your account and start your journey</p>
        </div>

        {/* Main Sign Up Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Create Account</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Twitter Sign Up Button */}
            <Button
              onClick={handleTwitterSignUp}
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
                <span className="px-2 bg-white text-gray-500">or create account with</span>
              </div>
            </div>

            {/* Creator Account Toggle */}
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setIsCreatorAccount(!isCreatorAccount)}
                className={`rounded-full px-6 py-2 ${
                  isCreatorAccount 
                    ? 'bg-purple-100 border-purple-300 text-purple-700' 
                    : 'bg-gray-100 border-gray-300 text-gray-700'
                }`}
              >
                <Crown className={`w-4 h-4 mr-2 ${isCreatorAccount ? 'text-purple-600' : 'text-gray-600'}`} />
                {isCreatorAccount ? 'Creator Account' : 'Regular Account'}
              </Button>
              {isCreatorAccount && (
                <p className="text-xs text-purple-600 mt-2">
                  Creator accounts can post content and earn money
                </p>
              )}
            </div>

            {/* Sign Up Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'email' | 'phone')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone</span>
                </TabsTrigger>
              </TabsList>

              {/* Email Sign Up Tab */}
              <TabsContent value="email" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Choose a username"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Name *
                      </label>
                      <Input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your display name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Email & Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a password"
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Creator Category */}
                  {isCreatorAccount && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Creator Category *
                      </label>
                      <select
                        value={creatorCategory}
                        onChange={(e) => setCreatorCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select a category</option>
                        {creatorCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Terms and Conditions */}
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the{' '}
                        <Link href="/terms" className="text-purple-600 hover:text-purple-700 font-medium">
                          Terms of Service
                        </Link>
                      </span>
                    </label>

                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={acceptPrivacy}
                        onChange={(e) => setAcceptPrivacy(e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the{' '}
                        <Link href="/privacy" className="text-purple-600 hover:text-purple-700 font-medium">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>

                    {isCreatorAccount && (
                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={acceptCreatorTerms}
                          onChange={(e) => setAcceptCreatorTerms(e.target.checked)}
                          className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-600">
                          I agree to the{' '}
                          <Link href="/creator-terms" className="text-purple-600 hover:text-purple-700 font-medium">
                            Creator Terms and Conditions
                          </Link>
                        </span>
                      </label>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 h-12 text-base font-medium"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Create Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Phone Sign Up Tab */}
              <TabsContent value="phone" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Choose a username"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Name *
                      </label>
                      <Input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your display name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+81-XX-XXXX-XXXX or 0XX-XXXX-XXXX"
                        className="pl-10"
                        disabled={isCodeSent}
                      />
                    </div>
                  </div>

                  {/* Verification Code */}
                  {isCodeSent && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Verification Code *
                      </label>
                      <Input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        We've sent a verification code to your phone number
                      </p>
                    </div>
                  )}

                  {/* Creator Category */}
                  {isCreatorAccount && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Creator Category *
                      </label>
                      <select
                        value={creatorCategory}
                        onChange={(e) => setCreatorCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select a category</option>
                        {creatorCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Terms and Conditions */}
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the{' '}
                        <Link href="/terms" className="text-purple-600 hover:text-purple-700 font-medium">
                          Terms of Service
                        </Link>
                      </span>
                    </label>

                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={acceptPrivacy}
                        onChange={(e) => setAcceptPrivacy(e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the{' '}
                        <Link href="/privacy" className="text-purple-600 hover:text-purple-700 font-medium">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>

                    {isCreatorAccount && (
                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={acceptCreatorTerms}
                          onChange={(e) => setAcceptCreatorTerms(e.target.checked)}
                          className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-600">
                          I agree to the{' '}
                          <Link href="/creator-terms" className="text-purple-600 hover:text-purple-700 font-medium">
                            Creator Terms and Conditions
                          </Link>
                        </span>
                      </label>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 h-12 text-base font-medium"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{isCodeSent ? 'Verifying...' : 'Sending code...'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>{isCodeSent ? 'Verify & Create Account' : 'Send Verification Code'}</span>
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

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-purple-600 hover:text-purple-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-purple-600 hover:text-purple-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
