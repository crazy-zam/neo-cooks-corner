export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const isTokenExpired = (token: string) => {
  // console.log(token);
  if (!token) return true;
  if (token === 'undefined') return true;
  console.log(
    'checkToken after if',
    Math.floor(new Date().getTime() / 1000) >=
      JSON.parse(atob(token.split('.')[1])).exp,
  );
  const expiry = JSON.parse(atob(token.split('.')[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
};
