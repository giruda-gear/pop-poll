import { defineConfig } from '@mikro-orm/postgresql';
// import { ReflectMetadataProvider } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
// import { User } from '../entities/user.entity';

export default defineConfig({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'mypass',
  dbName: process.env.DB_NAME || 'pop_poll',
  // entities: [User],
  // entitiesTs: [User],
  entities: ['dist/libs/database/src/entities/**/*.entity.js'],
  entitiesTs: ['libs/database/src/entities/**/*.entity.ts'], 
  debug: true,
  migrations: {
    path: 'libs/database/src/migrations',
    pathTs: 'libs/database/src/migrations',
  },
  metadataProvider: TsMorphMetadataProvider,
});