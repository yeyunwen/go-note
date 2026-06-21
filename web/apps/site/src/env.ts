/** GitHub Pages 等静态部署：无本地 executor */
export const isStaticDeploy = import.meta.env.VITE_STATIC_ONLY === 'true';

export const routerBasename =
  import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');
