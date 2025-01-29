/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { GeneratedDataRegistration } from './generated-data-registration';
import { FormInputField } from '@/components/form-input-field';
import { Button } from '@/components/ui/button';
import { copyToClipboard } from './copyToClipboard';
import { EditableField } from './editable-fields';

export const HomeField = ({ setFieldValue, values, resetForm }: any) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckClick = () => {
    setIsChecked((prev) => !prev);
    if (!isChecked) {
      const { email, psnPassword, psnUser } = GeneratedDataRegistration(
        values.name
      );
      setFieldValue('email', email);
      setFieldValue('psnPassword', psnPassword);
      setFieldValue('psnUser', psnUser);
    }
  };

  const handleCanceled = () => {
    setIsChecked(false);
    setFieldValue('name', '');
    resetForm();
  };
  return (
    <div className="flex flex-col gap-4 w-full md:w-[400px]">
      <FormInputField
        label="Nome do Jogo"
        placeholder="Digite o nome do jogo"
        className="w-full overflow-hidden gap-16"
        value={values.name}
        onChange={(e) => setFieldValue('name', e.target.value)}
        error={undefined}
        iconRight={
          <Button
            className="!rounded-full flex items-center w-8 h-8 !p-2 justify-center bg-primary"
            onClick={handleCheckClick}
          >
            <Check size={20} className="text-white" />
          </Button>
        }
      />

      {isChecked && (
        <>
          <FormInputField
            label="E-mail"
            placeholder="E-mail (Somente leitura)"
            className="w-full"
            disabled
            value={values.email}
            iconRight={
              <button
                className="flex items-center justify-center"
                onClick={() => copyToClipboard(values.email)}
              >
                <Copy size={18} />
              </button>
            }
          />
          <FormInputField
            label="Senha da PSN"
            placeholder="Senha PSN (Somente leitura)"
            className="w-full"
            disabled
            value={values.psnPassword}
            iconRight={
              <button
                className="flex items-center justify-center"
                onClick={() => copyToClipboard(values.psnPassword)}
              >
                <Copy size={18} />
              </button>
            }
          />
          <FormInputField
            label="Nome Usuário PSN"
            placeholder="Usuário PSN (Somente leitura)"
            className="w-full"
            disabled
            value={values.psnUser}
            iconRight={
              <button
                className="flex items-center justify-center"
                onClick={() => copyToClipboard(values.psnUser)}
              >
                <Copy size={18} />
              </button>
            }
          />
          <EditableField />

          <Button
            className="!bg-secondary text-primary"
            type="button"
            onClick={() => handleCanceled()}
          >
            Cancelar
          </Button>
        </>
      )}
    </div>
  );
};
