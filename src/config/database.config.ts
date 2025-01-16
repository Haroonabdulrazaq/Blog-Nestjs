import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database_name: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 5432,
  synchronize: process.env.DB_SYNC === 'true' ? true : false,
  autoLoadEntities: process.env.DB_AUTOLOAD === 'true' ? true : false,
}));
