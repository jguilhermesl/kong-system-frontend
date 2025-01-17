import { Table } from '@/components/ui/table';
import { IndicationsTableRow } from './indications-table-row';
import { useQuery } from '@tanstack/react-query';
import { fetchIndications } from '@/api/indications/fetch-indications';
import { Spinner } from '@/components/ui/spinner';
import { Indication } from '@/models/Indication';

export const IndicationsTable = () => {
  const { data: indicationsData, isPending } = useQuery({
    queryFn: fetchIndications,
    queryKey: ['indications'],
  });

  const indications: Indication[] = indicationsData?.data || [];

  return (
    <div className="flex items-center w-full justify-center">
      {isPending ? (
        <Spinner />
      ) : (
        <div className="flex items-center w-full flex-1 border rounded-md">
          <Table
            headers={[
              'Cliente',
              'Jogo',
              'Valor da compra',
              'Código',
              'Pontos acumulados',
              'Criado em',
              '',
            ]}
          >
            {indications?.map((item: Indication, i: number) => {
              return <IndicationsTableRow key={i} index={i} item={item} />;
            })}
          </Table>
        </div>
      )}
    </div>
  );
};
