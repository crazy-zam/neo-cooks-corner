import NavBar from '@/components/NavBar/NavBar';
import styles from './main.module.less';
import MainComponent from '@/components/MainComponent/MainComponent';
import DishDetailed from '@/components/DishDetailed/DishDetailed';
import ChefDetailed from '@/components/ChefDetailed/ChefDetailed';
import MyProfile from '@/components/MyProfile/MyProfile';
const Main = () => {
  return (
    <div className={styles.page}>
      <NavBar />
      {/* <MainComponent /> */}
      {/* <DishDetailed /> */}
      {/* <ChefDetailed /> */}
      <MyProfile />
    </div>
  );
};

export default Main;
