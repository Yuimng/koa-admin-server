import Joi from 'joi'
import { Context } from 'koa'
import { RolePageParams } from '../types'
import roleService from '../service/role.service'

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
}

export default new RoleController()
