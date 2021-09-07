import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';

// Reference: https://sequelize.org/master/manual/typescript.html

interface TodoAttributes {
  id: number;
  userId: number;
  todo: string;
  completed: boolean;
  important: boolean;
  dueBy: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoCreationAttributes extends Optional<TodoAttributes, 'id'> {}

export class Todo
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes
{
  public id!: number;
  public userId!: number;
  public todo!: string;
  public completed!: boolean;
  public important!: boolean;
  public dueBy!: number;

  // Timestamps
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize.Sequelize) => {
  return Todo.init(
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      todo: { type: Sequelize.STRING, allowNull: false },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      important: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      dueBy: {
        type: Sequelize.DATE,
        allowNull: true,
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
      sequelize,
      tableName: 'todos',
    }
  );
};
