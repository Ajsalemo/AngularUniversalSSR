import * as mysql2 from 'mysql2';
import * as os from 'os';
import { Sequelize } from 'sequelize';
import { environment } from 'src/environments/environment.prod';
import todoWrapper from './todos';
import userWrapper from './user';

const calculatePoolfromCPU = () => {
  if (os.cpus().length > 0) {
    const val = 128 / os.cpus().length
    return Math.floor(val)
  } else if (os.cpus().length === 0 || os.cpus().length === 128) {
    return 128
  } else {
    return 128
  }
}

const sequelize = new Sequelize(
  // Database
  environment.MYSQL_DATABASE,
  // Username
  environment.MYSQL_USERNAME,
  // Password
  environment.MYSQL_PASSWORD,
  {
    // Host
    host: environment.MYSQL_HOST,
    port: 3306,
    dialect: 'mysql',
    /*
      See this Github thread for explicit referencing of the mysql2 package for dialectModule
      https://github.com/sequelize/sequelize/issues/9489
    */
    dialectModule: mysql2,
    pool: {
      max: calculatePoolfromCPU(),
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
