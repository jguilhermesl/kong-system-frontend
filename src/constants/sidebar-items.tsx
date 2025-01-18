import { Home, Users, Award, Briefcase, BookUser } from 'lucide-react';

export const CLIENT_SIDEBAR_ITEMS = [
  {
    title: 'Home',
    href: '/home',
    icon: (active: boolean) => (
      <Home size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
  {
    title: 'Indicações',
    href: '/indications',
    icon: (active: boolean) => (
      <Award size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
  {
    title: 'Extrato',
    href: '/statement',
    icon: (active: boolean) => (
      <Award size={24} color={active ? '#F96B04' : '#FFF'} />
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
      <BookUser size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
  {
    title: 'Estoque',
    href: '/admin/inventory',
    icon: (active: boolean) => (
      <Briefcase size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
  {
    title: 'Indicações',
    href: '/admin/indications',
    icon: (active: boolean) => (
      <Award size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
];
