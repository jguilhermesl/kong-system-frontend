import { Table } from '@/components/ui/table';
import { User } from '@/models/User';
import { formatDate } from '@/utils/format-date';
import { isEven } from '@/utils/is-even';

interface DashboardTableRowProps {
  item: User;
  index: number;
}

export const LastUserTableRow = ({ item, index }: DashboardTableRowProps) => {
  return (
    <Table.Row isEven={isEven(index + 1)}>
      <Table.Col className="font-medium">{item.name}</Table.Col>
      <Table.Col className="font-medium">{item.email}</Table.Col>
      <Table.Col className="font-medium">{item.phone}</Table.Col>
      <Table.Col className="font-medium">
        {formatDate(item.createdAt)}
      </Table.Col>
      <Table.Col className="font-medium">{item.role}</Table.Col>
    </Table.Row>
  );
};
