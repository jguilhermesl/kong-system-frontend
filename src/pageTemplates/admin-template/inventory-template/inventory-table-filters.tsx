import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormSelectField } from '@/components/form-select-field';

export function InventoryTableFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="Nome do jogo" className="h-8 w-[320px]" />
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">Foi vendido:</span>
        <FormSelectField
          containerClassName="h-8"
          onChange={() => {}}
          choices={[
            {
              value: 'true',
              label: 'Sim',
            },
            {
              value: 'false',
              label: 'Não',
            },
          ]}
          placeholder="Foi vendido"
        />
      </div>
      <Button variant="secondary" size="sm" type="submit">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button variant="outline" size="sm" type="button">
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}
