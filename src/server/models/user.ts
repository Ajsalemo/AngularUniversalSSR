import * as Sequelize from 'sequelize';
import {
  Association,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManySetAssociationsMixin,
  Model,
  Optional,
} from 'sequelize';
import { Todo, TodoCreationAttributes } from './todos';

// Reference: https://sequelize.org/master/manual/typescript.html
interface UserAttributes {
  id: number;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;

  // Time stamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Methods to implement calls using association
  public getTodos!: HasManyGetAssociationsMixin<TodoCreationAttributes>;
  public createTodo!: HasManyCreateAssociationMixin<TodoCreationAttributes>;
  public deleteTodo!: HasManyRemoveAssociationMixin<
    TodoCreationAttributes,
    number
  >;
  public updateTodo!: HasManySetAssociationsMixin<
    TodoCreationAttributes,
    number
  >;

  public readonly todos?: Todo[];

  public static associations: {
    todos: Association<User, Todo>;
  };
}

export default (sequelize: Sequelize.Sequelize) => {
  return User.init(
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: {
          name: 'email',
          msg: 'Email address is already taken',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      sequelize,
    }
  );
};
