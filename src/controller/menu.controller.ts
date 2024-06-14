import { Context } from 'koa'

import userService from '../service/user.service'
import menuService from '../service/menu.service'
import Joi from 'joi'

class MenuController {
  async menuListByRole(ctx: Context) {
    const search = ctx.request.body as { name: string; isEnable: number }
    const schema = Joi.object({
      name: Joi.string().empty(''),
      isEnable: Joi.number().valid(0, 1),
    })
    try {
      await schema.validateAsync(search)
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }
    // 获取登录用户信息
    const loginUser: any = await userService.getUserInfoById(ctx.user.id)

    // 根据用户角色获取菜单列表
    const list = await menuService.getMenuListByRoleId(loginUser.roleId, search)

    ctx.body = {
      code: 200,
      data: list,
      msg: '获取菜单列表成功',
    }
  }

  async allMenuList(ctx: Context) {
    const list = await menuService.getAllMenuList()
    ctx.body = {
      code: 200,
      data: list,
      msg: '获取菜单列表成功',
    }
  }
}

export default new MenuController()
