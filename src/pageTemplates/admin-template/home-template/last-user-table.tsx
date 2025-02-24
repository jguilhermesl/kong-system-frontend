'use client';
import { Table } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import {
  getDashboard,
  GetDashboardResponse,
} from '@/api/dashboard/get-dashboard';
import { LastUserTableRow } from './last-user-table-row';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const LastUserTable = () => {
  const { data: dashboardData, isLoading } = useQuery<GetDashboardResponse>({
    queryFn: getDashboard,
    queryKey: ['dashboard'],
  });

  const latestUsers = dashboardData?.data?.latestUsers || [];

  return (
    <Card className="col-span-6 mt-4 !w-[49%]">
      <CardHeader className="flex-row items-center justify-between pb-8 relative">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Últimos usuários
          </CardTitle>
          <CardDescription>
            Visualize os 10 últimos usuários criados no sistema
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center w-full justify-center">
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="flex items-center w-full flex-1 border rounded-md">
              <Table
                headers={[
                  'Nome',
                  'Email',
                  'Telefone',
                  'Data de criação',
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
      </CardContent>
    </Card>
  );
};
