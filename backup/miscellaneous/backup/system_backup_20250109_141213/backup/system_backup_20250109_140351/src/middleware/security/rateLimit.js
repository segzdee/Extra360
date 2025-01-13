const rateLimit = require("express-rate-limit");
const { securityConfig } = require("../../config/security");

const rateLimiter = rateLimit({
  windowMs: securityConfig.rateLimiting.windowMs,
  max: securityConfig.rateLimiting.maxRequests,
  standardHeaders: securityConfig.rateLimiting.standardHeaders,
  legacyHeaders: securityConfig.rateLimiting.legacyHeaders
});

module.exports = rateLimiter;
