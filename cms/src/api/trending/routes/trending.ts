/**
 * Custom Trending Routes
 */
export default {
  routes: [
    {
      method: 'POST',
      path: '/trending/calculate',
      handler: 'trending.calculate',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/trending/list',
      handler: 'trending.list',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/trending/toggle/:id',
      handler: 'trending.toggleManual',
      config: {
        policies: [],
      },
    },
  ],
};
