import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { Financial } from '@/models/Financial';
import { formatDate } from '@/utils/format-date';
import { isEven } from '@/utils/is-even';
import { Edit, Trash } from 'lucide-react';

interface DashboardTableRowProps {
  item: Financial;
  index: number;
}

export const LastSaleTableRow = ({ item, index }: DashboardTableRowProps) => {
  const handleDelete = async (itemID: string) => {
    alert('teste');
  };

  return (
    <Table.Row isEven={isEven(index + 1)}>
      <Table.Col className="font-medium">{item?.client?.name || '-'}</Table.Col>

      <Table.Col className="font-medium">
        {item?.client?.phone || '-'}
      </Table.Col>
      <Table.Col className="font-medium">
        {formatDate(item.createdAt)}
      </Table.Col>
      <Table.Col className="font-medium">
        {item?.createdBy.name || '-'}
      </Table.Col>
      <Table.Col className="font-medium">{item?.productName || '-'}</Table.Col>
      <Table.Col className="font-medium">{item?.productType || '-'}</Table.Col>
      <Table.Col className="font-medium">{item?.saleValue || '-'}</Table.Col>
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
