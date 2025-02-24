import { Table } from '@/components/ui/table';
import { Financial } from '@/models/Financial';
import { formatDate } from '@/utils/format-date';
import { isEven } from '@/utils/is-even';

interface DashboardTableRowProps {
  item: Financial;
  index: number;
}

export const LastSaleTableRow = ({ item, index }: DashboardTableRowProps) => {
  return (
    <Table.Row isEven={isEven(index + 1)}>
      <Table.Col className="font-medium">{item?.client?.name || '-'}</Table.Col>

      <Table.Col className="font-medium">
        {item?.client?.phone || '-'}
      </Table.Col>
      <Table.Col className="font-medium">{item?.productName || '-'}</Table.Col>
      <Table.Col className="font-medium text-green-500">
        {item?.saleValue || '-'}
      </Table.Col>
      <Table.Col className="font-medium">
        {formatDate(item.createdAt)}
      </Table.Col>
      <Table.Col className="font-medium">
        {item?.createdBy.name || '-'}
      </Table.Col>
      <Table.Col className="font-medium">{item?.productType || '-'}</Table.Col>
    </Table.Row>
  );
};
