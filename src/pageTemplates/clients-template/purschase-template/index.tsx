'use client';

import { CardPurchase } from './card-purchase';
import { getClientPurchases } from '@/api/clients/get-client';
import { useQuery } from '@tanstack/react-query';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { EmptyState } from '@/components/ui/empty-state';
import { Spinner } from '@/components/ui/spinner';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { formatDate } from '@/utils/format-date';

export const PurchaseTemplate = () => {
  const { user } = useCurrentUser();
  const id = user?.id;
  const { data: dataClient, isLoading } = useQuery({
    queryFn: () => getClientPurchases(id || ''),
    queryKey: ['purchase', id],
    enabled: !!id,
  });

  const clientPurchases = dataClient?.data;

  const dataClientIsEmpty = dataClient?.data.length === 0;

  return (
    <PrivateLayout title="Minhas compras" description="Confira suas compras">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      ) : dataClientIsEmpty ? (
        <EmptyState
          title="compras"
          description="Você ainda não possui compras na Kong. Confira nosso catálogo e aproveite!"
        />
      ) : (
        clientPurchases?.map((purchase, index) => (
          <CardPurchase
            key={index}
            data={{
              id: purchase.id,
              game: purchase.inventory.game || '',
              gameVersion: purchase.inventory.gameVersion || '',
              accountType: purchase.inventory.accountType || '',
              email: purchase.inventory.email || '',
              password: purchase.inventory.psnPassword || '',
              createdAt: formatDate(purchase.createdAt as string) || '',
              accountValue: purchase.inventory.accountValue.toString() || '',
            }}
          />
        ))
      )}
    </PrivateLayout>
  );
};
