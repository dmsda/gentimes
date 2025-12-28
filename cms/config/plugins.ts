export default () => ({
  // Upload plugin configuration for image optimization
  upload: {
    config: {
      // Local provider settings
      providerOptions: {
        localServer: {
          maxage: 31536000, // 1 year cache
        },
      },
      // Responsive image breakpoints
      breakpoints: {
        xlarge: 1920,
        large: 1200,
        medium: 768,
        small: 480,
        xsmall: 320,
      },
      // Image optimization settings
      sizeLimit: 10 * 1024 * 1024, // 10MB max
    },
  },
});

