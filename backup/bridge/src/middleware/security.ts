import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export const securityMiddleware = [
    helmet(),
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: 'Too many requests from this IP, please try again after 15 minutes'
    })
];

export const customSecurityHeaders = (req: any, res: any, next: any) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
};
