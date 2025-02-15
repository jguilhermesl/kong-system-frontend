'use client';
import React from 'react';
import { useFormik } from 'formik';

import { forgotPassword } from '@/api/password/forgot-password';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/utils/toast';
import { forgotPasswordSchema } from '@/schemas/forgot-password-schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface ForgotPasswordProps {
  onSuccess: (email: string) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onSuccess,
}) => {
  const { mutateAsync: forgotPasswordFn } = useMutation({
    mutationFn: forgotPassword,
  });

  const handleForgotPassword = async (values: { email: string }) => {
    try {
      await forgotPasswordFn({ email: values.email });
      toast(
        'success',
        'O código de recuperação foi enviado para o seu e-mail!'
      );
      onSuccess(values.email);
    } catch (err: any) {
      toast('error', 'Algo deu errado.');
    }
  };

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      email: '',
    },
    onSubmit: handleForgotPassword,
    validationSchema: forgotPasswordSchema,
  });

  const { errors, handleSubmit, getFieldProps, isSubmitting, setFieldValue } =
    formik;

  return (
    <div className="w-full flex justify-center mt-6 items-center flex-col">
      <form
        className="w-full md:w-[400px] flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          {...getFieldProps('email')}
          placeholder="Digite seu e-mail"
          type="email"
          className="!font-semibold px-4 py-[10px]"
          onChange={(e) => setFieldValue('email', e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="!rounded-md !font-poppins !font-medium mt-4"
        >
          {isSubmitting ? (
            <Spinner className="border-l-white border-t-white" />
          ) : (
            'Enviar'
          )}
        </Button>
      </form>
    </div>
  );
};
