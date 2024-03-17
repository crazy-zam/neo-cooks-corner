import styles from './loaderSmall.module.less';
const LoaderSmall = () => {
  return (
    <div className={styles.loadingspinner}>
      <div className={styles.square1} id="square1"></div>
      <div className={styles.square2} id="square2"></div>
      <div className={styles.square3} id="square3"></div>
      <div className={styles.square4} id="square4"></div>
      <div className={styles.square5} id="square5"></div>
    </div>
  );
};

export default LoaderSmall;
