import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Endereço de e-mail inválido')
    .required('Email é necessário'),

});

export default loginSchema;
