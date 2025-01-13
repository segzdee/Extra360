const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { rateLimiting, helmet: helmetConfig } = require('../../config/security.config');

const securityMiddleware = {
  rateLimit: rateLimit({
    windowMs: rateLimiting.window.duration,
    max: rateLimiting.window.maxRequests,
    standardHeaders: rateLimiting.headers.enableStandard,
    legacyHeaders: !rateLimiting.headers.deprecateLegacy,
    message: {
      status: 429,
      error: 'Rate limit exceeded',
      message: 'Too many requests, please try again later.'
    }
  }),
  
  helmet: helmet({
    contentSecurityPolicy: helmetConfig.contentSecurity,
    crossOriginEmbedderPolicy: helmetConfig.security.enableCrossOriginPolicy,
    xssFilter: helmetConfig.security.enableXSSFilter,
    hsts: {
      maxAge: 31536000,
      preload: helmetConfig.security.forceSTSPreload
    }
  })
};

module.exports = securityMiddleware;
