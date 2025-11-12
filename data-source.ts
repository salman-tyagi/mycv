import { DataSource, DataSourceOptions } from 'typeorm';

const options = {
  type: 'sqlite',
  entities: ['**/*.entity.ts'],
  synchronize: false,
} as DataSourceOptions;

const appDataSource = new DataSource(options);

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(options, {
      database: 'db.sqlite',
    });
    break;

  case 'test':
    Object.assign(options, {
      database: 'test.sqlite',
    });

  case 'production':

  default:
    throw new Error('unknown environment');
}

export default appDataSource;
