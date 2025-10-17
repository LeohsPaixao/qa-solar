export const globalStubs = {
  RouterView: true,
  RouterLink: {
    template: '<a><slot /></a>',
    props: ['to'],
  },
};
