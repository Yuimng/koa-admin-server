import { Context } from 'koa'

import userService from '../service/user.service'
import menuService from '../service/menu.service'

class MenuController {
  async getMenuAllList(ctx: Context) {
    // 获取登录用户信息
    const loginUser: any = await userService.getUserInfoById(ctx.user.id)
    // 根据用户角色获取菜单列表
    const list = await menuService.getMenuListByRoleId(loginUser.roleId)

    ctx.body = {
      code: 200,
      data: list,
      msg: '获取菜单列表成功',
    }
  }
}

export default new MenuController()
