import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

const vueQueryOptions = {
  enableDevtoolsV6Plugin: true,
  queryClient: new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 2,
        staleTime: 1000 * 60 * 5,
      },
    },
  }),
};
export { vueQueryOptions, VueQueryPlugin };
