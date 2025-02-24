import {
  Home,
  Users,
  Award,
  Briefcase,
  BookUser,
  User,
  ShoppingBag,
  CircleDollarSign,
  Coins,
  Store,
  LayoutList,
  Gamepad,
} from 'lucide-react';

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
    title: 'Extrato de Pontos',
    href: '/statement',
    icon: (active: boolean) => (
      <Coins size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
  {
    title: 'Loja',
    href: '/store',
    icon: (active: boolean) => (
      <Store size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
  {
    title: 'Minhas compras',
    href: '/purshase',
    icon: (active: boolean) => (
      <ShoppingBag size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
  {
    title: 'Perfil',
    href: '/profile',
    icon: (active: boolean) => (
      <User size={24} color={active ? '#F96B04' : '#FFF'} />
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
    title: 'Pendências',
    href: '/admin/pending-tasks',
    icon: (active: boolean) => (
      <LayoutList size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
  {
    title: 'Indicações',
    href: '/admin/indications',
    icon: (active: boolean) => (
      <Award size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
  {
    title: 'Financeiro',
    href: '/admin/financial',
    icon: (active: boolean) => (
      <CircleDollarSign size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
  {
    title: 'Jogos',
    href: '/admin/games',
    icon: (active: boolean) => (
      <Gamepad size={24} color={active ? '#F96B04' : '#FFF'} />
    ),
  },
];
