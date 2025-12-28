/**
 * Custom Analytics Routes
 */
export default {
  routes: [
    {
      method: 'POST',
      path: '/analytics/track',
      handler: 'analytics.track',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/analytics/overview',
      handler: 'analytics.overview',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/analytics/trending',
      handler: 'analytics.trending',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/analytics/article/:id',
      handler: 'analytics.articleStats',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
