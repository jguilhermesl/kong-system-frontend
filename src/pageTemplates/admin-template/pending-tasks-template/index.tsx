'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { PendingTasksTable } from './pending-tasks-table';

export const AdminPendingTasksTemplate = () => {
  return (
    <PrivateLayout title="Pendências">
      <div>
        <PendingTasksTable />
      </div>
    </PrivateLayout>
  );
};
