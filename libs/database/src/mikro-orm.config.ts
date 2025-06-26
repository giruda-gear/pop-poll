import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import path from 'path';

export default defineConfig({  
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'mypass',
  dbName: process.env.DB_NAME || 'pop_poll',
  entities: [path.resolve(__dirname, './entities/**/*.entity.js')],
  entitiesTs: [path.resolve(__dirname, './entities/**/*.entity.ts')],
  debug: process.env.NODE_ENV !== 'development',
  migrations: {
    path: 'libs/database/src/migrations',
    pathTs: 'libs/database/src/migrations',
  },
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
});
