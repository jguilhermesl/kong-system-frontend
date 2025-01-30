/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchStoreResponse } from '@/api/store/fetch-store';
import { Button } from '@/components/ui/button';
import { Carousel } from '@/components/ui/carousel';
import { Heading } from '@/components/ui/heading';
import { KongCoin } from '@/components/ui/kong-coin';
import { Paragraph } from '@/components/ui/paragraph';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/utils/toast';
import { requestGame } from '@/api/store/request-game';

interface StoreItemsListProps {
  store: FetchStoreResponse['data'];
}

export const StoreItemsList: React.FC<StoreItemsListProps> = ({ store }) => {
  const { mutateAsync: requestGameFn } = useMutation({
    mutationFn: requestGame,
  });

  const handleRequestGame = async (storeItemId: string) => {
    try {
      await requestGameFn({ storeItemId });
      toast('success', 'Jogo solicitado com sucesso!');
    } catch (error: any) {
      console.error('Error requesting game:', error);
      toast('error', error?.message || 'Erro ao solicitar jogo.');
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {store.map((category) => (
        <div key={category.category} className="">
          <Heading>Categoria {category.category}</Heading>
          <Carousel classNameItem="max-w-[200px]">
            {category.items.map((item) => (
              <li key={item.id} className="w-[200px]">
                {item.photoUrl && (
                  <Image
                    className="!w-full !h-[200px] object-cover rounded-lg shadow-sm"
                    src={item.photoUrl || ''}
                    alt={item.game}
                    width={200}
                    height={200}
                  />
                )}
                <Paragraph className="mt-2 font-bold text-primary text-xs">
                  {item.type === 'Primaria' ? 'Primária' : 'Secundária'}
                </Paragraph>
                <Paragraph className="font-bold">
                  {item.game} - ({item.gameVersion})
                </Paragraph>
                <Paragraph className="flex items-center gap-1">
                  {item.price}
                  <span className="ml-0">
                    <KongCoin />
                  </span>
                </Paragraph>
                <Button
                  className="w-full mt-2"
                  onClick={() => handleRequestGame(item.id)}
                >
                  Adquirir
                </Button>
              </li>
            ))}
          </Carousel>
        </div>
      ))}
    </div>
  );
};
