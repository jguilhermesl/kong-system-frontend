'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useFormik } from 'formik';
import { toast } from '@/utils/toast';
import { Heading } from '@/components/ui/heading';
import { signUpSchema } from '@/schemas/sign-up-schema';
import { FormInputField } from '@/components/form-input-field';
import { Spinner } from '@/components/ui/spinner';
import { FormPasswordField } from '@/components/form-password-field';
import { formatPhone } from '@/utils/formatPhone';
import { formatCPF } from '@/utils/formatCPF';
import { FileUser, IdCard, Mail, Phone } from 'lucide-react';

export const SignUpTemplate = () => {
  const handleSignUp = async (values: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
  }) => {
    toast('success', 'Cadastro realizado com sucesso!');
    console.log(values);
    resetForm();
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
      email: '',
      cpf: '',
      phone: '',
      password: '',
      confirmedPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: handleSignUp,
    isInitialValid: true,
  });

  return (
    <div className="h-auto w-full flex flex-col  md:flex-row">
      <div className="w-full md:w-[50%] bg-primary md:h-screen p-9 flex flex-col ">
        <Heading className="!text-white text-2xl">Kong Games</Heading>
      </div>
      <div className="w-full md:w-[50%] sm:py-8 py-5 flex flex-col overflow-y-auto items-center justify-center px-7 md:px-20 relative">
        <h1 className="text-3xl font-semibold text-black mb-2">
          Fazer Cadastro
        </h1>
        <p className="text-sm text-default-grey !font-poppins">
          Insira seus dados abaixo para fazer cadastro
        </p>
        <form
          className="w-full md:w-[400px] mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
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
            {...getFieldProps('cpf')}
            onChange={(e) => setFieldValue('cpf', formatCPF(e.target.value))}
            label="CPF"
            iconRight={<IdCard size={16} />}
            placeholder="Digite seu CPF"
            className="w-full"
            error={errors.cpf}
          />

          <FormInputField
            {...getFieldProps('phone')}
            onChange={(e) =>
              setFieldValue('phone', formatPhone(e.target.value))
            }
            iconRight={<Phone size={16} />}
            label="Telefone"
            placeholder="Digite seu telefone"
            className="w-full"
            error={errors.phone}
          />

          <FormPasswordField
            {...getFieldProps('password')}
            onChange={(e) => setFieldValue('password', e.target.value)}
            label="Senha"
            placeholder="Digite sua senha"
            className="w-full"
            error={errors.password}
          />

          <FormPasswordField
            {...getFieldProps('confirmedPassword')}
            onChange={(e) => setFieldValue('confirmedPassword', e.target.value)}
            label="Confirmar Senha"
            placeholder="Confirme sua senha"
            className="w-full"
            error={errors.confirmedPassword}
          />
          <Button
            type="submit"
            className="!rounded-md !font-poppins !font-medium mt-4"
          >
            {isSubmitting ? (
              <Spinner className="border-l-white border-t-white" />
            ) : (
              'Cadastrar'
            )}
          </Button>
        </form>
        <Link
          className="mt-2 sm:flex hover:underline py-2 px-4 rounded-lg "
          href={'/'}
        >
          <p className="font-bold text-sm">Já tem cadastro? Faça login</p>
        </Link>
      </div>
    </div>
  );
};
