export const securityConfig = {
  rateLimiting: {
    windowMs: 900000,  // 15 minutes in milliseconds
    maxRequests: 100,
    standardHeaders: true,
    legacyHeaders: false
  },
  helmet: {
    contentSecurity: true,
    crossOrigin: true,
    xssFilter: true
  }
};
