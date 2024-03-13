import NavBar from '@/components/NavBar/NavBar';
import styles from './main.module.less';
import MainComponent from '@/components/MainComponent/MainComponent';
import DishDetailed from '@/components/DishDetailed/DishDetailed';
const Main = () => {
  return (
    <div className={styles.page}>
      <NavBar />
      {/* <MainComponent /> */}
      <DishDetailed></DishDetailed>
    </div>
  );
};

export default Main;
