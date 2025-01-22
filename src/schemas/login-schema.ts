import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Endereço de e-mail inválido')
    .required('Email é necessário'),
  password: Yup.string()
    .min(4, 'A senha deve ter pelo menos 4 caracteres')
    .required('Senha é necessária'),
});

export default loginSchema;
