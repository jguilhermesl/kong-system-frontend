import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email é necessário'),
  password: Yup.string()
    .min(4, 'Password must be at least 8 characters')
    .required('Senha é necessária'),
});

export default loginSchema;
