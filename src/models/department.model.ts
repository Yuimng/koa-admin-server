import { DataTypes } from 'sequelize'

import sequelize from '../config/mysql'

const model = sequelize.define(
  'sys_department',
  {
    // 部门名称
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 部门编码
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true, // 唯一性
      allowNull: false,
    },
    // 父级部门编码
    parentCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
      field: 'parent_code',
    },
    // 排序
    sort: {
      type: DataTypes.INTEGER,
    },
    // 是否启用：0否 1是
    isEnable: {
      type: DataTypes.TINYINT,
      field: 'is_enable',
      defaultValue: 1,
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
