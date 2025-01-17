import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  cpf: Yup.string().min(14, "O CPF deve conter 11 caracteres")
    .required("Campo obrigatório"),
  phone: Yup.string()
    .min(13).max(13).required('Telefone é obrigatório'),
  password: Yup.string()
    .min(4, 'Senha deve ter pelo menos 4 caracteres')
    .required('Senha é obrigatória'),
  console: Yup.string().required('Console é obrigatório'),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória'),
});
