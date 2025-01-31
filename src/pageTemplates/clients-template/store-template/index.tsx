'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Spinner } from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import { StoreItemsList } from './store-items-list';
import { fetchStore } from '@/api/store/fetch-store';

export const ClientStoreTemplate = () => {
  const { data: dataStatement, isPending } = useQuery({
    queryFn: () => fetchStore(),
    queryKey: ['store'],
  });

  const store = dataStatement?.data || [];

  return (
    <PrivateLayout
      title="Loja"
      description="Confira os jogos disponíveis para comprar com pontos"
    >
      {isPending ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <StoreItemsList store={store} />
      )}
    </PrivateLayout>
  );
};
