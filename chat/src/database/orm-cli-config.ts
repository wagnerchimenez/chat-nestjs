import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateUsersTable1753878590772 } from 'src/migrations/1753878590772-createUsersTable';
import { CreateMessagesTable1753881357191 } from 'src/migrations/1753881357191-createMessagesTable';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateUsersTable1753878590772, CreateMessagesTable1753881357191],
});
