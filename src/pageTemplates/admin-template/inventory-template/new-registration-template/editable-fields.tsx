/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormInputField } from '@/components/form-input-field';
import { FormSelectField } from '@/components/form-select-field';
import { formatPrice } from '@/utils/format-price';

export const EditableField = ({
  getFieldProps,
  setFieldValue,
  values,
}: {
  getFieldProps: (field: string) => any;
  setFieldValue: (field: string, value: any) => void;
  values: { [key: string]: any };
}) => {
  return (
    <>
      <FormSelectField
        {...getFieldProps('gameVersion')}
        onChange={(value: string) => setFieldValue('gameVersion', value)}
        label="Versão do Jogo"
        placeholder="Escolha a versão do jogo"
        className="w-full"
        choices={[
          { value: 'PS4', label: 'PS4' },
          { value: 'PS5', label: 'PS5' },
          { value: 'PS4 E PS5', label: 'PS4 E PS5' },
        ]}
        value={values.gameVersion}
      />
      <FormInputField
        {...getFieldProps('gameValue')}
        onChange={(e) =>
          setFieldValue('gameValue', formatPrice(e.target.value))
        }
        label="Valor do Jogo"
        placeholder="Digite o valor do jogo"
        className="w-full"
        value={formatPrice(values.gameValue)}
      />
      <FormInputField
        {...getFieldProps('purchaseValue')}
        onChange={(e) =>
          setFieldValue('purchaseValue', formatPrice(e.target.value))
        }
        label="Valor de Compra"
        placeholder="Digite o valor de compra"
        className="w-full"
        value={formatPrice(values.purchaseValue)}
      />
      <FormInputField
        {...getFieldProps('valuePrimary')}
        onChange={(e) =>
          setFieldValue('valuePrimary', formatPrice(e.target.value))
        }
        label="Valor da Primária"
        placeholder="Digite o valor da primária"
        className="w-full"
        value={formatPrice(values.valuePrimary)}
      />
      <FormInputField
        {...getFieldProps('valueSecondary')}
        onChange={(e) =>
          setFieldValue('valueSecondary', formatPrice(e.target.value))
        }
        label="Valor da Secundária"
        placeholder="Digite o valor da secundária"
        className="w-full"
        value={formatPrice(values.valueSecondary)}
      />
    </>
  );
};
