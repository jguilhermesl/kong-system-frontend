import { Table } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { fetchPendingTasks } from '@/api/pending-tasks/fetch-pending-tasks';
import { PendingTasksTableRow } from './pending-tasks-table-row';

export const PendingTasksTable = () => {
  const { data: pendingTasksData, isPending } = useQuery({
    queryFn: () => fetchPendingTasks({}),
    queryKey: ['pending-tasks'],
  });

  const pendingTasks = pendingTasksData?.data || [];

  return (
    <div className="flex items-center w-full justify-center">
      {isPending ? (
        <Spinner />
      ) : pendingTasks.length === 0 ? (
        <div className="flex items-center justify-center w-full p-4">
          <p className="text-gray-500">Sem pendências no momento.</p>
        </div>
      ) : (
        <div className="flex items-center w-full flex-1 border rounded-md">
          <Table
            headers={[
              'Cliente',
              'Jogo',
              'Versão do Jogo',
              'Tipo de Conta',
              'Tipo de Pendência',
              'Valor',
              'Criado em',
              '',
              '',
            ]}
          >
            {pendingTasks.map((item, i: number) => {
              return <PendingTasksTableRow key={i} index={i} item={item} />;
            })}
          </Table>
        </div>
      )}
    </div>
  );
};
