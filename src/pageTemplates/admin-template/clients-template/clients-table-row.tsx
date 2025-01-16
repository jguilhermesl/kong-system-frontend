import { deleteUser } from '@/api/users/delete-users';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { User } from '@/models/User';
import { queryClient } from '@/services/react-query';
import ConfirmDialog from '@/utils/confirmDialog';
import { isEven } from '@/utils/is-even';
import { toast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ClientsTableRowProps {
  item: User;
  index: number;
}

export const ClientsTableRow = ({ item, index }: ClientsTableRowProps) => {
  const router = useRouter();

  const { mutateAsync: deleteUserFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteUser,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });

  const handleDelete = async (itemID: string) => {
    const result = await ConfirmDialog({
      title: 'Você realmente deseja excluir este usuário?',
      confirmButtonText: 'Excluir',
    });
    if (result.isConfirmed) {
      try {
        await deleteUserFn({ id: itemID });
        toast('success', 'Usuário excluído com sucesso');
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        toast('error', 'Erro ao excluir usuário');
      }
    }
  };

  return (
    <Table.Row isEven={isEven(index + 1)}>
      <Table.Col className="font-medium">{item.name}</Table.Col>
      <Table.Col>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">
            {item.console}
          </span>
        </div>
      </Table.Col>
      <Table.Col className="font-medium">{item.email}</Table.Col>
      <Table.Col className="font-medium">{item.createdAt || '-'}</Table.Col>
      <Table.Col>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            router.push(`/admin/users/${item.id}`);
          }}
        >
          <Edit className="mr-2 h-3 w-3" />
          Editar
        </Button>
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
