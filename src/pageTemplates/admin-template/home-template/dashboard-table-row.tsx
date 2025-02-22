import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { Financial } from '@/models/Financial';
import { User } from '@/models/User';
import { isEven } from '@/utils/is-even';
import { Edit, Trash } from 'lucide-react';

interface DashboardTableProps {
  item: DashboardResponse;
  index: number;
}

interface DashboardResponse {
  latestUsers: User[];
  activeUsersCount: {
    adminUsers: number;
    clientUsers: number;
  };
  latestSales: Financial[];
}

export const DashboardTableRow = ({ item, index }: DashboardTableProps) => {
  const handleDelete = async (itemID: string) => {
    alert('teste');
  };

  return (
    <Table.Row isEven={isEven(index + 1)}>
      {/* Exibir os nomes dos usuários mais recentes */}
      <Table.Col className="font-medium">
        {item.latestUsers.map((user) => user.name).join(', ')}
      </Table.Col>

      {/* Exibir a contagem de usuários ativos */}
      <Table.Col className="font-medium">
        {item.activeUsersCount.adminUsers} Admins /{' '}
        {item.activeUsersCount.clientUsers} Clientes
      </Table.Col>

      {/* Exibir detalhes das últimas vendas */}
      <Table.Col className="font-medium">
        {item.latestSales.map((sale) => sale.client).join(', ')}
      </Table.Col>

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
