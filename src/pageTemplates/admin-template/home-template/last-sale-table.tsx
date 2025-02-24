import { Table } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { getDashboard } from '@/api/dashboard/get-dashboard';
import { LastSaleTableRow } from './last-sale-table-row';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const LastSaleTable = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryFn: getDashboard,
    queryKey: ['dashboard'],
  });

  const latestSales = dashboardData?.data?.latestSales || [];

  return (
    <Card className="col-span-6 mt-4 !w-[49%]">
      <CardHeader className="flex-row items-center justify-between pb-8 relative">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Últimas vendas
          </CardTitle>
          <CardDescription>Visualize as 10 últimas vendas</CardDescription>
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
                  'Cliente',
                  'Número do cliente',
                  'Nome do produto',
                  'Valor da venda',
                  'Data de criação',
                  'Criador',
                  'Tipo',
                ]}
              >
                {latestSales.map((sale, i) => (
                  <LastSaleTableRow key={`sale-${i}`} index={i} item={sale} />
                ))}
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
