export const assetUrl = (p: string) =>
  /^(https?:)?\/\//.test(p) ? p : import.meta.env.BASE_URL + p.replace(/^\//, '');
