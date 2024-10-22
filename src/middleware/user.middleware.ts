import { Context, Next } from 'koa'
import Joi from 'joi'

import roleService from '../service/role.service'
import userService from '../service/user.service'

import { ERROR_TYPES } from '../constant'
import { PasswordToHash } from '../utils'
import { UserParams } from '../types'
const verifyUser = async (ctx: Context, next: Next) => {
  // 获取值
  const user = ctx.request.body as UserParams
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    roleId: Joi.number().required(),
    deptId: Joi.number().empty(1),
    name: Joi.string().empty(''),
    email: Joi.string().empty(''),
    phone: Joi.string().empty(''),
    remark: Joi.string().empty(''),
  })

  // 1.验证必要参数
  try {
    await schema.validateAsync(user)
  } catch (error) {
    return ctx.app.emit('error', error, ctx)
  }

  // 2.判断用户名不能重复
  const old_user = await userService.getUserByName(user.username)
  if (old_user) {
    const error = new Error(ERROR_TYPES.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  // 3.非管理员用户无法选择管理员角色
  // verifyAuth   ctx.user = {"id": 1,"username": "admin_test","iat": 1718075827, "exp": 1718162227 }
  const loginUser = await userService.getUserInfoById(ctx.user.id)

  const selectRole = await roleService.getRoleById(user.roleId)
  if (!selectRole) {
    const error = new Error(ERROR_TYPES.ROLE_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 非管理员修改isSuper无效  保持编辑前的值
  if (loginUser.isSuper === 0 && selectRole.isSuper === 1) {
    const error = new Error(ERROR_TYPES.UNPERMISSION)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

const handlePassword = async (ctx: Context, next: Next) => {
  const user = ctx.request.body as UserParams
  ctx.user = {
    ...user,
    password: PasswordToHash(user.password), // 密码加密
  }
  await next()
}

const verifySuper = async (ctx: Context, next: Next) => {
  const loginUser = await userService.getUserInfoById(ctx.user.id)
  if (loginUser.isSuper === 0) {
    const error = new Error(ERROR_TYPES.UNPERMISSION)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

export { verifyUser, handlePassword, verifySuper }
