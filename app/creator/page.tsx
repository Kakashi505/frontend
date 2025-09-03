import { MainLayout } from '@/components/layout/MainLayout';
import { CreatorProfilePage } from '@/components/pages/CreatorProfilePage';

export default function Creator() {
  return (
    <MainLayout>
      <CreatorProfilePage username="default" />
    </MainLayout>
  );
}
