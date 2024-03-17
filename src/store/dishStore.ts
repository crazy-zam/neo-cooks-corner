import { IIngredient } from '@/utils/typesAPI';
import { makeAutoObservable } from 'mobx';

class dishStore {
  isLoading: boolean;
  id: number;
  title: string;
  author: string;
  authorId: number;
  image: string;
  time: string;
  complexity: string;
  likes: number;
  isLiked: boolean;
  saves: number;
  isSaved: boolean;
  description: string;
  ingredients: Array<IIngredient>;
  justMount: true;

  constructor() {
    makeAutoObservable(this);
  }
}
