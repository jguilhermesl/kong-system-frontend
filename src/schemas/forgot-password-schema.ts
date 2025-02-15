import * as Yup from 'yup';

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
});


