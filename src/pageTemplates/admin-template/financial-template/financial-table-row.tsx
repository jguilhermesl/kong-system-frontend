'use client';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { Financial } from '@/models/Financial';
import { isEven } from '@/utils/is-even';
import { Check, Trash, X } from 'lucide-react';
import clsx from 'clsx';
import { queryClient } from '@/services/react-query';
import { deleteFinancial } from '@/api/financial/delete-financial';
import { useMutation } from '@tanstack/react-query';
import ConfirmDialog from '@/utils/confirmDialog';
import { toast } from '@/utils/toast';

interface FinancialTableRowProps {
  item: Financial;
  index: number;
}

export const FinancialTableRow = ({ item, index }: FinancialTableRowProps) => {
  const { mutateAsync: deleteFinancialFn, isPending } = useMutation({
    mutationFn: deleteFinancial,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['financial'],
      });
    },
  });

  const handleDelete = async (itemID: string) => {
    const result = await ConfirmDialog({
      title: 'Você realmente deseja excluir esse registro financeiro?',
      confirmButtonText: 'Excluir',
    });
    if (result.isConfirmed) {
      try {
        await deleteFinancialFn({ id: itemID });
        toast('success', 'Registro financeiro deletado com sucesso!');
      } catch {
        toast('error', 'Erro ao deletar registro financeiro');
      }
    }
  };

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
      <Table.Col className="font-medium">
        {item.createdBy?.name || '-'}
      </Table.Col>
      <Table.Col>
        <Button
          size="sm"
          onClick={() => handleDelete(item.id)}
          disabled={isPending}
        >
          <Trash className="mr-2 h-3 w-3" />
          Deletar
        </Button>
      </Table.Col>
    </Table.Row>
  );
};
