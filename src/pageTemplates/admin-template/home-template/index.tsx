'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { LastSaleTable } from './last-sale-table';
import { LastUserTable } from './last-user-table';
import { UsersActive } from './users-active';
import { Heading } from '@/components/ui/heading';

export const AdminHomeTemplate = () => {
  return (
    <PrivateLayout title="Home">
      <UsersActive />
      <Heading className="my-5"> 10 Últimas vendas</Heading>
      <LastSaleTable />
      <Heading className="my-5"> 10 Últimos usuários</Heading>
      <LastUserTable />
    </PrivateLayout>
  );
};
