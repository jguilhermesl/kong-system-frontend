import { Table } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { getDashboard } from '@/api/dashboard/get-dashboard';
import { LastSaleTableRow } from './last-sale-table-row';

export const LastSaleTable = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryFn: getDashboard,
    queryKey: ['dashboard'],
  });

  const latestSales = dashboardData?.data?.latestSales || [];

  return (
    <div className="flex items-center w-full justify-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex items-center w-full flex-1 border rounded-md">
          <Table
            headers={[
              'Cliente',
              'Número do cliente',
              'Data de criação',
              'Criador',
              'Nome do produto',
              'Tipo',
              'Valor da venda',
            ]}
          >
            {latestSales.map((sale, i) => (
              <LastSaleTableRow key={`sale-${i}`} index={i} item={sale} />
            ))}
          </Table>
        </div>
      )}
    </div>
  );
};
