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
      isSuper: Joi.number().empty(''),
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
    // 错误处理
    if (result instanceof Error) {
      return ctx.app.emit('error', result, ctx)
    }
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功',
    }
  }

  async addRole(ctx: Context) {
    const result = await roleService.addNewRole(ctx.roleParam)
    // 错误处理
    if (result instanceof Error) {
      return ctx.app.emit('error', result, ctx)
    }
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
    // verifyAuth   ctx.user = {"id": 1,"userName": "admin_test","iat": 1718075827, "exp": 1718162227 }
    const loginUser = await userService.getUserInfoById(ctx.user.id)
    if (loginUser instanceof Error) {
      return ctx.app.emit('error', loginUser, ctx)
    }
    const editRole = await roleService.getRoleById(roleParam.id)
    if (editRole instanceof Error) {
      return ctx.app.emit('error', editRole, ctx)
    }
    // 非管理员修改isSuper无效  保持编辑前的值
    if (loginUser.isSuper === 0) {
      roleParam.isSuper = editRole.isSuper
    }

    // 4.判断用户名不能重复
    const old_role = await roleService.getRoleByName(roleParam.role)

    if (old_role instanceof Error) {
      return ctx.app.emit('error', old_role, ctx)
    }
    // 与本身同名忽略 与其他同名报错
    if (old_role && old_role.id !== roleParam.id) {
      const error = new Error(ERROR_TYPES.ROLE_ALREADY_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }
    const result = await roleService.updateRole(roleParam)
    if (result instanceof Error) {
      return ctx.app.emit('error', result, ctx)
    }
    ctx.body = {
      code: 200,
      data: result,
      msg: '更新角色成功',
    }
  }
}

export default new RoleController()
