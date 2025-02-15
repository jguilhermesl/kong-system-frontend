/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import { fetchGames } from '@/api/games/fetch-games';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useDebounce } from '@/hooks/useDebounce';
import { flexibleSearch } from '@/utils/flexible-search';

interface Game {
  id: string;
  game: string;
  imageLink: string;
  gameVersion: string;
  primaryValue: string;
  secondaryValue: string;
  inPromo: string;
}

const GamesPage = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);

  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Carrega os jogos ao montar o componente
  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const response = await fetchGames();
        // Supondo que a resposta possua a propriedade "data" com os jogos
        const allGames: Game[] = response.data;
        const promoGames = allGames
          .filter((g) => g.inPromo === 'TRUE')
          .sort((a, b) => a.game.localeCompare(b.game));

        setGames(promoGames);
        setFilteredGames(promoGames);
      } catch (error) {
        console.error('Erro ao carregar jogos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // Atualiza os jogos filtrados com base no termo de busca
  useEffect(() => {
    if (debouncedSearch) {
      setFilteredGames(
        games.filter((game) =>
          flexibleSearch(debouncedSearch as string, game.game)
        )
      );
    } else {
      setFilteredGames(games);
    }
  }, [debouncedSearch, games]);

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
        {loading ? (
          <div className="flex items-center justify-center w-full mt-8">
            <Spinner />
          </div>
        ) : (
          <ul className="flex flex-wrap justify-center gap-8 mt-8">
            {filteredGames.map((game, idx) => (
              <li
                key={idx}
                className="max-w-[150px] flex flex-col items-center gap-4"
              >
                <img
                  src={game.imageLink}
                  alt={game.game}
                  className="w-full max-h-[50%] object-cover rounded-md"
                  loading="lazy"
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
