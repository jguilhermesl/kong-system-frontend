'use client';
import { Paragraph } from '@/components/ui/paragraph';
import {
  CLIENT_SIDEBAR_ITEMS,
  ADMIN_SIDEBAR_ITEMS,
} from '@/constants/sidebar-items';
import { useAuth } from '@/hooks/useAuth';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import clsx from 'clsx';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  const pathname = usePathname();
  const { handleSignOut } = useAuth();
  const { isAdmin } = useCurrentUser();

  const items = isAdmin ? ADMIN_SIDEBAR_ITEMS : CLIENT_SIDEBAR_ITEMS;

  return (
    <div className="w-full flex-col items-center hidden bg-primary px-1 py-6 md:flex absolute left-0 top-0 min-h-[100vh] md:relative">
      <Paragraph className="text-lg font-bold text-white">kong.games</Paragraph>
      <div className=" mt-10 w-full">
        {items.map((item) => {
          const isActive = pathname?.includes(item.href) || false;

          return (
            <div className="relative px-4" key={item.title}>
              <Link
                href={item.href}
                className={clsx(
                  'w-full flex justify-start items-center gap-2 mt-8 px-3',
                  {
                    'bg-[#FFFFFF] px-3 py-2 rounded-lg': isActive,
                  }
                )}
              >
                {item.icon(isActive)}
                <Paragraph
                  className={clsx('text-white text-sm font-semibold', {
                    '!text-primary': isActive,
                  })}
                >
                  {item.title}
                </Paragraph>
              </Link>
              {isActive && (
                <div className="absolute right-0 top-0 w-1 h-full bg-white rounded-full" />
              )}
            </div>
          );
        })}
      </div>
      <div className=" mt-52 flex flex-col gap-20">
        <button
          className="text-white absolute bottom-12 left-4 flex items-center gap-2 mt-auto"
          onClick={handleSignOut}
        >
          <LogOut size={20} color="#fff" />
          Sair
        </button>
      </div>
    </div>
  );
};
