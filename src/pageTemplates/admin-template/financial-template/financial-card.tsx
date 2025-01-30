import { Paragraph } from '@/components/ui/paragraph';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface FinancialCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  description?: string;
  type?: 'positive' | 'negative';
}

export const FinancialCard: React.FC<FinancialCardProps> = ({
  icon,
  title,
  value,
  description,
  type,
}) => {
  return (
    <div className=" w-full md:w-80 flex flex-col justify-between p-4 h-36 border rounded-2xl border-gray-300">
      <div className="flex justify-between items-center">
        <Paragraph>{title}</Paragraph>
        <div className="text-primary">{icon}</div>
      </div>
      <div className="flex gap-2 flex-col">
        <Paragraph className="text-3xl font-semibold">R$ {value}</Paragraph>
        {description && (
          <Paragraph
            className={clsx('text-sm text-gray-500', {
              'text-green-500': type === 'positive',
              'text-red-500': type === 'negative',
            })}
          >
            {description}
          </Paragraph>
        )}
      </div>
    </div>
  );
};
