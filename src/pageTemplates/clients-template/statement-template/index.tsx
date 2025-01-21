'use client';

import { fetchStatement } from '@/api/statement/fetch-statement';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { formatDateAndHour } from '@/utils/format-date-and-hour';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

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
    <PrivateLayout title="Extrato de Pontos" description="Confira seu extrato">
      {isPending ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : statement.length > 0 ? (
        <div className="flex flex-col gap-4">
          {statement.map((s) => {
            const added = !s.type;
            const isIndication = s.type === 'indication';

            return (
              <section
                key={s.id}
                className="border border-border rounded-lg p-8 flex flex-col gap-8"
              >
                <div className="flex items-center gap-8">
                  <div
                    className={clsx(
                      'bg-green-100 p-4 rounded-lg flex items-center justify-center w-[100px]',
                      {
                        'bg-red-100': !added,
                      }
                    )}
                  >
                    <Heading
                      className={clsx('text-green-600', {
                        'text-red-600': !added,
                      })}
                    >
                      {added ? '+' + s.points : '-' + s.points}
                    </Heading>
                  </div>
                  <div>
                    <Paragraph className="font-semibold">
                      {added
                        ? isIndication
                          ? 'Entrada - Nova compra'
                          : 'Entrada - Nova indicação'
                        : 'Saída'}
                    </Paragraph>
                    {added && (
                      <>
                        <Paragraph>{s.inventory?.game}</Paragraph>
                        {isIndication && (
                          <Paragraph>| {s.inventory?.client?.name}</Paragraph>
                        )}
                      </>
                    )}
                    <Paragraph>{formatDateAndHour(s?.createdAt)}</Paragraph>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="extrato de pontos"
          description="Ganhe mais jogando: troque seus pontos por experiências únicas!"
        />
      )}
    </PrivateLayout>
  );
};
