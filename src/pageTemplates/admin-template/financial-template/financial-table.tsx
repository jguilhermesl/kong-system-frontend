import { Table } from '@/components/ui/table';
import { FinancialTableRow } from './financial-table-row';
import { FinancialRecord, financialRecordsMock } from '@/utils/mock-financial';

export const FinancialTable = () => {
  return (
    <div className="flex items-center mt-5 w-full justify-center">
      <div className="flex items-center w-full flex-1 border rounded-md">
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
          ]}
        >
          {financialRecordsMock?.map((item: FinancialRecord, index: number) => (
            <FinancialTableRow key={index} index={index} item={item} />
          ))}
        </Table>
      </div>
    </div>
  );
};
