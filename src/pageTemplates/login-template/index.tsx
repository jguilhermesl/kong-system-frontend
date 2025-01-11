'use client';
import { FormInputField } from '@/components/form-input-field';
import { FormPasswordField } from '@/components/form-password-field';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { useFormik } from 'formik';
import loginSchema from '../../schemas/loginSchema';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/utils/toast';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';

export const LoginTemplate = () => {
  const { handleSignIn } = useAuth();
  const handleLogin = async (values: { email: string; password: string }) => {
    await handleSignIn({
      email: values.email,
      password: values.password,
    });
    toast('success', 'Seja bem vindo!');
  };

  const { handleSubmit, setFieldValue, getFieldProps, isSubmitting } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: loginSchema,
      onSubmit: handleLogin,
    });

  return (
    <div className="h-[100vh] w-full flex flex-col md:flex-row">
      <div className="w-full md:w-[50%] bg-primary p-9 flex flex-col ">
        <Heading className="!text-white text-2xl">Kong Games</Heading>
      </div>
      <div className="w-full md:w-[50%] flex flex-col items-center justify-center px-7 md:px-20 relative">
        <h1 className="text-3xl font-semibold text-black mb-2">Fazer Login</h1>
        <p className="text-sm text-default-grey !font-poppins">
          Insira seu e-mail e senha abaixo para fazer login
        </p>
        <form
          className="w-full md:w-[400px] mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <FormInputField
            {...getFieldProps('email')}
            onChange={(e) => setFieldValue('email', e.target.value)}
            label="E-mail"
            placeholder="Digite seu e-mail"
            className="w-full"
          />
          <FormPasswordField
            {...getFieldProps('password')}
            onChange={(e) => setFieldValue('password', e.target.value)}
            label="Senha"
            placeholder="Digite sua senha"
            className="w-full"
          />

          <Button
            type="submit"
            className="!rounded-md !font-poppins !font-medium mt-4"
          >
            {isSubmitting ? (
              <Spinner className="border-l-white border-t-white" />
            ) : (
              'Login'
            )}
          </Button>
        </form>
        <Link className="mt-2" href={'/signUp'}>
          <p className="font-bold">Cadastre-se</p>
        </Link>
      </div>
    </div>
  );
};
