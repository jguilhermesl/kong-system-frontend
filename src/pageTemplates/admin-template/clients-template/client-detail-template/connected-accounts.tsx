import { Table } from '@/components/ui/table';
import { InventoryItem } from '@/models/Inventory';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { InventoryTableRow } from '../../inventory-template/inventory-table-row';

interface ConnectedAccountsProps {
  connectedAccounts?: InventoryItem[];
}

export const ConnectedAccounts = ({
  connectedAccounts,
}: ConnectedAccountsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Heading>Contas do cliente</Heading>
        <Paragraph>
          Visualize todas as contas que o cliente já adquiriu
        </Paragraph>
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
