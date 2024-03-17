export interface IUser {
  username: string;
  bio: string;
  photo: string;
  recipes: number;
  followers: number;
  follow: number;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IChef {
  id: number;
  author: string;
  image: string;
}

export interface IRecipe {
  id: number;
  title: string;
  author: string;
  authorId: number;
  photo: string;
  time: string;
  complexity: string;
  likes: number;
  isLiked: boolean;
  saves: number;
  isSaved: boolean;
  description: string;
  ingredients: Array<IIngredient>;
}
export interface IIngredient {
  ingridient: string;
  amount: string;
  unit: string;
}

export interface IRecipeSmall {
  id: number;
  title: string;
  author: string;
  image: string;
  likes: number;
  isLiked: boolean;
  saves: number;
  isSaved: boolean;
}

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
