'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Heading } from '@/components/ui/heading';
import { Spinner } from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { DetailInfo } from '@/components/detail-info';
import { getClientDetail } from '@/api/clients/get-client-detail';
import { Statement } from './statement';
import { ConnectedAccounts } from './connected-accounts';
import { convertRealToNumber } from '@/utils/convert-real-to-number';
import { formatPrice } from '@/utils/format-price';

export const ClientDetailTemplate = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data: dataClientDetail, isLoading } = useQuery({
    queryFn: () => getClientDetail(id || ''),
    queryKey: ['client-detail', id],
    enabled: !!id,
  });

  const clientDetail = dataClientDetail?.data || null;
  const clientValueSpent = clientDetail?.userGames.reduce(
    (total, game) =>
      total + (convertRealToNumber(game.accountValue.toString()) || 0),
    0
  );

  return (
    <PrivateLayout
      title={`Detalhes do cliente `}
      actionsComponent={
        <Button onClick={() => router.push('/admin/clients')}>Voltar</Button>
      }
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : !isLoading && !dataClientDetail ? (
        <EmptyState
          title="Não foi possível acessar esse cliente"
          description="Volte para a tela dos clientes e tente acessar novamente."
        />
      ) : (
        <div className="flex flex-col gap-2 ">
          <Heading className="text-2xl font-bold mb-2">
            {clientDetail?.name}
          </Heading>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-8">
              <DetailInfo
                label="E-mail"
                description={clientDetail?.email || 'Não informado'}
              />
              <DetailInfo
                label="Telefone"
                description={clientDetail?.phone || '-'}
              />
              <DetailInfo
                label="Telefone"
                description={clientDetail?.console || '-'}
              />
            </div>
            <Statement data={clientDetail?.statement} />
            <div>
              <Heading>Total gasto em Jogos</Heading>
              <p>
                {clientDetail?.userGames
                  ? formatPrice(clientValueSpent?.toString() || '0')
                  : 'R$0'}
              </p>
            </div>
            <ConnectedAccounts connectedAccounts={clientDetail?.userGames} />
          </div>
        </div>
      )}
    </PrivateLayout>
  );
};
