/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/services/react-query';
import { useFormik } from 'formik';
import { addFinancial, AddFinancialProps } from '@/api/financial/add-financial';
import { FormInputField } from '@/components/form-input-field';
import { FormSelectField } from '@/components/form-select-field';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { createExpenseSchema } from '@/schemas/create-expense-schema';
import { convertQuantityToReal } from '@/utils/convert-quantity-to-real';
import { extractNumber } from '@/utils/extract-number';

export const NewExpenseTemplate = () => {
  const router = useRouter();
  const { mutateAsync: addFinancialFn, isPending: isCreating } = useMutation({
    mutationFn: addFinancial,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['financial'] });
    },
  });

  const handleCreateExpense = async (values: {
    productType: string;
    productName: string;
    productValue: string;
    clientId?: string;
  }) => {
    const productValueFormatted = extractNumber(values.productValue);
    const body: AddFinancialProps = {
      productType: values.productType,
      productName: values.productName,
      productValue: productValueFormatted,
      clientId: values.clientId || undefined,
    };

    try {
      await addFinancialFn(body);
      await queryClient.invalidateQueries({ queryKey: ['financial'] });
      resetForm();
      router.push('/admin/financial');
      toast('success', 'Despesa criada com sucesso!');
    } catch (error: any) {
      toast('error', error?.message || 'Erro ao criar a despesa.');
    }
  };

  const {
    handleSubmit,
    getFieldProps,
    setFieldValue,
    errors,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      productType: '',
      productName: '',
      productValue: '',
    },
    validationSchema: createExpenseSchema,
    onSubmit: handleCreateExpense,
  });

  return (
    <PrivateLayout title="Nova Despesa">
      {isCreating ? (
        <div className="flex w-full justify-center">
          <Spinner className="!text-primary" />
        </div>
      ) : (
        <form
          className="w-full md:ml-2 md:w-[400px] flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <FormSelectField
            {...getFieldProps('productType')}
            onChange={(value: string) => setFieldValue('productType', value)}
            label="Tipo de Produto"
            placeholder="Selecione o tipo de produto"
            className="w-full"
            choices={[
              { value: 'COMPRA DE JOGO', label: 'Compra de Jogo' },
              { value: 'ACESSÓRIO', label: 'Acessório' },
              { value: 'INVESTIMENTO', label: 'Investimento' },
              { value: 'MEI', label: 'MEI' },
              { value: 'DESPESA', label: 'Despesa' },
            ]}
          />

          <FormInputField
            {...getFieldProps('productName')}
            onChange={(e) => setFieldValue('productName', e.target.value)}
            label="Nome do Produto"
            placeholder="Digite o nome do produto"
            className="w-full"
            error={errors.productName}
          />

          <FormInputField
            {...getFieldProps('productValue')}
            onChange={(e) =>
              setFieldValue(
                'productValue',
                convertQuantityToReal(e.target.value) || ''
              )
            }
            label="Valor do Produto"
            placeholder="Digite o valor do produto"
            className="w-full"
            error={errors.productValue}
          />

          <Button
            type="submit"
            className="!rounded-md !font-poppins !font-medium mt-4"
          >
            {isSubmitting ? (
              <Spinner className="border-l-white border-t-white" />
            ) : (
              'Adicionar'
            )}
          </Button>
        </form>
      )}
    </PrivateLayout>
  );
};
