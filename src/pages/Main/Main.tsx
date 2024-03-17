import { useEffect } from 'react';
import Grid from '../../components/Grid/Grid';
import styles from './main.module.less';
import userStore from '@/store/userStore';
import { observer } from 'mobx-react-lite';
import mainStore from '@/store/mainStore';

import Loader from '@/UI/Loader/Loader';
import PageBtnGroup from '@/UI/PageBtnGroup/PageBtnGroup';

const Main = observer(() => {
  useEffect(() => {
    mainStore.getRecipesAction();
  }, []);

  const addBtn = (category: 'breakfast' | 'lunch' | 'dinner') => {
    return (
      <button
        className={
          mainStore.category === category
            ? styles.navigateBtnActive
            : styles.navigateBtn
        }
        onClick={() => {
          mainStore.setCategory(category);
        }}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </button>
    );
  };
  return (
    <div className={styles.wrapper}>
      {userStore.isLoading ? (
        <div className={styles.welcome}>Loading...</div>
      ) : (
        <div className={styles.welcome}>
          Hi, {userStore.username}. UI Designer & Cook
        </div>
      )}

      <div className={styles.title}>Category</div>
      <div className={styles.navigateGroup}>
        {addBtn('breakfast')}
        {addBtn('lunch')}
        {addBtn('dinner')}
      </div>
      <div className={styles.grid}>
        {mainStore.isLoading ? (
          <Loader />
        ) : (
          <>
            <Grid array={mainStore.recipes}></Grid>
            <PageBtnGroup store={mainStore} />
          </>
        )}
      </div>
    </div>
  );
});

export default Main;
