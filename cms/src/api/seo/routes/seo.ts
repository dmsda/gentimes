/**
 * SEO Analysis Routes
 */
export default {
  routes: [
    {
      method: 'GET',
      path: '/seo/analyze/:id',
      handler: 'seo.analyze',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/seo/overview',
      handler: 'seo.overview',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/seo/articles',
      handler: 'seo.articlesList',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/seo/update/:id',
      handler: 'seo.updateScores',
      config: {
        policies: [],
      },
    },
  ],
};
