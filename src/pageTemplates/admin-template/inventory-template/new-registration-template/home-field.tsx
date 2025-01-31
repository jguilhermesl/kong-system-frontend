'use client';
import { useState } from 'react';
import { GeneratedDataRegistration } from './generated-data-registration';
import { FormInputField } from '@/components/form-input-field';
import { Button } from '@/components/ui/button';
import { EditableField } from './editable-fields';
import { useFormik } from 'formik';
import { addInventory } from '@/api/inventory/add-inventory';

export const HomeField = ({}) => {
  const [email, setEmail] = useState('');
  const [psnPassword, setPsnPassword] = useState('');
  const [psnUser, setPsnUser] = useState('');

  const handleAddInventory = async () => {
    console.log('arrived');
    try {
      await addInventory({
        game: values.name,
        email: email,
        emailPassword: '',
        psnPassword: psnPassword,
        psnUser: psnUser,
        gameVersion: values.gameVersion as 'PS4' | 'PS5' | 'PS4 E PS5',
        gameValue: values.gameValue,
        purchaseValue: values.purchaseValue,
        primaryValue: values.valuePrimary,
        secondaryValue: values.valueSecondary,
      });
      console.log('Inventory added successfully');
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  };

  const { setFieldValue, getFieldProps, values, handleSubmit, errors } =
    useFormik({
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
      onSubmit: handleAddInventory,
    });

  console.log('==> ', errors);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full ">
        <FormInputField
          label="Nome do Jogo"
          placeholder="Digite o nome do jogo"
          className="w-full  gap-16"
          value={values.name}
          onChange={(e) => setFieldValue('name', e.target.value)}
          error={undefined}
        />

        {values.name && (
          <>
            <GeneratedDataRegistration
              game={values.name}
              email={email}
              psnPassword={psnPassword}
              psnUser={psnUser}
              setEmail={setEmail}
              setPsnPassword={setPsnPassword}
              setPsnUser={setPsnUser}
            />
            <EditableField
              getFieldProps={getFieldProps}
              setFieldValue={setFieldValue}
              values={values}
            />
          </>
        )}
        <Button onClick={() => console.log('test')}>Adicionar Jogo</Button>
      </form>
    </>
  );
};
