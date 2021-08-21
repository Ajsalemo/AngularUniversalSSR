import * as Sequelize from 'sequelize';

interface TodoAttributes {
  id?: string;
  todo: string;
  completed?: boolean;
  important?: boolean;
  dueBy?: number;
  createdAt?: string;
  updatedAt?: string;
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
  };
  return sequalize.define<TodoInstance, TodoAttributes>('todos', attributes);
};
