'use client';

import { useState } from 'react';
import { PrivateLayout } from '@/components/layouts/private-layout.tsx';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import { HomeField } from './home-field';
import { EditableField } from './editable-fields';
import { ERegistrationStep } from '@/constants/steps-new-registration';

export const NewRegistrationTemplate = () => {
  const [activeStep, setActiveStep] = useState<ERegistrationStep>(
    ERegistrationStep.Initial
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      email: 'example@example.com',
      psnPassword: '*****',
      psnUser: 'psn_user',
      gameValue: '',
      purchaseValue: '',
      valuePrimary: '',
      valueSecundary: '',
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
        {activeStep === ERegistrationStep.Initial && (
          <>
            <HomeField
              getFieldProps={formik.getFieldProps}
              setFieldValue={formik.setFieldValue}
              values={formik.values}
            />
            <Button
              type="button"
              onClick={() => setActiveStep(ERegistrationStep.Editable)}
            >
              Avançar
            </Button>
          </>
        )}

        {activeStep === ERegistrationStep.Editable && <EditableField />}

        {activeStep === ERegistrationStep.Editable && (
          <Button
            className="!bg-secondary text-primary"
            type="button"
            onClick={() => setActiveStep(ERegistrationStep.Initial)}
          >
            Voltar
          </Button>
        )}
      </form>
    </PrivateLayout>
  );
};
