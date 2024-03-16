import { Link } from 'react-router-dom';
import styles from './login.module.less';
import FormLogin from '@/components/FormLogin/FormLogin';
import userStore from '@/store/userStore';

import { observer } from 'mobx-react-lite';
const Login = observer(() => {
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
        You don't have an account?{' '}
        <Link to="/auth/registration" className={styles.link}>
          Sign Up Now
        </Link>
      </div>
    </div>
  );
});

export default Login;
