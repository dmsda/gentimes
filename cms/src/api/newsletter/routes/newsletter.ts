/**
 * Newsletter Routes
 */
export default {
  routes: [
    {
      method: 'POST',
      path: '/newsletter/subscribe',
      handler: 'newsletter.subscribe',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/newsletter/unsubscribe',
      handler: 'newsletter.unsubscribe',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/newsletter/stats',
      handler: 'newsletter.stats',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
