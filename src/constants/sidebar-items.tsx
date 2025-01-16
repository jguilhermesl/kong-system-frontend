import { Home, Users, Wallet, UserPen } from 'lucide-react';

export const CLIENT_SIDEBAR_ITEMS = [
  {
    title: 'Home',
    href: '/home',
    icon: (active: boolean) => (
      <Home size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
];

export const ADMIN_SIDEBAR_ITEMS = [
  {
    title: 'Home',
    href: '/admin/home',
    icon: (active: boolean) => (
      <Home size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
  {
    title: 'Usuários',
    href: '/admin/users',
    icon: (active: boolean) => (
      <Users size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
  {
    title: 'Clientes',
    href: '/admin/clients',
    icon: (active: boolean) => (
      <UserPen size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
  {
    title: 'Estoque',
    href: '/admin/inventory',
    icon: (active: boolean) => (
      <Wallet size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
];
