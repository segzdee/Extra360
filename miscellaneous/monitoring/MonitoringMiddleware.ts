import { Request, Response, NextFunction } from 'express';
import { MetricsCollector } from './MetricsCollector';

export function monitoringMiddleware() {
  const metrics = MetricsCollector.getInstance();

  return (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime();

    // Record active connection
    metrics.updateActiveConnections(1);

    // Record metrics on response finish
    res.on('finish', () => {
      const duration = process.hrtime(start);
      const durationInSeconds = duration[0] + duration[1] / 1e9;

      metrics.recordHttpRequest(
        req.method,
        req.route?.path || req.path,
        res.statusCode,
        durationInSeconds
      );

      if (res.statusCode >= 400) {
        metrics.recordError('http', 'api');
      }

      metrics.updateActiveConnections(-1);
    });

    next();
  };
}
