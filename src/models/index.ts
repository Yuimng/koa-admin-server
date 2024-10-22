import menuModel from './menu.model'
import roleModel from './role.model'
import userModel from './user.model'
import departmentModel from './department.model'
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

userModel.belongsTo(departmentModel, { foreignKey: 'deptId' })
departmentModel.hasMany(userModel, { foreignKey: 'deptId' })

export {
  menuModel,
  roleModel,
  userModel,
  departmentModel,
  roleMenuModel,
  userRoleModel,
}
