
import { CreatorProfilePage } from '@/components/pages/CreatorProfilePage';

export default async function CreatorProfile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return <CreatorProfilePage username={username} />;
}

export async function generateStaticParams() {
  // Generate static params for popular creators
  return [
    { username: 'sakura_chan' },
    { username: 'yuki_san' },
    { username: 'akane_chan' }
  ];
}
