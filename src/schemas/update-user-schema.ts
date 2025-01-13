import * as Yup from 'yup';

export const updateUserSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  cpf: Yup.string().min(14, "O CPF deve conter 11 caracteres")
    .required("Campo obrigatório"),
  phone: Yup.string()
    .matches(
      /^\d{2}\s\d{5}-\d{4}$/,
      "Formato de telefone inválido"
    )
    .required('Telefone é obrigatório'),
  role: Yup.string().required(' Função é um campo obrigatório')

});


