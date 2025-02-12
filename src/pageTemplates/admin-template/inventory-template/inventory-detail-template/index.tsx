'use client';
import { getInventoryDetail } from '@/api/inventory/get-inventoty-detail';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { Spinner } from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { DetailInfo } from './detail-info';
import { ConnectedAccounts } from './connected-accounts';

export const InventoryDetailTemplate = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data: dataInventoryDetail, isLoading } = useQuery({
    queryFn: () => getInventoryDetail(id || ''),
    queryKey: ['inventory-detail', id],
    enabled: !!id,
  });

  return (
    <PrivateLayout
      title="Detalhe de estoque"
      actionsComponent={
        <Button onClick={() => router.push('/admin/inventory')}> Voltar</Button>
      }
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : !isLoading && !dataInventoryDetail ? (
        <EmptyState
          title="Não foi possível acessar esse jogo"
          description="Volte para a tela de estoque e tente acessar novamente."
        />
      ) : (
        <div className="flex flex-col gap-2 ">
          <Heading className="text-2xl font-bold mb-2">
            {dataInventoryDetail?.data?.id} |{' '}
            {dataInventoryDetail?.data?.game || 'Jogo não especificado'}
          </Heading>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-8">
              <DetailInfo
                label="E-mail"
                description={
                  dataInventoryDetail?.data?.email || 'Não informado'
                }
              />
              <DetailInfo
                label="Senha PSN"
                description={
                  dataInventoryDetail?.data?.psnPassword || 'Não informado'
                }
              />
              <DetailInfo
                label="Versão do Jogo / Tipo de Conta"
                description={`${dataInventoryDetail?.data?.gameVersion} / ${dataInventoryDetail?.data?.accountType}`}
              />
            </div>
            <div className="flex items-center gap-8">
              <DetailInfo
                label="Valor de compra"
                description={
                  dataInventoryDetail?.data?.purchaseValue.toString() || '0,00'
                }
              />
              <DetailInfo
                label="Valor do jogo"
                description={
                  dataInventoryDetail?.data?.gameValue.toString() || '0,00'
                }
              />
              <DetailInfo
                label="Valor de venda"
                description={
                  dataInventoryDetail?.data?.accountValue.toString() || '0,00'
                }
              />
            </div>
          </div>

          {dataInventoryDetail?.data.client && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <div>
                <Heading className="text-lg font-semibold">Cliente</Heading>
                <Paragraph>
                  Visualize os dados do cliente responsável pela compra
                </Paragraph>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Paragraph>
                  📛 Nome:{' '}
                  {dataInventoryDetail?.data?.client?.name || 'Não informado'}
                </Paragraph>
                <Paragraph>
                  📞 Telefone:{' '}
                  {dataInventoryDetail?.data?.client?.phone || 'Não informado'}
                </Paragraph>
                <Paragraph>
                  📧 Email:{' '}
                  {dataInventoryDetail?.data?.client?.email || 'Não informado'}
                </Paragraph>
                <Paragraph>
                  🎮 Console:{' '}
                  {dataInventoryDetail?.data?.client?.console ||
                    'Não informado'}
                </Paragraph>
              </div>
            </div>
          )}

          <ConnectedAccounts
            connectedAccounts={
              dataInventoryDetail?.data.connectedAccounts || []
            }
          />
        </div>
      )}
    </PrivateLayout>
  );
};
