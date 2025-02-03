import { Heading } from './heading';
import { Paragraph } from './paragraph';

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ description, title }: EmptyStateProps) => {
  return (
    <div className="flex flex-col w-full lg:mt-20 mt-0 gap-4 justify-center items-center">
      <Heading className="!text-center">Sem {title} até o momento.</Heading>
      <Paragraph className="font-semibold text-center text-neutral-600">
        {description}
      </Paragraph>
    </div>
  );
};
