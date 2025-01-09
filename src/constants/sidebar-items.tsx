import { ChartBar } from 'lucide-react';

export const CLIENT_SIDEBAR_ITEMS = [
  {
    title: 'Home',
    href: '/home',
    icon: (active: boolean) => (
      <ChartBar size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
];

export const ADMIN_SIDEBAR_ITEMS = [
  {
    title: 'Home',
    href: '/admin/home',
    icon: (active: boolean) => (
      <ChartBar size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
  {
    title: 'Usuários',
    href: '/admin/users',
    icon: (active: boolean) => (
      <ChartBar size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
];
