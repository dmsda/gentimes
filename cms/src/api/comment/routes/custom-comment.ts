/**
 * Custom Comment Routes
 */
export default {
  routes: [
    {
      method: 'POST',
      path: '/comments/create',
      handler: 'custom-comment.create',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/comments/article/:articleId',
      handler: 'custom-comment.byArticle',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
