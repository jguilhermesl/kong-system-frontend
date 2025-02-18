import { FetchFinancialResponse } from '@/api/financial/fetch-financial';
import { FinancialCard } from './financial-card';
import { BadgeDollarSign, Gamepad2, PiggyBank } from 'lucide-react';
import { formatPrice } from '@/utils/format-price';
import { MonthlyRevenueChart } from './month-revenue-chart';

interface FinancialExtractProps {
  metrics?: FetchFinancialResponse['metrics'];
}

export const FinancialExtract = ({ metrics }: FinancialExtractProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4 w-full justify-center lg:justify-start">
        <FinancialCard
          value={formatPrice(metrics?.weeklySalesRevenue || '')}
          title="Faturamento semanal"
          description={`Total de ${metrics?.weeklySalesCount} vendas na semana`}
          icon={<BadgeDollarSign size={20} />}
          type="positive"
        />
        <FinancialCard
          value={formatPrice(metrics?.totalRevenue || '')}
          title="Faturamento Total"
          icon={<PiggyBank size={20} />}
        />
        <FinancialCard
          value={formatPrice(metrics?.totalProfit || '')}
          title="Lucro Total"
          icon={<PiggyBank size={20} />}
        />
        <FinancialCard
          value={formatPrice(metrics?.pendingPaymentValue || '')}
          title="Pagamentos pendentes"
          icon={<Gamepad2 size={20} />}
        />
      </div>
      <MonthlyRevenueChart metrics={metrics} />
    </div>
  );
};
