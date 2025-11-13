import { DataSource, DataSourceOptions } from 'typeorm';

const options: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['**/*.entity*{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/migrations/**/*{.ts,.js}'],
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(options, {
      type: 'sqlite',
      database: 'db.sqlite',
    });
    break;

  case 'test':
    Object.assign(options, {
      type: 'sqlite',
      database: 'test.sqlite',
      migrationsRun: true,
    });
    break;

  case 'production':
    break;

  default:
    throw new Error('unknown environment');
}

const appDataSource = new DataSource(options);

export default appDataSource;
