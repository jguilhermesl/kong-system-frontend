import { updatePointsUsageStatus } from '@/api/pending-tasks/update-points-usage-status';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { PendingTask } from '@/models/PendingTask';
import { queryClient } from '@/services/react-query';
import { formatDateAndHour } from '@/utils/format-date-and-hour';
import { getPendingTaskTypeLabel } from '@/utils/get-pending-task-type-label';
import { isEven } from '@/utils/is-even';
import { toast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { Check, X } from 'lucide-react';

interface PendingTasksTableRowProps {
  item: PendingTask;
  index: number;
}

export const PendingTasksTableRow = ({
  item,
  index,
}: PendingTasksTableRowProps) => {
  const isPointsUsage = item.type === 'point-usage';

  const { mutateAsync: updatePointsUsageStatusFn, isPending: isDeleting } =
    useMutation({
      mutationFn: updatePointsUsageStatus,
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ['pending-tasks'],
        });
      },
    });

  const handleUpdateStatus = async (
    itemID: string,
    action: 'approved' | 'rejected'
  ) => {
    try {
      console.log({ itemID, action });
      await updatePointsUsageStatusFn({ id: itemID, action });
      toast('success', `Pendência atualizada com sucesso.`);
    } catch (error) {
      console.error(`Error updating task status to ${action}:`, error);
      toast('error', `Erro ao atualizar.`);
    }
  };

  return (
    <Table.Row isEven={isEven(index + 1)}>
      <Table.Col className="font-medium">{item.user?.name}</Table.Col>
      <Table.Col className="font-medium">{item.game?.game}</Table.Col>
      <Table.Col className="font-medium">{item.game?.gameVersion}</Table.Col>
      <Table.Col className="font-medium">{item.game?.type}</Table.Col>
      <Table.Col className="font-medium">
        {getPendingTaskTypeLabel(item?.type || '')}
      </Table.Col>
      <Table.Col className="font-medium">
        {item?.price} {isPointsUsage && 'pontos'}
      </Table.Col>
      <Table.Col className="font-medium">
        {formatDateAndHour(item?.createdAt || '')}
      </Table.Col>
      <Table.Col>
        <Button
          onClick={() => handleUpdateStatus(item.id, 'approved')}
          variant="outline"
          size="sm"
          disabled={isDeleting}
        >
          <Check className="mr-2 h-3 w-3" />
          Feito
        </Button>
      </Table.Col>
      <Table.Col>
        <Button
          onClick={() => handleUpdateStatus(item.id, 'rejected')}
          variant="destructive"
          size="sm"
          disabled={isDeleting}
        >
          <X className="mr-2 h-3 w-3" />
          Rejeitar
        </Button>
      </Table.Col>
    </Table.Row>
  );
};
