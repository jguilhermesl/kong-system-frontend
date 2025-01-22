import { Card } from '@/components/ui/card';
import { Paragraph } from '@/components/ui/paragraph';

export interface PointsUsageProps {
  balance?: number;
}

export const CurrentPointsCard = ({ balance }: PointsUsageProps) => {
  return (
    <Card className="w-60 p-3 flex flex-col justify-between h-24">
      <div className="w-full flex justify-between">
        <Paragraph className="font-semibold"> Total de pontos </Paragraph>
        <div className="border-2 border-black w-8 h-8 rounded-full flex justify-center items-center">
          <Paragraph className="font-bold text-lg text-primary"> K </Paragraph>
        </div>
      </div>
      <Paragraph className="font-bold text-xl">{balance?.toFixed(2)}</Paragraph>
    </Card>
  );
};
