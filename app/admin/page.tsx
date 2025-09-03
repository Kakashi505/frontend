import { MainLayout } from '@/components/layout/MainLayout';
import { AdminDashboard } from '@/components/pages/AdminDashboard';

export default function Admin() {
  return (
    <MainLayout>
      <AdminDashboard />
    </MainLayout>
  );
}
