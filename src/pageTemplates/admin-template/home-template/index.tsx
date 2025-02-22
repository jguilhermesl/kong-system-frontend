import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { DashboardTable } from './dashboard-table';

export const AdminHomeTemplate = () => {
  return (
    <PrivateLayout title="Home">
      <h1>Em breve....</h1>
      <DashboardTable />
    </PrivateLayout>
  );
};
