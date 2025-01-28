import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { FinancialCard } from './financial-card';
import {
  BadgeDollarSign,
  CalendarDays,
  Gamepad2,
  PiggyBank,
} from 'lucide-react';

export const FinancialExtract = () => {
  return (
    <div className="flex flex-wrap sm:gap-4 gap-0 w-full">
      <FinancialCard
        value="32"
        title="Vendas nos últimos 7 dias"
        description=" + 5 vendas em relação a semana passada "
        icon={<BadgeDollarSign size={20} />}
      />
      <FinancialCard
        value="78"
        title="Vendas no mês"
        description="-20 vendas em relação ao mês passado"
        icon={<CalendarDays size={20} />}
      />
      <FinancialCard
        value="2.000"
        title="Faturamento Total"
        icon={<PiggyBank size={20} />}
      />
      <FinancialCard
        value="3.124"
        title="Valor em estoque"
        icon={<Gamepad2 size={20} />}
      />
    </div>
  );
};
