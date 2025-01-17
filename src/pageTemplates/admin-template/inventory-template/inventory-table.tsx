'use client';
import { Spinner } from '@/components/ui/spinner';
import { InventoryTableRow } from './inventory-table-row';
import { useQuery } from '@tanstack/react-query';
import { fetchInventory } from '@/api/inventory/fetch-inventory';
import { Table } from '@/components/ui/table';
import { useSearchParams } from 'next/navigation';

export const InventoryTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const sold =
    searchParams.get('sold') === 'true'
      ? 'true'
      : searchParams.get('sold') === 'false'
      ? 'false'
      : undefined;

  const { data: inventoryData, isPending } = useQuery({
    queryFn: () => fetchInventory({ search, sold }),
    queryKey: ['inventory', search, sold],
  });

  const inventory = inventoryData?.data || [];

  return (
    <div className="flex items-center w-full justify-center">
      {isPending ? (
        <Spinner />
      ) : (
        <div className="border rounded-md w-full">
          <Table
            headers={[
              'Id',
              'Nome Jogo',
              'Tipo de Conta',
              'Preço',
              'Versão',
              'Foi vendido',
              'E-mail',
              '',
              '',
            ]}
          >
            {inventory?.map((item, i) => (
              <InventoryTableRow key={item.id} index={i} item={item} />
            ))}
          </Table>
        </div>
      )}
    </div>
  );
};
