/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { createUser, CreateUserProps } from '@/api/users/create-user';
import { FormInputField } from '@/components/form-input-field';
import { FormSelectField } from '@/components/form-select-field';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { createUserSchema } from '@/schemas/create-user-schema';
import { queryClient } from '@/services/react-query';
import { formatCPF } from '@/utils/formatCPF';
import { formatPhone } from '@/utils/format-phone';
import { toast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

export const CreateUserTemplate = () => {
  const router = useRouter();
  const { mutateAsync: createUserFn, isPending: isCreating } = useMutation({
    mutationFn: createUser,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });

  const handleSignUp = async (values: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
    role: string;
  }) => {
    const formattedPhone = formatPhone(values.phone);
    const body: CreateUserProps = {
      name: values.name,
      email: values.email,
      cpf: values.cpf,
      phone: formattedPhone,
      password: values.password,
      role: values.role as 'admin' | 'client',
      isAdminAction: true,
    };

    try {
      await createUserFn(body);
      toast('success', 'Usuário criado com sucesso!');
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      resetForm();
      router.push('/admin/users');
    } catch (error: any) {
      toast('error', error?.message || 'Erro ao criar o usuário.');
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
      password: '',
      role: 'client',
    },
    validationSchema: createUserSchema,
    onSubmit: handleSignUp,
  });

  return (
    <PrivateLayout title="Criar Usuário">
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
          <FormInputField
            {...getFieldProps('password')}
            onChange={(e) => setFieldValue('password', e.target.value)}
            label="Senha"
            placeholder="Digite uma senha válida"
            className="w-full"
            error={errors.password}
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
            {isSubmitting ? (
              <Spinner className="border-l-white border-t-white" />
            ) : (
              'Adicionar usuário'
            )}
          </Button>
        </form>
      )}
    </PrivateLayout>
  );
};
