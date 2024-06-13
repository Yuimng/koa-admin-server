import { Context } from 'koa'

import userService from '../service/user.service'
import menuService from '../service/menu.service'

class MenuController {
  async getMenuAllList(ctx: Context) {
    const user: any = await userService.getUserInfoById(ctx.user.id)
    if (user instanceof Error) {
      return ctx.app.emit('error', user, ctx)
    }

    const list = await menuService.getMenuListByRoleId(user.roleId)
    if (list instanceof Error) {
      return ctx.app.emit('error', list, ctx)
    }

    ctx.body = {
      code: 200,
      data: list,
      msg: '获取菜单列表成功',
    }
  }
}

export default new MenuController()
