import { Context, Next } from 'koa'

import userService from '../service/user.service'
import { ERROR_TYPES } from '../constant'
import { PasswordToHash } from '../utils'
import { UserParams } from '../types'
import Joi from 'joi'

const verifyUser = async (ctx: Context, next: Next) => {
  // 获取值
  const user = ctx.request.body as UserParams
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    roleId: Joi.number().required(),
    name: Joi.string().empty(''),
    email: Joi.string().empty(''),
    phone: Joi.string().empty(''),
    remark: Joi.string().empty(''),
  })

  try {
    // 验证必要参数
    await schema.validateAsync(user)
    // 判断用户名不能重复
    const old_user = await userService.getUserByName(user.username)
    // 错误处理
    if (old_user instanceof Error) {
      return ctx.app.emit('error', old_user, ctx)
    }
    if (old_user) {
      const error = new Error(ERROR_TYPES.USER_ALREADY_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }
  } catch (error) {
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

export { verifyUser, handlePassword }
