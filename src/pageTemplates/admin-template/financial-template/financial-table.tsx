'use client';
import { Table } from '@/components/ui/table';
import { FinancialTableRow } from './financial-table-row';
import { fetchFinancial } from '@/api/financial/fetch-financial';
import { useQuery } from '@tanstack/react-query';
import { Financial } from '@/models/Financial';
import { Spinner } from '@/components/ui/spinner';

export const FinancialTable = () => {
  const { data: dataFinancial, isPending } = useQuery({
    queryFn: fetchFinancial,
    queryKey: ['financial'],
  });

  const financial = dataFinancial?.data || [];

  return (
    <div className="flex items-center mt-5 w-full justify-center">
      {isPending ? (
        <Spinner />
      ) : (
        <Table
          headers={[
            'Data de Venda',
            'Tipo do Produto',
            'Nome do Produto',
            'Valor da Venda',
            'Valor do Produto (Unidade)',
            'Comissionamento',
            'Lucro/Despesa',
            'Pago/Reembolsado',
            'Vendedor',
            'Observação',
            'Nome do Cliente',
            'Número do Cliente',
            'Responsável',
            '',
            '',
          ]}
        >
          {financial?.map((item: Financial, index: number) => (
            <FinancialTableRow key={index} index={index} item={item} />
          ))}
        </Table>
      )}
    </div>
  );
};
