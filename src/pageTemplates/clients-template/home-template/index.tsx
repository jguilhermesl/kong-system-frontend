'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { Coins, Stars } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const ClientHomeTemplate = () => {
  const router = useRouter();

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
              Atualmente, você pode visualizar as indicações realizadas e
              acompanhar seu progresso no sistema de pontuação!
            </p>
          </section>

          <section className="bg-orange-200 w-full rounded-lg flex flex-col p-8">
            <Paragraph className="lette">PONTOS ACUMULADOS</Paragraph>
            <div className="flex items-center mt-4 gap-4">
              <Coins size={32} />
              <Heading className="text-1xl gap-4">
                <strong className="text-[50px] font-semibold mr-4 ml-6">
                  1440
                </strong>{' '}
                pontos
              </Heading>
            </div>
          </section>

          <section className="border border-border rounded-lg p-8 flex flex-col gap-8 mt-8">
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
              onClick={() => router.push('/indications')}
            >
              Conferir
            </Button>
          </section>
        </main>
      </div>
    </PrivateLayout>
  );
};
