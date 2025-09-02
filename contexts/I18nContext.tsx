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
    // Navigation
    'nav.home': 'Home',
    'nav.feed': 'Feed',
    'nav.ranking': 'Ranking',
    'nav.messages': 'Messages',
    'nav.account': 'Account',
    'nav.admin': 'Admin',
    'nav.creator': 'Creator',
    'nav.wallet': 'Wallet',
    'nav.explore': 'Explore',
    
    // Search
    'search.placeholder': 'Search creators...',
    'search.button': 'Search',
    
    // Hero Section
    'hero.title': 'Connect with Your Favorite Creators',
    'hero.subtitle': 'Discover exclusive content and support amazing creators',
    'hero.search.placeholder': 'Search creators, content, or tags...',
    'hero.cta.button': 'Become a Creator',
    
    // Content Categories
    'category.popular': 'Popular',
    'category.new': 'New',
    'category.trending': 'Trending',
    'category.most_attention': 'Most Attention',
    'category.amateur': 'Amateur',
    'category.married_woman': 'Married Woman',
    'category.beautiful_woman': 'Beautiful Woman',
    'category.personal_filming': 'Personal Filming',
    'category.large_breasts': 'Large Breasts',
    'category.home_video': 'Home Video',
    'category.beautiful_breasts': 'Beautiful Breasts',
    'category.student': 'Student',
    'category.office_lady': 'Office Lady',
    'category.mature': 'Mature',
    'category.cosplay': 'Cosplay',
    'category.fetish': 'Fetish',
    'category.other': 'Other',
    
    // Content Actions
    'action.like': 'Like',
    'action.bookmark': 'Bookmark',
    'action.share': 'Share',
    'action.comment': 'Comment',
    'action.follow': 'Follow',
    'action.subscribe': 'Subscribe',
    'action.view_more': 'View more',
    'action.see_all': 'See all',
    
    // Library
    'library.purchased': 'Purchased',
    'library.saved': 'Saved',
    'library.liked': 'Liked',
    'library.viewing_history': 'Viewing History',
    
    // Content Status
    'status.free': 'Free',
    'status.premium': 'Premium',
    'status.plan_only': 'Plan only',
    'status.new': 'New',
    
    // Time
    'time.ago': 'ago',
    'time.hours': 'hours',
    'time.days': 'days',
    'time.months': 'months',
    'time.years': 'years',
    
    // Creator Stats
    'creator.followers': 'Followers',
    'creator.posts': 'Posts',
    'creator.subscribe': 'Subscribe',
    'creator.verified': 'Verified',
    'creator.premium': 'Premium',
    'creator.vip': 'VIP',
    
    // Ranking
    'ranking.title': 'Top Creators',
    'ranking.overall': 'Overall Ranking',
    'ranking.butt': 'Butt Ranking',
    'ranking.adult_services': 'Adult Services Ranking',
    'ranking.all': 'All',
    'ranking.popular': 'Popular',
    'ranking.premium': 'Premium',
    'ranking.live': 'Live',
    
    // Messages
    'messages.title': 'Messages',
    'messages.new': 'New Message',
    'messages.conversations': 'Conversations',
    
    // Account
    'account.profile': 'Profile',
    'account.settings': 'Settings',
    'account.logout': 'Logout',
    
    // Admin
    'admin.dashboard': 'Admin Dashboard',
    'admin.platform_administration': 'Platform administration and moderation',
    'admin.total_users': 'Total Users',
    'admin.total_revenue': 'Total Revenue',
    'admin.violations': 'Violations',
    'admin.system_health': 'System Health',
    'admin.overview': 'Overview',
    'admin.content_review': 'Content Review',
    'admin.takedown': 'Takedown',
    'admin.reports': 'Reports',
    'admin.kyc_verification': 'KYC Verification',
    'admin.user_management': 'User Management',
    'admin.quick_actions': 'Quick Actions',
    'admin.review_content': 'Review Content',
    'admin.verify_kyc': 'Verify KYC',
    'admin.ban_user': 'Ban User',
    'admin.handle_reports': 'Handle Reports',
    'admin.content_review_queue': 'Content Review Queue',
    'admin.takedown_requests': 'Takedown Requests',
    'admin.user_reports': 'User Reports',
    'admin.kyc_age_verification': 'KYC & Age Verification',
    'admin.content_review_placeholder': 'Content review queue will be displayed here',
    'admin.takedown_placeholder': 'Takedown requests will be displayed here',
    'admin.reports_placeholder': 'User reports will be displayed here',
    'admin.kyc_placeholder': 'KYC verifications will be displayed here',
    'admin.user_management_placeholder': 'User management tools will be displayed here',
    
    // Login/Signup
    'auth.welcome_back': 'Welcome Back',
    'auth.signin_account': 'Sign in to your OnlyU account',
    'auth.email': 'Email',
    'auth.phone': 'Phone',
    'auth.email_address': 'Email Address',
    'auth.password': 'Password',
    'auth.phone_number': 'Phone Number',
    'auth.verification_code': 'Verification Code',
    'auth.enter_email': 'Enter your email',
    'auth.enter_password': 'Enter your password',
    'auth.enter_6digit_code': 'Enter 6-digit code',
    'auth.phone_format': '+81-XX-XXXX-XXXX or 0XX-XXXX-XXXX',
    'auth.remember_me': 'Remember me',
    'auth.forgot_password': 'Forgot password?',
    'auth.sign_in': 'Sign In',
    'auth.signing_in': 'Signing in...',
    'auth.verify_signin': 'Verify & Sign In',
    'auth.send_code': 'Send Verification Code',
    'auth.verifying': 'Verifying...',
    'auth.sending_code': 'Sending code...',
    'auth.code_sent_message': 'We\'ve sent a verification code to your phone number',
    'auth.no_account': 'Don\'t have an account?',
    'auth.signup_here': 'Sign up here',
    'auth.terms_agreement': 'By signing in, you agree to our',
    'auth.terms_of_service': 'Terms of Service',
    'auth.and': 'and',
    'auth.privacy_policy': 'Privacy Policy',
    'auth.agreement_suffix': 'By signing in, you agree to our Terms of Service and Privacy Policy',
    
    // Success/Error Messages
    'message.login_success': 'Login successful! Redirecting...',
    'message.login_failed': 'Login failed. Please check your credentials.',
    'message.code_sent': 'Verification code sent!',
    'message.code_send_failed': 'Failed to send code.',
    'message.phone_verification_success': 'Phone verification successful!',
    'message.invalid_code': 'Invalid code.',
    'message.twitter_auth_success': 'Twitter authentication successful!',
    'message.twitter_login_failed': 'Twitter login failed.',
    'message.account_created': 'Account created successfully! Please check your email for verification.',
    'message.signup_failed': 'Sign up failed. Please try again.',
    'message.phone_code_sent': 'Verification code sent to your phone!',
    'message.phone_code_failed': 'Failed to send verification code.',
    'message.phone_verification_account_created': 'Phone verification successful! Account created.',
    'message.invalid_verification_code': 'Invalid verification code.',
    'message.twitter_connected': 'Twitter account connected! Please complete your profile.',
    'message.twitter_signup_failed': 'Twitter sign up failed. Please try again.',
    
    // Creator Dashboard
    'creator.dashboard.overview': 'Overview',
    'creator.dashboard.content': 'Content',
    'creator.dashboard.analytics': 'Analytics',
    'creator.dashboard.subscribers': 'Subscribers',
    'creator.dashboard.earnings': 'Earnings',
    'creator.dashboard.schedule': 'Schedule',
    'creator.dashboard.total_subscribers': 'Total Subscribers',
    'creator.dashboard.monthly_revenue': 'Monthly Revenue',
    'creator.dashboard.total_views': 'Total Views',
    'creator.dashboard.total_likes': 'Total Likes',
    'creator.dashboard.total_comments': 'Total Comments',
    'creator.dashboard.monthly_growth': 'Monthly Growth',
    'creator.dashboard.conversion_rate': 'Conversion Rate',
    'creator.dashboard.avg_engagement': 'Average Engagement',
    'creator.dashboard.recent_subscribers': 'Recent Subscribers',
    'creator.dashboard.upload_queue': 'Upload Queue',
    'creator.dashboard.payout_history': 'Payout History',
    'creator.dashboard.subscription_plans': 'Subscription Plans',
    'creator.dashboard.scheduled_posts': 'Scheduled Posts',
    'creator.dashboard.upload_content': 'Upload Content',
    'creator.dashboard.create_plan': 'Create Plan',
    'creator.dashboard.schedule_post': 'Schedule Post',
    
    // Content Types
    'content.type.video': 'Video',
    'content.type.image': 'Image',
    'content.type.text': 'Text',
    'content.type.gallery': 'Gallery',
    
    // Feed
    'feed.recommendation': 'Recommendation',
    'feed.following': 'Following',
    
    // Wallet
    'wallet.balance': 'Balance',
    'wallet.add_funds': 'Add Funds',
    'wallet.withdraw': 'Withdraw',
    'wallet.transaction_history': 'Transaction History',
    'wallet.payment_methods': 'Payment Methods',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.upload': 'Upload',
    'common.download': 'Download',
    'common.view': 'View',
    'common.more': 'More',
    'common.less': 'Less',
    'common.all': 'All',
    'common.none': 'None',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.active': 'Active',
    'common.inactive': 'Inactive',
    'common.pending': 'Pending',
    'common.approved': 'Approved',
    'common.rejected': 'Rejected',
    
    // Additional Content
    'content.title.spring_cherry_blossom': 'Spring Cherry Blossom Session',
    'content.title.advanced_workout': 'Advanced Workout Routine',
    'content.title.digital_art': 'Digital Art Masterclass',
    'content.title.acoustic_guitar': 'Acoustic Guitar Cover',
    'content.title.morning_workout': 'Morning Workout Routine',
    
    // Content Descriptions
    'content.desc.spring_photoshoot': 'Beautiful spring photoshoot in the heart of Tokyo...',
    'content.desc.workout_routine': 'Complete full-body workout for advanced fitness...',
    'content.desc.digital_painting': 'Learn advanced digital painting techniques...',
    'content.desc.acoustic_rendition': 'Beautiful acoustic rendition of classic songs...',
    'content.desc.exclusive_content': 'Exclusive behind-the-scenes content for subscribers only',
    
    // Creator Names
    'creator.name.sakura': 'Sakura',
    'creator.name.alex_cooper': 'Alex Cooper',
    'creator.name.emma_rodriguez': 'Emma Rodriguez',
    'creator.name.mike_johnson': 'Mike Johnson',
    
    // Social Content
    'social.cherry_blossom_post': 'Just finished an amazing photoshoot in Shibuya! The cherry blossoms are in full bloom 🌸 #photography #japan #spring',
    'social.workout_post': 'New workout routine dropping tomorrow! Who\'s ready to get stronger? 💪 #fitness #workout #motivation',
    
    // Language Switcher
    'language.english': 'English',
    'language.japanese': '日本語',
    'language.switch': 'Switch Language',
  },
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.feed': 'フィード',
    'nav.ranking': 'ランキング',
    'nav.messages': 'メッセージ',
    'nav.account': 'アカウント',
    'nav.admin': '管理',
    'nav.creator': 'クリエイター',
    'nav.wallet': 'ウォレット',
    'nav.explore': '探索',
    
    // Search
    'search.placeholder': 'クリエイターを検索...',
    'search.button': '検索',
    
    // Hero Section
    'hero.title': 'お気に入りのクリエイターとつながろう',
    'hero.subtitle': '独占コンテンツを発見し、素晴らしいクリエイターをサポート',
    'hero.search.placeholder': 'クリエイター、コンテンツ、タグを検索...',
    'hero.cta.button': 'クリエイターになる',
    
    // Content Categories
    'category.popular': '人気',
    'category.new': '新着',
    'category.trending': 'トレンド',
    'category.most_attention': '注目',
    'category.amateur': 'アマチュア',
    'category.married_woman': '人妻',
    'category.beautiful_woman': '美女',
    'category.personal_filming': '個人撮影',
    'category.large_breasts': '巨乳',
    'category.home_video': 'ホームビデオ',
    'category.beautiful_breasts': '美乳',
    'category.student': '学生',
    'category.office_lady': 'OL',
    'category.mature': '熟女',
    'category.cosplay': 'コスプレ',
    'category.fetish': 'フェチ',
    'category.other': 'その他',
    
    // Content Actions
    'action.like': 'いいね',
    'action.bookmark': 'ブックマーク',
    'action.share': 'シェア',
    'action.comment': 'コメント',
    'action.follow': 'フォロー',
    'action.subscribe': '購読',
    'action.view_more': 'もっと見る',
    'action.see_all': 'すべて見る',
    
    // Library
    'library.purchased': '購入済み',
    'library.saved': '保存済み',
    'library.liked': 'いいね',
    'library.viewing_history': '視聴履歴',
    
    // Content Status
    'status.free': '無料',
    'status.premium': 'プレミアム',
    'status.plan_only': 'プランのみ',
    'status.new': '新着',
    
    // Time
    'time.ago': '前',
    'time.hours': '時間',
    'time.days': '日',
    'time.months': 'ヶ月',
    'time.years': '年',
    
    // Creator Stats
    'creator.followers': 'フォロワー',
    'creator.posts': '投稿',
    'creator.subscribe': '購読',
    'creator.verified': '認証済み',
    'creator.premium': 'プレミアム',
    'creator.vip': 'VIP',
    
    // Ranking
    'ranking.title': 'トップクリエイター',
    'ranking.overall': '総合ランキング',
    'ranking.butt': 'お尻ランキング',
    'ranking.adult_services': 'アダルトサービスランキング',
    'ranking.all': 'すべて',
    'ranking.popular': '人気',
    'ranking.premium': 'プレミアム',
    'ranking.live': 'ライブ',
    
    // Messages
    'messages.title': 'メッセージ',
    'messages.new': '新規メッセージ',
    'messages.conversations': '会話',
    
    // Account
    'account.profile': 'プロフィール',
    'account.settings': '設定',
    'account.logout': 'ログアウト',
    
    // Admin
    'admin.dashboard': '管理者ダッシュボード',
    'admin.platform_administration': 'プラットフォーム管理とモデレーション',
    'admin.total_users': '総ユーザー数',
    'admin.total_revenue': '総収益',
    'admin.violations': '違反',
    'admin.system_health': 'システム状況',
    'admin.overview': '概要',
    'admin.content_review': 'コンテンツ審査',
    'admin.takedown': '削除依頼',
    'admin.reports': '報告',
    'admin.kyc_verification': '本人確認',
    'admin.user_management': 'ユーザー管理',
    'admin.quick_actions': 'クイックアクション',
    'admin.review_content': 'コンテンツ審査',
    'admin.verify_kyc': '本人確認',
    'admin.ban_user': 'ユーザー停止',
    'admin.handle_reports': '報告処理',
    'admin.content_review_queue': 'コンテンツ審査キュー',
    'admin.takedown_requests': '削除依頼',
    'admin.user_reports': 'ユーザー報告',
    'admin.kyc_age_verification': '本人確認・年齢確認',
    'admin.content_review_placeholder': 'コンテンツ審査キューがここに表示されます',
    'admin.takedown_placeholder': '削除依頼がここに表示されます',
    'admin.reports_placeholder': 'ユーザー報告がここに表示されます',
    'admin.kyc_placeholder': '本人確認がここに表示されます',
    'admin.user_management_placeholder': 'ユーザー管理ツールがここに表示されます',
    
    // Login/Signup
    'auth.welcome_back': 'おかえりなさい',
    'auth.signin_account': 'OnlyUアカウントにサインイン',
    'auth.email': 'メール',
    'auth.phone': '電話',
    'auth.email_address': 'メールアドレス',
    'auth.password': 'パスワード',
    'auth.phone_number': '電話番号',
    'auth.verification_code': '認証コード',
    'auth.enter_email': 'メールアドレスを入力',
    'auth.enter_password': 'パスワードを入力',
    'auth.enter_6digit_code': '6桁のコードを入力',
    'auth.phone_format': '+81-XX-XXXX-XXXX または 0XX-XXXX-XXXX',
    'auth.remember_me': 'ログイン情報を保存',
    'auth.forgot_password': 'パスワードを忘れた？',
    'auth.sign_in': 'サインイン',
    'auth.signing_in': 'サインイン中...',
    'auth.verify_signin': '認証してサインイン',
    'auth.send_code': '認証コードを送信',
    'auth.verifying': '認証中...',
    'auth.sending_code': 'コード送信中...',
    'auth.code_sent_message': '認証コードを電話番号に送信しました',
    'auth.no_account': 'アカウントをお持ちでないですか？',
    'auth.signup_here': 'ここでサインアップ',
    'auth.terms_agreement': 'サインインすることで、',
    'auth.terms_of_service': '利用規約',
    'auth.and': 'と',
    'auth.privacy_policy': 'プライバシーポリシー',
    'auth.agreement_suffix': 'サインインすることで、利用規約とプライバシーポリシーに同意したことになります',
    
    // Success/Error Messages
    'message.login_success': 'ログイン成功！リダイレクト中...',
    'message.login_failed': 'ログインに失敗しました。認証情報を確認してください。',
    'message.code_sent': '認証コードを送信しました！',
    'message.code_send_failed': 'コードの送信に失敗しました。',
    'message.phone_verification_success': '電話認証が成功しました！',
    'message.invalid_code': '無効なコードです。',
    'message.twitter_auth_success': 'Twitter認証が成功しました！',
    'message.twitter_login_failed': 'Twitterログインに失敗しました。',
    'message.account_created': 'アカウントが正常に作成されました！メールで確認してください。',
    'message.signup_failed': 'サインアップに失敗しました。もう一度お試しください。',
    'message.phone_code_sent': '認証コードを電話に送信しました！',
    'message.phone_code_failed': '認証コードの送信に失敗しました。',
    'message.phone_verification_account_created': '電話認証が成功しました！アカウントが作成されました。',
    'message.invalid_verification_code': '無効な認証コードです。',
    'message.twitter_connected': 'Twitterアカウントが接続されました！プロフィールを完成させてください。',
    'message.twitter_signup_failed': 'Twitterサインアップに失敗しました。もう一度お試しください。',
    
    // Creator Dashboard
    'creator.dashboard.overview': '概要',
    'creator.dashboard.content': 'コンテンツ',
    'creator.dashboard.analytics': '分析',
    'creator.dashboard.subscribers': '購読者',
    'creator.dashboard.earnings': '収益',
    'creator.dashboard.schedule': 'スケジュール',
    'creator.dashboard.total_subscribers': '総購読者数',
    'creator.dashboard.monthly_revenue': '月間収益',
    'creator.dashboard.total_views': '総視聴数',
    'creator.dashboard.total_likes': '総いいね数',
    'creator.dashboard.total_comments': '総コメント数',
    'creator.dashboard.monthly_growth': '月間成長率',
    'creator.dashboard.conversion_rate': 'コンバージョン率',
    'creator.dashboard.avg_engagement': '平均エンゲージメント',
    'creator.dashboard.recent_subscribers': '最近の購読者',
    'creator.dashboard.upload_queue': 'アップロードキュー',
    'creator.dashboard.payout_history': '支払い履歴',
    'creator.dashboard.subscription_plans': 'サブスクリプションプラン',
    'creator.dashboard.scheduled_posts': 'スケジュール投稿',
    'creator.dashboard.upload_content': 'コンテンツをアップロード',
    'creator.dashboard.create_plan': 'プランを作成',
    'creator.dashboard.schedule_post': '投稿をスケジュール',
    
    // Content Types
    'content.type.video': '動画',
    'content.type.image': '画像',
    'content.type.text': 'テキスト',
    'content.type.gallery': 'ギャラリー',
    
    // Feed
    'feed.recommendation': 'おすすめ',
    'feed.following': 'フォロー中',
    
    // Wallet
    'wallet.balance': '残高',
    'wallet.add_funds': '資金を追加',
    'wallet.withdraw': '出金',
    'wallet.transaction_history': '取引履歴',
    'wallet.payment_methods': '支払い方法',
    
    // Common
    'common.loading': '読み込み中...',
    'common.error': 'エラー',
    'common.success': '成功',
    'common.cancel': 'キャンセル',
    'common.save': '保存',
    'common.edit': '編集',
    'common.delete': '削除',
    'common.upload': 'アップロード',
    'common.download': 'ダウンロード',
    'common.view': '表示',
    'common.more': 'もっと',
    'common.less': '少なく',
    'common.all': 'すべて',
    'common.none': 'なし',
    'common.yes': 'はい',
    'common.no': 'いいえ',
    'common.active': 'アクティブ',
    'common.inactive': '非アクティブ',
    'common.pending': '保留中',
    'common.approved': '承認済み',
    'common.rejected': '拒否済み',
    
    // Additional Content
    'content.title.spring_cherry_blossom': '春の桜セッション',
    'content.title.advanced_workout': '上級者向けワークアウトルーティン',
    'content.title.digital_art': 'デジタルアートマスタークラス',
    'content.title.acoustic_guitar': 'アコースティックギターカバー',
    'content.title.morning_workout': '朝のワークアウトルーティン',
    
    // Content Descriptions
    'content.desc.spring_photoshoot': '東京の中心で美しい春の写真撮影...',
    'content.desc.workout_routine': '上級者向けの完全な全身ワークアウト...',
    'content.desc.digital_painting': '高度なデジタルペインティング技術を学ぶ...',
    'content.desc.acoustic_rendition': 'クラシックソングの美しいアコースティック演奏...',
    'content.desc.exclusive_content': 'サブスクライバー限定の特別な裏側コンテンツ',
    
    // Creator Names
    'creator.name.sakura': 'さくら',
    'creator.name.alex_cooper': 'アレックス・クーパー',
    'creator.name.emma_rodriguez': 'エマ・ロドリゲス',
    'creator.name.mike_johnson': 'マイク・ジョンソン',
    
    // Social Content
    'social.cherry_blossom_post': '渋谷で素晴らしい写真撮影が完了しました！桜が満開です 🌸 #写真 #日本 #春',
    'social.workout_post': '明日新しいワークアウトルーティンを公開します！強くなりたい人はいますか？💪 #フィットネス #ワークアウト #モチベーション',
    
    // Language Switcher
    'language.english': 'English',
    'language.japanese': '日本語',
    'language.switch': '言語を切り替え',
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ja');

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