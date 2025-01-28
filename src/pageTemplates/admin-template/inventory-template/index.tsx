'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { InventoryTable } from './inventory-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { InventoryTableFilters } from './inventory-table-filters';

export const AdminInventoryTemplate = () => {
  const router = useRouter();

  return (
    <PrivateLayout
      title="Estoque de Jogos"
      actionsComponent={
        <>
          <Button
            variant={'secondary'}
            onClick={() => router.push('/admin/inventory/new-registration')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar estoque
          </Button>
          <Button onClick={() => router.push('/admin/inventory/new-sale')}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar venda
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <InventoryTableFilters />
        <InventoryTable />
      </div>
    </PrivateLayout>
  );
};
