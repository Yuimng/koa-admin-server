import { DataTypes } from 'sequelize'

import sequelize from '../config/mysql'

const model = sequelize.define(
  'sys_menu',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 菜单名称
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 页面地址
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 上一级菜单id
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    // 具体名称
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 图标
    icon: {
      type: DataTypes.STRING,
    },
    // 具体链接地址代表链接菜单 空字符串则不是
    isLink: {
      type: DataTypes.STRING,
      field: 'is_link',
    },
    // 是否显示：0否 1是*/
    isHide: {
      type: DataTypes.TINYINT,
      field: 'is_hide',
    },
    // 是否全屏：0否 1是*/
    isFull: {
      type: DataTypes.TINYINT,
      field: 'is_full',
    },
    // 是否固定：0否 1是*/
    isAffix: {
      type: DataTypes.TINYINT,
      field: 'is_affix',
    },
    // 是否缓存：0否 1是*/
    isKeepAlive: {
      type: DataTypes.TINYINT,
      field: 'is_keep_alive',
    },
    // 排序
    sort: {
      type: DataTypes.INTEGER,
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
