import * as Yup from 'yup';

export const createUserSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  cpf: Yup.string().min(14, "O CPF deve conter 11 caracteres")
    .optional(),
  phone: Yup.string()
    .matches(
      /^\d{2}\s\d{5}-\d{4}$/,
      "Formato de telefone inválido"
    )
    .required('Telefone é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres').optional(),
  role: Yup.string().optional()
});