'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services/react-query';
import { ReactNode } from 'react';
import { UserProvider } from '@/hooks/useCurrentUser';
interface IAppProps {
  children: ReactNode;
}

export const App = ({ children }: IAppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
};
