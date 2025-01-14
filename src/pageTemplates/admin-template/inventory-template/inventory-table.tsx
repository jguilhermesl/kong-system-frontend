import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Spinner } from '@/components/ui/spinner';
import { InventoryTableRow } from './inventory-table-row';

export const InventoryTable = () => {
  const isPending = false;
  const inventory: any = [];

  return (
    <div className="flex items-center w-full justify-center">
      {isPending ? (
        <Spinner />
      ) : (
        <div className="border rounded-md flex items-center w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Identificador</TableHead>
                <TableHead>Nome da categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory?.map((item, i) => {
                return <InventoryTableRow key={i} item={item} />;
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
