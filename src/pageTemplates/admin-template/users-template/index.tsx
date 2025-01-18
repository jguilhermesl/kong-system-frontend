'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UsersTable } from './users-table';

export const AdminUsersTemplate = () => {
  const router = useRouter();

  return (
    <PrivateLayout
      title="Usuários"
      actionsComponent={
        <Button onClick={() => router.push('/admin/users/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar usuário
        </Button>
      }
    >
      <div className="w-full">
        <UsersTable />
      </div>
    </PrivateLayout>
  );
};
