import { Table } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '@/api/games/fetch-games';
import { Spinner } from '@/components/ui/spinner';
import { GamesTableRow } from './games-table-row';
import { useSearchParams } from 'next/navigation';

export const GamesTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  const { data: gamesData, isPending } = useQuery({
    queryFn: () => fetchGames({ search }),
    queryKey: ['games', search],
  });

  const games = gamesData?.data || [];

  return (
    <div className="flex  items-center w-full justify-center">
      {isPending ? (
        <Spinner />
      ) : (
        <div className="flex items-center w-full border rounded-md">
          <Table
            headers={[
              '',
              'Nome',
              'Preço na PSN',
              'Preço da Primária',
              'Preço da Secundária',
              'Primária em Estoque',
              'Secundária em Estoque',
              'Categoria',
              '',
            ]}
          >
            {games?.map((item, i) => {
              return <GamesTableRow key={i} index={i} item={item} />;
            })}
          </Table>
        </div>
      )}
    </div>
  );
};
