import styles from './changePassword.module.less';
import { useFormik } from 'formik';
import { Link, useSearchParams } from 'react-router-dom';
import LoaderSmall from '@/UI/LoaderSmall/LoaderSmall';
import { forgotPasswordChangeAPI } from '@/api/userApi';
import ModalContainer from '@/components/ModalContainer/ModalContainer';
import { eyeClosed, eyeOpened } from '@/assets';
import { useEffect, useState } from 'react';
import {
  passwordSchema,
  confirmPasswordSchema,
} from '@/utils/validation/schemes';
import { errorNotify } from '@/utils/toaster';

const ChangePassword = () => {
  const [params, setParams] = useSearchParams();
  const token = params.get('fpt');
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const schema = passwordSchema.concat(confirmPasswordSchema);
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },

    onSubmit: ({ password, confirmPassword }) => {
      schema
        .validate(
          {
            password: password,
            confirmPassword: confirmPassword,
          },
          { abortEarly: false },
        )
        .then(async () => {
          setIsLoading(true);
          await forgotPasswordChangeAPI(password, token);
          openModal();
        })
        .catch((e) => {
          const errors = new Set(e.errors);
          errors.forEach((err: string) => {
            errorNotify(err);
          });
        })
        .finally(() => {
          setIsLoading(false);
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
    setBtnDisabled(!formik.values.password || !formik.values.confirmPassword);
  }, [formik.values]);
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          Welcome Back
          <br />
          To <b>CooksCorner</b>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.formWrapper}>
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
          {isLoading ? <LoaderSmall /> : 'Change password'}
        </button>
      </form>
      <ModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        title="Succes"
        closeModalBtn={true}
      >
        <div>
          You Succesfully change your password <br />
          Press button below to open login page
        </div>
        <Link to="/auth/login" className={styles.modalBtn}>
          Press me
        </Link>
      </ModalContainer>
    </div>
  );
};

export default ChangePassword;
