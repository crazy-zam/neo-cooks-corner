import { ChevronLeft } from '@/assets';
import styles from './backBtn.module.less';
import { Link, useNavigate } from 'react-router-dom';

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        <ChevronLeft />
      </button>
    </>
  );
};

export default BackBtn;
