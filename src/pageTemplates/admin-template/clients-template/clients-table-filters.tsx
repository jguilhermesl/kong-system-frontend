import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormik } from 'formik';
import { useSearchParams } from 'next/navigation';

export function ClientsTableFilters() {
  const searchParams = useSearchParams();

  const formik = useFormik({
    initialValues: {
      search: searchParams.get('search') || '',
    },
    onSubmit: (values) => {
      const query = new URLSearchParams({
        search: values.search,
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
        placeholder="Pesquise algo"
        className="h-8 w-[320px]"
        value={formik.values.search}
        onChange={formik.handleChange}
      />
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
