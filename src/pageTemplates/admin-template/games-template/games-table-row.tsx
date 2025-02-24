import { deleteGame } from '@/api/games/delete-game';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { Game } from '@/models/Game';
import { queryClient } from '@/services/react-query';
import ConfirmDialog from '@/utils/confirmDialog';
import { isEven } from '@/utils/is-even';
import { toast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { Check, ChevronRight, Trash, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GamesTableRowProps {
  item: Game;
  index: number;
}

export const GamesTableRow = ({ item, index }: GamesTableRowProps) => {
  const router = useRouter();

  const { mutateAsync: deleteGameFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteGame,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['games'],
      });
    },
  });

  const handleDelete = async (itemID: string) => {
    const result = await ConfirmDialog({
      title: 'Você realmente deseja excluir este jogo?',
      confirmButtonText: 'Excluir',
    });
    if (result.isConfirmed) {
      try {
        await deleteGameFn({ id: itemID });
        toast('success', 'Jogo excluído com sucesso');
      } catch (error) {
        console.error('Erro ao excluir jogo:', error);
        toast('error', 'Erro ao excluir jogo');
      }
    }
  };

  return (
    <Table.Row isEven={isEven(index + 1)}>
      <Table.Col>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.replace(`/admin/games/${item.id}`)}
        >
          <ChevronRight className="mr-2 h-3 w-3" />
          Acessar
        </Button>
      </Table.Col>
      <Table.Col className="font-medium">{item.game}</Table.Col>
      <Table.Col className="font-medium">{item.currentPrice}</Table.Col>
      <Table.Col className="font-medium">{item.primaryValue}</Table.Col>
      <Table.Col className="font-medium">{item.secondaryValue}</Table.Col>
      <Table.Col className="font-medium">
        {item.primaryInInventory ? (
          <Check className="text-green-500" />
        ) : (
          <X className="text-red-500" />
        )}
      </Table.Col>
      <Table.Col className="font-medium">
        {item.secondaryInInventory ? (
          <Check className="text-green-500" />
        ) : (
          <X className="text-red-500" />
        )}
      </Table.Col>
      <Table.Col className="font-medium">{item.category}</Table.Col>
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
