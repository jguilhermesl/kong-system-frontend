import * as Yup from 'yup';

export const recoverPasswordSchema = Yup.object({
  email: Yup.string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  code: Yup.string()
    .matches(/^\d{4}$/, 'O código deve ter exatamente 4 dígitos')
    .required('O código é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});
