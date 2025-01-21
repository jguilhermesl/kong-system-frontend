import { Card } from '@/components/ui/card';
import { Paragraph } from '@/components/ui/paragraph';
import { User } from '@/models/User';
import { DollarSign } from 'lucide-react';

export interface PointsUsage {
  id: string;
  userId: string;
  user?: User;
  createdAt: string;
  points: number;
}

export interface PointsUsageProps {
  data?: PointsUsage[];
}

export const CurrentPointsCard = (data: PointsUsageProps) => {
  return (
    <Card className="md:w-48 w-40 p-3 absolute right-6 md:top-5 top-24 flex flex-col justify-between h-24">
      <div className="w-full flex justify-between">
        <Paragraph className="font-semibold"> Total de pontos </Paragraph>
        <DollarSign size={20} />
      </div>
      <Paragraph className="font-bold text-xl"> {50}</Paragraph>
    </Card>
  );
};
