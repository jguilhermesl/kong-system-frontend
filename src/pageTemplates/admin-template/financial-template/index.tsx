import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { FinancialExtract } from './financial-extract';
import { FinancialTable } from './financial-table';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, HandCoins } from 'lucide-react';

export const FinancialTemplate = () => {
  return (
    <PrivateLayout
      actionsComponent={
        <Button className="gap-2">
          Adicionar nova despesa <CircleDollarSign size={20} color="#fff" />{' '}
        </Button>
      }
      title="Financeiro"
    >
      <FinancialExtract />

      <FinancialTable />
    </PrivateLayout>
  );
};
