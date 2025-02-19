import { DetailInfo } from '@/components/detail-info';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Paragraph } from '@/components/ui/paragraph';
import { StatementItem } from '@/models/Indication';
import { formatDateAndHour } from '@/utils/format-date-and-hour';
import clsx from 'clsx';

interface StatementProps {
  data?: {
    balance?: number;
    statement?: StatementItem[];
  };
}

export const Statement = ({ data }: StatementProps) => {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8 relative">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Progresso no sistema de Pontuação
          </CardTitle>
          <CardDescription>
            Aqui você visualiza o progresso do cliente no nosso sistema de
            Pontuação
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <DetailInfo
          label="Saldo"
          description={`${data?.balance || '0'} pontos`}
        />
        <div className="flex flex-col gap-2 mt-4">
          {data?.statement?.map((s) => {
            const added = s.type === 'purchase' || s.type === 'indication';

            return (
              <section
                key={s.id}
                className="border border-border rounded-lg p-2 flex flex-col gap-8"
              >
                <div className="flex items-center gap-8">
                  <div
                    className={clsx(
                      'bg-green-200 flex items-center justify-center size-6 rounded-full ',
                      {
                        'bg-red-200': !added,
                      }
                    )}
                  >
                    <Paragraph
                      className={clsx('text-green-600', {
                        'text-red-600': !added,
                      })}
                    >
                      {added
                        ? '+' + parseInt(s.points)
                        : '-' + parseInt(s.points)}
                    </Paragraph>
                  </div>
                  <div>
                    <Paragraph className="font-semibold flex items-center">
                      {added
                        ? s.type === 'purchase'
                          ? 'Entrada - Nova compra'
                          : 'Entrada - Nova indicação'
                        : 'Saída'}{' '}
                      | {added && s.inventory?.game} |{' '}
                      {formatDateAndHour(s?.createdAt)}
                    </Paragraph>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
