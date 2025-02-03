'use client';

import { fetchStatement } from '@/api/statement/fetch-statement';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Spinner } from '@/components/ui/spinner';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useQuery } from '@tanstack/react-query';
import { CurrentPointsCard } from './current-points-card';
import { StatementCardList } from './card-points';

export const ClientStatementTemplate = () => {
  const { user } = useCurrentUser();
  const { data: dataStatement, isPending } = useQuery({
    queryFn: () =>
      fetchStatement({
        userId: user?.id,
      }),
    queryKey: ['statement', user?.id],
  });

  const statement = dataStatement?.data || [];
  const balance = dataStatement?.balance;

  return (
    <PrivateLayout title="Extrato de Pontos" description="Confira seu extrato">
      {isPending ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div>
          <CurrentPointsCard balance={balance} />
          <StatementCardList statement={statement} />
        </div>
      )}
    </PrivateLayout>
  );
};
