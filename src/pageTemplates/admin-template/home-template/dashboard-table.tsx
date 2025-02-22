import { Table } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { DashboardTableRow } from './dashboard-table-row';
import { getDashboard } from '@/api/dashboard/get-dashboard';

export const DashboardTable = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryFn: getDashboard,
    queryKey: ['dashboard'],
  });

  const latestUsers = dashboardData?.data?.latestUsers || [];
  const latestSales = dashboardData?.data?.latestSales || [];

  return (
    <div className="flex items-center w-full justify-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex items-center w-full flex-1 border rounded-md">
          <Table
            headers={[
              'Usuários mais recentes',
              'Usuários ativos',
              'Últimas vendas',
              '',
              '',
            ]}
          >
            {latestUsers.map((user, i) => (
              <DashboardTableRow key={`user-${i}`} index={i} item={user} />
            ))}
            {latestSales.map((sale, i) => (
              <DashboardTableRow key={`sale-${i}`} index={i} item={sale} />
            ))}
          </Table>
        </div>
      )}
    </div>
  );
};
