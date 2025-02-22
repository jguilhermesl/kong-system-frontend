'use client';
import { Table } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import {
  getDashboard,
  GetDashboardResponse,
} from '@/api/dashboard/get-dashboard';
import { LastUserTableRow } from './last-user-table-row';

export const LastUserTable = () => {
  const { data: dashboardData, isLoading } = useQuery<GetDashboardResponse>({
    queryFn: getDashboard,
    queryKey: ['dashboard'],
  });

  const latestUsers = dashboardData?.data?.latestUsers || [];

  console.log('Últimos usuários:', dashboardData?.data);

  return (
    <div className="flex items-center w-full justify-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex items-center w-full flex-1 border rounded-md">
          <Table
            headers={[
              'CPF',
              'Data de criação',
              'Email',
              'Id',
              'Nome',
              'Telefone',
              'Cargo',
            ]}
          >
            {latestUsers.map((user, i) => (
              <LastUserTableRow key={`user-${i}`} index={i} item={user} />
            ))}
          </Table>
        </div>
      )}
    </div>
  );
};
