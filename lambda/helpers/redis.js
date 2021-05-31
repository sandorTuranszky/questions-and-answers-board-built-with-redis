
const Redis = require("ioredis");
const { catchEvents, reportEvent } = require('./sentry');

/**
 * Ioredis
 * @url https://github.com/luin/ioredis
 */
const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  enableReadyCheck: true,
  tls: {},
});

redis.on(
  'connect',
  catchEvents(async () => {
    await reportEvent('IO Redis is connected');
  }),
);

redis.on(
  'ready',
  catchEvents(async () => {
    await reportEvent('IO Redis is ready');
  }),
);

redis.on(
  'error',
  catchEvents(async error => {
    await reportEvent(error);
  }),
);

exports.redis = redis;