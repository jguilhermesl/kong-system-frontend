import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { InventoryTable } from './inventory-table';

export const AdminInventoryTemplate = () => {
  return (
    <PrivateLayout title="Estoque de Jogos">
      <div>
        <InventoryTable />
      </div>
    </PrivateLayout>
  );
};
