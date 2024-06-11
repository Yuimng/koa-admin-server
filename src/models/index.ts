// import sequelize from '../config/mysql'

import menuModel from './menu.model'
import roleModel from './role.model'
import userModel from './user.model'
import roleMenuModel from './roleMenu.model'
import userRoleModel from './userRole.model'

roleModel.hasMany(roleMenuModel, { foreignKey: 'roleId' })
roleMenuModel.hasOne(menuModel, { foreignKey: 'id' })

userModel.belongsToMany(roleModel, {
  through: userRoleModel,
  foreignKey: 'userId',
})
roleModel.belongsToMany(userModel, {
  through: userRoleModel,
  foreignKey: 'roleId',
})

// const synchonize = async () => {
//   await sequelize.sync({ force: true }) // 同步
//   // 添加初始角色
//   const adminRole = await roleModel.create({
//     roleName: '超级管理员',
//     role: 'super_admin',
//     isSuper: 1,
//   })

//   const userRole = await roleModel.create({
//     roleName: '普通用户',
//     role: 'user',
//     isSuper: 0,
//   })

//   // 默认管理员数据 用户必须先创建
//   const newUser = await userModel.create({
//     userName: 'admin_test',
//     userPassword:
//       '$2b$10$SAPfKamIxnPmH4QRLHa7ouZOrnKZwXWcgE5h8..qtawcJ.Okh0eba',
//     name: '测试管理员',
//   })
//   // 添加角色和用户关联
//   await userRoleModel.create({
//     userId: newUser.dataValues.id,
//     roleId: adminRole.dataValues.id,
//   })
// }
// synchonize()

export { menuModel, roleModel, userModel, roleMenuModel, userRoleModel }
