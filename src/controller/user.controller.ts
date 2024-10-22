import { Context } from 'koa'

import userService from '../service/user.service'
import { ERROR_TYPES } from '../constant'
import Joi from 'joi'
import { UserPageParams, UpdateUserParams } from '../types'

class UserController {
  async userInfo(ctx: Context) {
    const { userId } = ctx.params
    const result = await userService.getUserInfoById(userId)
    if (!result) {
      const error = new Error(ERROR_TYPES.USER_NOT_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功',
    }
  }

  async userList(ctx: Context) {
    const searchParams = ctx.request.body as UserPageParams
    const schema = Joi.object({
      username: Joi.string().empty(''),
      pageSize: Joi.number().required(),
      pageNo: Joi.number().required(),
      deptId: Joi.number().empty(1),
    })
    try {
      // 验证必要参数
      await schema.validateAsync(searchParams)
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }
    const result = await userService.getUserList(searchParams)

    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功',
    }
  }

  async addUser(ctx: Context) {
    const result = await userService.addNewUser(ctx.user)

    ctx.body = {
      code: 200,
      data: result,
      msg: '添加用户成功',
    }
  }

  async updateUser(ctx: Context) {
    const user = ctx.request.body as UpdateUserParams
    const schema = Joi.object({
      id: Joi.number().required(),
      username: Joi.string().required(),
      roleId: Joi.number().required(),
      deptId: Joi.number(), // 默认100
      name: Joi.string().empty(''),
      email: Joi.string().empty(''),
      phone: Joi.string().empty(''),
      remark: Joi.string().empty(''),
    })

    try {
      // 1.验证必要参数
      await schema.validateAsync(user)
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }
    // 2.管理员不可修改
    if (user.id === 1) {
      const error = new Error(ERROR_TYPES.INITIAL_ADMIN_CANNOT_BE_MODIFIED)
      return ctx.app.emit('error', error, ctx)
    }

    // 3.先验证登录用户是否为管理员
    const loginUser = await userService.getUserInfoById(ctx.user.id)
    // 非管理员修改管理员用户无权限
    const editUser = await userService.getUserInfoById(user.id)
    if (editUser && editUser.isSuper === 1 && loginUser.isSuper === 0) {
      const error = new Error(ERROR_TYPES.UNPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }

    // 4.判断用户名不能重复
    const old_user = await userService.getUserByName(user.username)

    // 与本身同名忽略 与其他同名报错
    if (old_user && old_user.id !== user.id) {
      const error = new Error(ERROR_TYPES.USER_ALREADY_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }

    // 5.更新用户信息
    const result = await userService.updateUser(user)

    ctx.body = {
      code: 200,
      data: result,
      msg: '修改用户成功',
    }
  }

  async deleteUser(ctx: Context) {
    const body = ctx.request.body as { id: number }
    const schema = Joi.object({
      id: Joi.number().required(),
    })
    try {
      // 验证必要参数
      await schema.validateAsync(body)
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }
    // 管理员不可删除
    if (body.id === 1) {
      const error = new Error(ERROR_TYPES.INITIAL_ADMIN_CANNOT_BE_DELETED)
      return ctx.app.emit('error', error, ctx)
    }
    // 不可删除本身
    if (body.id === ctx.user.id) {
      const error = new Error(ERROR_TYPES.CANNOT_DELETE_SELF)
      return ctx.app.emit('error', error, ctx)
    }

    const loginUser = await userService.getUserInfoById(ctx.user.id)

    const user = await userService.getUserInfoById(body.id)
    if (!user) {
      const error = new Error(ERROR_TYPES.USER_NOT_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }
    // 非管理员不可删除管理员用户
    if (user && user.isSuper === 1 && loginUser.isSuper !== 1) {
      const error = new Error(ERROR_TYPES.UNPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }

    const result = await userService.deleteUser(body.id)

    ctx.body = {
      code: 200,
      data: result,
      msg: '删除用户成功',
    }
  }
}

export default new UserController()
