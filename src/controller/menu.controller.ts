import { Context } from 'koa'

import userService from '../service/user.service'
import menuService from '../service/menu.service'
import Joi from 'joi'
import { MenuParams, UpdateMenuParams } from '../types'
import { ERROR_TYPES } from '../constant'

class MenuController {
  async menuListByRole(ctx: Context) {
    const search = ctx.request.body as { title: string; isEnable: number }
    const schema = Joi.object({
      title: Joi.string().empty(''),
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

  async updateMenu(ctx: Context) {
    const menuParam = ctx.request.body as UpdateMenuParams
    const schema = Joi.object({
      id: Joi.number().required(),
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

    if (menuParam.parentId === menuParam.id) {
      const error = new Error('上级菜单不能与当前菜单相同')
      return ctx.app.emit('error', error, ctx)
    }

    // 判断菜单不能重复
    const old_menu = await menuService.getMenuByName(menuParam.name)
    // 与本身同名忽略 与其他同名报错
    if (old_menu && old_menu.id !== menuParam.id) {
      const error = new Error(ERROR_TYPES.MENU_ALREADY_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }

    const result = await menuService.updateMenu(menuParam)
    ctx.body = {
      code: 200,
      data: result,
      msg: '更新菜单成功',
    }
  }

  async deleteMenu(ctx: Context) {
    const body = ctx.request.body as { id: number }

    const schema = Joi.object({
      id: Joi.number().required(),
    })
    try {
      await schema.validateAsync(body)
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }

    const menu = await menuService.getMenuById(body.id)
    if (!menu) {
      const error = new Error(ERROR_TYPES.MENU_NOT_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }

    const result = await menuService.deleteMenu(body.id)
    ctx.body = {
      code: 200,
      data: result,
      msg: '删除菜单成功',
    }
  }
}

export default new MenuController()
