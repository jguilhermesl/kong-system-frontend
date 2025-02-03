'use client';

import { fetchIndications } from '@/api/indications/fetch-indications';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { formatDateAndHour } from '@/utils/format-date-and-hour';
import { useQuery } from '@tanstack/react-query';
import { Copy } from 'lucide-react';
import { Line } from '@/components/ui/line';
import { toast } from '@/utils/toast';

export const ClientIndicationsTemplate = () => {
  const { user } = useCurrentUser();
  const { data: dataIndications, isPending } = useQuery({
    queryFn: () =>
      fetchIndications({
        userId: user?.id,
      }),
    queryKey: ['user-indications', user?.id],
  });

  const code = user?.code || '';
  const indications = dataIndications?.data || [];

  return (
    <PrivateLayout title="Indicações" description="Confira suas indicações">
      <div className="bg-orange-200 flex-col p-8 rounded-xl flex  gap-6">
        <div className="flex items-center gap-8">
          <Paragraph className="text-3xl font-bold text-primary">
            {code}
          </Paragraph>
          <button
            onClick={() => {
              navigator.clipboard.writeText(code);
              toast('success', 'Código copiado para área de transferência.');
            }}
            className="transition-transform transform hover:scale-105 active:scale-95"
          >
            <Copy size={32} />
          </button>
          <Paragraph>Esse é seu código. Use-o para indicações.</Paragraph>
        </div>
        <Line className="bg-neutral-900 h-[1px]" />
        <div>
          <Paragraph>
            Como usar? Para usar seu código, copie-o e compartilhe com seus
            amigos. Peça para que eles comprem jogos conosco usando o seu
            código. Assim, você ganha pontos por cada amigo que fizer uma
            compra!
          </Paragraph>
        </div>
      </div>

      {isPending ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : indications.length > 0 ? (
        <div className="flex flex-col gap-4">
          {indications.map((indication) => {
            return (
              <section
                key={indication.id}
                className="border border-border rounded-lg p-8 flex flex-col gap-8"
              >
                <div className="flex items-center gap-8">
                  <div className="bg-green-100 p-4 rounded-lg flex items-center justify-center">
                    <Heading className="text-green-600">+90</Heading>
                  </div>
                  <div>
                    <Paragraph className="font-semibold">Indicação</Paragraph>
                    <Paragraph>
                      {indication.inventory?.game} |{' '}
                      {indication.inventory?.client?.name || 'Rafael'}
                    </Paragraph>
                    <Paragraph>
                      {formatDateAndHour(indication?.createdAt)}
                    </Paragraph>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="indicações"
          description="Compartilhe a diversão da Kong Games e ganhe pontos por cada amigo indicado!"
        />
      )}
    </PrivateLayout>
  );
};
