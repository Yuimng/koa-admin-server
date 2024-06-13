import sequelize from '../config/mysql'

import roleModel from './role.model'
import userModel from './user.model'
import userRoleModel from './userRole.model'

import { ADMIN_CONFIG } from '../config'

const synchonize = async () => {
  await sequelize.sync({ force: true }) // 同步
  // 添加初始角色
  const adminRole = await roleModel.create({
    roleName: '超级管理员',
    role: 'super_admin',
    isSuper: 1,
  })

  const userRole = await roleModel.create({
    roleName: '普通用户',
    role: 'user',
    isSuper: 0,
  })

  // 默认管理员数据 用户必须先创建
  const newUser = await userModel.create({
    username: ADMIN_CONFIG.username,
    password: ADMIN_CONFIG.password,
    name: ADMIN_CONFIG.name,
  })
  // 添加角色和用户关联
  await userRoleModel.create({
    userId: newUser.dataValues.id,
    roleId: adminRole.dataValues.id,
  })
}

export default synchonize
