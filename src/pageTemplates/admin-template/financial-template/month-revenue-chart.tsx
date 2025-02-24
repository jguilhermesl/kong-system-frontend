import { FetchFinancialResponse } from '@/api/financial/fetch-financial';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatPrice } from '@/utils/format-price';
import {
  XAxis,
  YAxis,
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  Tooltip,
} from 'recharts';
import colors from 'tailwindcss/colors';

interface FinancialExtractProps {
  metrics?: FetchFinancialResponse['metrics'];
}

export const MonthlyRevenueChart = ({ metrics }: FinancialExtractProps) => {
  const data = metrics?.monthlyMetrics
    .sort((a, b) => {
      if (a.year === b.year) {
        return a.month - b.month;
      }
      return a.year - b.year;
    })
    .slice(-8)
    .map((item) => ({
      Data: `${item.month < 10 ? `0${item.month}` : item.month}-${item.year}`,
      Faturamento: item.monthlyRevenue,
      Lucro: item.monthlyProfit,
    }));

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8 relative">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Faturamento e lucro
          </CardTitle>
          <CardDescription>
            Aqui você visualiza o Faturamento e Lucro por mês
          </CardDescription>
        </div>
        <div className="flex items-center gap-8 absolute top-4 right-4">
          <div className="flex gap-2 items-center">
            <div className="size-3 rounded-full bg-purple-700" />
            <p>Faturamento</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="size-3 rounded-full bg-primary" />
            <p>Lucro</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis dataKey="Data" axisLine={false} tickLine={false} dy={16} />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) => formatPrice(value)}
              width={85}
            />
            <Tooltip
              formatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '8px',
                border: '1px solid #ddd',
              }}
            />

            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="Faturamento"
              stroke={colors.violet[400]}
            />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="Lucro"
              stroke={colors.orange[400]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
