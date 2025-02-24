import { Paragraph } from '@/components/ui/paragraph';
import { ReactNode } from 'react';

interface DetailInfoProps {
  label: string;
  icon?: ReactNode;
  description: string;
}

export const DetailInfo = ({ label, description }: DetailInfoProps) => {
  return (
    <div className="flex flex-col gap-2 w-[33%]">
      <Paragraph className="font-bold">{label}</Paragraph>
      <Paragraph>{description}</Paragraph>
    </div>
  );
};
