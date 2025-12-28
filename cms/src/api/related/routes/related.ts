/**
 * Related Articles Routes
 */
export default {
  routes: [
    {
      method: 'GET',
      path: '/related/:articleId',
      handler: 'related.getRelated',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
