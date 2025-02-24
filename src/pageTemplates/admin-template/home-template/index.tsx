'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { LastSaleTable } from './last-sale-table';
import { LastUserTable } from './last-user-table';
import { UsersActive } from './users-active';

export const AdminHomeTemplate = () => {
  return (
    <PrivateLayout title="Home">
      <UsersActive />
      <div className="flex items-center justify-between flex-1">
        <LastSaleTable />
        <LastUserTable />
      </div>
    </PrivateLayout>
  );
};
