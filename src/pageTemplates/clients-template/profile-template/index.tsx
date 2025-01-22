'use client';

import { Button } from '@/components/ui/button';

import { useFormik } from 'formik';
import { toast } from '@/utils/toast';
import { Spinner } from '@/components/ui/spinner';
import { signUpSchema } from '@/schemas/sign-up-schema';
import { FormInputField } from '@/components/form-input-field';
import { formatPhone } from '@/utils/format-phone';
import { formatCPF } from '@/utils/formatCPF';
import { FileUser, IdCard, Mail, Phone } from 'lucide-react';
import { FormSelectField } from '@/components/form-select-field';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { updateUserSchema } from '@/schemas/update-user-schema';
import { updateProfileSchema } from '@/schemas/update-profile-schema';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const ClientProfileTemplate = () => {
  const { user } = useCurrentUser();
  const handleProfileUpdate = async (values: any) => {
    console.log(values);
    toast('success', 'Perfil atualizado com sucesso!');
  };

  const { handleSubmit, getFieldProps, setFieldValue, errors, isSubmitting } =
    useFormik({
      initialValues: {
        name: user?.name,
        email: user?.email,
        cpf: user?.cpf,
        phone: user?.phone,
        console: user?.console,
      },
      validationSchema: updateProfileSchema,
      onSubmit: handleProfileUpdate,
    });

  return (
    <PrivateLayout
      title="Meu perfil"
      description="Visualize e edite seu perfil de cliente"
    >
      <form
        className=" w-full md:w-[50%] flex flex-col gap-4 overflow-y-auto"
        onSubmit={handleSubmit}
      >
        <FormInputField
          {...getFieldProps('cpf')}
          onChange={(e) => setFieldValue('cpf', formatCPF(e.target.value))}
          label="CPF"
          iconRight={<IdCard size={16} />}
          placeholder="Digite seu CPF"
          className="w-full"
          value={user?.cpf}
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
          onChange={(e) => setFieldValue('phone', formatPhone(e.target.value))}
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
            'Salvar Alterações'
          )}
        </Button>
      </form>
    </PrivateLayout>
  );
};
