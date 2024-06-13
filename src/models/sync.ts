import sequelize from '../config/mysql'

import roleModel from './role.model'
import userModel from './user.model'
import userRoleModel from './userRole.model'
import menuModel from './menu.model'
import roleMenuModel from './roleMenu.model'

import { ADMIN_CONFIG, TEST_CONFIG } from '../config'

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
  await userRoleModel.create({
    userId: newUser.dataValues.id,
    roleId: adminRole.dataValues.id,
  })

  const newTester = await userModel.create({
    username: TEST_CONFIG.username,
    password: TEST_CONFIG.password,
    name: TEST_CONFIG.name,
  })
  await userRoleModel.create({
    userId: newTester.dataValues.id,
    roleId: userRole.dataValues.id,
  })

  // 初始菜单数据
  const menu1 = await menuModel.create({
    name: 'dashboard',
    path: '/dashboard',
    parentId: 0,
    sort: 1,
    title: '主面板',
    icon: 'zhuye',
    isLink: 0,
    isEnable: 1,
    isAffix: 1,
    isKeepAlive: 1,
  })

  const menu2 = await menuModel.create({
    name: 'system',
    path: '/system',
    parentId: 0,
    sort: 1,
    title: '系统管理',
    icon: 'shezhi',
    isLink: 0,
    isEnable: 1,
    isAffix: 0,
    isKeepAlive: 1,
  })

  const menu3 = await menuModel.create({
    name: 'accountManage',
    path: '/system/accountManage',
    parentId: menu2.dataValues.id,
    sort: 1,
    title: '账号管理',
    icon: 'yingyong',
    isLink: 0,
    isEnable: 1,
    isAffix: 0,
    isKeepAlive: 1,
  })

  const menu4 = await menuModel.create({
    name: 'roleManage',
    path: '/system/roleManage',
    parentId: menu2.dataValues.id,
    sort: 1,
    title: '角色管理',
    icon: 'yingyong',
    isLink: 0,
    isEnable: 1,
    isAffix: 0,
    isKeepAlive: 1,
  })

  const menu5 = await menuModel.create({
    name: 'menuManage',
    path: '/system/menuManage',
    parentId: menu2.dataValues.id,
    sort: 1,
    title: '菜单管理',
    icon: 'yingyong',
    isLink: 0,
    isEnable: 1,
    isAffix: 0,
    isKeepAlive: 1,
  })

  const menu6 = await menuModel.create({
    name: 'departmentManage',
    path: '/system/departmentManage',
    parentId: menu2.dataValues.id,
    sort: 1,
    title: '部门管理',
    icon: 'yingyong',
    isLink: 0,
    isEnable: 1,
    isAffix: 0,
    isKeepAlive: 1,
  })

  // 管理员用户菜单
  await roleMenuModel.create({
    roleId: adminRole.dataValues.id,
    menuId: menu1.dataValues.id,
  })
  await roleMenuModel.create({
    roleId: adminRole.dataValues.id,
    menuId: menu2.dataValues.id,
  })
  await roleMenuModel.create({
    roleId: adminRole.dataValues.id,
    menuId: menu3.dataValues.id,
  })
  await roleMenuModel.create({
    roleId: adminRole.dataValues.id,
    menuId: menu4.dataValues.id,
  })
  await roleMenuModel.create({
    roleId: adminRole.dataValues.id,
    menuId: menu5.dataValues.id,
  })
  await roleMenuModel.create({
    roleId: adminRole.dataValues.id,
    menuId: menu6.dataValues.id,
  })

  // 普通用户菜单
  await roleMenuModel.create({
    roleId: userRole.dataValues.id,
    menuId: menu1.dataValues.id,
  })
}

export default synchonize
