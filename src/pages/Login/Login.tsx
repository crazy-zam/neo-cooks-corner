import { Link } from 'react-router-dom';
import styles from './login.module.less';
import FormLogin from '@/components/FormLogin/FormLogin';
import userStore from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { isTokenExpired } from '@/utils/utils';

const Login = observer(() => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!!accessToken && !isTokenExpired(accessToken)) {
      userStore.setTokens(accessToken, refreshToken);
      userStore.getUser();
      userStore.isAuth = true;
      navigate('/main');
      return;
    }
    if (!!refreshToken && !isTokenExpired(refreshToken)) {
      userStore.refreshTokens(refreshToken);
      userStore.getUser();
      userStore.isAuth = true;
      navigate('/main');
      return;
    }
    localStorage.clear();
  }, []);
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          Welcome Back
          <br />
          To <b>CooksCorner</b>
        </div>
      </div>
      <FormLogin></FormLogin>
      <div className={styles.footer}>
        {"You don't have an account? "}
        <Link to="/auth/registration" className={styles.link}>
          Sign Up Now
        </Link>
      </div>
      <div className={styles.footer}>
        {'Forgot your password? '}
        <Link to="/auth/forgot" className={styles.link}>
          Press here
        </Link>
      </div>
    </div>
  );
});

export default Login;
