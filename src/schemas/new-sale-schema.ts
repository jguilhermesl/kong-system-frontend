import * as Yup from 'yup';

export const newSaleSchema = Yup.object().shape({
  sellerId: Yup.string().required('Vendedor é obrigatório'),
});