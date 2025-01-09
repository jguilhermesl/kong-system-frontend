'use client';

import { useState } from 'react';
import { List } from 'lucide-react';
import { Paragraph } from '@/components/ui/paragraph';
import { SidebarMobile } from './sidebar-mobile';

export const Header = () => {
  const [sidebarMobileIsOpen, setSidebarMobileIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-center flex-col bg-primary rounded-xl shadow py-4 px-4 md:hidden flex-1 z-50 fixed top-2 right-2 left-2">
        <section className=" flex w-full  justify-between">
          <button
            className="active:opacity-80 "
            onClick={() => setSidebarMobileIsOpen(!sidebarMobileIsOpen)}
          >
            <List color="#FFF" size={30} />
          </button>
          <Paragraph className="text-lg font-bold text-white">
            kong.games
          </Paragraph>
        </section>
        <SidebarMobile sidebarMobileIsOpen={sidebarMobileIsOpen} />
      </div>
    </>
  );
};
