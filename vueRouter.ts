import { getCurrentInstance } from 'vue';
import VueRouter, { Route } from 'vue-router';

export const useRouter = () => {
  const instance = getCurrentInstance();
  // const router = instance?.proxy.$router as VueRouter;
  // const router = new Proxy(instance?.proxy || {} as Vue, {
  //   get(target, key) {
  //     return target?.$router?.[key as keyof VueRouter];
  //   },
  // }) as unknown as VueRouter;

  const router = {} as VueRouter;
  if (instance?.proxy.$router) {
    [
      'app',
      'mode',
      'currentRoute',
      'beforeEach',
      'beforeResolve',
      'afterEach',
      'push',
      'replace',
      'go',
      'back',
      'forward',
      'getMatchedComponents',
      'onReady',
      'onError',
      'addRoutes',
      'resolve',
    ].forEach((key) => {
      Object.defineProperty(router, key, {
        get() {
          const result = instance.proxy.$router[key as keyof VueRouter];

          if (typeof result === 'function') {
            return result.bind(instance.proxy.$router);
          }
          return result;
        },
      });
    });
  }

  return router;
};

export const useRoute = () => {
  const instance = getCurrentInstance();
  // const route = instance?.proxy.$route as Route;
  // const route = new Proxy(instance?.proxy || ({} as Vue), {
  //   get(target, key) {
  //     return target?.$route?.[key as keyof Route];
  //   },
  // }) as unknown as Route;

  const route = {} as Route;
  if (instance?.proxy.$route) {
    [
      'path',
      'name',
      'hash',
      'query',
      'params',
      'fullPath',
      'matched',
      'redirectedFrom',
      'meta',
    ].forEach((key) => {
      Object.defineProperty(route, key, {
        get() {
          const result = instance.proxy.$route[key as keyof Route];

          if (typeof result === 'function') {
            return result.bind(instance.proxy.$route);
          }
          return result;
        },
      });
    });
  }
  return route;
};
