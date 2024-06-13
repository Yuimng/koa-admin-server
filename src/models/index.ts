import menuModel from './menu.model'
import roleModel from './role.model'
import userModel from './user.model'
import roleMenuModel from './roleMenu.model'
import userRoleModel from './userRole.model'

roleModel.belongsToMany(menuModel, {
  through: roleMenuModel,
  foreignKey: 'roleId',
})
menuModel.belongsToMany(roleModel, {
  through: roleMenuModel,
  foreignKey: 'menuId',
})

userModel.belongsToMany(roleModel, {
  through: userRoleModel,
  foreignKey: 'userId',
})
roleModel.belongsToMany(userModel, {
  through: userRoleModel,
  foreignKey: 'roleId',
})

export { menuModel, roleModel, userModel, roleMenuModel, userRoleModel }
