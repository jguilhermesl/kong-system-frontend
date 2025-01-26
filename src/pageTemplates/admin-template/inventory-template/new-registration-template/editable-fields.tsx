import { FormInputField } from '@/components/form-input-field';
import { FormSelectField } from '@/components/form-select-field';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils/format-price';

import { useFormik } from 'formik';

export const EditableField = () => {
  const { handleSubmit, getFieldProps, setFieldValue, values } = useFormik({
    initialValues: {
      gameVersion: 'PS4',
      gameValue: '',
      purchaseValue: '',
      valuePrimary: '',
      valueSecundary: '',
    },
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <FormSelectField
        {...getFieldProps('gameVersion')}
        onChange={(value: string) => setFieldValue('gameVersion', value)}
        label="Versão do Jogo"
        placeholder="Escolha a versão do jogo"
        className="w-full"
        choices={[
          { value: 'PS4', label: 'PS4' },
          { value: 'PS5', label: 'PS5' },
          { value: 'PS4/PS5', label: 'PS4/PS5' },
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
        {...getFieldProps('valueSecundary')}
        onChange={(e) =>
          setFieldValue('valueSecundary', formatPrice(e.target.value))
        }
        label="Valor da Secundária"
        placeholder="Digite o valor da secundária"
        className="w-full"
        value={formatPrice(values.valueSecundary)}
      />
      <Button type="submit">Adicionar Jogo</Button>
    </form>
  );
};
