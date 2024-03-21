import { useEffect, useState } from 'react';
import styles from './emailValidate.module.less';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LogoSmall } from '@/assets';
import ModalContainer from '@/components/ModalContainer/ModalContainer';
import CountdownTimer from '@/UI/CountdownTimer/CountdownTimer';
import { emailVerifyAPI, resendEmailAPI } from '@/api/userApi';

const EmailValidate = () => {
  const [params, setParams] = useSearchParams();
  const token = params.get('ct');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [requestStatus, setRequestStatus] = useState('');
  const navigate = useNavigate();
  const navigateHandler = () => navigate('/auth/login');
  useEffect(() => {
    try {
      emailVerifyAPI(token);
      setRequestStatus('ok');
    } catch (error) {
      setRequestStatus(error);
    } finally {
      setModalIsOpen(true);
    }
  }, []);

  return (
    <div className={styles.page}>
      <LogoSmall className={styles.logo} />
      <div className={styles.text}>
        We have sent a request to confirm your email as As soon as we receive a
        response, we will redirect you to the login page.
      </div>
      <ModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        closeModalBtn={false}
        title={'Congratulations, you have confirmed your email!'}
      >
        {requestStatus === 'ok' ? (
          <div className={styles.wrapper}>
            <CountdownTimer
              className={styles.counter}
              timer={1000}
              text={'You will be redirected to the login page after'}
              handler={navigateHandler}
            ></CountdownTimer>
            <button className={styles.counterBtn} onClick={navigateHandler}>
              Go to login page
            </button>
          </div>
        ) : (
          <>
            <div className={styles.counterHead}>
              The link to confirm your email is out of date!
            </div>
            <div>Request a follow-up confirmation email in your profile.</div>
            <button
              className={styles.counterBtn}
              onClick={() => setModalIsOpen(false)}
            >
              Ок
            </button>
          </>
        )}
      </ModalContainer>
    </div>
  );
};

export default EmailValidate;
