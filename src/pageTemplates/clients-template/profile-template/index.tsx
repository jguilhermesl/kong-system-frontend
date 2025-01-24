'use client';

import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import { toast } from '@/utils/toast';
import { Spinner } from '@/components/ui/spinner';
import { FormInputField } from '@/components/form-input-field';
import { formatPhone } from '@/utils/format-phone';
import { formatCPF } from '@/utils/formatCPF';
import { IdCard, FileUser, Mail, Phone } from 'lucide-react';
import { FormSelectField } from '@/components/form-select-field';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { updateProfileSchema } from '@/schemas/update-profile-schema';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useMutation } from '@tanstack/react-query';
import { updateClient, UpdateClientProps } from '@/api/clients/update-clients';
import { queryClient } from '@/services/react-query';

export const ClientProfileTemplate = () => {
  const { user } = useCurrentUser();

  const { mutateAsync: updateClientFn, isPending: isUpdating } = useMutation({
    mutationFn: ({
      body,
      userId,
    }: {
      body: UpdateClientProps;
      userId: string;
    }) => updateClient(body, userId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast('success', 'Perfil atualizado com sucesso!');
    },
    onError(error: any) {
      toast('error', error?.message || 'Erro ao atualizar o perfil.');
    },
  });

  const handleProfileUpdate = async (values: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    console: 'PS4' | 'PS5';
  }) => {
    if (!user?.id) {
      toast('error', 'Usuário não encontrado.');
      return;
    }

    const formattedPhone = formatPhone(values.phone);

    const body: UpdateClientProps = {
      name: values.name,
      email: values.email,
      cpf: values.cpf,
      phone: formattedPhone,
      role: 'client',
      console: values.console,
    };

    await updateClientFn({ body, userId: user.id });
  };

  const { handleSubmit, getFieldProps, setFieldValue, errors } = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      cpf: user?.cpf || '',
      phone: user?.phone || '',
      console:
        user?.console === 'PS4' || user?.console === 'PS5'
          ? user.console
          : 'PS4',
    },
    enableReinitialize: true,
    validationSchema: updateProfileSchema,
    onSubmit: handleProfileUpdate,
  });

  return (
    <PrivateLayout
      title="Meu perfil"
      description="Edite as informações do seu perfil"
    >
      {isUpdating ? (
        <div className="flex w-full justify-center">
          <Spinner className="!text-primary" />
        </div>
      ) : (
        <form
          className="w-full md:w-[50%] flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <FormInputField
            {...getFieldProps('cpf')}
            onChange={(e) => setFieldValue('cpf', formatCPF(e.target.value))}
            label="CPF"
            iconRight={<IdCard size={16} />}
            placeholder="Digite seu CPF"
            className="w-full"
            disabled
            error={errors.cpf}
          />
          <FormInputField
            {...getFieldProps('name')}
            onChange={(e) => setFieldValue('name', e.target.value)}
            label="Nome"
            iconRight={<FileUser size={16} />}
            placeholder="Digite seu nome"
            className="w-full"
            error={errors.name}
          />
          <FormInputField
            {...getFieldProps('email')}
            onChange={(e) => setFieldValue('email', e.target.value)}
            label="E-mail"
            iconRight={<Mail size={16} />}
            placeholder="Digite seu e-mail"
            className="w-full"
            error={errors.email}
          />
          <FormInputField
            {...getFieldProps('phone')}
            onChange={(e) =>
              setFieldValue('phone', formatPhone(e.target.value))
            }
            label="Telefone"
            iconRight={<Phone size={16} />}
            placeholder="Digite seu telefone"
            className="w-full"
            error={errors.phone}
          />
          <FormSelectField
            {...getFieldProps('console')}
            onChange={(value: string) => setFieldValue('console', value)}
            label="Console"
            placeholder="Escolha o console"
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
            {isUpdating ? (
              <Spinner className="border-l-white border-t-white" />
            ) : (
              'Salvar Alterações'
            )}
          </Button>
        </form>
      )}
    </PrivateLayout>
  );
};
