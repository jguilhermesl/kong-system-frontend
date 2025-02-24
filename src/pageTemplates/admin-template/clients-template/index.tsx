'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ClientsTable } from './clients-table';
import { ClientsTableFilters } from './clients-table-filters';

export const AdminClientsTemplate = () => {
  const router = useRouter();

  return (
    <PrivateLayout
      title="Clientes"
      actionsComponent={
        <Button onClick={() => router.push('/admin/clients/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar cliente
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <ClientsTableFilters />
        <ClientsTable />
      </div>
    </PrivateLayout>
  );
};
