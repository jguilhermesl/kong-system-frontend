import { useState } from 'react';
import { FormInputField } from '@/components/form-input-field';
import { Checkbox } from '@/components/ui/table/check-box';

export const HomeField = ({ getFieldProps, setFieldValue, values }: any) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full md:w-[400px]">
      <FormInputField
        {...getFieldProps('name')}
        onChange={(e) => setFieldValue('name', e.target.value)}
        label="Nome do Jogo"
        placeholder="Digite o nome do jogo"
        className="w-full"
        error={undefined}
        iconRight={
          <Checkbox
            className="h-24 items-end"
            onCheckedChange={(checked) => setIsChecked(!!checked)}
          />
        }
      />

      {isChecked && (
        <>
          <FormInputField
            {...getFieldProps('email')}
            label="E-mail"
            placeholder="E-mail (Somente leitura)"
            className="w-full"
            disabled
            value={values.email}
          />
          <FormInputField
            {...getFieldProps('psnPassword')}
            label="Senha da PSN"
            placeholder="Senha PSN (Somente leitura)"
            className="w-full"
            disabled
            value={values.psnPassword}
          />
          <FormInputField
            {...getFieldProps('psnUser')}
            label="Nome Usuário PSN"
            placeholder="Usuário PSN (Somente leitura)"
            className="w-full"
            disabled
            value={values.psnUser}
          />
        </>
      )}
    </div>
  );
};
