import { Button } from '@/components/ui/button';

import { Heading } from '@/components/ui/heading';

export const LoginTemplate = () => {
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
        <form className="w-full md:w-[400px] mt-6 flex flex-col">
          <input placeholder="Digite seu e-mail" />
          <input placeholder="Digite sua senha" />
          <Button
            type="submit"
            className="!rounded-md !font-poppins !font-medium mt-8"
          >
            Logar
          </Button>
        </form>
      </div>
    </div>
  );
};
