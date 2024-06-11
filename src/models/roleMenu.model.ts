import { DataTypes } from 'sequelize'

import sequelize from '../config/mysql'

const model = sequelize.define(
  'sys_role_menu',
  {
    roleId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      field: 'role_id',
    },
    menuId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      field: 'menu_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  },
  {
    freezeTableName: true,
  }
)

export default model
