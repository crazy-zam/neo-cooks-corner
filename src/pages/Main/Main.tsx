import { useEffect, useState } from 'react';
import Grid from '../../components/Grid/Grid';
import styles from './main.module.less';
import userStore from '@/store/userStore';
import { observer } from 'mobx-react-lite';
import mainStore from '@/store/mainStore';

import Loader from '@/UI/Loader/Loader';
import PageBtnGroup from '@/UI/PageBtnGroup/PageBtnGroup';
import useWindowSize from '@/hooks/useWindowSize';
import useColumnsGrid from '@/hooks/useGridColumnsRecipes';

const Main = observer(() => {
  useEffect(() => {
    mainStore.getRecipesAction();
  }, []);
  const columns = useColumnsGrid(mainStore.limit, 280);
  const addBtn = (category: 'Breakfast' | 'Lunch' | 'Dinner') => {
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
        {category}
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
        {addBtn('Breakfast')}
        {addBtn('Lunch')}
        {addBtn('Dinner')}
      </div>
      <div className={styles.grid}>
        {mainStore.isLoading ? (
          <Loader />
        ) : (
          <>
            {mainStore.recipes.length === 0 ? (
              <div className={styles.noResults}>No results</div>
            ) : (
              <>
                <Grid array={mainStore.recipes} columns={columns}></Grid>
                <PageBtnGroup store={mainStore} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default Main;
