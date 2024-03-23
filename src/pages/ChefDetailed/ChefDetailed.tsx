import styles from './chefDetailed.module.less';
import BackBtn from '@/UI/BackBtn/BackBtn';
import Grid from '../../components/Grid/Grid';
import ChefDescription from '../../components/ChefDescription/ChefDescription';
import { defaultPhoto } from '@/assets';
import chefStore from '@/store/chefStore';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import useColumnsGrid from '@/hooks/useGridColumnsRecipes';
const chef = new chefStore();
const ChefDetailed = observer(() => {
  const { slug } = useParams();
  useEffect(() => {
    chef.getChef(slug);
  }, []);
  const columnsRecipes = useColumnsGrid(chef.limit, 280);
  return (
    <div className={styles.wrapper}>
      <BackBtn />
      <img
        className={styles.avatar}
        src={chef.photo === null ? defaultPhoto : chef.photo}
        alt="avatar"
      />
      <ChefDescription
        author={chef.username}
        followers={chef.followers}
        recipes={chef.recipes}
        following={chef.follow}
        bio={chef.bio}
        myProfile={false}
      />
      <button className={styles.followBtn} onClick={chef.followChefAction()}>
        {chef.isFollow ? 'Unfollow' : 'Follow'}
      </button>
      <div className={styles.grid}>
        <Grid array={chef.recipesArr} columns={columnsRecipes} />
      </div>
    </div>
  );
});

export default ChefDetailed;
