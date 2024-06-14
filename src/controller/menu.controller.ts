import { Context } from 'koa'

import userService from '../service/user.service'
import menuService from '../service/menu.service'
import Joi from 'joi'
import { MenuParams } from '../types'
import { ERROR_TYPES } from '../constant'

class MenuController {
  async menuListByRole(ctx: Context) {
    const search = ctx.request.body as { name: string; isEnable: number }
    const schema = Joi.object({
      name: Joi.string().empty(''),
      isEnable: Joi.number().valid(0, 1, 2),
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

  async addMenu(ctx: Context) {
    const menuParam = ctx.request.body as MenuParams
    const schema = Joi.object({
      name: Joi.string().required(),
      path: Joi.string().required(),
      parentId: Joi.number().required(),
      sort: Joi.number().empty(1),
      icon: Joi.string().empty(''),
      title: Joi.string().required(),
      isLink: Joi.number().valid(0, 1).empty(0),
      isEnable: Joi.number().valid(0, 1).empty(0),
      isAffix: Joi.number().valid(0, 1).empty(0),
      isKeepAlive: Joi.number().valid(0, 1).empty(0),
    })
    try {
      await schema.validateAsync(menuParam)
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }

    const menu = await menuService.getMenuByName(menuParam.name)
    if (menu) {
      const error = new Error(ERROR_TYPES.MENU_ALREADY_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }

    const loginUser = await userService.getUserInfoById(ctx.user.id)

    const result = await menuService.addMenu(menuParam, loginUser.roleId)

    ctx.body = {
      code: 200,
      data: result,
      msg: '添加菜单成功',
    }
  }
}

export default new MenuController()
