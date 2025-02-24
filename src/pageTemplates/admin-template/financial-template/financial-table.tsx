'use client';
import { Table } from '@/components/ui/table';
import { FinancialTableRow } from './financial-table-row';
import { Financial } from '@/models/Financial';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface FinancialProps {
  financial: Financial[];
}

export const FinancialTable = ({ financial }: FinancialProps) => {
  return (
    <Card className="col-span-6 mt-6">
      <CardHeader className="flex-row items-center justify-between pb-8 relative">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Extrato financeiro
          </CardTitle>
          <CardDescription>
            Aqui você visualiza as entradas e saídas da Kong Games
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
