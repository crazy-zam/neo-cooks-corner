export interface IUser {
  slug?: string;
  username: string;
  bio: string;
  photo: string;
  recipes: number;
  followers: number;
  follow: number;
  isFollow?: boolean;
}

export interface ITokens {
  access: string;
  refresh: string;
}

export interface IChef {
  slug: string;
  author_name: string;
  author_photo: string;
}

export interface IRecipe {
  slug: string;
  name: string;
  author_name: string;
  author_slug: string;
  meal_picture: string;
  preparation_time: number;
  difficulty: string;
  likes: number;
  isLiked: boolean;
  saves: number;
  isSaved: boolean;
  description: string;
  ingredients: Array<IIngredient>;
}
export interface IIngredient {
  ingredient_name: string;
  amount: string;
  unit: string;
}

export interface IRecipeSmall {
  slug: string;
  title: string;
  author_name: string;
  meal_picture: string;
  likes: number;
  isLiked: boolean;
  saves: number;
  isSaved: boolean;
}
export interface IResponseRecipesArr {
  data: Array<IRecipeSmall>;
  total: number;
}
export interface IResponseChefssArr {
  data: Array<IChef>;
  total: number;
}
