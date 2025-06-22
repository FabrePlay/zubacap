import { parse } from 'pg-connection-string';

export default ({ env }) => {
  const config = parse(env('DATABASE_URL'));

  return {
    connection: {
      client: 'postgres',
      connection: {
        host: config.host,
        port: parseInt(config.port, 10),
        database: config.database,
        user: config.user,
        password: config.password,
        ssl: {
          rejectUnauthorized: false
        },
      },
      debug: false,
    },
  }
};