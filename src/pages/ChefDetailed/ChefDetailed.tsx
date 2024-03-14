import styles from './chefDetailed.module.less';
import { chefs } from '@/api/chefs';
import BackBtn from '@/UI/BackBtn/BackBtn';
import Grid from '../../components/Grid/Grid';
import { dishes } from '@/api/dishes';
import ChefDescription from '../../components/ChefDescription/ChefDescription';
const ChefDetailed = ({ id = 0 }) => {
  const chef = chefs[id];

  return (
    <div className={styles.wrapper}>
      <BackBtn />
      <img className={styles.avatar} src={chef.photo} alt="avatar" />
      <ChefDescription
        author={chef.author}
        followers={chef.followers}
        recipes={chef.recipes}
        following={chef.following}
        bio={chef.bio}
        myProfile={false}
      />
      <div className={styles.grid}>
        <Grid array={dishes} />
      </div>
    </div>
  );
};

export default ChefDetailed;
