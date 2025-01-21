import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { StatementItem } from '@/models/Indication';
import { formatDateAndHour } from '@/utils/format-date-and-hour';
import clsx from 'clsx';

interface StatementCardProps {
  statement: StatementItem[];
}

export const StatementCard = ({ statement }: StatementCardProps) => {
  return (
    <div className="flex flex-col mt-5 gap-4">
      {statement.map((s) => {
        const added = s.type === 'purchase';
        const isIndication = s.type === 'indication';

        return (
          <section
            key={s.id}
            className="border border-border rounded-lg p-8 flex flex-col gap-8"
          >
            <div className="flex items-center gap-8">
              <div
                className={clsx(
                  'bg-green-200 p-4 rounded-lg flex items-center justify-center w-[100px]',
                  {
                    'bg-red-200': !isIndication,
                  }
                )}
              >
                <Heading
                  className={clsx('text-green-600', {
                    'text-red-600': !isIndication,
                  })}
                >
                  {added ? '+' + s.points : '-' + s.points}
                </Heading>
              </div>
              <div>
                <Paragraph className="font-semibold">
                  {isIndication
                    ? added
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
  );
};
