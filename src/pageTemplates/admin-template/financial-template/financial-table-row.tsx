'use client';

import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { isEven } from '@/utils/is-even';
import { FinancialRecord } from '@/utils/mock-financial';
import { Check, Trash, X } from 'lucide-react';

interface FinancialTableRowProps {
  item: FinancialRecord;
  index: number;
}

export const FinancialTableRow = ({ item, index }: FinancialTableRowProps) => {
  console.log('item:', item);
  return (
    <Table.Row isEven={isEven(index + 1)}>
      <Table.Col className="font-medium">{item?.saleDate}</Table.Col>
      <Table.Col className="font-medium">{item?.productType}</Table.Col>
      <Table.Col className="font-medium">{item?.productName}</Table.Col>
      <Table.Col className="font-medium">
        R$ {item?.saleValue.toFixed(2)}
      </Table.Col>
      <Table.Col className="font-medium">
        R$ {item?.unitValue.toFixed(2)}
      </Table.Col>
      <Table.Col className="font-medium">
        R$ {item?.commission.toFixed(2)}
      </Table.Col>
      <Table.Col className="font-medium">
        R$ {item?.profitOrExpense.toFixed(2)}{' '}
        {item?.profitOrExpense > 0 ? '(Lucro)' : '(Despesa)'}
      </Table.Col>
      <Table.Col className="font-medium">
        {item?.paidOrRefunded ? (
          <Check className="text-green-500" />
        ) : (
          <X className="text-red-500" />
        )}
      </Table.Col>
      <Table.Col className="font-medium">{item?.seller}</Table.Col>
      <Table.Col className="font-medium">{item?.notes || '-'}</Table.Col>
      <Table.Col className="font-medium">{item?.clientName}</Table.Col>
      <Table.Col className="font-medium">{item?.clientNumber}</Table.Col>
      <Table.Col className="font-medium">{item?.responsible}</Table.Col>
      <Table.Col>
        <Button size="sm">
          <Trash className="mr-2 h-3 w-3" />
          Deletar
        </Button>
      </Table.Col>
    </Table.Row>
  );
};
