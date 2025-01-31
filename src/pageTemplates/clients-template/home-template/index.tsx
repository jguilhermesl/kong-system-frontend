'use client';
import { fetchStatement } from '@/api/statement/fetch-statement';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { Spinner } from '@/components/ui/spinner';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useQuery } from '@tanstack/react-query';
import { Coins, Stars } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const ClientHomeTemplate = () => {
  const router = useRouter();
  const { user } = useCurrentUser();
  const { data: dataStatement, isPending } = useQuery({
    queryFn: () =>
      fetchStatement({
        userId: user?.id,
      }),
    queryKey: ['statement', user?.id],
  });

  const balance = dataStatement?.balance;

  return (
    <PrivateLayout>
      <div>
        <main className="mx-auto">
          <section className="bg-white  mb-8">
            <h1 className="text-xl font-semibold mb-2">
              Bem-vindo ao Portal do Cliente da Kong Games! 🎉
            </h1>
            <p className="text-sm">
              Esta plataforma foi criada exclusivamente para nossos clientes e
              está em constante melhoria.
            </p>
            <p className="text-sm">
              Atualmente, o KongSystem permite que os usuários visualizem seu
              saldo e extrato de pontos acumulados, acompanhem suas compras
              realizadas, explorem a loja para adquirir produtos usando pontos,
              e acessem diversas outras informações úteis. Tudo isso em um
              painel intuitivo e fácil de usar, projetado para otimizar sua
              experiência com jogos digitais!
            </p>
          </section>

          {isPending ? (
            <div className="mt-4 flex items-center w-full justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              <section className="border border-border rounded-lg p-8 flex flex-col gap-8  mt-4">
                <div className="flex items-center gap-8">
                  <div className="bg-orange-200 p-4 rounded-lg flex items-center justify-center">
                    <Stars size={24} />
                  </div>
                  <div>
                    <Paragraph className="font-semibold">
                      EXTRATO DE PONTOS
                    </Paragraph>
                    <Paragraph>
                      Confira todas as entradas e saídas de pontos na sua conta{' '}
                    </Paragraph>
                  </div>
                </div>
                <Button
                  className="max-w-[200px]"
                  onClick={() => router.push('/statement')}
                >
                  Conferir
                </Button>
              </section>

              <section className="bg-orange-200 w-full rounded-lg flex flex-col p-8 mt-8">
                <Paragraph className="lette">PONTOS ACUMULADOS</Paragraph>
                <div className="flex items-center mt-4 gap-4">
                  <Coins size={32} />
                  <Heading className="text-1xl gap-4">
                    <strong className="text-[50px] font-semibold mr-4 ml-6">
                      {parseInt(balance?.toString() || '0')}
                    </strong>
                    pontos
                  </Heading>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </PrivateLayout>
  );
};
