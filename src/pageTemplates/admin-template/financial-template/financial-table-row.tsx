'use client';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { Financial } from '@/models/Financial';
import { isEven } from '@/utils/is-even';
import { Check, Trash, X } from 'lucide-react';
import clsx from 'clsx';

interface FinancialTableRowProps {
  item: Financial;
  index: number;
}

export const FinancialTableRow = ({ item, index }: FinancialTableRowProps) => {
  const formatCurrency = (value?: string) => {
    if (!value) return 0;
    const sanitizedValue = value.replace('R$', '').replace(',', '.').trim();
    return isNaN(parseFloat(sanitizedValue)) ? 0 : parseFloat(sanitizedValue);
  };

  const saleValue = formatCurrency(item.saleValue);
  const productValue = formatCurrency(item.productValue);
  const commissioning = formatCurrency(item.commissioning);

  const profitOrLoss = saleValue - (productValue + commissioning);
  const formattedProfitOrLoss = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(profitOrLoss);

  return (
    <Table.Row isEven={isEven(index + 1)}>
      <Table.Col className="font-medium">{item.createdAt || '-'}</Table.Col>
      <Table.Col className="font-medium">{item.productType || '-'}</Table.Col>
      <Table.Col className="font-medium">{item.productName || '-'}</Table.Col>
      <Table.Col className="font-medium">
        {item.saleValue || 'R$ 0,00'}
      </Table.Col>
      <Table.Col className="font-medium">
        {item.productValue || 'R$ 0,00'}
      </Table.Col>
      <Table.Col className="font-medium">
        {item.commissioning || 'R$ 0,00'}
      </Table.Col>
      <Table.Col
        className={clsx('font-medium', {
          'text-green-500': profitOrLoss > 0,
          'text-red-500': profitOrLoss <= 0,
        })}
      >
        {formattedProfitOrLoss} {profitOrLoss > 0 ? '(Lucro)' : '(Despesa)'}
      </Table.Col>
      <Table.Col className="font-medium">
        {item.paidOrRefunded ? (
          <Check className="text-green-500" />
        ) : (
          <X className="text-red-500" />
        )}
      </Table.Col>
      <Table.Col className="font-medium">{item.seller?.name || '-'}</Table.Col>
      <Table.Col className="font-medium">{item.obs || '-'}</Table.Col>
      <Table.Col className="font-medium">{item.client?.name || '-'}</Table.Col>
      <Table.Col className="font-medium">{item.clientNumber || '-'}</Table.Col>
      <Table.Col className="font-medium">{item.seller?.name || '-'}</Table.Col>
      <Table.Col>
        <Button size="sm">
          <Trash className="mr-2 h-3 w-3" />
          Deletar
        </Button>
      </Table.Col>
    </Table.Row>
  );
};
