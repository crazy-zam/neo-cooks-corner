import { ChevronLeft } from '@/assets';
import styles from './backBtn.module.less';

const BackBtn = () => {
  return (
    <>
      <button className={styles.backBtn}>
        <ChevronLeft />
      </button>
    </>
  );
};

export default BackBtn;
