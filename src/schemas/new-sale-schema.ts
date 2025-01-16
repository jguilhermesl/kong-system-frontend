import * as Yup from 'yup';

export const newSaleSchema = Yup.object().shape({
  sellerName: Yup.string().required('Nome do vendedor é obrigatório'),
});