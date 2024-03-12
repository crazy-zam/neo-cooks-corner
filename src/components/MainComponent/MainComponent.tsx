import Grid from '../Grid/Grid';
import styles from './mainComponent.module.less';
import { array } from '@/api/dishes';
const MainComponent = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>Hi, Sarthak. UI Designer & Cook</div>
      <div className={styles.title}>Category</div>
      <div className={styles.navigateGroup}>
        <button className={styles.navigateBtn}>Breakfast</button>
        <button className={styles.navigateBtn}>Lunch</button>
        <button className={styles.navigateBtn}>Dinner</button>
      </div>
      <div className={styles.grid}>
        <Grid array={array}></Grid>
      </div>
    </div>
  );
};

export default MainComponent;
