export interface IUser {
  slug: string;
  username: string;
  bio: string;
  profile_picture: string;
  recipes: number;
  followers: number;
  following: number;
  is_followed?: boolean;
  isVerified?: boolean;
}

export interface ITokens {
  access: string;
  refresh: string;
}

export interface IChef {
  slug: string;
  username: string;
  profile_picture: string;
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
  is_liked: boolean;
  saves: number;
  is_saved: boolean;
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
  name: string;
  author_name: string;
  meal_picture: string;
  likes: number;
  is_liked: boolean;
  saves: number;
  is_saved: boolean;
}
export interface IResponseRecipesArr {
  data: Array<IRecipeSmall>;
  total: number;
}
export interface IResponseChefssArr {
  data: Array<IChef>;
  total: number;
}
