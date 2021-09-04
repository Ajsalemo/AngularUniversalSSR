import { Sequelize } from 'sequelize';
import * as mysql2 from 'mysql2';
import todoWrapper from './todos';
import userWrapper from './user';

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
  Todos: todoWrapper(sequelize),
  Users: userWrapper(sequelize),
};

// Need to update TypeScript associations in user.ts/todos.ts so it can create usable association methods
db.Users.hasMany(db.Todos, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'todos'
})

db.Todos.belongsTo(db.Users, {
  foreignKey: 'userId',
  as: 'user'
})

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
