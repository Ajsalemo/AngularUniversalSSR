import * as Sequelize from 'sequelize';

interface UserAttributes {
  id?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

type TodoInstance = Sequelize.Model<UserAttributes> & UserAttributes;

export default (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    email: { type: Sequelize.STRING, allowNull: false },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  };
  return sequalize.define<TodoInstance, UserAttributes>('users', attributes);
};
