/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { FormInputField } from '@/components/form-input-field';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { queryClient } from '@/services/react-query';
import { toast } from '@/utils/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { newSale, NewSaleProps } from '@/api/inventory/new-sale';
import { newSaleSchema } from '@/schemas/new-sale-schema';
import { FormAutoCompleteField } from '@/components/form-auto-complete-field';
import { useCallback, useState } from 'react';
import { fetchInventory } from '@/api/inventory/fetch-inventory';
import { InventoryItem } from '@/models/Inventory';
import { User } from '@/models/User';
import { FormSelectField } from '@/components/form-select-field';
import { convertQuantityToReal } from '@/utils/convert-quantity-to-real';
import { convertRealToNumber } from '@/utils/convert-real-to-number';
import { fetchClients } from '@/api/clients/fetch-clients';

export const NewSaleTemplate = () => {
  const [inventoryAutoCompleteValue, setInventoryAutoCompleteValue] =
    useState('');
  const [inventorySuggestions, setInventorySuggestions] = useState<
    InventoryItem[]
  >([]);
  const [clientsAutoCompleteValue, setClientsAutoCompleteValue] = useState('');
  const [clientsSuggestions, setClientsSuggestions] = useState<User[]>([]);

  const router = useRouter();
  const { mutateAsync: newSaleFn, isPending } = useMutation({
    mutationFn: newSale,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['inventory'],
      });
    },
  });

  const { data: inventoryData } = useQuery({
    queryFn: () => fetchInventory({ sold: 'false' }),
    queryKey: ['inventory'],
  });

  const { data: clientsData } = useQuery({
    queryFn: fetchClients,
    queryKey: ['clients'],
  });

  const handleGetInventoryItems = useCallback(
    async (searchValue: string) => {
      const inventory = inventoryData?.data;
      const lowercaseQuery = searchValue.toLowerCase();

      const inventoryFiltered =
        inventory?.filter((i) => {
          const lowercaseGame = i.game.toLowerCase();
          const lowercaseId = i.id.toLowerCase();

          return (
            lowercaseGame.includes(lowercaseQuery) ||
            lowercaseId.includes(lowercaseQuery)
          );
        }) || [];

      setInventorySuggestions(inventoryFiltered);
    },
    [inventoryData]
  );

  const handleGetClientItems = useCallback(
    async (searchValue: string) => {
      const clients = clientsData?.data || [];
      const lowercaseQuery = searchValue.toLowerCase();

      const clientsFiltered =
        clients?.filter((i) => {
          const lowercaseName = i.name.toLowerCase();
          const lowercaseCpf = i.cpf?.toLowerCase();
          const lowercaseEmail = i.email?.toLowerCase();
          const lowercasePhone = i.phone?.toLowerCase();

          return (
            lowercaseName.includes(lowercaseQuery) ||
            lowercaseCpf.includes(lowercaseQuery) ||
            lowercaseEmail.includes(lowercaseQuery) ||
            lowercasePhone.includes(lowercaseQuery)
          );
        }) || [];

      setClientsSuggestions(clientsFiltered as User[]);
    },
    [clientsData?.data]
  );

  const handleNewSale = async (values: {
    sellerName: string;
    price: string;
    inventoryId: string;
    clientId: string;
    codeIndication?: string;
  }) => {
    const saleValue = convertRealToNumber(values.price) || 0;

    const body: NewSaleProps = {
      sellerName: values.sellerName,
      saleValue,
      inventoryId: values.inventoryId,
      clientId: values.clientId,
      codeIndication: values.codeIndication,
    };

    try {
      await newSaleFn(body);
      toast('success', 'Venda adicionada com sucesso!');
      queryClient.invalidateQueries({
        queryKey: ['inventory'],
      });
      resetForm();
      router.push('/admin/inventory');
    } catch (error: any) {
      toast('error', error?.message || 'Erro ao adicionar venda.');
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
      price: '',
      sellerName: '',
      inventoryId: '',
      clientId: '',
      codeIndication: '',
    },
    validationSchema: newSaleSchema,
    onSubmit: handleNewSale,
  });

  return (
    <PrivateLayout title="Nova Venda">
      {isPending ? (
        <div className="flex w-full justify-center">
          <Spinner className="!text-primary" />
        </div>
      ) : (
        <form
          className="w-full md:ml-2 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <FormAutoCompleteField
            value={inventoryAutoCompleteValue}
            setValue={setInventoryAutoCompleteValue}
            getItems={handleGetInventoryItems}
            setItem={(item) => setFieldValue('inventoryId', item)}
            suggestions={inventorySuggestions}
            label="Estoque"
            renderKeys={['id', 'game']}
          />
          <FormInputField
            {...getFieldProps('price')}
            onChange={(e) => {
              const formatted = convertQuantityToReal(e.target.value);
              setFieldValue('price', formatted);
            }}
            label="Preço de venda"
            placeholder="Digite o valor da venda"
            className="w-full"
            error={errors.price}
          />
          <FormAutoCompleteField
            value={clientsAutoCompleteValue}
            setValue={setClientsAutoCompleteValue}
            getItems={handleGetClientItems}
            setItem={(item) => setFieldValue('clientId', item)}
            suggestions={clientsSuggestions}
            label="Cliente"
            placeholder="Digite o nome, cpf ou e-mail do cliente"
            renderKeys={['name', 'email']}
          />
          <FormSelectField
            {...getFieldProps('sellerName')}
            onChange={(value: string) => setFieldValue('sellerName', value)}
            label="Vendedor"
            placeholder="Selecione o vendedor"
            className="w-full"
            choices={[
              { value: 'Eduarda', label: 'Eduarda' },
              { value: 'Jamily', label: 'Jamily' },
            ]}
          />
          <FormInputField
            {...getFieldProps('codeIndication')}
            onChange={(e) => setFieldValue('codeIndication', e.target.value)}
            label="Código de Indicação (opcional)"
            placeholder="Digite o código de indicação"
            className="w-full"
            error={errors.codeIndication}
          />

          <Button
            type="submit"
            className="!rounded-md !font-poppins !font-medium mt-4"
          >
            {isSubmitting ? (
              <Spinner className="border-l-white border-t-white" />
            ) : (
              'Adicionar venda'
            )}
          </Button>
        </form>
      )}
    </PrivateLayout>
  );
};
