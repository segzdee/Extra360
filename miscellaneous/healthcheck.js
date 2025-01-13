const http = require('http');
const os = require('os');

const metrics = {
  memory: () => {
    const used = process.memoryUsage();
    return {
      heapTotal: used.heapTotal / 1024 / 1024,
      heapUsed: used.heapUsed / 1024 / 1024,
      rss: used.rss / 1024 / 1024,
    };
  },
  cpu: () => {
    const cpus = os.cpus();
    return cpus.map(cpu => ({
      user: cpu.times.user,
      system: cpu.times.system,
      idle: cpu.times.idle,
    }));
  }
};

http.createServer((req, res) => {
  if (req.url === '/health') {
    const health = {
      status: 'up',
      timestamp: new Date(),
      metrics: {
        memory: metrics.memory(),
        cpu: metrics.cpu(),
      }
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(health));
  }
}).listen(3000);
