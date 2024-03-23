import { IIngredient } from '@/utils/typesAPI';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  getRecipeBySlugAPI,
  likeRecipeAPI,
  saveRecipeAPI,
} from '@/api/recipesApi';
import userStore from './userStore';
import { isTokenExpired } from '@/utils/utils';

export default class recipeStore {
  isLoading = false;
  slug = '';
  title = '';
  author = '';
  authorSlug = '';
  image = '';
  time = 0;
  complexity = '';
  likes = 0;
  isLiked = false;
  likesTouched = false;
  likesFetching = false;
  saves = 0;
  isSaved = false;
  savesTouched = false;
  savesFetching = false;
  description = '';
  ingredients: Array<IIngredient> = [];

  constructor() {
    makeAutoObservable(this);
  }
  getRecipe = async (slug: string) => {
    await userStore.checkTokens();
    this.isLoading = true;
    const recipe = await getRecipeBySlugAPI(userStore.accessToken, slug);
    runInAction(() => {
      this.slug = slug;
      this.title = recipe.name;
      this.author = recipe.author_name;
      this.authorSlug = recipe.author_slug;
      this.image = recipe.meal_picture;
      this.time = recipe.preparation_time;
      this.complexity = recipe.difficulty;
      this.likes = recipe.likes;
      this.isLiked = recipe.is_liked;
      this.saves = recipe.saves;
      this.isSaved = recipe.is_saved;
      this.description = recipe.description;
      this.ingredients = recipe.ingredients;
      this.isLoading = false;
    });
  };
  likeRecipeAction = async () => {
    if (this.likesFetching) return;
    await userStore.checkTokens();
    this.likesTouched = true;
    this.likesFetching = true;
    this.isLiked = !this.isLiked;

    const response = await likeRecipeAPI(
      userStore.accessToken,
      this.slug,
      !this.isLiked,
    );
    runInAction(() => {
      this.likesFetching = false;
    });
  };
  saveRecipeAction = async () => {
    if (this.savesFetching) return;
    await userStore.checkTokens();
    this.savesTouched = true;
    this.savesFetching = true;
    this.isSaved = !this.isSaved;
    const response = await saveRecipeAPI(
      userStore.accessToken,
      this.slug,
      !this.isSaved,
    );
    runInAction(() => {
      this.savesFetching = false;
    });
  };
}

// export default new recipeStore();
