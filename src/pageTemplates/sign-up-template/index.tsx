'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export const SignUpTemplate = () => {
  return (
    <div className="w-full p-5 flex flex-col items-center justify-start">
      <Link
        href={'/'}
        className="absolute top-16 lg:top-9 right-9 !font-semibold !text-sm"
      >
        Fazer Login
      </Link>
      <form className="w-full max-w-[400px] mt-6">
        <Input
          placeholder="Digite o nome da sua empresa"
          type="text"
          className="!font-semibold px-4 py-[10px]"
        />
        <Input
          placeholder="Digite o CNPJ da sua empresa"
          type="text"
          minLength={14}
          className="!font-semibold px-4 py-[10px]"
        />
        <Input
          placeholder="Digite o e-mail da sua empresa"
          type="text"
          className="!font-semibold px-4 py-[10px]"
        />
        <Input
          placeholder="Digite o CEP da sua empresa"
          type="text"
          minLength={8}
          className="!font-semibold px-4 py-[10px]"
        />
        <Input
          placeholder="Digite o endereço da sua empresa"
          type="text"
          className="!font-semibold px-4 py-[10px]"
        />

        <Button className="!rounded-md !font-medium mt-2" type="submit">
          Cadastrar
        </Button>
      </form>
    </div>
  );
};
