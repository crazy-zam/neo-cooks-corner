import React from 'react';
import styles from './chefCard.module.less';
import { Link } from 'react-router-dom';

interface IChefCard {
  id: number;
  fullName: string;
  image: string;
}
const ChefCard = ({ id, fullName, image }: IChefCard) => {
  return (
    <Link to={`/recipe/${id}`} className={styles.wrapper}>
      <img src={image} alt={fullName} className={styles.img} />
      <div className={styles.title}>{fullName}</div>
    </Link>
  );
};

export default ChefCard;
