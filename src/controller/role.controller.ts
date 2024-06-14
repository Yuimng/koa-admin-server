import Joi from 'joi'
import { Context } from 'koa'
import { RolePageParams, RoleParams, UpdateRoleParams } from '../types'
import roleService from '../service/role.service'
import userService from '../service/user.service'
import { ERROR_TYPES } from '../constant'

class RoleController {
  async getRoleList(ctx: Context) {
    const searchParams = ctx.request.body as RolePageParams
    const schema = Joi.object({
      role: Joi.string().empty(''),
      isSuper: Joi.number().valid(0, 1, 2),
      pageSize: Joi.number().required(),
      pageNo: Joi.number().required(),
    })
    try {
      // 验证必要参数
      await schema.validateAsync(searchParams)
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }
    const result = await roleService.getRoleList(searchParams)

    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功',
    }
  }

  async getRoleAllList(ctx: Context) {
    const result = await roleService.getRoleAllList()
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功',
    }
  }

  async addRole(ctx: Context) {
    const result = await roleService.addNewRole(ctx.roleParam)

    ctx.body = {
      code: 200,
      data: result,
      msg: '添加角色成功',
    }
  }

  async updateRole(ctx: Context) {
    // 1.获取值
    const roleParam = ctx.request.body as UpdateRoleParams

    // 2.验证必要参数
    const schema = Joi.object({
      id: Joi.number().required(),
      role: Joi.string().required(),
      roleName: Joi.string().required(),
      isSuper: Joi.number().empty(0),
      remark: Joi.string().empty(''),
      menus: Joi.array().items(Joi.number()),
    })
    try {
      await schema.validateAsync(roleParam)
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }
    // 2.两个初始角色不可修改
    if (roleParam.id === 1 || roleParam.id === 2) {
      const error = new Error(ERROR_TYPES.INITIAL_ROLE_CANNOT_BE_MODIFIED)
      return ctx.app.emit('error', error, ctx)
    }
    // 3.先验证登录用户是否为管理员
    // verifyAuth   ctx.user = {"id": 1,"username": "admin_test","iat": 1718075827, "exp": 1718162227 }
    const loginUser = await userService.getUserInfoById(ctx.user.id)
    // 非管理员修改isSuper无权限
    if (loginUser.isSuper === 0 && roleParam.isSuper === 1) {
      const error = new Error(ERROR_TYPES.UNPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }
    // 非管理员修改管理员角色无权限
    const editRole = await roleService.getRoleById(roleParam.id)
    if (editRole && editRole.isSuper === 1 && loginUser.isSuper === 0) {
      const error = new Error(ERROR_TYPES.UNPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }

    // 4.判断用户名不能重复
    const old_role = await roleService.getRoleByName(roleParam.role)
    // 与本身同名忽略 与其他同名报错
    if (old_role && old_role.id !== roleParam.id) {
      const error = new Error(ERROR_TYPES.ROLE_ALREADY_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }
    const result = await roleService.updateRole(roleParam)

    ctx.body = {
      code: 200,
      data: result,
      msg: '更新角色成功',
    }
  }

  async deleteRole(ctx: Context) {
    const body = ctx.request.body as { id: number }
    // 1.验证必要参数
    const schema = Joi.object({
      id: Joi.number().required(),
    })
    try {
      await schema.validateAsync(body)
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }

    // 2.初始角色不可删除
    if (body.id === 1 || body.id === 2) {
      const error = new Error(ERROR_TYPES.INITIAL_ROLE_CANNOT_BE_DELETED)
      return ctx.app.emit('error', error, ctx)
    }

    // 3.验证角色是否存在
    const role = await roleService.getRoleById(body.id)
    if (!role) {
      const error = new Error(ERROR_TYPES.ROLE_NOT_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }

    // 4.查询角色关联的用户，有关联不可删除
    const associatedUsers = await roleService.getUserByRoleId(body.id)

    if (associatedUsers.length > 0) {
      const error = new Error(ERROR_TYPES.ROLE_HAS_ASSOCIATED_USERS)
      return ctx.app.emit('error', error, ctx)
    }
    // 5.删除角色
    const result = await roleService.deleteRole(body.id)

    ctx.body = {
      code: 200,
      data: result,
      msg: '删除角色成功',
    }
  }
}

export default new RoleController()
