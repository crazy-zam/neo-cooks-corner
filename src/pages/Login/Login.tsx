import { Link } from 'react-router-dom';
import styles from './login.module.less';
import FormLogin from '@/components/FormLogin/FormLogin';
const Login = () => {
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
        <Link to="" className={styles.link}>
          Sign Up Now
        </Link>
      </div>
    </div>
  );
};

export default Login;
