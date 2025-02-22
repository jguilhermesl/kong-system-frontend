import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { User } from '@/models/User';
import { formatDate } from '@/utils/format-date';
import { isEven } from '@/utils/is-even';
import { Edit, Trash } from 'lucide-react';

interface DashboardTableRowProps {
  item: User;
  index: number;
}

export const LastUserTableRow = ({ item, index }: DashboardTableRowProps) => {
  const handleDelete = async (itemID: string) => {
    alert('teste');
  };

  return (
    <Table.Row isEven={isEven(index + 1)}>
      <Table.Col className="font-medium">{item.cpf}</Table.Col>

      <Table.Col className="font-medium">
        {formatDate(item.createdAt)}
      </Table.Col>

      <Table.Col className="font-medium">{item.email}</Table.Col>
      <Table.Col className="font-medium">{item.id}</Table.Col>
      <Table.Col className="font-medium">{item.name}</Table.Col>
      <Table.Col className="font-medium">{item.phone}</Table.Col>
      <Table.Col className="font-medium">{item.role}</Table.Col>
      <Table.Col>
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-3 w-3" />
          Editar
        </Button>
      </Table.Col>
      <Table.Col>
        <Button variant="ghost" size="sm">
          <Trash className="mr-2 h-3 w-3" />
          Deletar
        </Button>
      </Table.Col>
    </Table.Row>
  );
};
