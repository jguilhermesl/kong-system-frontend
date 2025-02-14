/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { fetchGames } from '@/api/games/fetch-games';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useDebounce } from '@/hooks/useDebounce';
import { flexibleSearch } from '@/utils/flexible-search';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const GamesPage = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);

  const { data, isPending } = useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
  });

  const games =
    data?.data
      .filter((g) => g.inPromo === 'TRUE')
      .sort((a, b) => a.game.localeCompare(b.game)) || [];

  const filteredGames = debouncedSearch
    ? games.filter((game: any) =>
        flexibleSearch(debouncedSearch as string, game.game)
      )
    : games;

  return (
    <div className="w-full mx-auto">
      <section className="mb-8 p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Lista de Jogos
        </h1>

        <h2 className="text-2xl font-semibold text-center text-primary mb-4">
          A MELHOR LOJA DE JOGOS - KONG GAMES
        </h2>
        <p className="text-center text-lg text-gray-600 mb-6">
          Promoção válida até 26/02/2025
        </p>
        <Input
          placeholder="Pesquise o jogo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-[700px] mx-auto"
        />
        {isPending ? (
          <div className="flex items-center justify-center w-full mt-8">
            <Spinner />
          </div>
        ) : (
          <ul className="flex flex-wrap justify-center gap-8 mt-8">
            {filteredGames?.map((game) => (
              <li
                key={game.id}
                className=" max-w-[150px] flex flex-col items-center gap-4"
              >
                <img
                  src={game.imageLink}
                  alt={game.game}
                  className="w-full max-h-[50%] object-cover rounded-md "
                  loading="lazy" // Implementa o lazy loading
                />
                <div className="w-full">
                  <p className="font-bold text-primary text-[10px]">
                    {game.gameVersion}
                  </p>
                  <h3 className="text-xs font-semibold mb-2">{game.game}</h3>
                  <p className="text-[10px] text-gray-700">
                    - Primária: <strong>{game.primaryValue}</strong>
                  </p>
                  <p className="text-[10px] text-gray-700">
                    - Secundária: <strong>{game.secondaryValue}</strong>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default GamesPage;
