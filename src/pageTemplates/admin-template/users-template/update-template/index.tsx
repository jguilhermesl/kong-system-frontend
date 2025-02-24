/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { fetchUsers } from '@/api/users/fetch-users';
import { UpdateUserProps, updateUser } from '@/api/users/update-user';
import { FormInputField } from '@/components/form-input-field';
import { FormSelectField } from '@/components/form-select-field';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { updateUserSchema } from '@/schemas/update-user-schema';
import { queryClient } from '@/services/react-query';
import { formatCPF } from '@/utils/formatCPF';
import { formatPhone } from '@/utils/format-phone';
import { toast } from '@/utils/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import { fetchClients } from '@/api/clients/fetch-clients';

export const UpdateUserTemplate = () => {
  const router = useRouter();
  const { id } = useParams();
  const userId = id?.toLocaleString() || '';

  const { mutateAsync: updateUserFn, isPending: isUpdating } = useMutation({
    mutationFn: ({ body, userId }: { body: UpdateUserProps; userId: string }) =>
      updateUser(body, userId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
  const { data: usersData } = useQuery({
    queryFn: fetchUsers,
    queryKey: ['users'],
  });
  const { data: clientsData } = useQuery({
    queryFn: () => fetchClients({}),
    queryKey: ['clients'],
  });

  const userUpdate = usersData?.data?.find((user: any) => user.id === id);
  const clientUpdate = clientsData?.data?.find(
    (client: any) => client.id === id
  );

  const handleUpdate = async (values: {
    name: string;
    phone: string;
    cpf: string;
    email: string;
    role: string;
  }) => {
    const formattedPhone = formatPhone(values.phone);

    const body: UpdateUserProps = {
      name: values.name,
      email: values.email,
      cpf: values.cpf,
      phone: formattedPhone,
      role: values.role as 'admin' | 'client',
    };

    try {
      await updateUserFn({ body, userId });

      const successMessage = clientUpdate
        ? 'Cliente editado com sucesso!'
        : 'Usuário editado com sucesso!';

      const queryKey = clientUpdate ? ['clients'] : ['users'];
      const redirectPath = clientUpdate ? '/admin/clients' : '/admin/users';

      toast('success', successMessage);
      queryClient.invalidateQueries({ queryKey });
      resetForm();
      router.push(redirectPath);
    } catch (error: any) {
      const errorMessage = clientUpdate
        ? 'Erro ao editar o cliente.'
        : 'Erro ao editar o usuário.';
      toast('error', error?.message || errorMessage);
    }
  };

  const { handleSubmit, getFieldProps, setFieldValue, errors, resetForm } =
    useFormik({
      initialValues: {
        name: userUpdate?.name || clientUpdate?.name || '',
        phone: userUpdate?.phone || clientUpdate?.phone || '',
        cpf: userUpdate?.cpf || clientUpdate?.cpf || '',
        email: userUpdate?.email || clientUpdate?.email || '',
        role: userUpdate?.role || clientUpdate?.role || '',
      },
      enableReinitialize: true,
      validationSchema: updateUserSchema,
      onSubmit: handleUpdate,
    });

  return (
    <PrivateLayout title={clientUpdate ? 'Editar Cliente' : 'Editar Usuário'}>
      {isUpdating ? (
        <div className="flex w-full justify-center">
          <Spinner className="!text-primary" />
        </div>
      ) : (
        <form
          className="w-full md:ml-2 md:w-[400px] flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <FormInputField
            {...getFieldProps('name')}
            onChange={(e) => setFieldValue('name', e.target.value)}
            label="Nome"
            placeholder="Digite o nome"
            className="w-full"
            error={errors.name}
          />
          <FormInputField
            {...getFieldProps('phone')}
            onChange={(e) =>
              setFieldValue('phone', formatPhone(e.target.value))
            }
            label="Telefone"
            placeholder="Digite o telefone"
            className="w-full"
            error={errors.phone}
          />
          <FormInputField
            {...getFieldProps('cpf')}
            onChange={(e) => setFieldValue('cpf', formatCPF(e.target.value))}
            label="CPF"
            placeholder="Digite o CPF"
            className="w-full"
            error={errors.cpf}
          />
          <FormInputField
            {...getFieldProps('email')}
            onChange={(e) => setFieldValue('email', e.target.value)}
            label="E-mail"
            placeholder="Digite o e-mail"
            className="w-full"
            error={errors.email}
          />
          <FormSelectField
            {...getFieldProps('role')}
            onChange={(value: string) => setFieldValue('role', value)}
            label="Função"
            placeholder="Escolha o cargo"
            className="w-full"
            choices={[
              { value: 'admin', label: 'Administrador' },
              { value: 'client', label: 'Cliente' },
            ]}
          />
          <Button
            type="submit"
            className="!rounded-md !font-poppins !font-medium mt-4"
          >
            {isUpdating ? (
              <Spinner className="border-l-white border-t-white" />
            ) : clientUpdate ? (
              'Editar Cliente'
            ) : (
              'Editar Usuário'
            )}
          </Button>
        </form>
      )}
    </PrivateLayout>
  );
};
