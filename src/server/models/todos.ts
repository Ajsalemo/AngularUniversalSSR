import * as Sequelize from 'sequelize';

interface TodoAttributes {
  id?: string;
  todo: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

type TodoInstance = Sequelize.Model<TodoAttributes> & TodoAttributes;

export default (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<TodoAttributes> = {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    todo: { type: Sequelize.STRING, allowNull: false },
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  };
  return sequalize.define<TodoInstance, TodoAttributes>('todos', attributes);
};
