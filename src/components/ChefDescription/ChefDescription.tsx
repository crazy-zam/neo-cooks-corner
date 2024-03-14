import styles from './chefDescription.module.less';
import { ReactNode } from 'react';
interface IChef {
  author: string;
  recipes: number;
  followers: number;
  following: number;
  bio: string;
  myProfile: boolean;
}
const ChefDescription = ({
  author,
  recipes,
  followers,
  following,
  bio,
  myProfile,
}: IChef) => {
  return (
    <div className={styles.descriptionWrapper}>
      {!myProfile && <div className={styles.author}>{author}</div>}
      <div className={styles.counterWrapper}>
        <div className={styles.counterItem}>
          <div className={styles.count}>{recipes}</div>
          Recipes
        </div>
        <div className={styles.counterItem}>
          <div className={styles.count}>{followers}</div>
          Followers
        </div>
        <div className={styles.counterItem}>
          <div className={styles.count}>{following}</div>
          Following
        </div>
      </div>
      {myProfile && <div className={styles.author}>{author}</div>}
      <div>{bio}</div>
      {/* {myProfile ? (

      ) : (
        <button className={styles.buttonFollow} disabled={isFollow}>
          Follow
        </button>
      )} */}
    </div>
  );
};

export default ChefDescription;
