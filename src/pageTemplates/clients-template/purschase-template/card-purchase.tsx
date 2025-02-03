import { Paragraph } from '@/components/ui/paragraph';
import { InfoPurchase } from './info-purchase';

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
    <div className="py-4 px-6 mb-6 flex sm:flex-row flex-col justify-between rounded-xl shadow-md border-border border">
      <div className="flex flex-col gap-2">
        <Paragraph className="text-lg font-bold mb-4">{data.game}</Paragraph>
        <InfoPurchase label="Versão do jogo" value={data.gameVersion} />
        <InfoPurchase label="Tipo de conta" value={data.accountType} />
        <InfoPurchase label="E-mail de acesso" value={data.email} />
        <InfoPurchase label="Senha de acesso" value={data.password} />
        <InfoPurchase label="Data de compra" value={data.createdAt || '-'} />
        <InfoPurchase label="Valor da Conta" value={data.accountValue} />
      </div>
      {/* <div className="flex sm:mt-0 mt-10 gap-4">
        <Button className="gap-2">
          <Download size={18} />
Baixar PDF
        </Button>
      </div> */}
    </div>
  );
};
