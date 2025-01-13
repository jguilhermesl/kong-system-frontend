import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  cpf: Yup.string().min(14, "O CPF deve conter 11 caracteres")
    .required("Campo obrigatório"),
  phone: Yup.string()
    .matches(
      /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
      "Formato de telefone inválido"
    ).required('Telefone é obrigatório'),
  password: Yup.string()
    .min(4, 'Senha deve ter pelo menos 4 caracteres')
    .required('Senha é obrigatória'),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória'),
});
