import { deleteIndication } from '@/api/indications/delete-indication';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { Indication } from '@/models/Indication';
import { queryClient } from '@/services/react-query';
import ConfirmDialog from '@/utils/confirmDialog';
import { formatDateAndHour } from '@/utils/format-date-and-hour';
import { isEven } from '@/utils/is-even';
import { toast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { Trash } from 'lucide-react';

interface IndicationsTableRowProps {
  item: Indication;
  index: number;
}

export const IndicationsTableRow = ({
  item,
  index,
}: IndicationsTableRowProps) => {
  const { mutateAsync: deleteIndicationFn, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteIndication,
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ['indications'],
        });
      },
    });

  const handleDelete = async (itemID: string) => {
    const result = await ConfirmDialog({
      title: 'Você realmente deseja excluir esta indicação?',
      confirmButtonText: 'Excluir',
    });
    if (result.isConfirmed) {
      try {
        await deleteIndicationFn({ id: itemID });
        toast('success', 'Indicação excluída com sucesso');
      } catch (error) {
        console.error('Erro ao excluir indicação:', error);
        toast('error', 'Erro ao excluir indicação');
      }
    }
  };

  return (
    <Table.Row isEven={isEven(index + 1)}>
      <Table.Col className="font-medium">{item.user?.name}</Table.Col>
      <Table.Col className="font-medium">{item.inventory?.game}</Table.Col>
      <Table.Col className="font-medium">
        {item.inventory?.accountValue}
      </Table.Col>
      <Table.Col className="font-medium">{item.user?.code}</Table.Col>
      <Table.Col className="font-medium">{item.cashback}</Table.Col>
      <Table.Col className="font-medium">
        {formatDateAndHour(item.createdAt) || '-'}
      </Table.Col>
      <Table.Col>
        <Button
          onClick={() => handleDelete(item.id)}
          variant="ghost"
          size="sm"
          disabled={isDeleting}
        >
          <Trash className="mr-2 h-3 w-3" />
          Deletar
        </Button>
      </Table.Col>
    </Table.Row>
  );
};
