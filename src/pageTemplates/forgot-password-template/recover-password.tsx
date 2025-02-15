'use client';

import { FormInputField } from '@/components/form-input-field';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import { toast } from '@/utils/toast';
import { Spinner } from '@/components/ui/spinner';
import { recoverPasswordSchema } from '@/schemas/recover-password-schema';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { recoverPassword } from '@/api/password/recover-password';

export const RecoverPassword = ({ email }: { email: string }) => {
  const { mutateAsync: recoverPasswordFn } = useMutation({
    mutationFn: recoverPassword,
  });
  const router = useRouter();
  const handleRecoverPassword = async (values: {
    email: string;
    code: string;
    password: string;
  }) => {
    try {
      await recoverPasswordFn({
        email: values.email,
        code: values.code,
        password: values.password,
      });
      router.push('/');
      toast('success', 'Senha recuperada com sucesso!');
    } catch (err: any) {
      toast('error', 'Algo deu errado.');
    }
  };

  const {
    handleSubmit,
    setFieldValue,
    getFieldProps,
    errors,
    touched,
    isSubmitting,
  } = useFormik<{ email: string; code: string; password: string }>({
    initialValues: {
      email: email,
      code: '',
      password: '',
    },
    validationSchema: recoverPasswordSchema,
    onSubmit: handleRecoverPassword,
  });

  return (
    <div className="w-full flex justify-center mt-6 items-center flex-col ">
      <form
        className="w-full md:w-[400px] flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <FormInputField
          {...getFieldProps('email')}
          onChange={(e) => setFieldValue('email', e.target.value)}
          label="E-mail"
          placeholder="Digite seu e-mail"
          className="w-full"
          error={touched.email ? errors.email : undefined}
        />

        <FormInputField
          {...getFieldProps('code')}
          maxLength={4}
          onChange={(e) => setFieldValue('code', e.target.value)}
          label="Código"
          placeholder="Digite o código recebido"
          className="w-full"
          error={touched.code ? errors.code : undefined}
        />

        <FormInputField
          {...getFieldProps('password')}
          maxLength={6}
          onChange={(e) => setFieldValue('password', e.target.value)}
          label="Senha"
          type="password"
          placeholder="Digite sua nova senha"
          className="w-full"
          error={touched.password ? errors.password : undefined}
        />

        <Button
          type="submit"
          className="!rounded-md !font-poppins !font-medium mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Spinner className="border-l-white border-t-white" />
          ) : (
            'Recuperar'
          )}
        </Button>
      </form>
    </div>
  );
};
