import { Paragraph } from '@/components/ui/paragraph';
import { ReactNode } from 'react';

interface FinancialCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  description?: string;
}

export const FinancialCard: React.FC<FinancialCardProps> = ({
  icon,
  title,
  value,
  description,
}) => {
  return (
    <div className=" min-w-64 flex flex-col justify-between p-4 h-36 border rounded-2xl border-gray-300">
      <div className="flex justify-between items-center">
        <Paragraph>{title}</Paragraph>
        <div className="text-primary">{icon}</div>
      </div>
      <div className="flex gap-2 flex-col">
        <Paragraph className="text-3xl font-semibold">R$ {value}</Paragraph>
        {description && (
          <Paragraph className="text-sm text-gray-500">{description}</Paragraph>
        )}
      </div>
    </div>
  );
};
