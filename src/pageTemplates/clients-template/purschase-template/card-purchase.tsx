import { Paragraph } from '@/components/ui/paragraph';
import { InfoPurchase } from './info-purchase';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { formatDate } from '@/utils/format-date';

interface CardPurchaseProps {
  id: string;
  game: string;
  gameVersion: string;
  accountType: string;
  email: string;
  password: string;
  createdAt: string;
  accountValue: string;
}

interface CardProps {
  data: CardPurchaseProps;
}

export const CardPurchase = ({ data }: CardProps) => {
  return (
    <div className="p-4 mb-5 border flex sm:flex-row flex-col justify-between rounded-lg shadow-md">
      <div>
        <Paragraph className="text-lg font-semibold mb-4">
          {data.game}
        </Paragraph>
        <InfoPurchase label="Versão do jogo" value={data.gameVersion} />
        <InfoPurchase label="Tipo de conta" value={data.accountType} />
        <InfoPurchase label="E-mail de acesso" value={data.email} />
        <InfoPurchase label="Senha de acesso" value={data.password} />
        <InfoPurchase
          label="Data de compra"
          value={formatDate(data.createdAt)}
        />
        <InfoPurchase label="Valor da Conta" value={data.accountValue} />
      </div>
      <div className="flex sm:mt-0 mt-10 gap-4">
        <Button className="gap-2">
          <Trash size={18} />
          Delete
        </Button>
        <Button className="gap-2" variant={'secondary'}>
          <Pencil size={18} />
          Edit
        </Button>
      </div>
    </div>
  );
};
