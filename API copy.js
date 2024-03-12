// Users API ///////////////////////////

const login = {
  method: 'post',
  url: '/auth/login',
  body: {
    email: 'string',
    password: 'string',
  },
  response: {
    accessToken: 'string',
    refreshToken: 'string',
  },
};

const refreshToken = {
  method: 'post',
  url: '/auth/refresh',
  body: {
    refreshToken: 'string',
  },
  response: {
    accessToken: 'string',
    refreshToken: 'string',
  },
};

const register = {
  method: 'post',
  url: '/users',
  body: {
    username: 'string',
    email: 'string',
    password: 'string',
    url: 'string',
  },
  response: 'string',
};

const emailValidate = {
  method: 'post',
  url: '/confirmation',
  parameters: '?ct=token',
  response: { message: 'string' },
};

const resendEmailValidation = {
  endpoint: '/resend-confirmation',
  method: 'post',
  body: { email: 'string', url: 'string' },
  response: { message: 'string' },
};

const forgotPassword = {
  endpoint: '/forgot-password',
  method: 'post',
  body: { email: 'string', url: 'string' },
  response: { message: 'string' },
};

const changePassword = {
  endpoint: '/change-password',
  method: 'post',
  params: { token: '?cpt=string' },
  body: { password: 'string' },
  response: { message: 'string' },
};

const getUser = {
  method: 'get',
  url: '/users',
  headers: {
    authorisation: 'Bearer string',
  },
  response: {
    username: 'string',
    bio: 'string',
    photo: 'string',
    recipes: 'number',
    followers: 'number',
    follow: 'number',
  },
};

const updateProfile = {
  method: 'put',
  url: '/users',
  headers: {
    authorisation: 'Bearer string',
    contentType: 'multipart/form-data',
  },
  body: {
    username: 'string',
    bio: 'string',
    photo: 'file',
  },
  response: {
    profile: {
      username: 'string',
      bio: 'string',
      photo: 'string',
    },
  },
};

const getUserById = {
  method: 'get',
  url: '/users/:id',
  headers: {
    authorisation: 'Bearer string', //не обязательное поле
  },
  response: {
    username: 'string',
    bio: 'string', //или null
    photo: 'string', //или null
    recipes: 'number',
    followers: 'number',
    following: 'number',
    isFollow: 'boolean', //если не авторизован, то false
  },
};

const followChef = {
  method: 'put',
  url: '/users/follow/:id',
  headers: {
    authorisation: 'Bearer string',
  },
  response: {
    message: 'string', //Toggle на бэке и возвращает новое значение
  },
};

const searchChefs = {
  method: 'get',
  url: '/users/search',
  headers: {
    authorisation: 'Bearer string', //Не обязательное поле
  },
  queryParams: ['search', 'page', 'limit'],
  response: {
    data: [
      {
        id: 'number',
        author: 'string',
        photo: 'url',
      },
      {
        id: 'number',
        author: 'string',
        photo: 'url',
      },
      {
        id: 'number',
        author: 'string',
        photo: 'url',
      },
    ],
  },
};

const logout = {
  method: 'delete',
  url: '/users',
  headers: {
    authorisation: 'Bearer string',
  },
  body: {
    refreshToken: 'string',
  },
  response: 'string',
};

// Recipes API ///////////////////////////

const getRecipes = {
  method: 'get',
  url: '/recipes',
  headers: {
    authorisation: 'Bearer string', // Не обязательное поле
  },
  queryParams: ['category', 'page', 'limit'],
  response: {
    data: [
      {
        id: 'number',
        title: 'string',
        author: 'string',
        photo: 'url',
        likes: 'number',
        isLiked: 'boolean', // если не авторизован, то false
        saves: 'number',
        isSaved: 'boolean', // если не авторизован, то false
      },
      {
        id: 'number',
        title: 'string',
        author: 'string',
        photo: 'url',
        likes: 'number',
        isLiked: 'boolean',
        saves: 'number',
        isSaved: 'boolean',
      },
      {
        id: 'number',
        title: 'string',
        author: 'string',
        photo: 'url',
        likes: 'number',
        isLiked: 'boolean',
        saves: 'number',
        isSaved: 'boolean',
      },
    ],
  },
};

