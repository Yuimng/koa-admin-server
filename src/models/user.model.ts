import { DataTypes } from 'sequelize'

import sequelize from '../config/mysql'

const model = sequelize.define(
  'sys_user',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 昵称
    name: {
      type: DataTypes.STRING(100),
    },
    // 登录名称
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    // 登录密码
    password: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
    deptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: 'dept_id',
    },
    email: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(200),
    },
    avatar: {
      type: DataTypes.STRING(200),
    },
    remark: {
      type: DataTypes.STRING(200),
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at',
    },
  },
  {
    // 启用paranoid 删除
    paranoid: true,
    freezeTableName: true,
  }
)

export default model
