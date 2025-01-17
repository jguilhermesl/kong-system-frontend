'use client';
import { fetchIndications } from '@/api/indications/fetch-indications';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { formatDateAndHour } from '@/utils/format-date-and-hour';
import { useQuery } from '@tanstack/react-query';

export const ClientIndicationsTemplate = () => {
  const { user } = useCurrentUser();
  const { data: dataIndications } = useQuery({
    queryFn: () =>
      fetchIndications({
        userId: user?.id,
      }),
    queryKey: ['user-indications', user?.id],
  });

  const indications = dataIndications?.data || [];

  return (
    <PrivateLayout title="Extrato de Pontos" description="Confira seu extrato">
      <div className="flex flex-col gap-4">
        {indications.map((indication) => {
          return (
            <section
              key={indication.id}
              className="border border-border rounded-lg p-8 flex flex-col gap-8 "
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
    </PrivateLayout>
  );
};
