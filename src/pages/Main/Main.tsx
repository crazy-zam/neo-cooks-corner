import NavBar from '@/components/NavBar/NavBar';
import styles from './main.module.less';
import MainComponent from '@/components/MainComponent/MainComponent';
const Main = () => {
  return (
    <div className={styles.page}>
      <NavBar />
      <MainComponent />
    </div>
  );
};

export default Main;
