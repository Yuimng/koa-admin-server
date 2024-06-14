import { Op } from 'sequelize'
import { menuModel, roleModel } from '../models'
import { formatMenus } from '../utils'

class MenuService {
  async getMenuListByRoleId(
    roleId: number,
    search: { name: string; isEnable: number }
  ) {
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
            where: {
              // 名称是title
              title: {
                [Op.like]: `%${search.name || ''}%`,
              },
              isEnable: search.isEnable,
            },
          },
        ],
      })
      if (roleWithMenus != null) {
        const { sys_menus } = roleWithMenus as any
        return sys_menus ? formatMenus(sys_menus) : []
      } else {
        return []
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getAllMenuList() {
    try {
      const menus = await menuModel.findAll({
        attributes: {
          exclude: ['updatedAt', 'deletedAt'],
        },
      })
      return formatMenus(menus)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new MenuService()
