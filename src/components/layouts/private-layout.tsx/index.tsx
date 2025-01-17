import { ReactNode } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';

interface IPrivateLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  actionsComponent?: ReactNode;
}

export const PrivateLayout = ({
  children,
  title,
  description,
  actionsComponent,
}: IPrivateLayoutProps) => {
  return (
    <div className="flex min-h-[100vh]">
      <div className="w-[30%] lg:w-[20%] h-[100vh] hidden md:flex md:fixed">
        <Sidebar />
      </div>
      <div className="flex-col bg-background flex-1 w-[70%] lg:w-[80%] md:ml-[30%] lg:ml-[20%]">
        <Header />
        <div className="py-12 md:py-8 px-6 justify-between items-center flex">
          <div className="flex md:mt-0 mt-12 flex-col">
            <Heading className="text-xl md:flex">{title}</Heading>
            <Paragraph className="text-sm md:flex">{description}</Paragraph>
          </div>
          {actionsComponent}
        </div>
        <div className="px-6">{children}</div>
      </div>
    </div>
  );
};
