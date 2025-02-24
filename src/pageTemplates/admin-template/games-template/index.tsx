'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { GamesTable } from './games-table';
import { GameTableFilters } from './game-table-filters';

export const AdminGamesTemplate = () => {
  return (
    <PrivateLayout title="Jogos">
      <div className="w-full flex flex-col gap-4">
        <GameTableFilters />
        <GamesTable />
      </div>
    </PrivateLayout>
  );
};
