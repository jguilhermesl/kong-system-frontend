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
import { Mail, KeyRound, CircleDollarSign } from 'lucide-react';

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
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      )}
      {!isLoading && !dataInventoryDetail ? (
        <EmptyState
          title="Não foi possível acessar esse jogo"
          description="Volte para a tela de estoque e tente acessar novamente."
        />
      ) : (
        <div className="p-6 bg-white flex flex-col gap-2 shadow-md rounded-lg">
          <Heading className="text-2xl font-bold mb-2">
            {dataInventoryDetail?.data?.game || 'Jogo não especificado'}
          </Heading>
          <div className="flex gap-2">
            <Mail size={18} />
            <Paragraph>
              Email: {dataInventoryDetail?.data?.email || 'Não informado'}
            </Paragraph>
          </div>
          <div className="flex gap-2">
            <KeyRound size={18} />
            <Paragraph>
              Senha PSN:
              {dataInventoryDetail?.data?.psnPassword || 'Não informada'}
            </Paragraph>
          </div>
          <div className="flex gap-2">
            <CircleDollarSign size={18} />
            <Paragraph>
              Valor de compra: R${' '}
              {dataInventoryDetail?.data?.purchaseValue || '0,00'}
            </Paragraph>{' '}
          </div>
          <div className="flex gap-2">
            {' '}
            <CircleDollarSign size={18} />
            <Paragraph>
              Valor do jogo: R$ {dataInventoryDetail?.data?.gameValue || '0,00'}
            </Paragraph>{' '}
          </div>
          <div className="flex gap-2">
            {' '}
            <CircleDollarSign size={18} />
            <Paragraph>
              Valor da conta: R${' '}
              {dataInventoryDetail?.data?.accountValue || '0,00'}
            </Paragraph>{' '}
          </div>

          {dataInventoryDetail?.data.client && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-lg font-semibold">Dados do Cliente</h2>
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
                {dataInventoryDetail?.data?.client?.console || 'Não informado'}
              </Paragraph>
            </div>
          )}
        </div>
      )}
    </PrivateLayout>
  );
};
