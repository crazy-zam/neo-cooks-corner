import { useFormik } from 'formik';
import { eyeClosed, eyeOpened } from '@/assets';
import { useEffect, useState } from 'react';
import {
  passwordSchema,
  confirmPasswordSchema,
} from '@/utils/validation/schemes';
import { errorNotify, successNotify } from '@/utils/toaster';
import { changePasswordAPI } from '@/api/userApi';
import styles from './formChangePassword.module.less';

interface IModal {
  closeModal: () => void;
}

const FormChangePassword = ({ closeModal }: IModal) => {
  const [isLoading, setIsLoading] = useState(false);
  const schema = passwordSchema.concat(confirmPasswordSchema);
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },

    onSubmit: ({ oldPassword, password, confirmPassword }) => {
      schema
        .validate(
          {
            password: formik.values.password,
            confirmPassword: formik.values.confirmPassword,
          },
          { abortEarly: false },
        )
        .then(() => {
          changePasswordAPI(oldPassword, password);
        })
        .catch((e) => {
          const errors = new Set(e.errors);
          errors.forEach((err: string) => {
            errorNotify(err);
          });
        })
        .finally(() => {
          setIsLoading(false);
          closeModal();
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
      !formik.values.oldPassword ||
        !formik.values.password ||
        !formik.values.confirmPassword,
    );
  }, [formik.values]);
  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit} className={styles.formWrapper}>
        <label htmlFor="oldPassword" className={styles.label}>
          Old password
        </label>
        <input
          id="oldPassword"
          name="oldPassword"
          type="text"
          placeholder="Enter your old password"
          onChange={formik.handleChange}
          value={formik.values.oldPassword}
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>
          New password
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="password"
            name="password"
            type={togglePassword ? 'text' : 'password'}
            placeholder="Enter new password"
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
          Confirm password
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
          Change password
        </button>
      </form>
    </div>
  );
};

export default FormChangePassword;
