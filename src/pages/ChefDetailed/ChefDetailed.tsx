import styles from './chefDetailed.module.less';
import BackBtn from '@/UI/BackBtn/BackBtn';
import Grid from '../../components/Grid/Grid';
import ChefDescription from '../../components/ChefDescription/ChefDescription';
import chefStore from '@/store/chefStore';
const chef = new chefStore();
const ChefDetailed = ({ id = 0 }) => {
  return (
    <div className={styles.wrapper}>
      <BackBtn />
      <img className={styles.avatar} src={chef.photo} alt="avatar" />
      <ChefDescription
        author={chef.username}
        followers={chef.followers}
        recipes={chef.recipes}
        following={chef.follow}
        bio={chef.bio}
        myProfile={false}
      />
      <div className={styles.grid}>
        <Grid array={chef.recipesArr} />
      </div>
    </div>
  );
};

export default ChefDetailed;
