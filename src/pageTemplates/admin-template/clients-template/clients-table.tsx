import { Table } from '@/components/ui/table';
import { ClientsTableRow } from './clients-table-row';
import { useQuery } from '@tanstack/react-query';
import { fetchClients } from '@/api/clients/fetch-clients';
import { Spinner } from '@/components/ui/spinner';
import { useSearchParams } from 'next/navigation';

export const ClientsTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  const { data: clientsData, isPending } = useQuery({
    queryFn: () => fetchClients({ search }),
    queryKey: ['clients', search],
  });

  const clients = clientsData?.data || [];

  return (
    <div className="flex items-center w-full justify-center">
      {isPending ? (
        <Spinner />
      ) : (
        <div className="flex items-center w-full flex-1 border rounded-md">
          <Table
            headers={[
              'Nome',
              'Telefone',
              'Console',
              'E-mail',
              'Criado em',
              '',
              '',
            ]}
          >
            {clients?.map((item, i) => {
              return <ClientsTableRow key={i} index={i} item={item} />;
            })}
          </Table>
        </div>
      )}
    </div>
  );
};
