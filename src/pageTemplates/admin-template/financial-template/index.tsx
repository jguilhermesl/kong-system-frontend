'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { FinancialExtract } from './financial-extract';
import { FinancialTable } from './financial-table';
import { Button } from '@/components/ui/button';
import { CircleDollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import { fetchFinancial } from '@/api/financial/fetch-financial';

export const FinancialTemplate = () => {
  const router = useRouter();

  const { data: dataFinancial, isPending } = useQuery({
    queryFn: fetchFinancial,
    queryKey: ['financial'],
  });

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
      {isPending ? (
        <div className="flex items-center justify-center w-full">
          <Spinner />
        </div>
      ) : (
        <>
          <FinancialExtract metrics={dataFinancial?.metrics} />
          <FinancialTable financial={dataFinancial?.data || []} />
        </>
      )}
    </PrivateLayout>
  );
};
