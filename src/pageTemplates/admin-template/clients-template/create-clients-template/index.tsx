/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { FormInputField } from '@/components/form-input-field';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { queryClient } from '@/services/react-query';
import { formatCPF } from '@/utils/formatCPF';
import { formatPhone } from '@/utils/format-phone';
import { toast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { createUser, CreateUserProps } from '@/api/users/create-user';
import { createUserSchema } from '@/schemas/create-user-schema';
import { FormSelectField } from '@/components/form-select-field';

export const CreateClientTemplate = () => {
  const router = useRouter();
  const { mutateAsync: createClientFn, isPending: isCreating } = useMutation({
    mutationFn: createUser,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['users', 'clients'],
      });
    },
  });

  const handleCreateClient = async (values: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    console: 'PS4' | 'PS5';
  }) => {
    const formattedPhone = formatPhone(values.phone);
    const body: CreateUserProps = {
      name: values.name,
      email: values.email,
      cpf: values.cpf,
      phone: formattedPhone,
      console: values.console,
      role: 'client',
      isAdminAction: true,
    };

    try {
      await createClientFn(body);
      toast('success', 'Cliente criado com sucesso!');
      queryClient.invalidateQueries({
        queryKey: ['clients'],
      });
      resetForm();
      router.push('/admin/clients');
    } catch (error: any) {
      console.log('error ==> ', error);
      toast('error', error?.message || 'Erro ao criar o cliente.');
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
      name: '',
      phone: '',
      cpf: '',
      email: '',
      console: '' as 'PS4' | 'PS5',
    },
    validationSchema: createUserSchema,
    onSubmit: handleCreateClient,
  });

  return (
    <PrivateLayout title="Criar Cliente">
      {isCreating ? (
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
            {...getFieldProps('console')}
            onChange={(value: string) => setFieldValue('console', value)}
            label="Console"
            placeholder="Escolha o seu console"
            className="w-full"
            choices={[
              { value: 'PS4', label: 'PS4' },
              { value: 'PS5', label: 'PS5' },
            ]}
          />

          <Button
            type="submit"
            className="!rounded-md !font-poppins !font-medium mt-4"
          >
            {isSubmitting ? (
              <Spinner className="border-l-white border-t-white" />
            ) : (
              'Adicionar cliente'
            )}
          </Button>
        </form>
      )}
    </PrivateLayout>
  );
};
