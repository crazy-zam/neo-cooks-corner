import Grid from '../../components/Grid/Grid';
import styles from './main.module.less';
import { dishes } from '@/api/dishes';
const Main = () => {
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
        <Grid array={dishes}></Grid>
      </div>
    </div>
  );
};

export default Main;
