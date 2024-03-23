import { defaultPhoto } from '@/assets';
import styles from './chefCard.module.less';
import { Link } from 'react-router-dom';

interface IChefCard {
  slug: string;
  fullName: string;
  image: string;
}
const ChefCard = ({ slug, fullName, image }: IChefCard) => {
  console.log(slug, fullName, image);
  return (
    <Link to={`/chef-details/${slug}`} className={styles.wrapper}>
      <img
        src={image === null ? defaultPhoto : image}
        alt={fullName}
        className={styles.img}
      />
      <div className={styles.title}>{fullName}</div>
    </Link>
  );
};

export default ChefCard;
