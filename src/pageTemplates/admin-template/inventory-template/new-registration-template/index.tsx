'use client';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { useFormik } from 'formik';
import { HomeField } from './home-field';

export const NewRegistrationTemplate = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      psnPassword: '',
      psnUser: '',
      gameValue: '',
      purchaseValue: '',
      valuePrimary: '',
      valueSecondary: '',
      purchaseResponsible: '',
      gameVersion: '',
    },
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  return (
    <PrivateLayout
      title="Adicionar Estoque"
      description="Nessa tela, você consegue cadastrar um novo jogo no seu estoque!"
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 w-full md:w-[400px]"
      >
        <HomeField
          setFieldValue={formik.setFieldValue}
          values={formik.values}
        />
      </form>
    </PrivateLayout>
  );
};
