import { Card } from '@/components/ui/card';
import { Paragraph } from '@/components/ui/paragraph';

export interface PointsUsageProps {
  balance?: number;
}

export const CurrentPointsCard = ({ balance }: PointsUsageProps) => {
  return (
    <Card className="max-w-[300px] p-6 gap-10 flex flex-col justify-between">
      <div className="w-full flex justify-between">
        <Paragraph className="font-semibold text-neutral-500">
          {' '}
          Total de Pontos{' '}
        </Paragraph>
        <div className="bg-black size-6 rounded-full flex justify-center items-center">
          <Paragraph className="font-bold text-sm text-primary"> K </Paragraph>
        </div>
      </div>
      <Paragraph className="font-bold text-xl text-green-600">
        {parseInt(balance?.toString() || '')} pontos
      </Paragraph>
    </Card>
  );
};
