'use client';
import { fetchStatement } from '@/api/statement/fetch-statement';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Spinner } from '@/components/ui/spinner';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useQuery } from '@tanstack/react-query';
import { CurrentPointsCard } from './current-points-card';
import { StatementCard } from './card-points';

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

  return (
    <PrivateLayout
      className="relative"
      title="Extrato de Pontos"
      description="Confira seu extrato"
    >
      <CurrentPointsCard />

      {isPending ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <StatementCard statement={statement} />
      )}
    </PrivateLayout>
  );
};
