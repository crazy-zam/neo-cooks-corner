import styles from './loader.module.less';
const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loadingspinner}>
        <div className={styles.square1} id="square1"></div>
        <div className={styles.square2} id="square2"></div>
        <div className={styles.square3} id="square3"></div>
        <div className={styles.square4} id="square4"></div>
        <div className={styles.square5} id="square5"></div>
      </div>
    </div>
  );
};

export default Loader;
