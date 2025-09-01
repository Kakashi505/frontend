'use client';

import { CreatorProfilePage } from '@/components/pages/CreatorProfilePage';

export default function CreatorProfile({ params }: { params: { username: string } }) {
  return <CreatorProfilePage username={params.username} />;
}
