import configKeys from '../../../config';
import { createClient, RedisClientOptions } from 'redis';

const connection = () => {
  const createRedisClient = () => {
    const clientOptions: RedisClientOptions = {
      url: 'redis://dailyhealth360-38kqp5.serverless.eun1.cache.amazonaws.com:6379',
      socket: {
        connectTimeout: 20000, // Increase the connection timeout to 20 seconds
        reconnectStrategy: (retries: number) => {
          console.error(`Reconnect attempt ${retries}`);
          return Math.min(retries * 50, 5000); // Exponential backoff up to 5 seconds
        }
      }
    };

    const client = createClient(clientOptions);

    client.on('error', (err) => {
      console.log('Redis Client Error', err);
      if (err instanceof Error && err.message.includes('ECONNREFUSED')) {
        console.error(
          'Connection refused. Check if the Redis server is running and accessible.'
        );
      } else if (err instanceof Error && err.message.includes('EHOSTUNREACH')) {
        console.error(
          'Host unreachable. Verify network configuration and connectivity.'
        );
      }
    });

    const connectWithRetry = () => {
      client
        .connect()
        .then(() => {
          console.log('Redis connected successfully'.bg_red.bold);
        })
        .catch((err) => {
          console.error('Failed to connect to Redis:', err);
          setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
        });
    };

    connectWithRetry();

    return client;
  };

  return {
    createRedisClient
  };
};

export default connection;
