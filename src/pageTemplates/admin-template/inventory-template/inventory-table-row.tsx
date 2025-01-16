import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { InventoryItem } from '@/models/Inventory';
import { isEven } from '@/utils/is-even';
import { Edit, Trash } from 'lucide-react';

interface InventoryTableRowProps {
  item: InventoryItem;
  index: number;
}
export const InventoryTableRow = ({ item, index }: InventoryTableRowProps) => {
  return (
    <Table.Row isEven={isEven(index + 1)}>
      <Table.Col className="font-mono">{item.id}</Table.Col>
      <Table.Col className="font-medium max-w-[250px] truncate">
        {item.game}
      </Table.Col>
      <Table.Col>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">
            {item.accountType}
          </span>
        </div>
      </Table.Col>
      <Table.Col className="font-medium">{item.accountValue}</Table.Col>
      <Table.Col className="font-medium">{item.gameVersion}</Table.Col>
      <Table.Col className="font-medium">{item.sold}</Table.Col>
      <Table.Col className="font-medium">{item.email}</Table.Col>
      <Table.Col>
        <Button variant="outline" size="sm" onClick={() => {}}>
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
