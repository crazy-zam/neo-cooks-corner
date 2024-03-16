import FormRegister from '@/components/FormRegister/FormRegister';
import styles from './register.module.less';
import { Link } from 'react-router-dom';
const Register = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          Sign up for delicious
          <br />
          <b>Discoveries!</b>
        </div>
      </div>
      <FormRegister></FormRegister>
      <div className={styles.footer}>
        Already have an account?{' '}
        <Link to="/auth/login" className={styles.link}>
          Sign In Now
        </Link>
      </div>
    </div>
  );
};

export default Register;
