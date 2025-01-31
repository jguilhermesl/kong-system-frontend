'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
// import { FinancialExtract } from './financial-extract';
import { FinancialTable } from './financial-table';
import { Button } from '@/components/ui/button';
import { CircleDollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const FinancialTemplate = () => {
  const router = useRouter();

  return (
    <PrivateLayout
      actionsComponent={
        <Button
          onClick={() => router.push('financial/new-expense')}
          className="gap-2"
        >
          Adicionar nova despesa <CircleDollarSign size={20} color="#fff" />{' '}
        </Button>
      }
      title="Financeiro"
    >
      {/* <FinancialExtract /> */}
      <FinancialTable />
    </PrivateLayout>
  );
};
