import { deleteUser } from '@/api/users/delete-users';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { User } from '@/models/User';
import { queryClient } from '@/services/react-query';
import ConfirmDialog from '@/utils/confirmDialog';
import { toast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { Edit, Trash } from 'lucide-react';

interface UserTableRowProps {
  item: User;
}

export const UsersTableRow = ({ item }: UserTableRowProps) => {
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
    } else {
      toast('error', 'Ação cancelada');
    }
  };

  return (
    <TableRow>
      <TableCell className="font-mono">{item.id}</TableCell>
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">{item.role}</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">{item.email}</TableCell>
      <TableCell>
        <Button variant="outline" size="sm" onClick={() => {}}>
          <Edit className="mr-2 h-3 w-3" />
          Editar
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={() => handleDelete(item.id)}
          variant="ghost"
          size="sm"
          disabled={isDeleting}
        >
          <Trash className="mr-2 h-3 w-3" />
          Deletar
        </Button>
      </TableCell>
    </TableRow>
  );
};
