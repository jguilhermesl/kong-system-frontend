/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  ADMIN_SIDEBAR_ITEMS,
  CLIENT_SIDEBAR_ITEMS,
} from '@/constants/sidebar-items';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Paragraph } from '@/components/ui/paragraph';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const SidebarMobile = ({ sidebarMobileIsOpen }: any) => {
  const pathname = usePathname();
  const { handleSignOut } = useAuth();
  const { isAdmin } = useCurrentUser();

  const items = isAdmin ? ADMIN_SIDEBAR_ITEMS : CLIENT_SIDEBAR_ITEMS;
  return (
    <div
      className="w-full flex-col items-center transition-all overflow-hidden bg-primary px-1 "
      style={{ height: sidebarMobileIsOpen ? '480px' : '0px' }}
    >
      <Paragraph className="text-lg font-bold text-primary">
        kong.games
      </Paragraph>
      <div className=" w-full ">
        {items.map((item) => {
          const isActive = pathname?.includes(item.href) || false;

          return (
            <div className="relative px-4" key={item.title}>
              <Link
                href={item.href}
                className={clsx(
                  'w-full flex justify-start items-center gap-2 mt-8',
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
      <button
        className="text-white flex items-center gap-2 mt-14"
        onClick={handleSignOut}
      >
        <LogOut size={20} color="#FFF" />
        Sair
      </button>
    </div>
  );
};
