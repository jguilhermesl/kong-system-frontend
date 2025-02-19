/* eslint-disable @next/next/no-img-element */
'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Heading } from '@/components/ui/heading';
import { Spinner } from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { DetailInfo } from '@/components/detail-info';
import { ConnectedAccounts } from './connected-accounts';
import { getGameDetail } from '@/api/games/get-game-detail';

export const GameDetailTemplate = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data: dataGameDetail, isLoading } = useQuery({
    queryFn: () => getGameDetail(id || ''),
    queryKey: ['client-detail', id],
    enabled: !!id,
  });

  const gameDetail = dataGameDetail?.data || null;

  return (
    <PrivateLayout
      title="Detalhes do jogo"
      actionsComponent={
        <Button onClick={() => router.push('/admin/clients')}>Voltar</Button>
      }
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : !isLoading && !dataGameDetail ? (
        <EmptyState
          title="Não foi possível acessar esse cliente"
          description="Volte para a tela dos clientes e tente acessar novamente."
        />
      ) : (
        <div className="flex flex-col gap-2 ">
          {gameDetail?.imageLink && (
            <img
              src={gameDetail.imageLink}
              alt={gameDetail.game}
              className="size-24 object-cover rounded-md"
              loading="lazy"
            />
          )}
          <Heading className="text-2xl font-bold mb-2">
            {gameDetail?.game}
          </Heading>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-8">
              <DetailInfo
                label="Versão do Jogo"
                description={gameDetail?.gameVersion || 'Não informado'}
              />
              <DetailInfo
                label="Categoria"
                description={gameDetail?.category || '-'}
              />
              <DetailInfo
                label="Avaliação"
                description={gameDetail?.rating || '-'}
              />
            </div>
            <div className="flex items-center gap-8">
              <DetailInfo
                label="Primária em Estoque"
                description={gameDetail?.primaryInInventory ? 'Sim' : 'Não'}
              />
              <DetailInfo
                label="Secundária em Estoque"
                description={gameDetail?.secondaryInInventory ? 'Sim' : 'Não'}
              />
              <DetailInfo
                label="Em promoção"
                description={gameDetail?.inPromo ? 'Sim' : 'Não'}
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-8">
                <DetailInfo
                  label="Preço atual da PSN"
                  description={gameDetail?.currentPrice || 'Não informado'}
                />
                <DetailInfo
                  label="Preço da Primária"
                  description={gameDetail?.primaryValue || '-'}
                />
                <DetailInfo
                  label="Preço da Secundária"
                  description={gameDetail?.secondaryValue || '-'}
                />
              </div>
              <ConnectedAccounts connectedAccounts={gameDetail?.inventory} />
            </div>
          </div>
        </div>
      )}
    </PrivateLayout>
  );
};
