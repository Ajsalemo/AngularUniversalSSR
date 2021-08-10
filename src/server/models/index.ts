import { Sequelize } from 'sequelize';
import * as mysql2 from 'mysql2';
import todoWrapper from './todos'

const sequelize = new Sequelize(
  // Database
  '',
  // Username
  '',
  // Password
  '',
  {
    // Host
    host: '',
    port: 3306,
    dialect: 'mysql',
    /*
      See this Github thread for explicit referencing of the mysql2 package for dialectModule
      https://github.com/sequelize/sequelize/issues/9489
    */
    dialectModule: mysql2,
    pool: {
      max: 128,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {
  sequelize,
  Sequelize,
  Todos: todoWrapper(sequelize)
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