const getRecipesById = {
  method: 'get',
  url: '/recipes/by-id/:id',
  headers: {
    authorisation: 'Bearer string', //Не обазателен
  },
  queryParams: ['page', 'limit'],
  response: {
    data: [
      {
        id: 'number',
        title: 'string',
        author: 'string',
        photo: 'url',
        likes: 'number',
        isLiked: 'boolean', // если не авторизован, то false
        saves: 'number',
        isSaved: 'boolean', // если не авторизован, то false
      },
      {
        id: 'number',
        title: 'string',
        author: 'string',
        photo: 'url',
        likes: 'number',
        isLiked: 'boolean',
        saves: 'number',
        isSaved: 'boolean',
      },
      {
        id: 'number',
        title: 'string',
        author: 'string',
        photo: 'url',
        likes: 'number',
        isLiked: 'boolean',
        saves: 'number',
        isSaved: 'boolean',
      },
    ],
  },
};

const getSavedRecipes = {
  method: 'get',
  url: '/recipes/saved-recipes',
  headers: {
    authorisation: 'Bearer string',
  },
  queryParams: ['page', 'limit'],
  response: {
    data: [
      {
        id: 'number',
        title: 'string',
        author: 'string',
        photo: 'url',
        likes: 'number',
        isLiked: 'boolean',
        saves: 'number',
        isSaved: 'boolean', //всегда true по сути
      },
      {
        id: 'number',
        title: 'string',
        author: 'string',
        photo: 'url',
        likes: 'number',
        isLiked: 'boolean',
        saves: 'number',
        isSaved: 'boolean',
      },
      {
        id: 'number',
        title: 'string',
        author: 'string',
        photo: 'url',
        likes: 'number',
        isLiked: 'boolean',
        saves: 'number',
        isSaved: 'boolean',
      },
    ],
  },
};

const getRecipeById = {
  method: 'get',
  url: '/recipes/:id',
  headers: {
    authorisation: 'Bearer string', //не обязательное поле
  },
  response: {
    data: {
      id: 'number',
      title: 'string',
      author: 'string',
      authorId: 'number',
      photo: 'url',
      time: 'string',
      complexity: 'string',
      likes: 'number',
      isLiked: 'boolean',
      saves: 'number',
      isSaved: 'boolean',
      description: 'string',
      ingredients: [
        {
          ingridient: 'string',
          amount: 'string',
          unit: 'string',
        },
        {
          ingridient: 'string',
          amount: 'string',
          unit: 'string',
        },
        '...',
      ],
    },
  },
};

const addRecipe = {
  method: 'post',
  url: '/recipes',
  headers: {
    authorisation: 'Bearer string',
    contentType: 'multipart/form-data',
  },
  data: {
    title: 'string',
    photo: 'file',
    time: 'string', //не обязательное поле, пустые строки
    complexity: 'string',
    description: 'string', //не обязательное поле, пустые строки
    category: 'string',
    ingredients: [
      {
        ingridient: 'string',
        amount: 'string',
        unit: 'string',
      },
      {
        ingridient: 'string',
        amount: 'string',
        unit: 'string',
      },
      '...',
    ],
  },
  response: 'string',
};

const likeRecipe = {
  method: 'put',
  url: '/recipes/like/:id',
  headers: {
    authorisation: 'Bearer string',
  },
  response: 'string', //Можно один эндпоинт на лайк и анлайк,
  //в БД менять на противоположный и возвращать новое значение
};
const saveRecipe = {
  method: 'put',
  url: '/recipes/save/:id',
  headers: {
    authorisation: 'Bearer string',
  },
  response: 'string', //Тоже что и лайк,
  //в БД менять на противоположный и возвращать новое значение
};

const searchRecipes = {
  method: 'get',
  url: '/recipes/search',
  headers: {
    authorisation: 'Bearer string', // не обязательное поле
  },
  queryParams: ['search', 'page', 'limit'],
  response: {
    data: [
      {
        id: 'number',
        title: 'string',
        author: 'string',
        photo: 'url',
        likes: 'number',
        isLiked: 'boolean', //если не авторизован, то false
        saves: 'number',
        isSaved: 'boolean',
      },
      {
        id: 'number',
        title: 'string',
        author: 'string',
        photo: 'url',
        likes: 'number',
        isLiked: 'boolean',
        saves: 'number',
        isSaved: 'boolean',
      },
      {
        id: 'number',
        title: 'string',
        author: 'string',
        photo: 'url',
        likes: 'number',
        isLiked: 'boolean',
        saves: 'number',
        isSaved: 'boolean',
      },
    ],
  },
};
