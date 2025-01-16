'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IndicationsTable } from './indications-table';

export const AdminIndicationsTemplate = () => {
  const router = useRouter();

  return (
    <PrivateLayout
      title="Indicações"
      actionsComponent={
        <Button onClick={() => router.push('/admin/indications/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar indicação
        </Button>
      }
    >
      <div>
        <IndicationsTable />
      </div>
    </PrivateLayout>
  );
};
