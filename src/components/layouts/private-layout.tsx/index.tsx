import { ReactNode } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Heading } from '@/components/ui/heading';

interface IPrivateLayoutProps {
  children: ReactNode;
  title?: string;
  actionsComponent?: ReactNode;
}

export const PrivateLayout = ({
  children,
  title = 'Placeholder',
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
          <Heading className="text-xl hidden md:flex">{title}</Heading>
          {actionsComponent}
        </div>
        <div className="px-6">{children}</div>
      </div>
    </div>
  );
};
