/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { GeneratedDataRegistration } from './generated-data-registration';
import { FormInputField } from '@/components/form-input-field';
import { Button } from '@/components/ui/button';
import { EditableField } from './editable-fields';
import { useFormik } from 'formik';
import { addInventory } from '@/api/inventory/add-inventory';
import { queryClient } from '@/services/react-query';
import { toast } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { convertRealToNumber } from '@/utils/convert-real-to-number';
import { addInventorySchema } from '@/schemas/add-new-inventory-schema';

export const HomeField = ({}) => {
  const [email, setEmail] = useState('');
  const [psnPassword, setPsnPassword] = useState('');
  const [psnUser, setPsnUser] = useState('');
  const router = useRouter();

  const handleAddInventory = async () => {
    try {
      await addInventory({
        game: values.name,
        email: email,
        emailPassword: '',
        psnPassword: psnPassword,
        psnUser: psnUser,
        gameVersion: values.gameVersion as 'PS4' | 'PS5' | 'PS4 E PS5',
        gameValue: convertRealToNumber(values.gameValue) || 0,
        purchaseValue: convertRealToNumber(values.purchaseValue) || 0,
        primaryValue: convertRealToNumber(values.valuePrimary) || 0,
        secondaryValue: convertRealToNumber(values.valueSecondary) || 0,
      });
      await queryClient.invalidateQueries({
        queryKey: ['inventory'],
      });
      toast('success', 'Estoque adicionado com sucesso!');
      router.push('/admin/inventory');
    } catch (error: any) {
      console.error('Error adding inventory:', error);
      toast('error', error.mesage || 'Algo deu errado.');
    }
  };

  const {
    setFieldValue,
    getFieldProps,
    values,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: {
      name: '',
      gameValue: '',
      purchaseValue: '',
      valuePrimary: '',
      valueSecondary: '',
      gameVersion: '',
    },
    validateOnChange: true,
    validationSchema: addInventorySchema,
    isInitialValid: false,
    onSubmit: handleAddInventory,
  });

  return (
    <div className="flex items-center justify-center w-full">
      {isSubmitting ? (
        <Spinner />
      ) : (
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
          <Button disabled={!isValid}>Adicionar</Button>
        </form>
      )}
    </div>
  );
};
