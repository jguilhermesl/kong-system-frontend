import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormSelectField } from '@/components/form-select-field';
import { useFormik } from 'formik';
import { useSearchParams } from 'next/navigation';

export function InventoryTableFilters() {
  const searchParams = useSearchParams();

  const formik = useFormik({
    initialValues: {
      search: searchParams.get('search') || '',
      sold: searchParams.get('sold') || '',
    },
    onSubmit: (values) => {
      const query = new URLSearchParams({
        search: values.search,
        sold: values.sold,
      });

      window.history.pushState({}, '', `?${query.toString()}`);
    },
    onReset: () => {
      window.history.pushState({}, '', window.location.pathname);
      formik.setFieldValue('sold', '');
    },
  });

  return (
    <form
      className="flex items-center gap-2 flex-wrap"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        name="search"
        placeholder="Nome do jogo"
        className="h-8 w-[320px]"
        value={formik.values.search}
        onChange={formik.handleChange}
      />
      <div className="flex items-center gap-2">
        <FormSelectField
          containerClassName="h-8"
          value={formik.values.sold}
          onChange={(value) => formik.setFieldValue('sold', value)}
          choices={[
            { value: 'true', label: 'Sim' },
            { value: 'false', label: 'Não' },
          ]}
          className="w-[150px]"
          placeholder="Foi vendido"
        />
      </div>
      <Button variant="secondary" size="sm" type="submit">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button variant="outline" size="sm" type="reset">
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}
