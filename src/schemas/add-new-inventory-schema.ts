import * as Yup from 'yup';

export const addInventorySchema = Yup.object().shape({
  name: Yup.string().required(),
  gameValue: Yup.string().required(),
  purchaseValue: Yup.string().required(),
  valuePrimary: Yup.string().required(),
  valueSecondary: Yup.string().required(),
  gameVersion: Yup.string().required(),
});
