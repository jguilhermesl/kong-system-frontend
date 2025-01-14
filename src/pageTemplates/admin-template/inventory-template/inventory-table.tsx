'use client';
import { Spinner } from '@/components/ui/spinner';
import { InventoryTableRow } from './inventory-table-row';
import { useQuery } from '@tanstack/react-query';
import { fetchInventory } from '@/api/inventory/fetch-inventory';
import { Table } from '@/components/ui/table';

export const InventoryTable = () => {
  const { data: inventoryData, isPending } = useQuery({
    queryFn: fetchInventory,
    queryKey: ['inventory'],
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
              'Identificador',
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
              <InventoryTableRow key={i} index={i} item={item} />
            ))}
          </Table>
        </div>
      )}
    </div>
  );
};
