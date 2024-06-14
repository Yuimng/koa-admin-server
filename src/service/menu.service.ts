import { menuModel, roleModel } from '../models'
import { formatMenus } from '../utils'

class MenuService {
  async getMenuListByRoleId(roleId: number) {
    try {
      const roleWithMenus = await roleModel.findOne({
        where: {
          id: roleId,
        },
        include: [
          {
            model: menuModel,
            attributes: {
              exclude: ['updatedAt', 'deletedAt'],
            },
          },
        ],
      })
      const { sys_menus } = roleWithMenus as any
      return formatMenus(sys_menus)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new MenuService()
