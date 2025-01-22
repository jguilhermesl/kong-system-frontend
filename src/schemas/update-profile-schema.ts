import * as Yup from 'yup';

export const updateProfileSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: Yup.string()
    .min(13, 'O telefone deve conter 13 caracteres')
    .max(13, 'O telefone deve conter 13 caracteres')
    .required('Telefone é obrigatório'),
  console: Yup.string().required('Console é obrigatório'),
});
