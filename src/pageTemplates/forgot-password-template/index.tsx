'use client';

import { Heading } from '@/components/ui/heading';
import { useState } from 'react';
import { ForgotPassword } from './forgot-password';
import { RecoverPassword } from './recover-password';
import Link from 'next/link';

export const ForgotPasswordTemplate = () => {
  const [emailIsFilled, setEmailIsFilled] = useState(false);
  const [email, setEmail] = useState('');

  const handleSuccess = (email: string) => {
    setEmail(email);
    setEmailIsFilled(true);
  };

  return (
    <div className="h-[100vh] w-full flex flex-col md:flex-row">
      <div className="w-full md:w-[50%] bg-primary p-9 flex flex-col">
        <Heading className="!text-white text-2xl">Kong Games</Heading>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center md:mt-2 mt-8 justify-center px-7 md:px-20 relative">
        <Link
          className="mt-2 absolute top-6 right-6 sm:flex hover:underline py-2 px-4 rounded-lg "
          href={'/'}
        >
          <p className="font-bold text-sm">Fazer login</p>
        </Link>
        <h1 className="text-3xl font-semibold text-black mb-2">
          Recuperar Senha
        </h1>

        <p className="text-sm text-default-grey !font-poppins">
          Insira seu e-mail, receba o código e recupere sua senha.
        </p>
        {!emailIsFilled ? (
          <ForgotPassword onSuccess={handleSuccess} />
        ) : (
          <RecoverPassword email={email} />
        )}
      </div>
    </div>
  );
};
