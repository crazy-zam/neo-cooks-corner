import { useFormik } from 'formik';
import styles from './formLogin.module.less';
import { eyeClosed, eyeOpened } from '@/assets';
import { useEffect, useState } from 'react';
const FormLogin = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: ({ email, password }) => {
      console.log(email, password);
    },
  });
  const [togglePassword, setTogglePassword] = useState(false);
  const togglePasswordHandler = () => {
    setTogglePassword((prev) => !prev);
  };
  const [btnDisabled, setBtnDisabled] = useState(true);
  useEffect(() => {
    setBtnDisabled(!formik.values.email || !formik.values.password);
  }, [formik.values]);
  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit} className={styles.formWrapper}>
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
        <button className={styles.button} type="submit" disabled={btnDisabled}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
