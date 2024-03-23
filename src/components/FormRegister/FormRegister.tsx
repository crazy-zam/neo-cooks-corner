import { useFormik } from 'formik';
import styles from './formRegister.module.less';
import { eyeClosed, eyeOpened } from '@/assets';
import { useEffect, useState } from 'react';
import {
  usernameSchema,
  emailSchema,
  passwordSchema,
  confirmPasswordSchema,
} from '@/utils/validation/schemes';
import { errorNotify } from '@/utils/toaster';
import userStore from '@/store/userStore';
import LoaderSmall from '@/UI/LoaderSmall/LoaderSmall';
import { observer } from 'mobx-react-lite';

const FormRegister = observer(() => {
  const schema = usernameSchema
    .concat(emailSchema)
    .concat(passwordSchema)
    .concat(confirmPasswordSchema);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    onSubmit: ({ name, email, password, confirmPassword }) => {
      schema
        .validate(
          {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          },
          { abortEarly: false },
        )
        .then(() => {
          userStore.register(name, email, password);
        })
        .catch((e) => {
          const errors = new Set(e.errors);
          errors.forEach((err: string) => {
            errorNotify(err);
          });
        });
    },
  });

  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const togglePasswordHandler = () => {
    setTogglePassword((prev) => !prev);
  };
  const toggleConfirmPasswordHandler = () => {
    setToggleConfirmPassword((prev) => !prev);
  };
  const [btnDisabled, setBtnDisabled] = useState(true);
  useEffect(() => {
    setBtnDisabled(
      !formik.values.email ||
        !formik.values.password ||
        !formik.values.name ||
        !formik.values.confirmPassword,
    );
  }, [formik.values]);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit} className={styles.formWrapper}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          onChange={formik.handleChange}
          value={formik.values.name}
          className={styles.input}
        />
        <label htmlFor="email" className={styles.label}>
          Gmail
        </label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Enter your Gmail"
          onChange={formik.handleChange}
          value={formik.values.email}
          className={styles.input}
        />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="password"
            name="password"
            type={togglePassword ? 'text' : 'password'}
            placeholder="Enter your password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className={styles.input}
          />
          <button
            type="button"
            onClick={togglePasswordHandler}
            className={styles.eyeImg}
          >
            <img src={togglePassword ? eyeClosed : eyeOpened} alt="" />
          </button>
        </div>
        <label htmlFor="confirmPassword" className={styles.label}>
          Re-Password
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={toggleConfirmPassword ? 'text' : 'password'}
            placeholder="Re-Enter your password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            className={styles.input}
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordHandler}
            className={styles.eyeImg}
          >
            <img src={toggleConfirmPassword ? eyeClosed : eyeOpened} alt="" />
          </button>
        </div>
        <button className={styles.button} type="submit" disabled={btnDisabled}>
          {userStore.isLoading ? <LoaderSmall /> : 'Sign in'}
        </button>
      </form>
    </div>
  );
});

export default FormRegister;
