import { Table } from '@/components/ui/table';
import { InventoryTableRow } from '../inventory-table-row';
import { InventoryItem } from '@/models/Inventory';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';

interface ConnectedAccountsProps {
  connectedAccounts: InventoryItem[];
}

export const ConnectedAccounts = ({
  connectedAccounts,
}: ConnectedAccountsProps) => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div>
        <Heading>Contas conectadas</Heading>
        <Paragraph>Visualize as contas conectadas</Paragraph>
      </div>
      <Table
        headers={[
          '',
          'Id',
          'Nome Jogo',
          'Tipo de Conta',
          'Preço',
          'Versão',
          'Foi vendido',
          'E-mail',
          'Cliente',
          'Console do Cliente',
        ]}
      >
        {connectedAccounts?.map((item, i) => (
          <InventoryTableRow key={item.id} index={i} item={item} />
        ))}
      </Table>
    </div>
  );
};
