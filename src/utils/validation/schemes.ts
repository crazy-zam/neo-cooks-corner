import * as Yup from 'yup';

export const usernameSchema = Yup.object().shape({
  name: Yup.string()
  .required('usernameNotFilled'),
});
export const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Проверьте правильность написания вашей почты')
    .matches(/\./, 'Проверьте правильность написания вашей почты')
    .required('emailNotFilled'),
});

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Пароль должен состоять из 8-15 символов')
    .max(15, 'Пароль должен состоять из 8-15 символов')
    .matches(/[a-z]/, 'Необходимо использовать как минимум 1 строчную букву')
    .matches(/[A-Z]/, 'Необходимо использовать как минимум 1 заглавную букву')
    .matches(/\d/, 'Необходимо использовать как минимум 1 цифру')
    .matches(
      /[!@#$%^&*()_=+-]/,
      'Необходимо использовать как минимум 1 спец символ (!,@,#,$...)',
    )
    .matches(
      /^[aA-zZ\d!@#$%^&*()_=+-]+$/,
      'Пароль должен удовлетворять следующим требованиям: строчный и заглавные буквы английского алфавита, цифры и спецсимволы',
    )
    .required('passwordNotFilled'),
});
export const confirmPasswordSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .required('confirmPasswordNotFilled')
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
});
