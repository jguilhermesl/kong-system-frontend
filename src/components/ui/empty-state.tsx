import { Heading } from './heading';
import { Inbox } from 'lucide-react';
import { Paragraph } from './paragraph';

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ description, title }: EmptyStateProps) => {
  return (
    <div className="flex flex-col w-full lg:mt-20 mt-0 gap-8 justify-center items-center">
      <Heading className="!text-center">Sem {title} até o momento.</Heading>
      <Inbox className="w-16 h-16 text-center" />
      <Paragraph className="font-semibold text-center">{description}</Paragraph>
    </div>
  );
};
