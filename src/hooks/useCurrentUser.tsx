import { meProfile } from '@/api/auth/me-profile';
import { User } from '@/models/User';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, ReactNode } from 'react';

interface UserContextType {
  user?: User;
  isAdmin: boolean;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data: userProfile, isPending } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => meProfile(),
  });

  const isAdmin = userProfile?.data?.role === 'admin';

  return (
    <UserContext.Provider
      value={{ user: userProfile?.data, isAdmin, isLoading: isPending }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useCurrentUser must be used within a UserProvider');
  }
  return context;
};
