import * as Yup from 'yup';

export const createExpenseSchema = Yup.object().shape({
  productType: Yup.string().required('O tipo do produto é obrigatório'),
  productName: Yup.string().required('O nome do produto é obrigatório'),
  productValue: Yup.string()
    .required(' o Valor do produto é obrigatório')
});
