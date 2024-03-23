import { Link } from 'react-router-dom';
import styles from './forgotPassword.module.less';
import { useFormik } from 'formik';
import { useState } from 'react';
import LoaderSmall from '@/UI/LoaderSmall/LoaderSmall';
import { forgotPasswordAPI } from '@/api/userApi';
import ModalContainer from '@/components/ModalContainer/ModalContainer';

const ForgotPassword = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
    },

    onSubmit: async ({ email }) => {
      setIsLoading(true);
      await forgotPasswordAPI(email);
      setIsLoading(false);
      openModal();
    },
  });
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

        <button
          className={styles.button}
          type="submit"
          disabled={formik.values.email === ''}
        >
          {isLoading ? <LoaderSmall /> : 'Request mail'}
        </button>
      </form>
      <div className={styles.footer}>You don't have an account? </div>
      <Link to="/auth/login" className={styles.link}>
        Go back to Login
      </Link>
      <ModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        title="Succes"
        closeModalBtn={true}
      >
        <div>
          We send instructions for change <br />
          password on your email
        </div>
        <Link className={styles.modalBtn} to="/auth/login">
          Go to login page
        </Link>
      </ModalContainer>
    </div>
  );
};

export default ForgotPassword;
