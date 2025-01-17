'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { IndicationsTable } from './indications-table';

export const AdminIndicationsTemplate = () => {
  return (
    <PrivateLayout title="Indicações">
      <div>
        <IndicationsTable />
      </div>
    </PrivateLayout>
  );
};
