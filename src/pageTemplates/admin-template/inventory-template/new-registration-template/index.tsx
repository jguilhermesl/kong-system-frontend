'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { HomeField } from './home-field';

export const NewRegistrationTemplate = () => {
  return (
    <PrivateLayout
      title="Adicionar Estoque"
      description="Nessa tela, você consegue cadastrar um novo jogo no seu estoque!"
    >
      <HomeField />
    </PrivateLayout>
  );
};
