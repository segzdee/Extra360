const securityConfiguration = {
  rateLimiting: {
    window: {
      duration: 900000,  // 15 minutes in milliseconds
      maxRequests: 100
    },
    headers: {
      enableStandard: true,
      deprecateLegacy: true
    }
  },
  helmet: {
    contentSecurity: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "https:", "data:"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"]
      }
    },
    security: {
      enableXSSFilter: true,
      enableCrossOriginPolicy: true,
      forceSTSPreload: true
    }
  }
};

module.exports = securityConfiguration;
