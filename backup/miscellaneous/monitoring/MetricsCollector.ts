import prometheus from 'prom-client';

export class MetricsCollector {
  private static instance: MetricsCollector;
  private registry: prometheus.Registry;
  
  // Define metrics
  private httpRequestDuration: prometheus.Histogram;
  private httpRequestTotal: prometheus.Counter;
  private activeConnections: prometheus.Gauge;
  private errorRate: prometheus.Counter;
  private cacheHitRate: prometheus.Counter;
  private databaseQueryDuration: prometheus.Histogram;

  private constructor() {
    this.registry = new prometheus.Registry();
    this.initializeMetrics();
  }

  public static getInstance(): MetricsCollector {
    if (!MetricsCollector.instance) {
      MetricsCollector.instance = new MetricsCollector();
    }
    return MetricsCollector.instance;
  }

  private initializeMetrics(): void {
    // HTTP request duration
    this.httpRequestDuration = new prometheus.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status'],
      buckets: [0.1, 0.5, 1, 2, 5]
    });

    // Total HTTP requests
    this.httpRequestTotal = new prometheus.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status']
    });

    // Active connections
    this.activeConnections = new prometheus.Gauge({
      name: 'active_connections',
      help: 'Number of active connections'
    });

    // Error rate
    this.errorRate = new prometheus.Counter({
      name: 'error_total',
      help: 'Total number of errors',
      labelNames: ['type', 'service']
    });

    // Cache hit rate
    this.cacheHitRate = new prometheus.Counter({
      name: 'cache_hits_total',
      help: 'Total number of cache hits/misses',
      labelNames: ['result']
    });

    // Database query duration
    this.databaseQueryDuration = new prometheus.Histogram({
      name: 'database_query_duration_seconds',
      help: 'Duration of database queries in seconds',
      labelNames: ['query_type', 'table'],
      buckets: [0.01, 0.05, 0.1, 0.5, 1]
    });

    // Register all metrics
    this.registry.registerMetric(this.httpRequestDuration);
    this.registry.registerMetric(this.httpRequestTotal);
    this.registry.registerMetric(this.activeConnections);
    this.registry.registerMetric(this.errorRate);
    this.registry.registerMetric(this.cacheHitRate);
    this.registry.registerMetric(this.databaseQueryDuration);
  }

  // Metric collection methods
  recordHttpRequest(method: string, route: string, status: number, duration: number): void {
    this.httpRequestDuration.labels(method, route, status.toString()).observe(duration);
    this.httpRequestTotal.labels(method, route, status.toString()).inc();
  }

  recordError(type: string, service: string): void {
    this.errorRate.labels(type, service).inc();
  }

  recordCacheHit(hit: boolean): void {
    this.cacheHitRate.labels(hit ? 'hit' : 'miss').inc();
  }

  recordDatabaseQuery(type: string, table: string, duration: number): void {
    this.databaseQueryDuration.labels(type, table).observe(duration);
  }

  updateActiveConnections(count: number): void {
    this.activeConnections.set(count);
  }

  getMetrics(): Promise<string> {
    return this.registry.metrics();
  }
}
